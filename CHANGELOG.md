# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-22

### Added
- Initial public release
- JSONL append-only metric logging
- Multiple metric types (efficiency, clarity, cost, velocity, coverage, frequency)
- HTML dashboard generation with charts and statistics
- Weekly synthesis with trend detection
- CLI commands: log, view, list, synthesize
- API exports: logMetric, getMetrics, generateDashboard, synthesize
- Configurable data directory via EVAL_DATA_DIR environment variable
- Comprehensive test suite (62.39% coverage, 29 tests)
- CI/CD pipeline with Node 18/20/22 support
- MIT License
- Professional README with examples

### Changed
- Made data directory configurable (was hardcoded to `.openclaw/workspace/data`)
- Made proactivity evaluation optional (requires separate @haythos/proactivity-evaluator package)

### Technical
- Zero runtime dependencies (pure Node.js)
- Compatible with Node.js ≥18.0.0
- 29 unit tests covering core API functions
- Coverage will be improved in future releases

[1.0.0]: https://github.com/Haythos/eval-dashboard/releases/tag/v1.0.0
