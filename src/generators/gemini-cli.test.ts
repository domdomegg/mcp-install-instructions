import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote HTTP', () => {
	expect(generateInstallInstructions('gemini-cli', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Gemini CLI settings (\`~/.gemini/settings.json\`):

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "httpUrl": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Gemini CLI settings (~/.gemini/settings.json):

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
	expect(generateInstallInstructions('gemini-cli', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Gemini CLI settings (\`~/.gemini/settings.json\`):

		\`\`\`json
		{
		  "mcpServers": {
		    "test": {
		      "url": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Gemini CLI settings (~/.gemini/settings.json):

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
	expect(generateInstallInstructions('gemini-cli', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Gemini CLI settings (\`~/.gemini/settings.json\`):

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
		    "text": "Add to your Gemini CLI settings (~/.gemini/settings.json):

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
