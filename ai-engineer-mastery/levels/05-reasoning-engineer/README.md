# Level 5: Reasoning Engineer 🧮

> *"Teach machines to think, not just respond"*

## Overview

**Duration**: 5-6 weeks
**Time Commitment**: 20-25 hours/week
**Complexity**: ▓▓▓▓▓░░
**Prerequisites**: Level 4 complete

### What You'll Build
- ✅ 7B model fine-tuned with QLoRA (single GPU!)
- ✅ Test-time compute scaling system (o1-style)
- ✅ DPO preference alignment
- ✅ Reasoning benchmark suite (MATH, AIME)

---

## Core Skills

| Skill | Description | Mastery Indicator |
|-------|-------------|-------------------|
| **Test-Time Compute** | o1-style reasoning at inference | Implement reasoning loops |
| **Fine-Tuning Mastery** | LoRA, QLoRA, DoRA | 65B model on single GPU |
| **DPO/RLHF** | Direct preference optimization | Align to preferences |
| **Constitutional AI** | AI feedback with principles | Scalable alignment |
| **Speculative Decoding** | 3x inference speedup | Production optimization |
| **Reasoning Benchmarks** | MATH, AIME, Codeforces | Quantified ability |

---

## Learning Path

### Week 1-2: Fine-Tuning Fundamentals
**Focus**: LoRA and QLoRA

**Key Concepts**:
- Parameter-Efficient Fine-Tuning (PEFT)
- Low-Rank Adaptation (LoRA)
- 4-bit Quantization (QLoRA)
- Training on single GPU

**The LoRA Breakthrough**:
```
Traditional: Fine-tune 7B parameters = 28GB GPU memory
LoRA:        Fine-tune 4.7M parameters = 8GB GPU memory

Result: 95% of full fine-tuning performance, 0.07% of parameters!
```

**Project**: Fine-tune Llama-2-7B on custom dataset

### Week 3: Test-Time Compute Scaling
**Focus**: o1-style reasoning

**Two Dimensions**:
```
SEQUENTIAL (depth):
  Question → Step 1 → Step 2 → ... → Step N → Answer
  (Longer chain = better reasoning)

PARALLEL (breadth):
  Question → Solution 1 ┐
         → Solution 2 ├→ Vote/Verify → Best Answer
         → Solution 3 ┘
  (More attempts = higher success rate)
```

**Project**: Reasoning enhancement system

### Week 4: Preference Alignment
**Focus**: DPO and RLHF

**Evolution**:
```
RLHF (2022):     Human preference → Reward model → RL → Aligned model
                 Cost: $1-10 per sample

RLAIF (2023):    AI preference → Reward model → RL → Aligned model
                 Cost: <$0.01 per sample

DPO (2024):      Preference pairs → Direct optimization (no RL)
                 Cost: Minimal, simpler
```

**Project**: Align model with DPO

### Week 5-6: Advanced Optimization
**Focus**: Production-ready reasoning models

**Topics**:
- Speculative decoding (3x speedup)
- Distillation (compress reasoning)
- Benchmark evaluation
- Cost optimization

**Project**: Production reasoning system

---

## Major Projects

### Project 1: QLoRA Fine-Tuning
**Objective**: Fine-tune 7B model on single GPU

**Dataset**: Math reasoning (GSM8K or MATH)

**Implementation**:
```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from transformers import BitsAndBytesConfig

# 4-bit quantization config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

# Load base model in 4-bit
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
)

# LoRA config
lora_config = LoraConfig(
    r=16,  # Rank
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Get PEFT model
model = prepare_model_for_kbit_training(model)
model = get_peft_model(model, lora_config)

# Train!
# Only 4.7M trainable parameters vs 7B total
```

**Results**:
- GPU Memory: ~8GB (fits on consumer GPU!)
- Training Time: ~4 hours on GSM8K
- Performance: Matches full fine-tuning within 5%

### Project 2: Test-Time Compute Scaling
**Objective**: Implement o1-style reasoning

**Architecture**:
```
Question: "Solve this complex math problem..."
    ↓
┌──────────────────────────────────────────┐
│   SEQUENTIAL REASONING                   │
│ ┌──────────────────────────────────────┐ │
│ │ Step 1: Understand the problem       │ │
│ │ "We need to find x where..."         │ │
│ └────────────┬─────────────────────────┘ │
│              ↓                            │
│ ┌────────────────────────────────────┐   │
│ │ Step 2: Break down approach         │   │
│ │ "First, let's isolate..."           │   │
│ └────────────┬───────────────────────┘   │
│              ↓                            │
│ ┌────────────────────────────────────┐   │
│ │ Step N: Final calculation           │   │
│ │ "Therefore x = 42"                  │   │
│ └────────────┬───────────────────────┘   │
└──────────────┼──────────────────────────┘
               ↓
           VERIFY
               ↓
         Final Answer
```

**With Parallel Scaling**:
```python
def solve_with_test_time_compute(
    problem: str,
    sequential_steps: int = 10,
    parallel_attempts: int = 5
) -> str:
    """
    o1-style reasoning with both dimensions
    """

    # Parallel: Generate multiple solution paths
    solutions = []
    for _ in range(parallel_attempts):
        # Sequential: Longer reasoning chain
        solution = reason_step_by_step(
            problem,
            max_steps=sequential_steps
        )
        solutions.append(solution)

    # Verify and select best
    best_solution = verify_and_select(solutions, problem)

    return best_solution
```

