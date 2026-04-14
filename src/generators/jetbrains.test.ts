import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('jetbrains', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Go to **Settings | Tools | AI Assistant | Model Context Protocol (MCP)** > **Add** (or **Settings | Tools | Junie | MCP Settings** > **Add** for Junie) and use:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Go to Settings | Tools | AI Assistant | Model Context Protocol (MCP) > Add (or Settings | Tools | Junie | MCP Settings > Add for Junie) and use:

		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('remote SSE', () => {
	expect(generateInstallInstructions('jetbrains', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Go to **Settings | Tools | AI Assistant | Model Context Protocol (MCP)** > **Add** (or **Settings | Tools | Junie | MCP Settings** > **Add** for Junie) and use:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "Go to Settings | Tools | AI Assistant | Model Context Protocol (MCP) > Add (or Settings | Tools | Junie | MCP Settings > Add for Junie) and use:

		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/sse"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('jetbrains', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Go to **Settings | Tools | AI Assistant | Model Context Protocol (MCP)** > **Add** (or **Settings | Tools | Junie | MCP Settings** > **Add** for Junie) and use:

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
		    "text": "Go to Settings | Tools | AI Assistant | Model Context Protocol (MCP) > Add (or Settings | Tools | Junie | MCP Settings > Add for Junie) and use:

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
