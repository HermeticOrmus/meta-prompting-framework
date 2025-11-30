# SKILL: Assess AI Engineering Level

## Purpose
Determine a learner's current AI engineering proficiency across the 7 depth levels through practical assessment and code review.

## Usage
```
/assess-level [--comprehensive | --quick | --specific=<area>]
```

## Assessment Framework

### Quick Assessment (5-10 minutes)
```yaml
questions:
  level_1_foundation:
    - "Show me how you'd call the Claude API with error handling"
    - "Explain token economics for a 10K context window"

  level_2_prompting:
    - "Write a Chain-of-Thought prompt for this math problem: [problem]"
    - "When would you use temperature=0.0 vs 0.7?"

  level_3_agents:
    - "Design a 3-agent system for research tasks"
    - "What's the difference between LangChain and LangGraph?"

  level_4_knowledge:
    - "Explain the difference between RAG and fine-tuning"
    - "What is semantic chunking and why does it matter?"

  level_5_reasoning:
    - "What is LoRA and how does it reduce training costs?"
    - "Explain test-time compute scaling"

  level_6_production:
    - "How would you achieve 99.9% uptime for an LLM service?"
    - "Design a guardrails system for production AI"

  level_7_architecture:
    - "Explain meta-prompting and Kan extensions"
    - "Design a self-improving AI system"
```

### Comprehensive Assessment (30-60 minutes)

#### Part 1: Code Review (20 min)
```
Present this code and ask for improvements:

```python
import openai

def ask_ai(question):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": question}]
    )
    return response.choices[0].message.content

answer = ask_ai("What is AI?")
print(answer)
```

**Scoring Rubric**:
- **L1**: Identifies missing error handling, API key management
- **L2**: Suggests better prompts, temperature tuning
- **L3**: Recommends agent patterns for complex queries
- **L4**: Proposes RAG for factual questions
- **L5**: Considers fine-tuning for consistent behavior
- **L6**: Adds monitoring, caching, retry logic
- **L7**: Designs meta-prompting improvement loop
```

#### Part 2: System Design (20 min)
```
Design challenge: "Build a customer support chatbot for a SaaS company"

**L1 Response**: Direct API calls to LLM
**L2 Response**: Well-crafted prompts with examples
**L3 Response**: Multi-agent system (classifier, responder, escalator)
**L4 Response**: RAG with company knowledge base
**L5 Response**: Fine-tuned model on support tickets
**L6 Response**: Production system with monitoring, fallbacks
**L7 Response**: Self-improving system learning from interactions
```

#### Part 3: Practical Task (20 min)
```
Implement a working solution to:
"Create a semantic search over 100 documents with quality evaluation"

Time limit: 20 minutes
Evaluation: Correctness, code quality, use of best practices
```

## Scoring Algorithm

```python
def calculate_level(responses: Dict) -> Dict:
    """
    Calculate overall level and skill gaps

    Returns:
        {
            "current_level": 2.3,  # Between levels
            "level_breakdown": {
                "L1": 1.0,  # Fully mastered
                "L2": 0.8,  # Strong
                "L3": 0.3,  # Weak
                "L4": 0.1,  # Beginner
                ...
            },
            "strengths": ["API integration", "Prompt engineering"],
            "gaps": ["Agent design", "RAG implementation"],
            "recommended_path": "Start Level 3, review Level 2 advanced topics"
        }
    ```

### Level Determination
```
Score Range → Level
────────────────────
0.0 - 0.3  → Beginner (not at this level yet)
0.3 - 0.6  → Learning (partially competent)
0.6 - 0.9  → Competent (working knowledge)
0.9 - 1.0  → Mastery (can teach others)

Overall Level = Highest level with score >= 0.6
```

## Output Format

