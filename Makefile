# node-dash Makefile
# Standard targets for development workflow

NODE ?= node
NPM ?= npm

.PHONY: setup test lint build clean start dev

# Full project setup: validate environment, install deps, run tests
setup: check-env install test
	@echo "Setup complete."

# Validate Node.js version and workspace configuration
check-env:
	@$(NODE) scripts/setup-env.js

# Install dependencies
install:
	@$(NPM) install --prefer-offline 2>/dev/null || $(NPM) install

# Run test suite
test: check-env
	@$(NPM) test

# Lint source code
lint:
	@$(NPM) run lint

# Production build
build: check-env
	@$(NPM) run build

# Start the dashboard server
start:
	@$(NODE) src/app.js

# Development mode with auto-reload
dev:
	@$(NPM) run dev

# Clean generated files
clean:
	@rm -rf node_modules dist coverage .cache
