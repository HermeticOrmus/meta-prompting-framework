# Contributing to Meta-Prompting Framework

Thank you for your interest in contributing! This framework is built on the principle that AI outputs can be systematically improved through recursive refinement.

---

## Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

---

## How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Use the bug report template
3. Include:
   - Clear description of the issue
   - Steps to reproduce
   - Expected vs actual behavior
   - Python version and environment details

### Suggesting Features

1. Check existing feature requests
2. Use the feature request template
3. Explain:
   - The problem it solves
   - Your proposed solution
   - How it fits the meta-prompting paradigm

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `python3 tests/validate_implementation.py`
5. Commit with clear messages
6. Push and open a Pull Request

---

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/meta-prompting-framework.git
cd meta-prompting-framework

# Install dependencies
pip install -r requirements.txt

# Set up API key (for integration tests)
cp .env.example .env
# Edit .env with your ANTHROPIC_API_KEY

# Run tests
python3 tests/validate_implementation.py
```

---

## Code Standards

- Follow PEP 8 style guidelines
- Write docstrings for all public functions
- Include type hints where appropriate
- Write tests for new functionality
- Keep the meta-prompting loop pure and composable

---

## Architecture Guidelines

When contributing to the core engine:

1. **Complexity Analyzer**: Must return scores between 0.0-1.0
2. **Context Extractor**: Should extract structured patterns
3. **Meta-Prompting Engine**: Keep the recursive loop simple
4. **LLM Clients**: Implement the `BaseLLMClient` interface

---

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add OpenAI client implementation
fix: Resolve context extraction edge case
docs: Update API reference
refactor: Simplify complexity scoring
test: Add integration tests for Claude client
```

---

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Request review from maintainers
5. Address feedback promptly

---

## Questions?

Open a discussion or issue if you need help.

---

**Thank you for contributing to better AI outputs!**
