# COMMAND: Start Level

Begin a new mastery level with proper setup, orientation, and first tasks.

## Usage
```bash
/start-level <level-number>
```

## Examples
```bash
/start-level 1    # Begin Foundation Builder
/start-level 3    # Start Agent Conductor
```

## What This Command Does

1. **Validates Prerequisites**
   - Checks if previous level completed (if applicable)
   - Verifies required tools installed
   - Confirms API keys configured

2. **Sets Up Environment**
   - Creates level-specific workspace
   - Installs level dependencies
   - Configures templates and boilerplate

3. **Provides Orientation**
   - Shows level objectives
   - Displays learning path
   - Highlights key projects

4. **Assigns First Tasks**
   - Day 1 specific tasks
   - Quick wins to build momentum
   - Resources to review

## Implementation

```markdown
# Starting Level {N}: {Level Name}

## Prerequisites Check
✅ Python 3.10+ installed
✅ Git configured
✅ API keys set (.env file)
{"✅" if previous_level_complete else "⚠️"} Level {N-1} completed

## Level Overview

**Duration**: {duration} weeks
**Complexity**: {complexity_bar}
**Core Focus**: {focus_areas}

### What You'll Build
- Project 1: {project_name} ({description})
- Project 2: ...
- Capstone: {flagship_project}

### Skills You'll Acquire
- {skill_1}
- {skill_2}
- {skill_3}

### Success Criteria
- [ ] {criterion_1}
- [ ] {criterion_2}
- [ ] {criterion_3}

## Week 1 Preview

```
Mon: {task} (2h)
Tue: {task} (2h)
Wed: {task} (3h) ← Mid-week checkpoint
Thu: {task} (2h)
Fri: {task} (3h)
Weekend: {project} (5h)
```

## Environment Setup

### Install Dependencies
```bash
pip install {level_specific_packages}
```

### Create Workspace
```bash
mkdir -p ~/ai-mastery/level-{N}/{projects,notes,experiments}
cd ~/ai-mastery/level-{N}
```

### Verify Setup
```bash
python verify_setup.py
# Should show: All systems ready! ✅
```

## Your First Tasks (Next 2 Hours)

### Task 1: Orientation (30 min)
- [ ] Read: Level {N} overview
- [ ] Watch: {intro_video_link}
- [ ] Review: Project showcase examples

### Task 2: Environment (30 min)
- [ ] Run setup script
- [ ] Verify installations
- [ ] Test API connection

### Task 3: Quick Win (60 min)
- [ ] Tutorial: {first_tutorial}
- [ ] Build: {simple_first_project}
- [ ] Celebrate: You built something! 🎉

## Resources

**Start Here**:
- 📖 [Level {N} Complete Guide](../levels/{N}-{slug}/README.md)
- 🎥 [Video Walkthrough](link)
- 💻 [Code Templates](../projects/level-{N}/templates/)

**Community**:
- Discord: #{level-slug} channel
- Office Hours: {schedule}
- Study Group: {meeting_link}

## Getting Help

**Stuck on setup?**
- Check: [Troubleshooting Guide](../docs/troubleshooting.md)
- Ask: Discord #help channel
- Escalate: Office hours (Tue/Thu 6-7pm)

**Not ready yet?**
If prerequisites aren't met:
```bash
# Review previous level
/review-level {N-1}

# Or get targeted practice
/practice-skill {specific_skill}
```

## Progress Tracking

Your progress will be tracked automatically:
```bash
# View current progress
/track-progress

# See what's next
/daily-practice

# Review week
/review-week
```

## Motivation Boost

"{inspirational_quote_for_level}"

You're about to {exciting_outcome_preview}.
{N} weeks from now, you'll have {concrete_achievement}.

Let's do this! 🚀

---

**Level Started**: {timestamp}
**Estimated Completion**: {date_estimate}
**Your Goal**: {custom_goal_if_set}
```

## Level-Specific Content

### Level 1: Foundation Builder
```yaml
focus: "API integration, token economics, basic evaluation"
first_project: "Universal LLM client supporting 3 providers"
quick_win: "Make your first successful API call"
dependencies:
  - anthropic
  - openai
  - python-dotenv
motivation: "Every expert was once a beginner. You're taking the first step."
```

### Level 2: Prompt Craftsman
```yaml
focus: "CoT, ToT, complexity routing, structured output"
first_project: "Chain-of-Thought prompt for math problems"
quick_win: "See 20%+ accuracy improvement with CoT"
dependencies:
  - tiktoken
  - jsonschema
motivation: "Words are your only tool. Master them."
```

### Level 3: Agent Conductor
```yaml
focus: "Multi-agent systems, LangGraph, MCP"
first_project: "2-agent research assistant"
quick_win: "Agent completes multi-step task autonomously"
dependencies:
  - langgraph
  - langchain
  - langchain-anthropic
motivation: "One model follows instructions. Many models solve problems."
```

### Level 4: Knowledge Alchemist
```yaml
focus: "RAG, GraphRAG, vector databases, hybrid retrieval"
first_project: "Semantic search over 100 documents"
quick_win: "Build working RAG in 60 minutes"
dependencies:
  - chromadb
  - sentence-transformers
  - langchain
motivation: "Transform raw data into refined intelligence."
```

### Level 5: Reasoning Engineer
```yaml
focus: "Fine-tuning, LoRA, QLoRA, test-time compute"
first_project: "Fine-tune 7B model with QLoRA"
quick_win: "See model adapt to your data"
dependencies:
  - transformers
  - peft
  - bitsandbytes
  - datasets
motivation: "Teach machines to think, not just respond."
```

### Level 6: Systems Orchestrator
```yaml
focus: "Production deployment, LLMOps, monitoring, 99.9% uptime"
first_project: "Multi-model platform with guardrails"
quick_win: "Deploy system with health checks"
dependencies:
  - fastapi
  - redis
  - prometheus-client
  - sentry-sdk
motivation: "Individual brilliance < Systemic excellence."
```

### Level 7: Architect of Intelligence
```yaml
focus: "Meta-learning, categorical thinking, self-improvement"
first_project: "Self-improving meta-prompting system"
quick_win: "System improves its own outputs measurably"
dependencies:
  - networkx
  - sympy
motivation: "Design systems that design systems."
```

## Completion Celebration

When you finish this level:
```bash
/complete-level {N}
```

You'll receive:
- ✅ Level {N} completion badge
- 📊 Progress report & stats
- 🎯 Personalized Level {N+1} curriculum
- 🤝 Mentor matching (if applicable)
- 🏆 Community recognition
