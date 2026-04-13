import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('opencode', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`opencode.json\` in your project root (or run \`opencode\` to generate one):

		\`\`\`json
		{
		  "mcp": {
		    "test": {
		      "type": "remote",
		      "url": "https://example.com/mcp"
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to opencode.json in your project root (or run opencode to generate one):

		{
		  "mcp": {
		    "test": {
		      "type": "remote",
		      "url": "https://example.com/mcp"
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('opencode', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "JSON config",
		    "markdown": "Add to \`opencode.json\` in your project root (or run \`opencode\` to generate one):

		\`\`\`json
		{
		  "mcp": {
		    "test": {
		      "type": "local",
		      "command": [
		        "npx",
		        "-y",
		        "my-server"
		      ],
		      "environment": {
		        "KEY": "val"
		      }
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to opencode.json in your project root (or run opencode to generate one):

		{
		  "mcp": {
		    "test": {
		      "type": "local",
		      "command": [
		        "npx",
		        "-y",
		        "my-server"
		      ],
		      "environment": {
		        "KEY": "val"
		      }
		    }
		  }
		}",
		  },
		]
	`);
});
