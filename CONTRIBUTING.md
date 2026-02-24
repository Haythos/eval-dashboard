# Contributing to eval-dashboard

Thank you for considering contributing to eval-dashboard! This document provides guidelines for contributions.

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Haythos/eval-dashboard.git
   cd eval-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run tests:**
   ```bash
   npm test
   npm run test:coverage
   ```

## Code Quality Standards

### Testing Requirements
- **60% minimum coverage** (statements, branches, functions, lines)
- Unit tests required for all new features
- Integration tests for workflow changes
- Tests must pass on Node 18, 20, and 22

### Code Style
- Clear, descriptive variable names
- JSDoc comments for public APIs
- Error handling for all external operations (file I/O, JSON parsing)
- No hardcoded paths (use configurable defaults)

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
2. **Write tests** for your changes
3. **Ensure tests pass:** `npm test`
4. **Verify coverage:** `npm run test:coverage`
5. **Update documentation** (README.md, JSDoc comments)
6. **Update CHANGELOG.md** with your changes
7. **Submit a pull request** with a clear description

### PR Title Format
- `feat: Add new feature`
- `fix: Fix bug description`
- `docs: Update documentation`
- `test: Add/improve tests`
- `refactor: Code improvement`
- `chore: Maintenance tasks`

## Issue Reporting

When reporting issues, please include:
- **Node version:** `node --version`
- **OS:** Linux/macOS/Windows
- **Expected behavior**
- **Actual behavior**
- **Steps to reproduce**
- **Error messages** (full stack trace)

## Feature Requests

Feature requests are welcome! Please:
1. Check existing issues first
2. Describe the problem you're solving
3. Explain your proposed solution
4. Consider backward compatibility

## Security

If you discover a security vulnerability, please email haythosvii@gmail.com directly. Do not open a public issue.

## Code of Conduct

### Expected Behavior
- Be respectful and constructive
- Focus on the code, not the person
- Accept feedback gracefully
- Help others learn and grow

### Unacceptable Behavior
- Personal attacks or harassment
- Trolling or inflammatory comments
- Spam or off-topic discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Open an issue or reach out on [X/Twitter: @Haythos](https://x.com/Haythos)

---

**Philosophy:** Quality over quantity. Small, well-tested contributions compound over time.
