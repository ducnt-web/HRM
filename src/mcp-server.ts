import { McpServer } from '../node_modules/@modelcontextprotocol/sdk/dist/cjs/server/mcp.js';
import { StdioServerTransport } from '../node_modules/@modelcontextprotocol/sdk/dist/cjs/server/stdio.js';
import * as z from 'zod';

// A tiny example tool so the server is not completely empty.
const server = new McpServer({
  name: 'playwright-mcp-server',
  version: '1.0.0'
});

server.registerTool(
  'greet',
  {
    title: 'Greeting Tool',
    description: 'Returns a simple hello message',
    inputSchema: z.object({
      name: z.string().default('World')
    })
  },
  async ({ name }: { name: string }) => {
    return {
      content: [{ type: 'text', text: `Hello, ${name}!` }]
    };
  }
);

// Connect the server to stdio transport so it can be spawned by a client.
// the MCP host will launch this process and communicate via stdin/stdout.

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('playwright-mcp-server running on stdio');
}

main().catch(err => {
  console.error('fatal error in MCP server:', err);
  process.exit(1);
});
