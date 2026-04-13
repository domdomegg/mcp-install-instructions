import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('windsurf', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Click the **MCPs** icon in the Cascade panel (or go to **Windsurf Settings > Cascade > MCP Servers**) and edit \`~/.codeium/windsurf/mcp_config.json\`. Add:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "serverUrl": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Click the MCPs icon in the Cascade panel (or go to Windsurf Settings > Cascade > MCP Servers) and edit ~/.codeium/windsurf/mcp_config.json. Add:

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

test('stdio', () => {
	expect(generateInstallInstructions('windsurf', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Click the **MCPs** icon in the Cascade panel (or go to **Windsurf Settings > Cascade > MCP Servers**) and edit \`~/.codeium/windsurf/mcp_config.json\`. Add:

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
		    "text": "Click the MCPs icon in the Cascade panel (or go to Windsurf Settings > Cascade > MCP Servers) and edit ~/.codeium/windsurf/mcp_config.json. Add:

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
