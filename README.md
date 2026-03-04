# Playwright Testing Project

This project is set up to use the Playwright Test framework for end-to-end testing of web applications.

## Project Structure

```
playwright-project
├── tests
│   ├── example.spec.ts       # Sample test case using Playwright Test framework
│   └── fixtures
│       └── index.ts          # Custom fixtures for tests
├── playwright.config.ts       # Configuration for Playwright
├── package.json               # npm configuration and dependencies
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd playwright-project
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the tests**:
   ```
   npx playwright test
   ```

## Usage Examples

- To create a new test, add a new `.spec.ts` file in the `tests` directory.
- Use the fixtures defined in `tests/fixtures/index.ts` to set up reusable test logic.

## Additional Information

For more details on how to use Playwright, refer to the [Playwright documentation](https://playwright.dev/docs/intro).

---

## Model Context Protocol (MCP) Server

A simple MCP server has been added in `src/mcp-server.ts`. It uses the official
`@modelcontextprotocol/sdk` package and exposes one dummy `greet` tool. The
server communicates over stdio, making it easy to spawn from an MCP client.

### Getting started

1. Install the new packages:
   ```bash
   npm install
   ```
2. Run the server directly (development with ts-node):
   ```bash
   npm run mcp
   ```

You can also build the TypeScript sources to `dist/` with `npm run build:mcp` and
then run `node dist/mcp-server.js`.

VS Code is configured for debugging the server using the name `playwright-mcp`
via `.vscode/mcp.json`.
