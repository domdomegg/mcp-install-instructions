import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('amp', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		amp mcp add test https://example.com/mcp
		\`\`\`",
		    "text": "Run:

		amp mcp add test https://example.com/mcp",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Amp settings (\`~/.config/amp/settings.json\`, or VS Code settings):

		\`\`\`json
		{
		  "amp.mcpServers": {
		    "test": {
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Amp settings (~/.config/amp/settings.json, or VS Code settings):

		{
		  "amp.mcpServers": {
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
	expect(generateInstallInstructions('amp', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		amp mcp add test https://example.com/sse
		\`\`\`",
		    "text": "Run:

		amp mcp add test https://example.com/sse",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Amp settings (\`~/.config/amp/settings.json\`, or VS Code settings):

		\`\`\`json
		{
		  "amp.mcpServers": {
		    "test": {
		      "url": "https://example.com/sse"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your Amp settings (~/.config/amp/settings.json, or VS Code settings):

		{
		  "amp.mcpServers": {
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
	expect(generateInstallInstructions('amp', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		amp mcp add --env KEY=val test -- npx -y my-server
		\`\`\`",
		    "text": "Run:

		amp mcp add --env KEY=val test -- npx -y my-server",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your Amp settings (\`~/.config/amp/settings.json\`, or VS Code settings):

		\`\`\`json
		{
		  "amp.mcpServers": {
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
		    "text": "Add to your Amp settings (~/.config/amp/settings.json, or VS Code settings):

		{
		  "amp.mcpServers": {
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
