import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('warp', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Go to **Settings | MCP Servers** > **+ Add**, select **CLI Server (Command)** for stdio or **Streamable HTTP or SSE Server (URL)** for remote, and use:

		\`\`\`json
		{
		  "test": {
		    "url": "https://example.com/mcp"
		  }
		}
		\`\`\`",
		    "text": "Go to Settings | MCP Servers > + Add, select "CLI Server (Command)" for stdio or "Streamable HTTP or SSE Server (URL)" for remote, and use:

		{
		  "test": {
		    "url": "https://example.com/mcp"
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('warp', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Go to **Settings | MCP Servers** > **+ Add**, select **CLI Server (Command)** for stdio or **Streamable HTTP or SSE Server (URL)** for remote, and use:

		\`\`\`json
		{
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
		\`\`\`",
		    "text": "Go to Settings | MCP Servers > + Add, select "CLI Server (Command)" for stdio or "Streamable HTTP or SSE Server (URL)" for remote, and use:

		{
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
		}",
		  },
		]
	`);
});
