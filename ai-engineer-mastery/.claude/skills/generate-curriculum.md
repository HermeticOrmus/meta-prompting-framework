# SKILL: Generate Personalized Curriculum

## Purpose
Create adaptive, personalized learning paths based on learner profile, skill gaps, goals, and learning style using meta-prompting iteration.

## Usage
```
/generate-curriculum --target=<level> --weeks=<N> [--style=<learning-style>]
```

## Input Parameters

```yaml
learner_profile:
  current_level: 2.3
  skill_gaps:
    - multi-agent design
    - RAG implementation
    - vector databases
  strengths:
    - API integration
    - prompt engineering
  learning_style: hands-on | visual | theoretical | mixed
  weekly_hours: 15
  goals:
    - career_advancement
    - build_startup
    - research
  pace_preference: fast | steady | relaxed
```

## Meta-Prompting Curriculum Engine

### Architecture
```
Learner Profile
    ↓
Complexity Analyzer (analyze learning task difficulty)
    ↓
Meta-Prompt Generator (create curriculum prompt)
    ↓
LLM Execution (generate curriculum)
    ↓
Context Extractor (identify gaps, pacing issues)
    ↓
Quality Assessor (evaluate completeness, coherence)
    ↓
quality >= 0.90? → Yes: Output | No: Iterate with extracted context
```

### Iteration Process

```python
class CurriculumGenerator:
    def __init__(self, meta_prompting_engine):
        self.engine = meta_prompting_engine
        self.quality_threshold = 0.90
        self.max_iterations = 3

    def generate(self, learner_profile: LearnerProfile) -> Curriculum:
        """Generate curriculum with iterative refinement"""

        # Iteration 1: Initial generation
        curriculum_v1 = self._generate_initial(learner_profile)

        # Iteration 2: Refine based on gaps
        gaps_v1 = self._identify_gaps(curriculum_v1, learner_profile)
        curriculum_v2 = self._refine_curriculum(curriculum_v1, gaps_v1)

        # Iteration 3: Final polish
        quality = self._assess_quality(curriculum_v2)
        if quality < self.quality_threshold:
            curriculum_v3 = self._final_refinement(curriculum_v2)
            return curriculum_v3
        return curriculum_v2

    def _generate_initial(self, profile: LearnerProfile) -> Curriculum:
        """First iteration: comprehensive generation"""

        prompt = f"""
        Create a personalized AI Engineer curriculum:

        LEARNER PROFILE:
        - Current Level: {profile.current_level}
        - Target Level: {profile.target_level}
        - Weekly Hours: {profile.weekly_hours}
        - Learning Style: {profile.learning_style}
        - Skill Gaps: {profile.skill_gaps}
        - Strengths: {profile.strengths}
        - Goals: {profile.goals}

        REQUIREMENTS:
        1. Week-by-week breakdown from current to target level
        2. Daily learning objectives (specific, measurable)
        3. Hands-on projects for each major concept
        4. Progressive difficulty (builds on previous weeks)
        5. Clear assessment checkpoints
        6. Resource recommendations matched to learning style

        OUTPUT FORMAT:
        ## Week 1: [Theme]
        **Objectives**: ...
        **Daily Plan**:
          Mon: [specific tasks with time estimates]
          Tue: ...
          Wed: Mid-week project checkpoint
          ...
        **Project**: [detailed spec]
        **Resources**: [curated links]
        **Assessment**: [how to verify understanding]

        Generate comprehensive {profile.weeks}-week curriculum:
        """

        return self.engine.generate(
            prompt=prompt,
            temperature=0.7,
            max_tokens=4000
        )
```

## Curriculum Template Structure

