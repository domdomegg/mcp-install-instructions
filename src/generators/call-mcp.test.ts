import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('call-mcp', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your call-mcp config (\`~/.config/call-mcp/servers.json\`):

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "type": "http",
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`

		Then call it with:

		\`\`\`sh
		call-mcp tools test
		call-mcp call test <tool> --args '{...}'
		\`\`\`",
		    "text": "Add to your call-mcp config (~/.config/call-mcp/servers.json):

		{
		  "mcpServers": {
		    "test": {
		      "type": "http",
		      "url": "https://example.com/mcp"
		    }
		  }
		}

		Then call it with:

		call-mcp tools test
		call-mcp call test <tool> --args '{...}'",
		  },
		  {
		    "label": "Via Claude.ai",
		    "markdown": "1. Add the server at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) with the URL: https://example.com/mcp
		2. It will automatically be available in call-mcp when logged in to Claude Code with the same account",
		    "text": "1. Add the server at claude.ai/customize/connectors with the URL: https://example.com/mcp
		2. It will automatically be available in call-mcp when logged in to Claude Code with the same account",
		  },
		]
	`);
});

test('remote sse: returns empty', () => {
	expect(generateInstallInstructions('call-mcp', {url: 'https://example.com/sse', transport: 'sse', name: 'test'}).methods).toHaveLength(0);
});

test('stdio', () => {
	expect(generateInstallInstructions('call-mcp', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your call-mcp config (\`~/.config/call-mcp/servers.json\`):

		\`\`\`json
		{
		  "mcpServers": {
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
		\`\`\`

		Then call it with:

		\`\`\`sh
		call-mcp tools test
		call-mcp call test <tool> --args '{...}'
		\`\`\`",
		    "text": "Add to your call-mcp config (~/.config/call-mcp/servers.json):

		{
		  "mcpServers": {
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

		Then call it with:

		call-mcp tools test
		call-mcp call test <tool> --args '{...}'",
		  },
		]
	`);
});
