import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('gemini-code-assist', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Follow [Gemini Code Assist's configure MCP guide](https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer#configure-mcp-servers) and add to your MCP config:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "httpUrl": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Follow Gemini Code Assist's configure MCP guide and add to your MCP config:

		{
		  "mcpServers": {
		    "test": {
		      "httpUrl": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('remote SSE', () => {
	expect(generateInstallInstructions('gemini-code-assist', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Follow [Gemini Code Assist's configure MCP guide](https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer#configure-mcp-servers) and add to your MCP config:

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "Follow Gemini Code Assist's configure MCP guide and add to your MCP config:

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
	expect(generateInstallInstructions('gemini-code-assist', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Follow [Gemini Code Assist's configure MCP guide](https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer#configure-mcp-servers) and add to your MCP config:

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
		    "text": "Follow Gemini Code Assist's configure MCP guide and add to your MCP config:

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