**Benchmarks**:
- MATH-500: 65% → 85% with test-time scaling
- AIME: 25% → 55%
- Cost: 5x tokens, but 2x final accuracy

### Project 3: DPO Alignment
**Objective**: Align model to preferences

**Process**:
```
1. Generate pairs:
   Question + Answer A (chosen) + Answer B (rejected)

2. Train with DPO:
   Maximize: log σ(β * log(π_θ(A|Q) / π_ref(A|Q))
                 - β * log(π_θ(B|Q) / π_ref(B|Q)))

   Translation: Prefer chosen answers, avoid rejected ones

3. Result: Aligned model, no RL needed!
```

---

## Key Techniques

### LoRA (Low-Rank Adaptation)
**Idea**: Model changes are low-rank

```
Traditional: Update W (huge matrix)
LoRA:        W_new = W + AB  (A and B are small)

Example:
- W: 4096 × 4096 = 16.7M parameters
- A: 4096 × 16 = 65K parameters
- B: 16 × 4096 = 65K parameters
- Total trainable: 130K (0.8% of original!)
```

### QLoRA Innovations
1. **NF4 (4-bit NormalFloat)**: Optimal quantization
2. **Double Quantization**: Quantize quantization constants
3. **Paged Optimizers**: Handle GPU memory spikes

**Result**: 65B parameters on 48GB GPU!

### Speculative Decoding
**Idea**: Draft with small model, verify with large model

```
Draft Model (fast): Generate 5 tokens
    "The capital of France is Paris"

Target Model (accurate): Verify in parallel
    ✓✓✓✓✓ (all accepted)

Speedup: ~3x (5 tokens in 1 forward pass)
Output: Identical to standard decoding
```

---

## Reasoning Benchmarks

### MATH
- 12,500 problems
- Competition math
- Requires multi-step reasoning

**Scores**:
- GPT-4: 52%
- DeepSeek-R1: 97.3%
- Your goal: 70%+ with fine-tuning

### AIME (American Invitational Mathematics Examination)
- 30 problems
- Very challenging
- Top 5% of high school students

**Scores**:
- GPT-4: 13.4%
- o1-preview: 83.3%
- DeepSeek-R1: 79.8%

### Codeforces
- Competitive programming
- Elo rating system

**Ratings**:
- GPT-4: ~800 Elo
- DeepSeek-R1: 2,029 Elo (top 4%)

---

## Resources

### Essential Papers
1. **LoRA** (Hu et al., 2021)
2. **QLoRA** (Dettmers et al., 2023)
3. **DPO** (Rafailov et al., 2023)
4. **DeepSeek-R1** (January 2025)
5. **o1 Technical Report** (OpenAI, 2024)

### Tools & Libraries
- **PEFT**: Hugging Face parameter-efficient fine-tuning
- **TRL**: Transformer Reinforcement Learning
- **bitsandbytes**: Quantization
- **vLLM**: Fast inference
- **axolotl**: Training recipes

### Datasets
- **GSM8K**: Grade school math
- **MATH**: Competition math
- **Codeforces**: Programming problems
- **Anthropic HH-RLHF**: Human preferences

---

## Assessment

### Project Evaluation

**Fine-Tuning**:
- [ ] Model fine-tuned successfully (25%)
- [ ] Validation loss improved (20%)
- [ ] Benchmark performance ≥baseline (25%)
- [ ] Efficient (fits on 1 GPU) (15%)
- [ ] Documented process (15%)

**Test-Time Compute**:
- [ ] Sequential reasoning implemented (30%)
- [ ] Parallel attempts implemented (20%)
- [ ] Verification strategy (20%)
- [ ] Measurable improvement (20%)
- [ ] Cost analysis (10%)

### Diagnostic Test
**[Level 5 Assessment →](../../assessments/diagnostics/level-5-diagnostic.md)**

**Tasks**:
- Design fine-tuning strategy (30 min)
- Implement LoRA training loop (40 min)
- Optimize for inference (20 min)

---

## Common Pitfalls

### "Out of memory during training"
**Fix**:
- Use QLoRA (4-bit quantization)
- Reduce batch size
- Gradient checkpointing
- Use LoRA rank=8 instead of 16

### "Fine-tuned model worse than base"
**Fix**:
- Check data quality
- Reduce learning rate
- Longer training (more epochs)
- Validate on held-out set

### "Inference is too slow"
**Fix**:
- Speculative decoding
- Quantization (GPTQ, AWQ)
- vLLM for serving
- Smaller model + distillation

---

## Next Steps

### When Ready for Level 6:
```bash
python cli.py assess-level --level=5
python cli.py start-level 6
```

### Preview of Level 6: Systems Orchestrator
- Production deployment
- LLMOps and monitoring
- Guardrails and safety
- 99.9% uptime
- Multi-model routing
- Project: Production AI platform

---

**Start Level 5** → [Week-by-Week Guide](./week-by-week.md) *(Coming Soon)*

*Level 5 v1.0 | QLoRA enables 65B models on consumer GPUs*