```markdown
# Personalized AI Engineer Curriculum
**Learner**: [ID] | **Level**: 2.3 → 5.0 | **Duration**: 16 weeks

## Overview
You'll advance from Prompt Craftsman to Reasoning Engineer through progressive mastery of agents, knowledge systems, and fine-tuning.

### Learning Path
```
Weeks 1-4:  Complete Level 3 (Agent Conductor)
Weeks 5-8:  Complete Level 4 (Knowledge Alchemist)
Weeks 9-12: Level 5 Foundations (Fine-tuning basics)
Weeks 13-16: Level 5 Advanced (Test-time compute)
```

### Key Milestones
- Week 4:  Ship multi-agent research system
- Week 8:  Deploy production RAG (80%+ accuracy)
- Week 12: Fine-tune 7B model with QLoRA
- Week 16: Implement reasoning enhancement system

---

## Week 1: LangGraph Foundations

### Objectives
- Understand state machines for agents
- Build first LangGraph workflow
- Implement message passing
- Handle error recovery

### Daily Plan

**Monday (2h): Environment Setup + Theory**
- [ ] Install LangGraph, LangChain ecosystem (30m)
- [ ] Read: LangGraph concepts guide (1h)
- [ ] Watch: Introduction to state machines (30m)
- **Deliverable**: Working LangGraph installation

**Tuesday (2h): First State Machine**
- [ ] Tutorial: Basic LangGraph workflow (1h)
- [ ] Build: 2-node agent (research → summarize) (1h)
- **Deliverable**: Working 2-node agent

**Wednesday (3h): State Management**
- [ ] Deep dive: State types and updates (1h)
- [ ] Implement: Shared state across nodes (1h)
- [ ] Debug: Common state errors (1h)
- **Deliverable**: Agent with complex state

**Thursday (2h): Conditional Routing**
- [ ] Learn: Conditional edges (45m)
- [ ] Build: Router node (task classifier) (1h 15m)
- **Deliverable**: Agent with routing logic

**Friday (3h): Error Handling**
- [ ] Study: Error recovery patterns (1h)
- [ ] Implement: Retry logic, fallbacks (2h)
- **Deliverable**: Robust agent with error handling

**Weekend (5h): Week 1 Project**
- [ ] Build: "Smart Task Router" (4h)
      - Classifies tasks as simple/medium/complex
      - Routes to appropriate processing nodes
      - Handles errors gracefully
- [ ] Document: Architecture + learnings (1h)

### Resources
**Hands-On** (your style):
- [LangGraph Quick Start Tutorial](https://link)
- [State Machine Interactive Playground](https://link)
- [LangGraph Cookbook - Error Handling](https://link)

**Reference**:
- LangGraph API Documentation
- Example: Multi-agent research system

### Assessment Checkpoint
**Due**: Sunday EOD

**Criteria**:
- [ ] Agent runs without errors
- [ ] State management is correct
- [ ] Routing logic works for 3+ task types
- [ ] Error recovery demonstrated
- [ ] Code is documented

**Self-Assessment Questions**:
1. Explain how state flows through your graph
2. What happens if a node fails?
3. How would you add a 4th node to your system?

**Passing Score**: 8/10 on self-assessment
**If struggling**: Review state machine concepts, join office hours

---

## Week 2: Multi-Agent Patterns

[Similar detailed structure...]

---

## Week 16: Reasoning Enhancement System

[Final week structure...]

---

## Appendix

### Adaptive Learning Triggers

**Accelerate if**:
- Completing weeks in <80% estimated time
- Assessment scores consistently >90%
- Already familiar with week's concepts

**Decelerate if**:
- Weeks taking >120% estimated time
- Assessment scores <70%
- Concepts not clicking

**Add Practice if**:
- Specific skill gap persists (e.g., state management)
- Assessment reveals recurring error patterns

### Resource Library

**By Learning Style**:
- **Hands-On**: Interactive tutorials, coding challenges
- **Visual**: Diagrams, videos, visual debuggers
- **Theoretical**: Papers, documentation, concept explanations

**By Level**:
- L3 Resources: [curated list]
- L4 Resources: [curated list]
- L5 Resources: [curated list]

### Progress Tracking

**Weekly Review Template**:
```yaml
week_N:
  completed: true/false
  time_spent: X hours
  understanding: 1-10
  project_quality: 1-10
  challenges:
    - [challenge description]
  breakthroughs:
    - [aha moment]
  next_week_adjustments:
    - [curriculum tweaks]
