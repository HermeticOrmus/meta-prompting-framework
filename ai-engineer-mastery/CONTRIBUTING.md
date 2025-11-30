# Contributing to AI Engineer Mastery

Thank you for your interest in contributing! This framework thrives on community input.

## Ways to Contribute

### 1. **Submit Example Projects**
Share your implementations of level projects:
- Create project in `projects/level-N/solutions/your-project-name/`
- Include README with approach, challenges, learnings
- Add tests and documentation
- Submit PR with clear description

### 2. **Create Challenge Problems**
Design advanced problems for learners:
- Add to `projects/level-N/challenges/`
- Include problem spec, test cases, rubric
- Provide hints (not full solutions)
- Indicate difficulty level

### 3. **Improve Documentation**
- Fix typos, clarify explanations
- Add diagrams and visualizations
- Create tutorials and walkthroughs
- Translate content to other languages

### 4. **Build Skills & Agents**
Extend the `.claude/` integration:
- New skills for specific learning tasks
- Agents for specialized guidance
- Commands for workflow automation

### 5. **Share Resources**
Curate learning materials:
- Papers, articles, videos
- Tutorials and courses
- Tools and frameworks
- Add to `resources/` with annotations

### 6. **Report Issues**
Found a bug or have a suggestion?
- Check existing issues first
- Provide clear reproduction steps
- Include environment details
- Suggest potential solutions

### 7. **Improve the CLI**
Enhance the command-line tool:
- Add new commands
- Improve progress tracking
- Better visualizations
- Integration with external tools

## Contribution Guidelines

### Code Style
- Follow PEP 8 for Python code
- Use type hints where applicable
- Add docstrings to functions/classes
- Run `black` and `ruff` before committing

### Documentation
- Use Markdown for all docs
- Include code examples
- Add diagrams for complex concepts
- Keep it beginner-friendly

### Pull Request Process

1. **Fork & Branch**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-engineer-mastery.git
   cd ai-engineer-mastery
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow guidelines above
   - Test your changes
   - Update relevant documentation

3. **Commit**
   ```bash
   git add .
   git commit -m "Clear description of changes"
   ```

4. **Push & PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create PR on GitHub with:
   - Clear title and description
   - What problem does this solve?
   - How was it tested?
   - Screenshots/examples if applicable

5. **Review Process**
   - Maintainers will review within 1 week
   - Address feedback promptly
   - Once approved, will be merged

### Commit Message Format
```
Type: Brief description (50 chars max)

Detailed explanation of what and why.
Include context and motivation.

- Bullet points for specifics
- Reference issues: #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Project Structure

```
ai-engineer-mastery/
├── .claude/              # Claude Code integration
│   ├── skills/          # Reusable learning skills
│   ├── commands/        # Student workflow commands
│   ├── agents/          # AI assistants
│   └── settings/        # Configuration
├── levels/              # 7 mastery levels (content goes here)
├── projects/            # Templates, solutions, challenges
├── assessments/         # Level tests and rubrics
├── resources/           # Learning materials
├── examples/            # Complete working examples
├── docs/                # Documentation
└── cli.py              # Command-line interface
```

## Adding New Levels Content

Each level should have:
```
levels/0N-level-name/
├── README.md            # Overview, objectives, timeline
├── week-by-week.md      # Detailed curriculum
├── projects.md          # Project specifications
├── resources.md         # Curated materials
└── assessment.md        # How to verify mastery
```

## Code of Conduct

### Our Standards
- Be welcoming and respectful
- Assume good intentions
- Provide constructive feedback
- Focus on what's best for learners
- Help others learn and grow

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Plagiarism
- Other unprofessional conduct

### Enforcement
Violations will result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: [CONTACT_EMAIL]

## Recognition

Contributors will be recognized:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Featured in community highlights

## Questions?

- **Discord**: [Join our community](https://discord.gg/...)
- **Discussions**: [GitHub Discussions](https://github.com/...)
- **Email**: [CONTACT_EMAIL]

---

**Thank you for helping others become Pioneer AI Engineers!** 🚀
