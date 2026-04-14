import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('kiro', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`.kiro/settings/mcp.json\` (workspace) or \`~/.kiro/settings/mcp.json\` (user). You can open either via the Command Palette: **Kiro: Open workspace MCP config (JSON)** or **Kiro: Open user MCP config (JSON)**.

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to .kiro/settings/mcp.json (workspace) or ~/.kiro/settings/mcp.json (user). You can open either via the Command Palette: "Kiro: Open workspace MCP config (JSON)" or "Kiro: Open user MCP config (JSON)".

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
	expect(generateInstallInstructions('kiro', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`.kiro/settings/mcp.json\` (workspace) or \`~/.kiro/settings/mcp.json\` (user). You can open either via the Command Palette: **Kiro: Open workspace MCP config (JSON)** or **Kiro: Open user MCP config (JSON)**.

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to .kiro/settings/mcp.json (workspace) or ~/.kiro/settings/mcp.json (user). You can open either via the Command Palette: "Kiro: Open workspace MCP config (JSON)" or "Kiro: Open user MCP config (JSON)".

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
	expect(generateInstallInstructions('kiro', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`.kiro/settings/mcp.json\` (workspace) or \`~/.kiro/settings/mcp.json\` (user). You can open either via the Command Palette: **Kiro: Open workspace MCP config (JSON)** or **Kiro: Open user MCP config (JSON)**.

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
		    "text": "Add to .kiro/settings/mcp.json (workspace) or ~/.kiro/settings/mcp.json (user). You can open either via the Command Palette: "Kiro: Open workspace MCP config (JSON)" or "Kiro: Open user MCP config (JSON)".

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
