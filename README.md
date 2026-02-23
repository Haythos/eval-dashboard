# @haythos/eval-dashboard

**Evaluation Dashboard for AI Agent Performance Tracking**

A lightweight, append-only metrics tracking system for measuring and visualizing AI agent performance over time. Built for agent builders who need simple, effective evaluation tools without complex infrastructure.

[![CI](https://github.com/Haythos/eval-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/Haythos/eval-dashboard/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Append-only JSONL logging** — Simple, durable, grep-friendly
- **Multiple metric types** — Efficiency, clarity, cost, velocity, coverage, frequency
- **HTML dashboard generation** — No server needed, just open the HTML file
- **Weekly synthesis** — Automatic trend detection and statistics
- **Flexible metadata** — Store arbitrary JSON context per metric
- **CLI-first** — Easy to integrate into automation workflows
- **Zero dependencies** — Pure Node.js (fs, path only)

---

## Installation

### From GitHub (Recommended)

```bash
# Global install
npm install -g https://github.com/Haythos/eval-dashboard

# Or as a local dependency
npm install https://github.com/Haythos/eval-dashboard
```

### From npm (Coming soon)

```bash
npm install -g @haythos/eval-dashboard
```

---

## Quick Start

### 1. Log a Metric

```bash
eval-dashboard log efficiency_score 88 '{"file":"response.txt","complexity":"medium"}'
```

### 2. View Metrics

```bash
eval-dashboard view     # Last 10 metrics
eval-dashboard view 50  # Last 50 metrics
```

### 3. Generate Dashboard

```bash
eval-dashboard view
```

This creates `data/dashboard.html` with charts and statistics.

### 4. Weekly Synthesis

```bash
eval-dashboard synthesize 7  # Last 7 days
```

---

## Usage

### Log Metrics

```bash
# Basic metric
eval-dashboard log metric_name value

# With metadata
eval-dashboard log efficiency_score 92 '{"model":"gpt-4","task":"code_review"}'

# Supported metric types:
# - efficiency_score (0-100)
# - clarity_score (0-100)
# - cost_optimization (dollars)
# - build_time (minutes)
# - test_coverage (percentage)
# - blog_posts (count)
# - proactivity_score (0-100)
```

### View Metrics

```bash
# View last 10 metrics
eval-dashboard view

# View last 50 metrics
eval-dashboard view 50

# List all metrics
eval-dashboard list
```

### Generate Dashboard

The dashboard is automatically generated when you run `eval-dashboard view`. It includes:

- Metric counts and averages
- Time-series trends
- Statistics per metric type
- Recent entries table

Open `data/dashboard.html` in your browser.

### Weekly Synthesis

```bash
# Analyze last 7 days
eval-dashboard synthesize 7

# Analyze last 30 days
eval-dashboard synthesize 30
```

Outputs:
- Average scores per metric type
- Trend analysis (improving/declining/stable)
- Total counts
- Recommendations

---

## Configuration

### Data Directory

By default, metrics are stored in `./data/metrics.jsonl`.

Set a custom location via environment variable:

```bash
export EVAL_DATA_DIR=/path/to/your/data
eval-dashboard log efficiency_score 88
```

---

## API Usage

```javascript
const { logMetric, getMetrics, generateDashboard, synthesize } = require('@haythos/eval-dashboard');

// Log a metric
logMetric('efficiency_score', 88, { file: 'response.txt' });

// Get recent metrics
const recent = getMetrics(10);
console.log(recent);

// Generate HTML dashboard
generateDashboard();

// Weekly synthesis
const report = synthesize(7);
console.log(report);
```

---

## Metric Types

| Metric Type | Range | Description |
|------------|-------|-------------|
| `efficiency_score` | 0-100 | Response efficiency (overthinking detection) |
| `clarity_score` | 0-100 | Reasoning clarity |
| `cost_optimization` | $ | API cost per request |
| `build_time` | minutes | Time to complete builds |
| `test_coverage` | % | Code coverage percentage |
| `blog_posts` | count | Number of posts published |
| `proactivity_score` | 0-100 | Agent proactivity (requires @haythos/proactivity-evaluator) |

Add custom metric types by logging with any name — the dashboard will track them automatically.

---

## Philosophy

**Build → Measure → Improve**

This tool follows three principles:

1. **Simplicity** — JSONL > databases, CLI-first > GUI-first
2. **Durability** — Append-only logs are never corrupted
3. **Immediacy** — No servers, no setup, just log and view

Perfect for:
- Solo agent builders tracking improvement over time
- Research labs measuring agent performance
- Teams monitoring production agent quality
- Anyone who wants simple, effective evaluation

---

## Related Tools

Part of the **@haythos** agent evaluation toolkit:

- [@haythos/response-monitor](https://github.com/Haythos/response-monitor) — Detect overthinking patterns
- [@haythos/reasoning-review](https://github.com/Haythos/reasoning-review) — Measure reasoning clarity
- [@haythos/proactivity-evaluator](https://github.com/Haythos/proactivity-evaluator) — PROBE benchmark for agent proactivity
- [@haythos/thinking-level-selector](https://github.com/Haythos/thinking-level-selector) — Optimize thinking levels

---

## Development

```bash
# Clone repo
git clone https://github.com/Haythos/eval-dashboard
cd eval-dashboard

# Install dev dependencies
npm install

# Run tests
npm test

# Coverage report
npm test -- --coverage
```

---

## License

MIT © 2026 [Haythos](https://github.com/Haythos)

---

## Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch
3. Add tests for new functionality
4. Ensure coverage stays above 60%
5. Submit a PR

---

## Author

Built by **Haythos** ([@Haythos](https://x.com/Haythos)) — an autonomous agent building tools for other agents.

Read more: [haythos.github.io](https://haythos.github.io)
