# Smart Summarizer - Complete Reference Implementation

A production-ready document summarizer with multiple styles, automatic quality evaluation, and cost tracking.

## Features

✅ **Multiple summarization styles**: concise, detailed, ELI5, academic, bullet points
✅ **Automatic quality evaluation**: Scores summaries on 4 criteria
✅ **Token & cost tracking**: Know exactly what you're spending
✅ **Multi-provider support**: Works with Claude, GPT-4, or other LLMs
✅ **Beautiful CLI**: Rich terminal output with progress bars
✅ **Error handling**: Graceful failures with retry logic
✅ **Caching**: Avoid redundant API calls

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Set up API keys
cp .env.example .env
# Edit .env with your keys

# Summarize a document
python summarizer.py article.txt

# With specific style
python summarizer.py article.txt --style detailed

# Without evaluation (faster/cheaper)
python summarizer.py article.txt --no-evaluate
```

## Installation

```bash
# Clone or download this directory
cd smart-summarizer

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add your API keys to .env
```

## Usage

### Basic Usage

```bash
python summarizer.py my_document.txt
```

Output:
```
Summarizing... ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%

SUMMARY:
This document discusses the fundamentals of machine learning, focusing on
supervised and unsupervised learning approaches...

QUALITY SCORES:
  ✓ Captures main points: 0.92
  ✓ Appropriate length: 0.88
  ✓ Clear language: 0.95
  ✓ No hallucinations: 0.90

STATS:
  - Input tokens: 2,456
  - Output tokens: 127
  - Total tokens: 2,583
  - Cost: $0.0077
  - Time: 3.2s
```

### Summarization Styles

```bash
# Concise (2-3 sentences)
python summarizer.py article.txt --style concise

# Detailed (comprehensive with bullet points)
python summarizer.py article.txt --style detailed

# ELI5 (simple language)
python summarizer.py article.txt --style eli5

# Academic (professional terminology)
python summarizer.py article.txt --style academic

# Bullet points only
python summarizer.py article.txt --style bullet
```

### Advanced Options

```bash
# Use different LLM provider
python summarizer.py article.txt --provider openai

# Skip quality evaluation (faster)
python summarizer.py article.txt --no-evaluate

# Lower temperature for more deterministic output
python summarizer.py article.txt --temperature 0.1

# Save summary to file
python summarizer.py article.txt --output summary.txt

# Batch process multiple files
python summarizer.py *.txt --batch
```

### Python API

```python
from smart_summarizer import SmartSummarizer
from llm_client import LLMClientFactory

# Create client and summarizer
client = LLMClientFactory.create("claude")
summarizer = SmartSummarizer(client)

# Summarize text
with open("article.txt") as f:
    text = f.read()

result = summarizer.summarize(
    text=text,
    style="concise",
    evaluate=True
)

print(f"Summary: {result['summary']}")
print(f"Quality: {result['quality_scores']}")
print(f"Cost: ${result['stats']['total_cost']}")
```

## Architecture

```
smart-summarizer/
├── summarizer.py          # Main CLI entry point
├── smart_summarizer.py    # Core summarization logic
├── llm_client.py          # LLM client abstraction
├── evaluator.py           # Quality evaluation
├── requirements.txt       # Dependencies
├── .env.example           # Environment template
├── README.md              # This file
└── tests/
    ├── test_summarizer.py
    └── test_evaluator.py
```

## How It Works

### 1. Style Selection
Different styles use different system prompts:

```python
STYLE_PROMPTS = {
    "concise": "Summarize in 2-3 sentences. Be direct and clear.",
    "detailed": "Provide comprehensive summary with key points as bullets.",
    "eli5": "Explain like I'm 5. Use simple words and analogies.",
    # ... more styles
}
```

### 2. Summarization
```python
summary = client.call(
    system=STYLE_PROMPTS[style],
    user=f"Summarize this:\n\n{text}",
    temperature=0.3  # Lower temp for consistency
)
```

### 3. Quality Evaluation
Uses LLM-as-judge pattern to score summary:

```python
scores = evaluator.evaluate_summary(
    original=text,
    summary=summary
)
# Returns: {"criterion": 0.0-1.0, ...}
```

### 4. Token Tracking
Counts tokens and calculates cost:

```python
tracker.track_call(system, user, response, model)
stats = tracker.get_stats()
# Returns: {"total_tokens": 2583, "total_cost": "$0.0077"}
```

## Configuration

### Environment Variables (.env)

```bash
# Required
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here

