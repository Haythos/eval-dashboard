#!/usr/bin/env node

/**
 * Evaluation Dashboard v1.0.0
 * Build 010 - 2026-02-21
 * 
 * Unified tool performance tracking system.
 * Tracks: efficiency, clarity, cost, velocity, coverage, blog frequency
 * Output: metrics.jsonl + HTML dashboard + weekly synthesis
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.EVAL_DATA_DIR || path.join(process.cwd(), 'data');
const METRICS_FILE = path.join(DATA_DIR, 'metrics.jsonl');
const DASHBOARD_FILE = path.join(DATA_DIR, 'dashboard.html');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ============================================================================
// Metric Logging
// ============================================================================

function logMetric(type, value, metadata = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    type,
    value,
    ...metadata
  };
  
  fs.appendFileSync(METRICS_FILE, JSON.stringify(entry) + '\n');
  console.log(`✓ Logged: ${type} = ${value}`);
}

// ============================================================================
// Metric Retrieval
// ============================================================================

function getMetrics(type = null, limit = null) {
  if (!fs.existsSync(METRICS_FILE)) {
    return [];
  }
  
  const lines = fs.readFileSync(METRICS_FILE, 'utf8')
    .split('\n')
    .filter(line => line.trim());
  
  let metrics = lines.map(line => JSON.parse(line));
  
  if (type) {
    metrics = metrics.filter(m => m.type === type);
  }
  
  if (limit) {
    metrics = metrics.slice(-limit);
  }
  
  return metrics;
}

// ============================================================================
// Statistics
// ============================================================================

function calculateStats(metrics) {
  if (metrics.length === 0) return null;
  
  const values = metrics.map(m => m.value);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;
  
  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  return { mean, median, min, max, count: values.length };
}

// ============================================================================
// Dashboard Generation
// ============================================================================

function generateDashboard() {
  const allMetrics = getMetrics();
  
  if (allMetrics.length === 0) {
    console.log('No metrics logged yet. Use: eval-dashboard log <type> <value>');
    return;
  }
  
  // Group by type
  const byType = {};
  allMetrics.forEach(m => {
    if (!byType[m.type]) byType[m.type] = [];
    byType[m.type].push(m);
  });
  
  // Calculate stats for each type
  const stats = {};
  Object.keys(byType).forEach(type => {
    stats[type] = calculateStats(byType[type]);
  });
  
  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Haythos Evaluation Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            padding: 2rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        header {
            border-bottom: 1px solid #2a2a2a;
            padding-bottom: 2rem;
            margin-bottom: 3rem;
        }
        h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .tagline { color: #888; font-size: 1.1rem; }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        .stat-card {
            background: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 8px;
            padding: 1.5rem;
        }
        .stat-card h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #00d4ff;
        }
        .stat-row {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #2a2a2a;
        }
        .stat-row:last-child { border-bottom: none; }
        .stat-label { color: #888; }
        .stat-value { font-weight: 600; color: #e0e0e0; }
        .recent {
            background: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 8px;
            padding: 1.5rem;
        }
        .recent h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #00d4ff;
        }
        .metric-entry {
            padding: 0.75rem 0;
            border-bottom: 1px solid #2a2a2a;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .metric-entry:last-child { border-bottom: none; }
        .metric-type {
            font-weight: 600;
            color: #00d4ff;
        }
        .metric-value {
            font-size: 1.5rem;
            font-weight: 700;
        }
        .metric-time {
            font-size: 0.85rem;
            color: #888;
        }
        footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #2a2a2a;
            text-align: center;
            color: #888;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>⚡ Evaluation Dashboard</h1>
            <p class="tagline">Performance tracking and metrics synthesis</p>
        </header>

        <div class="stats-grid">
${Object.keys(stats).map(type => `
            <div class="stat-card">
                <h2>${formatTypeName(type)}</h2>
                <div class="stat-row">
                    <span class="stat-label">Mean</span>
                    <span class="stat-value">${stats[type].mean.toFixed(2)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Median</span>
                    <span class="stat-value">${stats[type].median.toFixed(2)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Min / Max</span>
                    <span class="stat-value">${stats[type].min.toFixed(2)} / ${stats[type].max.toFixed(2)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Count</span>
                    <span class="stat-value">${stats[type].count}</span>
                </div>
            </div>
`).join('')}
        </div>

        <div class="recent">
            <h2>Recent Metrics (Last 20)</h2>
${allMetrics.slice(-20).reverse().map(m => `
            <div class="metric-entry">
                <div>
                    <div class="metric-type">${formatTypeName(m.type)}</div>
                    <div class="metric-time">${new Date(m.timestamp).toLocaleString()}</div>
                </div>
                <div class="metric-value">${m.value}</div>
            </div>
`).join('')}
        </div>

        <footer>
            <p>⚡ Haythos Evaluation Dashboard • Build 010 • Generated ${new Date().toLocaleString()}</p>
        </footer>
    </div>
</body>
</html>`;
  
  fs.writeFileSync(DASHBOARD_FILE, html);
  console.log(`✓ Dashboard generated: ${DASHBOARD_FILE}`);
}

function formatTypeName(type) {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================================================
// Weekly Synthesis
// ============================================================================

function synthesize(days = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const recent = getMetrics()
    .filter(m => new Date(m.timestamp) > cutoff);
  
  if (recent.length === 0) {
    console.log(`No metrics in last ${days} days.`);
    return;
  }
  
  // Group by type
  const byType = {};
  recent.forEach(m => {
    if (!byType[m.type]) byType[m.type] = [];
    byType[m.type].push(m);
  });
  
  console.log(`\n=== ${days}-Day Synthesis ===\n`);
  console.log(`Period: ${cutoff.toLocaleDateString()} - ${new Date().toLocaleDateString()}`);
  console.log(`Total metrics: ${recent.length}\n`);
  
  Object.keys(byType).forEach(type => {
    const metrics = byType[type];
    const stats = calculateStats(metrics);
    
    console.log(`${formatTypeName(type)}:`);
    console.log(`  Count: ${stats.count}`);
    console.log(`  Mean: ${stats.mean.toFixed(2)}`);
    console.log(`  Median: ${stats.median.toFixed(2)}`);
    console.log(`  Range: ${stats.min.toFixed(2)} - ${stats.max.toFixed(2)}`);
    console.log('');
  });
}

// ============================================================================
// CLI
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    console.log(`
Haythos Evaluation Dashboard v1.0.0

Usage:
  eval-dashboard log <type> <value> [metadata-json]
    Log a metric event
    
  eval-dashboard view
    Generate HTML dashboard
    
  eval-dashboard list [type] [limit]
    List metrics (optionally filtered)
    
  eval-dashboard synthesize [days]
    Generate synthesis report (default: 7 days)
    
Examples:
  eval-dashboard log efficiency_score 85
  eval-dashboard log clarity_score 92 '{"file":"response.txt"}'
  eval-dashboard log build_time 120 '{"build":"010"}'
  eval-dashboard view
  eval-dashboard synthesize 7
  
Metric Types:
  - efficiency_score (response monitor)
  - clarity_score (reasoning review)
  - cost_optimization (model router)
  - build_time (minutes)
  - test_coverage (%)
  - blog_posts (count)
    `);
    return;
  }
  
  switch (command) {
    case 'log': {
      const type = args[1];
      const value = parseFloat(args[2]);
      const metadata = args[3] ? JSON.parse(args[3]) : {};
      
      if (!type || isNaN(value)) {
        console.error('Usage: eval-dashboard log <type> <value> [metadata-json]');
        process.exit(1);
      }
      
      logMetric(type, value, metadata);
      break;
    }
    
    case 'view': {
      generateDashboard();
      break;
    }
    
    case 'list': {
      const type = args[1] || null;
      const limit = args[2] ? parseInt(args[2]) : null;
      const metrics = getMetrics(type, limit);
      
      if (metrics.length === 0) {
        console.log('No metrics found.');
      } else {
        metrics.forEach(m => {
          console.log(`${new Date(m.timestamp).toISOString()} | ${m.type} = ${m.value}`);
        });
      }
      break;
    }
    
    case 'synthesize': {
      const days = args[1] ? parseInt(args[1]) : 7;
      synthesize(days);
      break;
    }
    
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Run "eval-dashboard help" for usage.');
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

// ============================================================================
// Proactivity Evaluation
// ============================================================================

async function evaluateProactivity(workspace = null) {
  try {
    const { ProactivityEvaluator } = require('@haythos/proactivity-evaluator');
    
    workspace = workspace || process.cwd();
    const evaluator = new ProactivityEvaluator(workspace);
    const report = await evaluator.generateReport();
    
    // Log proactivity score
    logMetric('proactivity', report.score.proactivityScore, {
      totalIssues: report.score.totalIssues,
      actionableIssues: report.score.actionableIssues,
      criticalIssues: report.score.criticalIssues
    });
    
    return report;
  } catch (error) {
    console.warn('proactivity-evaluator not installed. Skipping proactivity evaluation.');
    return null;
  }
}

module.exports = { logMetric, getMetrics, generateDashboard, synthesize, evaluateProactivity };
