"""
Quality Evaluator - Systematic Output Evaluation

Uses LLM-as-judge pattern to score summaries and other outputs.
"""

from typing import Dict, List
import json
from llm_client import LLMClient


class QualityEvaluator:
    """
    Evaluates LLM outputs using another LLM as judge

    Example:
        >>> evaluator = QualityEvaluator(client)
        >>> scores = evaluator.evaluate_summary(original, summary)
        >>> print(scores['clarity'])  # 0.0-1.0
    """

    # Default evaluation criteria for summaries
    SUMMARY_CRITERIA = [
        "Captures main points - Does the summary include the key information?",
        "Appropriate length - Is the length suitable for the content?",
        "Clear language - Is it easy to understand?",
        "No hallucinations - Does it only include information from the original?"
    ]

    def __init__(self, llm_client: LLMClient):
        """
        Initialize evaluator

        Args:
            llm_client: LLM client to use for evaluation
        """
        self.client = llm_client

    def evaluate(
        self,
        output: str,
        criteria: List[str],
        context: str = ""
    ) -> Dict[str, float]:
        """
        Evaluate output on custom criteria

        Args:
            output: Text to evaluate
            criteria: List of evaluation criteria
            context: Optional context (e.g., original document for summary)

        Returns:
            Dictionary mapping criterion to score (0.0-1.0)
        """
        # Build evaluation prompt
        eval_prompt = self._build_eval_prompt(output, criteria, context)

        # Get evaluation from LLM
        try:
            result = self.client.call(
                system=self._get_evaluator_system_prompt(),
                user=eval_prompt,
                temperature=0.0  # Deterministic evaluation
            )

            # Parse JSON response
            scores = self._parse_scores(result, criteria)
            return scores

        except Exception as e:
            # Fallback if evaluation fails
            return {
                "evaluation_error": str(e),
                **{self._criterion_to_key(c): 0.5 for c in criteria}
            }

    def evaluate_summary(
        self,
        original_text: str,
        summary: str,
        custom_criteria: List[str] = None
    ) -> Dict[str, float]:
        """
        Specialized evaluation for summaries

        Args:
            original_text: Original document
            summary: Generated summary
            custom_criteria: Optional custom criteria (uses defaults if not provided)

        Returns:
            Dictionary of scores (0.0-1.0)
        """
        criteria = custom_criteria or self.SUMMARY_CRITERIA

        return self.evaluate(
            output=summary,
            criteria=criteria,
            context=original_text
        )

    def evaluate_quality_dimensions(self, text: str) -> Dict[str, float]:
        """
        Evaluate text on standard quality dimensions

        Args:
            text: Text to evaluate

        Returns:
            Scores for correctness, completeness, clarity, and quality
        """
        criteria = [
            "Correctness - Is the information accurate and factual?",
            "Completeness - Are all necessary aspects covered?",
            "Clarity - Is it clear and easy to understand?",
            "Quality - Overall quality and professionalism?"
        ]

        return self.evaluate(text, criteria)

    def _build_eval_prompt(
        self,
        output: str,
        criteria: List[str],
        context: str
    ) -> str:
        """Build the evaluation prompt"""

        prompt = """Evaluate the following output on the specified criteria.
Score each criterion from 0.0 to 1.0 where:
- 0.0 = Completely fails the criterion
- 0.5 = Partially meets the criterion
- 1.0 = Fully meets the criterion

Be objective and strict in your evaluation."""

        if context:
            prompt += f"\n\nORIGINAL TEXT:\n{context}\n"

        prompt += f"\n\nOUTPUT TO EVALUATE:\n{output}\n"

        prompt += "\n\nEVALUATION CRITERIA:\n"
        for i, criterion in enumerate(criteria, 1):
            prompt += f"{i}. {criterion}\n"

        # Request JSON format
        example_keys = {self._criterion_to_key(c): 0.0 for c in criteria}
        prompt += f"""

Return ONLY a valid JSON object with scores (no other text):
{json.dumps(example_keys, indent=2)}

Provide scores as numbers between 0.0 and 1.0."""

        return prompt

    def _get_evaluator_system_prompt(self) -> str:
        """Get system prompt for evaluator"""
        return """You are an objective quality evaluator.
Your job is to assess outputs against specific criteria.

Be strict but fair in your evaluations.
Return ONLY valid JSON with numerical scores.
No explanations or additional text."""

    def _criterion_to_key(self, criterion: str) -> str:
        """Convert criterion description to JSON key"""
        # Extract key part before " - "
        key = criterion.split(" - ")[0] if " - " in criterion else criterion

        # Convert to snake_case
        key = key.lower().replace(" ", "_")

        # Remove special characters
        key = "".join(c for c in key if c.isalnum() or c == "_")

        return key

    def _parse_scores(
        self,
        response: str,
        criteria: List[str]
    ) -> Dict[str, float]:
        """
        Parse scores from LLM response

        Handles various response formats and extracts JSON
        """
        # Try to extract JSON from response
        try:
            # Direct JSON parse
            scores = json.loads(response)
            return self._normalize_scores(scores, criteria)

        except json.JSONDecodeError:
            # Try to find JSON in response
            import re

            # Look for {...} pattern
            json_match = re.search(r'\{[^{}]*\}', response, re.DOTALL)
            if json_match:
                try:
                    scores = json.loads(json_match.group())
                    return self._normalize_scores(scores, criteria)
                except json.JSONDecodeError:
                    pass

            # Fallback: return default scores
            return {
                "parse_error": "Could not parse evaluation",
                **{self._criterion_to_key(c): 0.5 for c in criteria}
            }

    def _normalize_scores(
        self,
        scores: Dict,
        criteria: List[str]
    ) -> Dict[str, float]:
        """
        Normalize and validate scores

        Ensures all scores are 0.0-1.0 and all criteria have scores
        """
        normalized = {}

        for criterion in criteria:
            key = self._criterion_to_key(criterion)

            # Get score (try multiple possible keys)
            score = scores.get(key)
            if score is None:
                # Try original criterion as key
                score = scores.get(criterion, 0.5)

            # Ensure score is float and in range
            try:
                score = float(score)
                score = max(0.0, min(1.0, score))  # Clamp to [0, 1]
            except (TypeError, ValueError):
                score = 0.5  # Default if invalid

            normalized[key] = score

        return normalized

    def get_overall_score(self, scores: Dict[str, float]) -> float:
        """
        Calculate overall score from individual criteria

        Args:
            scores: Dictionary of criterion scores

        Returns:
            Average score (0.0-1.0)
        """
        # Filter out non-numeric values
        numeric_scores = [
            v for v in scores.values()
            if isinstance(v, (int, float))
        ]

        if not numeric_scores:
            return 0.0

        return sum(numeric_scores) / len(numeric_scores)

    def format_scores(self, scores: Dict[str, float]) -> str:
        """
        Format scores for display

        Args:
            scores: Score dictionary

        Returns:
            Formatted string
        """
        lines = []

        for criterion, score in scores.items():
            if isinstance(score, (int, float)):
                # Show checkmark if score >= 0.7
                symbol = "✓" if score >= 0.7 else "⚠"
                criterion_display = criterion.replace("_", " ").title()
                lines.append(f"  {symbol} {criterion_display}: {score:.2f}")
            else:
                # Non-numeric value (e.g., error message)
                lines.append(f"  ! {criterion}: {score}")

        # Add overall score
        overall = self.get_overall_score(scores)
        lines.append(f"\n  Overall: {overall:.2f}")

        return "\n".join(lines)


# Example usage
if __name__ == "__main__":
    from llm_client import LLMClientFactory

    # Create client and evaluator
    client = LLMClientFactory.create("claude")
    evaluator = QualityEvaluator(client)

    # Example: Evaluate a summary
    original = """
    The Python programming language is known for its simplicity and
    readability. It uses significant whitespace and has a clean syntax
    that makes code easy to understand. Python is widely used in data
    science, web development, automation, and artificial intelligence.
    """

    good_summary = """
    Python is a simple, readable programming language used in data science,
    web development, automation, and AI.
    """

    bad_summary = """
    Java is a compiled language that runs on the JVM and is used for
    enterprise applications.
    """

    print("EVALUATING GOOD SUMMARY:")
    print("=" * 60)
    scores_good = evaluator.evaluate_summary(original, good_summary)
    print(evaluator.format_scores(scores_good))

    print("\n\nEVALUATING BAD SUMMARY:")
    print("=" * 60)
    scores_bad = evaluator.evaluate_summary(original, bad_summary)
    print(evaluator.format_scores(scores_bad))
