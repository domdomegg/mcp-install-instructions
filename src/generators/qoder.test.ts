import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('qoder', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "In **Qoder Settings**, go to **MCP** > **My Servers** > **+ Add**, and use:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "type": "sse",
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "In Qoder Settings, go to MCP > My Servers > + Add, and use:

		{
		  "mcpServers": {
		    "test": {
		      "type": "sse",
		      "url": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('remote SSE', () => {
	expect(generateInstallInstructions('qoder', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "In **Qoder Settings**, go to **MCP** > **My Servers** > **+ Add**, and use:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "type": "sse",
		      "url": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "In Qoder Settings, go to MCP > My Servers > + Add, and use:

		{
		  "mcpServers": {
		    "test": {
		      "type": "sse",
		      "url": "https://example.com/sse"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('qoder', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "In **Qoder Settings**, go to **MCP** > **My Servers** > **+ Add**, and use:

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
		    "text": "In Qoder Settings, go to MCP > My Servers > + Add, and use:

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
