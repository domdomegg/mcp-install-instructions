import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('crush', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`.crush.json\` in your project root (or \`~/.config/crush/crush.json\` for global config):

		\`\`\`json
		{
		  "mcp": {
		    "test": {
		      "type": "http",
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to .crush.json in your project root (or ~/.config/crush/crush.json for global config):

		{
		  "mcp": {
		    "test": {
		      "type": "http",
		      "url": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('crush', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`.crush.json\` in your project root (or \`~/.config/crush/crush.json\` for global config):

		\`\`\`json
		{
		  "mcp": {
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
		\`\`\`",
		    "text": "Add to .crush.json in your project root (or ~/.config/crush/crush.json for global config):

		{
		  "mcp": {
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
		}",
		  },
		]
	`);
});
