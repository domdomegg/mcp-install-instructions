import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('vscode', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "One-click install",
		    "markdown": "[Install in VS Code](vscode:mcp/install?eyJuYW1lIjoidGVzdCIsImNvbmZpZyI6eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20vbWNwIn19)",
		    "text": "Open this link:

		vscode:mcp/install?eyJuYW1lIjoidGVzdCIsImNvbmZpZyI6eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20vbWNwIn19",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`.vscode/mcp.json\` (or run **MCP: Open User Configuration** from the Command Palette for global config):

		\`\`\`json
		{
		  "servers": {
		    "test": {
		      "type": "http",
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to .vscode/mcp.json (or run "MCP: Open User Configuration" from the Command Palette for global config):

		{
		  "servers": {
		    "test": {
		      "type": "http",
		      "url": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('vscode', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`.vscode/mcp.json\` (or run **MCP: Open User Configuration** from the Command Palette for global config):

		\`\`\`json
		{
		  "servers": {
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
		}
		\`\`\`",
		    "text": "Add to .vscode/mcp.json (or run "MCP: Open User Configuration" from the Command Palette for global config):

		{
		  "servers": {
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
		}",
		  },
		]
	`);
});