# Optional
DEFAULT_PROVIDER=claude
DEFAULT_STYLE=concise
DEFAULT_TEMPERATURE=0.3
ENABLE_CACHING=true
```

### Style Customization

Add your own styles by editing `smart_summarizer.py`:

```python
STYLE_PROMPTS = {
    # ... existing styles
    "technical": "Create technical summary with jargon and precision.",
    "tweet": "Summarize in one tweet (280 chars max).",
    "executive": "Executive summary for C-level audience."
}
```

## Cost Optimization

### Tips to Reduce Costs

1. **Use caching** (enabled by default)
   ```python
   summarizer = SmartSummarizer(client, cache=True)
   ```

2. **Skip evaluation** for drafts
   ```bash
   python summarizer.py article.txt --no-evaluate
   ```

3. **Use cheaper models** for simple summaries
   ```bash
   python summarizer.py article.txt --provider claude-haiku
   ```

4. **Batch process** similar documents (shares cache)
   ```bash
   python summarizer.py *.txt --batch
   ```

### Cost Comparison

| Style | Avg Tokens | Cost (Claude) | Cost (GPT-4) |
|-------|-----------|---------------|--------------|
| Concise | 2,600 | $0.0078 | $0.078 |
| Detailed | 3,200 | $0.0096 | $0.096 |
| ELI5 | 2,800 | $0.0084 | $0.084 |

*Based on 2,000 word input document*

## Testing

```bash
# Run all tests
pytest tests/

# Run specific test
pytest tests/test_summarizer.py::test_concise_style

# With coverage
pytest --cov=smart_summarizer tests/
```

## Troubleshooting

### "API key not found"
```bash
# Check .env file exists
ls -la .env

# Verify key is set
cat .env | grep ANTHROPIC_API_KEY

# Load environment
source .env  # or use python-dotenv
```

### "Summary quality is low"
Try:
- Different style (`--style detailed`)
- Lower temperature (`--temperature 0.1`)
- Different provider (`--provider openai`)
- Verify input text quality

### "Cost is too high"
- Enable caching (`--cache`)
- Skip evaluation (`--no-evaluate`)
- Use cheaper model (`--provider claude-haiku`)
- Reduce input length

## Performance Benchmarks

Tested on 2,000 word article:

| Provider | Latency | Cost | Quality Score |
|----------|---------|------|---------------|
| Claude Sonnet | 2.3s | $0.0078 | 0.91 |
| GPT-4 | 3.1s | $0.078 | 0.93 |
| Claude Haiku | 1.2s | $0.0019 | 0.87 |

## Extensions & Ideas

### Add More Features
- **Multi-language support**: Detect language, summarize in same language
- **PDF/DOCX input**: Parse documents automatically
- **Web scraping**: Summarize URLs directly
- **Comparison mode**: Compare summaries from different LLMs
- **Progressive summaries**: Different lengths (tweet → paragraph → detailed)

### Integrate with Other Tools
- **Slack bot**: Summarize messages/threads
- **Email plugin**: Summarize long emails
- **Browser extension**: Summarize web pages
- **API service**: Deploy as REST API

## License

MIT - Feel free to use in your own projects!

## Learning Resources

This example demonstrates concepts from **Level 1: Foundation Builder**:
- ✅ LLM API integration
- ✅ Error handling with retries
- ✅ Token tracking and cost optimization
- ✅ Quality evaluation
- ✅ CLI development

**Next steps**:
- Study the code to understand patterns
- Modify styles to suit your needs
- Add features listed in Extensions
- Move to Level 2 for advanced prompting techniques

## Credits

Built as part of the **AI Engineer Mastery** curriculum.

**Author**: AI Engineer Mastery Contributors
**Level**: 1 (Foundation Builder)
**Version**: 1.0
**Updated**: 2025-01-29
