import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('visual-studio', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Visual Studio MCP config (\`.mcp.json\` in solution root, or \`%USERPROFILE%\\.mcp.json\` globally):

		\`\`\`json
		{
		  "servers": {
		    "test": {
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Visual Studio MCP config (.mcp.json in solution root, or %USERPROFILE%\\.mcp.json globally):

		{
		  "servers": {
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
	expect(generateInstallInstructions('visual-studio', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Visual Studio MCP config (\`.mcp.json\` in solution root, or \`%USERPROFILE%\\.mcp.json\` globally):

		\`\`\`json
		{
		  "servers": {
		    "test": {
		      "url": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Visual Studio MCP config (.mcp.json in solution root, or %USERPROFILE%\\.mcp.json globally):

		{
		  "servers": {
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
	expect(generateInstallInstructions('visual-studio', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Visual Studio MCP config (\`.mcp.json\` in solution root, or \`%USERPROFILE%\\.mcp.json\` globally):

		\`\`\`json
		{
		  "servers": {
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
		    "text": "Add to your Visual Studio MCP config (.mcp.json in solution root, or %USERPROFILE%\\.mcp.json globally):

		{
		  "servers": {
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
