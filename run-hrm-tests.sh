#!/usr/bin/env bash

# HRM App Automation - Quick Start Script
# This script sets up and runs the HRM login automation tests

set -e

echo "🚀 HRM App Automation Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Run the main automation test
echo "🧪 Running HRM Login Automation Tests..."
echo ""
npx playwright test tests/hrm-login-workflow.spec.ts --headed

echo ""
echo "✓ Tests completed!"
echo ""
echo "📊 View detailed report:"
echo "   npx playwright show-report"
echo ""
echo "🎥 Run in interactive mode:"
echo "   npx playwright test tests/hrm-login-workflow.spec.ts --ui"
echo ""
echo "👀 Run in headed mode to see browser:"
echo "   npx playwright test tests/hrm-login-workflow.spec.ts --headed"
echo ""
