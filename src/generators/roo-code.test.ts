import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('roo-code', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "In the Roo Code pane, click the settings icon, scroll to the bottom, and click **Edit Global MCP** (for \`mcp_settings.json\`) or **Edit Project MCP** (for \`.roo/mcp.json\`). Add:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/mcp",
		      "transportType": "streamable-http"
		    }
		  }
		}
		\`\`\`",
		    "text": "In the Roo Code pane, click the settings icon, scroll to the bottom, and click "Edit Global MCP" or "Edit Project MCP". Add:

		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/mcp",
		      "transportType": "streamable-http"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('roo-code', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "In the Roo Code pane, click the settings icon, scroll to the bottom, and click **Edit Global MCP** (for \`mcp_settings.json\`) or **Edit Project MCP** (for \`.roo/mcp.json\`). Add:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "command": "npx",
		      "args": [
		        "-y",
		        "my-server"
		      ],
		      "transportType": "stdio",
		      "env": {
		        "KEY": "val"
		      }
		    }
		  }
		}
		\`\`\`",
		    "text": "In the Roo Code pane, click the settings icon, scroll to the bottom, and click "Edit Global MCP" or "Edit Project MCP". Add:

		{
		  "mcpServers": {
		    "test": {
		      "command": "npx",
		      "args": [
		        "-y",
		        "my-server"
		      ],
		      "transportType": "stdio",
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
