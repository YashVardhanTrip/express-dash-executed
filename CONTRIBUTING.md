# Contributing to node-dash

Thank you for your interest in contributing! Here are some guidelines.

## Setup

1. Fork and clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and adjust settings
4. Run `npm run dev` to start in development mode

## Code Style

- We use ESLint for linting. Run `npm run lint` before submitting.
- Prefer `const` over `let`. Avoid `var`.
- Use async/await over callbacks where possible.

## Testing

- Write tests for new features in `test/unit/`
- Integration tests go in `test/integration/`
- Run `npm test` to execute the full suite

## Pull Requests

- Create a feature branch from `main`
- Keep commits focused and well-described
- Ensure tests pass and coverage doesn't drop
- Update documentation if you change the API

## Reporting Issues

Please include:
- Node.js version
- OS information
- Steps to reproduce
- Expected vs actual behavior