```markdown
# AI Engineering Level Assessment Results

## Overall Level: **2.3** (Prompt Craftsman - Advanced)

### Breakdown by Level
┌────────┬───────┬──────────┐
│ Level  │ Score │ Status   │
├────────┼───────┼──────────┤
│ L1     │ 0.95  │ ✅ Mastered │
│ L2     │ 0.80  │ ✅ Strong   │
│ L3     │ 0.30  │ ⚠️ Learning │
│ L4     │ 0.10  │ ❌ Beginner │
│ L5     │ 0.05  │ ❌ Beginner │
│ L6     │ 0.00  │ ❌ Not Started │
│ L7     │ 0.00  │ ❌ Not Started │
└────────┴───────┴──────────┘

### Strengths
- API integration with multiple providers
- Excellent understanding of token economics
- Strong prompt engineering fundamentals
- Good CoT implementation

### Skill Gaps
- Multi-agent system design
- RAG implementation experience
- Vector database knowledge
- Production deployment

### Recommended Learning Path
1. **Immediate Focus**: Level 3 (Agent Conductor)
   - Start with LangGraph tutorial
   - Build 2-agent system this week
   - Study ReAct paper

2. **Review Topics**: Level 2 Advanced
   - Tree-of-Thought implementation
   - Meta-prompting patterns
   - Complexity routing

3. **Timeline**: 4-6 weeks to Level 4

### Next Steps
```bash
# Start your recommended curriculum
python cli.py start-level --level=3

# Get daily practice tasks
python cli.py daily-practice

# Track your progress
python cli.py track-progress
```

## Detailed Feedback

### Question 1: API Error Handling
**Your Answer**: [code snippet]
**Score**: 8/10
**Feedback**: Good retry logic, but missing exponential backoff. Consider:
[code improvement]

### Question 2: Agent Design
**Your Answer**: [design]
**Score**: 5/10
**Feedback**: Basic understanding, but missing state management. Study:
- LangGraph state machines
- Message passing patterns
- Error recovery strategies

[... continues for all questions]

---

**Assessment Date**: 2025-01-29
**Valid For**: 30 days (skills evolve quickly!)
**Next Assessment**: After completing Level 3 project
```

## Implementation

```python
class LevelAssessor:
    def __init__(self, llm_client):
        self.client = llm_client
        self.rubrics = self._load_rubrics()

    def assess_quick(self, answers: Dict[str, str]) -> AssessmentResult:
        """Quick assessment from question responses"""
        scores = {}

        for level in range(1, 8):
            level_questions = self.rubrics[f"L{level}"]
            level_score = self._score_level_answers(
                level_questions,
                answers
            )
            scores[f"L{level}"] = level_score

        return self._generate_report(scores)

    def assess_comprehensive(
        self,
        code_review: str,
        system_design: str,
        practical_impl: str
    ) -> AssessmentResult:
        """Comprehensive assessment with multiple modalities"""

        # Score each component
        code_score = self._evaluate_code_review(code_review)
        design_score = self._evaluate_system_design(system_design)
        practical_score = self._evaluate_implementation(practical_impl)

        # Weighted combination
        final_scores = self._combine_scores(
            code=code_score,
            design=design_score,
            practical=practical_score,
            weights=[0.3, 0.4, 0.3]
        )

        return self._generate_report(final_scores)

    def _evaluate_code_review(self, review: str) -> Dict[str, float]:
        """Use LLM to evaluate code review quality"""

        eval_prompt = f"""
        Evaluate this code review across AI engineering levels 1-7.

        Code review:
        {review}

        Score each level 0.0-1.0 based on what improvements they identified:
        - L1: API usage, error handling, configuration
        - L2: Prompt quality, temperature, structured output
        - L3: Agent patterns, orchestration
        - L4: RAG, knowledge systems
        - L5: Fine-tuning considerations
        - L6: Production concerns (monitoring, caching)
        - L7: Meta-learning, self-improvement

        Return JSON with scores.
        """

        result = self.client.call(
            system="You are an AI engineering assessor",
            user=eval_prompt,
            temperature=0.1
        )

        return json.loads(result)
```

## Integration with Curriculum Generation

After assessment, automatically generate personalized curriculum:

```python
assessment = assessor.assess_comprehensive(...)

# Generate personalized curriculum based on results
curriculum = CurriculumGenerator(
    current_level=assessment.overall_level,
    skill_gaps=assessment.gaps,
    strengths=assessment.strengths,
    learning_style="hands-on"  # detected from responses
).generate()

# Save to learner profile
learner_profile.update(
    level=assessment.overall_level,
    curriculum=curriculum,
    assessment_date=datetime.now()
)
```

## Retake Policy

```
Frequency: Recommended every 30 days
Reason: AI field evolves rapidly, skills need refresh
Triggers for early retake:
  - Completed a level's project
  - Feel stuck or unchallenged
  - Major new technique emerged (e.g., new model architecture)
```
