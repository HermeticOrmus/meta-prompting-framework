"""
Smart Summarizer - Core Logic

Provides multiple summarization styles with automatic quality evaluation.
"""

from typing import Dict, Optional
from llm_client import LLMClient
from evaluator import QualityEvaluator


class SmartSummarizer:
    """
    Document summarizer with multiple styles and quality evaluation

    Example:
        >>> summarizer = SmartSummarizer(client)
        >>> result = summarizer.summarize(text, style="concise")
        >>> print(result['summary'])
    """

    # Style-specific system prompts
    STYLE_PROMPTS = {
        "concise": """Summarize in 2-3 sentences maximum.
Be direct, clear, and capture only the most important points.
No fluff or unnecessary details.""",

        "detailed": """Provide a comprehensive summary with:
1. Main thesis/argument (1-2 sentences)
2. Key supporting points (3-5 bullet points)
3. Conclusion/implications (1 sentence)

Use professional language and maintain accuracy.""",

        "eli5": """Explain like I'm 5 years old.
Use simple words, short sentences, and helpful analogies.
Avoid jargon. Make it fun and easy to understand!""",

        "academic": """Create an academic-style summary:
- Use proper terminology and formal language
- Cite key concepts and methodologies
- Maintain objectivity
- Structure: Context → Methods → Findings → Implications""",

        "bullet": """Summarize as bullet points ONLY.
- 5-7 bullets maximum
- Each bullet: one complete thought
- Start with most important points
- Be concise but complete"""
    }

    def __init__(
        self,
        llm_client: LLMClient,
        enable_cache: bool = True,
        enable_evaluation: bool = True
    ):
        """
        Initialize summarizer

        Args:
            llm_client: LLM client instance
            enable_cache: Cache summaries to reduce costs
            enable_evaluation: Auto-evaluate summary quality
        """
        self.client = llm_client
        self.evaluator = QualityEvaluator(llm_client) if enable_evaluation else None
        self.cache = {} if enable_cache else None

    def summarize(
        self,
        text: str,
        style: str = "concise",
        evaluate: bool = True,
        temperature: float = 0.3,
        max_length: Optional[int] = None
    ) -> Dict:
        """
        Summarize text in specified style

        Args:
            text: Text to summarize
            style: Summarization style (concise, detailed, eli5, academic, bullet)
            evaluate: Whether to evaluate summary quality
            temperature: LLM temperature (0.0-1.0). Lower = more deterministic
            max_length: Maximum summary length in characters (optional)

        Returns:
            Dictionary with:
                - summary: The generated summary
                - quality_scores: Quality metrics (if evaluate=True)
                - stats: Token usage and cost info
                - style: Style used

        Raises:
            ValueError: If style is unknown
        """
        # Validate style
        if style not in self.STYLE_PROMPTS:
            available_styles = ", ".join(self.STYLE_PROMPTS.keys())
            raise ValueError(
                f"Unknown style '{style}'. "
                f"Available styles: {available_styles}"
            )

        # Check cache
        cache_key = self._get_cache_key(text, style, temperature)
        if self.cache is not None and cache_key in self.cache:
            return self.cache[cache_key]

        # Build prompt
        system_prompt = self.STYLE_PROMPTS[style]

        if max_length:
            system_prompt += f"\n\nMaximum length: {max_length} characters."

        user_prompt = f"Summarize the following text:\n\n{text}"

        # Generate summary
        summary = self.client.call(
            system=system_prompt,
            user=user_prompt,
            temperature=temperature
        )

        # Build result
        result = {
            "summary": summary.strip(),
            "style": style,
            "input_length": len(text),
            "output_length": len(summary)
        }

        # Evaluate quality
        if evaluate and self.evaluator:
            scores = self.evaluator.evaluate_summary(text, summary)
            result["quality_scores"] = scores

        # Add stats
        result["stats"] = self.client.get_stats()

        # Cache result
        if self.cache is not None:
            self.cache[cache_key] = result

        return result

    def batch_summarize(
        self,
        texts: list[str],
        style: str = "concise",
        evaluate: bool = False  # Default off for batch (faster)
    ) -> list[Dict]:
        """
        Summarize multiple texts

        Args:
            texts: List of texts to summarize
            style: Summarization style
            evaluate: Whether to evaluate each summary

        Returns:
            List of summary results
        """
        results = []

        for i, text in enumerate(texts):
            print(f"Summarizing document {i+1}/{len(texts)}...")
            result = self.summarize(text, style=style, evaluate=evaluate)
            results.append(result)

        # Aggregate stats
        total_cost = sum(r["stats"]["total_cost"] for r in results)
        total_tokens = sum(r["stats"]["total_tokens"] for r in results)

        print(f"\nBatch complete!")
        print(f"  Total documents: {len(texts)}")
        print(f"  Total tokens: {total_tokens:,}")
        print(f"  Total cost: ${total_cost:.4f}")

        return results

    def compare_styles(self, text: str) -> Dict[str, str]:
        """
        Generate summaries in all available styles

        Args:
            text: Text to summarize

        Returns:
            Dictionary mapping style name to summary
        """
        summaries = {}

        for style in self.STYLE_PROMPTS.keys():
            result = self.summarize(text, style=style, evaluate=False)
            summaries[style] = result["summary"]

        return summaries

    def _get_cache_key(self, text: str, style: str, temperature: float) -> str:
        """Generate cache key from inputs"""
        import hashlib
        content = f"{text}|{style}|{temperature}"
        return hashlib.md5(content.encode()).hexdigest()

    def get_cache_stats(self) -> Dict:
        """Get caching statistics"""
        if self.cache is None:
            return {"caching_enabled": False}

        return {
            "caching_enabled": True,
            "cached_items": len(self.cache),
            "estimated_savings": f"${len(self.cache) * 0.008:.4f}"  # Rough estimate
        }

    def clear_cache(self):
        """Clear the summary cache"""
        if self.cache is not None:
            self.cache.clear()


# Example usage
if __name__ == "__main__":
    from llm_client import LLMClientFactory

    # Create client and summarizer
    client = LLMClientFactory.create("claude")
    summarizer = SmartSummarizer(client)

    # Example text
    sample_text = """
    Artificial intelligence has rapidly evolved from a theoretical concept
    to a transformative technology reshaping industries worldwide. Machine
    learning algorithms now power everything from recommendation systems to
    autonomous vehicles. Deep learning, a subset of machine learning inspired
    by neural networks in the human brain, has achieved remarkable breakthroughs
    in image recognition, natural language processing, and game playing.

    Large language models, trained on vast amounts of text data, can now
    generate human-like text, translate languages, answer questions, and even
    write code. These models have democratized access to AI capabilities,
    enabling developers to build sophisticated applications with relatively
    little specialized knowledge.

    However, this rapid progress also raises important questions about AI safety,
    ethics, and societal impact. As AI systems become more capable, ensuring
    they remain beneficial and aligned with human values becomes increasingly
    critical.
    """

    # Summarize
    print("=" * 60)
    print("SMART SUMMARIZER DEMO")
    print("=" * 60)

    # Try different styles
    for style in ["concise", "bullet", "eli5"]:
        print(f"\n{style.upper()} STYLE:")
        print("-" * 60)

        result = summarizer.summarize(
            sample_text,
            style=style,
            evaluate=True
        )

        print(result["summary"])
        print(f"\nQuality: {result.get('quality_scores', {})}")
        print(f"Cost: ${result['stats']['total_cost']:.4f}")
