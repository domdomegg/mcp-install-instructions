import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('claude-code', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Via Claude.ai",
		    "markdown": "1. Add the server at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) with the URL: https://example.com/mcp
		2. It will automatically be available in Claude Code when logged in with the same account",
		    "text": "1. Add the server at claude.ai/customize/connectors with the URL: https://example.com/mcp
		2. It will automatically be available in Claude Code when logged in with the same account",
		  },
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		claude mcp add --transport http test https://example.com/mcp
		\`\`\`",
		    "text": "Run:

		claude mcp add --transport http test https://example.com/mcp",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Claude Code config (\`~/.claude.json\` or \`.mcp.json\`):

		\`\`\`json
		"mcpServers": {
		  "test": {
		    "type": "url",
		    "url": "https://example.com/mcp"
		  }
		}
		\`\`\`",
		    "text": "Add to your Claude Code config (~/.claude.json or .mcp.json):

		"mcpServers": {
		  "test": {
		    "type": "url",
		    "url": "https://example.com/mcp"
		  }
		}",
		  },
		]
	`);
});

test('remote SSE', () => {
	expect(generateInstallInstructions('claude-code', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Via Claude.ai",
		    "markdown": "1. Add the server at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) with the URL: https://example.com/sse
		2. It will automatically be available in Claude Code when logged in with the same account",
		    "text": "1. Add the server at claude.ai/customize/connectors with the URL: https://example.com/sse
		2. It will automatically be available in Claude Code when logged in with the same account",
		  },
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		claude mcp add --transport sse test https://example.com/sse
		\`\`\`",
		    "text": "Run:

		claude mcp add --transport sse test https://example.com/sse",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Claude Code config (\`~/.claude.json\` or \`.mcp.json\`):

		\`\`\`json
		"mcpServers": {
		  "test": {
		    "type": "sse",
		    "url": "https://example.com/sse"
		  }
		}
		\`\`\`",
		    "text": "Add to your Claude Code config (~/.claude.json or .mcp.json):

		"mcpServers": {
		  "test": {
		    "type": "sse",
		    "url": "https://example.com/sse"
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('claude-code', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		claude mcp add --env KEY=val test -- npx -y my-server
		\`\`\`",
		    "text": "Run:

		claude mcp add --env KEY=val test -- npx -y my-server",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Claude Code config (\`~/.claude.json\` or \`.mcp.json\`):

		\`\`\`json
		"mcpServers": {
		  "test": {
		    "type": "stdio",
		    "command": "npx",
		    "args": [
		      "-y",
		      "my-server"
		    ],
		    "env": {
		      "KEY": "val"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Claude Code config (~/.claude.json or .mcp.json):

		"mcpServers": {
		  "test": {
		    "type": "stdio",
		    "command": "npx",
		    "args": [
		      "-y",
		      "my-server"
		    ],
		    "env": {
		      "KEY": "val"
		    }
		  }
		}",
		  },
		]
	`);
});
