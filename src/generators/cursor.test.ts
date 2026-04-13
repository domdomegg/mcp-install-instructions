import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('cursor', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Cursor MCP config (\`~/.cursor/mcp.json\`):

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Cursor MCP config (~/.cursor/mcp.json):

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

test('stdio', () => {
	expect(generateInstallInstructions('cursor', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Cursor MCP config (\`~/.cursor/mcp.json\`):

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
		    "text": "Add to your Cursor MCP config (~/.cursor/mcp.json):

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