```

### Support Channels

**When stuck**:
1. Review prerequisite concepts
2. Check troubleshooting guide
3. Ask in Discord #level-3 channel
4. Attend office hours (Tuesdays, Fridays)
5. Request mentor pairing

**Escalation path**:
Stuck <30min → Self-debug
Stuck 30-60min → Check docs/Discord
Stuck 60min+ → Office hours/mentor

---

**Generated**: 2025-01-29
**Valid Through**: Week 16 completion
**Next Review**: Week 4 (adjust pace based on progress)
```

## Quality Assessment Criteria

```python
def assess_curriculum_quality(curriculum: str) -> Dict[str, float]:
    """Evaluate generated curriculum quality"""

    criteria = {
        "completeness": {
            "description": "All levels covered, no gaps",
            "checks": [
                "has_weekly_breakdown",
                "has_daily_objectives",
                "has_projects",
                "has_assessments",
                "has_resources"
            ]
        },
        "coherence": {
            "description": "Logical progression, builds incrementally",
            "checks": [
                "prerequisites_respected",
                "difficulty_increases_gradually",
                "concepts_interconnected"
            ]
        },
        "actionability": {
            "description": "Clear, specific next steps",
            "checks": [
                "has_time_estimates",
                "has_deliverables",
                "has_success_criteria"
            ]
        },
        "personalization": {
            "description": "Matches learner profile",
            "checks": [
                "addresses_skill_gaps",
                "respects_time_budget",
                "matches_learning_style",
                "aligns_with_goals"
            ]
        }
    }

    scores = {}
    for criterion, config in criteria.items():
        score = evaluate_criterion(curriculum, config)
        scores[criterion] = score

    overall = sum(scores.values()) / len(scores)
    return {**scores, "overall": overall}
```

## Adaptation Protocol

```yaml
curriculum_adjustment:
  trigger: weekly_review
  frequency: every_week

  adjustments:
    if_ahead_of_schedule:
      - add_stretch_challenges
      - introduce_advanced_topics_early
      - increase_project_complexity

    if_behind_schedule:
      - extend_timeline
      - simplify_next_week_project
      - add_focused_practice_sessions

    if_skill_gap_persists:
      - insert_targeted_practice_week
      - provide_alternative_explanations
      - assign_mentor_pairing

  meta_prompt_iteration:
    action: "Regenerate next 2 weeks based on progress"
    context: [completed_weeks, challenges_faced, assessment_scores]
    quality_threshold: 0.85
```

## Integration with Other Skills

```bash
# 1. Assess current level
/assess-level --comprehensive

# 2. Generate personalized curriculum
/generate-curriculum --target=5 --weeks=16 --style=hands-on

# 3. Start learning
/start-level --level=3

# 4. Track progress weekly
/track-progress --week=1

# 5. Adapt curriculum as needed
/generate-curriculum --adapt --based-on=progress
```

## Example Output Summary

```
📚 Personalized Curriculum Generated!

Current Level: 2.3 (Prompt Craftsman)
Target Level: 5.0 (Reasoning Engineer)
Duration: 16 weeks (15 hours/week = 240 total hours)

Path:
├── Weeks 1-4: Level 3 (Agents) ✨ Focus area for you
├── Weeks 5-8: Level 4 (Knowledge)
├── Weeks 9-12: Level 5 Foundations
└── Weeks 13-16: Level 5 Advanced

Key Projects:
1. Multi-agent research swarm (Week 4)
2. Enterprise GraphRAG (Week 8)
3. QLoRA fine-tuned model (Week 12)
4. Reasoning enhancement system (Week 16)

Personalization:
✅ Hands-on learning style (interactive tutorials + coding)
✅ Addresses your gaps: multi-agent design, RAG
✅ Builds on strengths: prompting, API integration
✅ Aligned with goal: Build AI startup

Next Steps:
1. Review Week 1 curriculum
2. Set up LangGraph environment
3. Block Monday 2-4pm for first session
4. Join Discord #level-3 channel

Ready to start?
$ python cli.py start-level --level=3
```
