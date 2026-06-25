import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('cline', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "In VS Code, click the Cline icon in the sidebar, open the menu (⋮), select "MCP Servers", then click "Configure MCP Servers" to edit \`cline_mcp_settings.json\`. Add:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "type": "streamableHttp",
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "In VS Code, click the Cline icon in the sidebar, open the menu (⋮), select "MCP Servers", then click "Configure MCP Servers" to edit cline_mcp_settings.json. Add:

		{
		  "mcpServers": {
		    "test": {
		      "type": "streamableHttp",
		      "url": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('cline', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "In VS Code, click the Cline icon in the sidebar, open the menu (⋮), select "MCP Servers", then click "Configure MCP Servers" to edit \`cline_mcp_settings.json\`. Add:

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
		    "text": "In VS Code, click the Cline icon in the sidebar, open the menu (⋮), select "MCP Servers", then click "Configure MCP Servers" to edit cline_mcp_settings.json. Add:

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
