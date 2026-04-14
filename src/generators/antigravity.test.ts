import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('antigravity', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Follow [Antigravity's docs](https://antigravity.google/docs/mcp) to install a custom MCP server, and add:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "serverUrl": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Follow Antigravity's docs (antigravity.google/docs/mcp) to install a custom MCP server, and add:

		{
		  "mcpServers": {
		    "test": {
		      "serverUrl": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('remote SSE', () => {
	expect(generateInstallInstructions('antigravity', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Follow [Antigravity's docs](https://antigravity.google/docs/mcp) to install a custom MCP server, and add:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "serverUrl": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "Follow Antigravity's docs (antigravity.google/docs/mcp) to install a custom MCP server, and add:

		{
		  "mcpServers": {
		    "test": {
		      "serverUrl": "https://example.com/sse"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('antigravity', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Follow [Antigravity's docs](https://antigravity.google/docs/mcp) to install a custom MCP server, and add:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
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
		}
		\`\`\`",
		    "text": "Follow Antigravity's docs (antigravity.google/docs/mcp) to install a custom MCP server, and add:

		{
		  "mcpServers": {
		    "test": {
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
		}",
		  },
		]
	`);
});
