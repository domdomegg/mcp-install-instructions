import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('openclaw', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		openclaw mcp set test '{"url":"https://example.com/mcp"}'
		\`\`\`",
		    "text": "Run:

		openclaw mcp set test '{"url":"https://example.com/mcp"}'",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your OpenClaw config (run \`openclaw config\` to find the file):

		\`\`\`json
		{
		  "mcp": {
		    "servers": {
		      "test": {
		        "url": "https://example.com/mcp"
		      }
		    }
		  }
		}
		\`\`\`",
		    "text": "Add to your OpenClaw config (run openclaw config to find the file):

		{
		  "mcp": {
		    "servers": {
		      "test": {
		        "url": "https://example.com/mcp"
		      }
		    }
		  }
		}",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('openclaw', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		openclaw mcp set test '{"command":"npx","args":["-y","my-server"]}'
		\`\`\`",
		    "text": "Run:

		openclaw mcp set test '{"command":"npx","args":["-y","my-server"]}'",
		  },
		  {
		    "label": "JSON config",
		    "markdown": "Add to your OpenClaw config (run \`openclaw config\` to find the file):

		\`\`\`json
		{
		  "mcp": {
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
		}
		\`\`\`",
		    "text": "Add to your OpenClaw config (run openclaw config to find the file):

		{
		  "mcp": {
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
		}",
		  },
		]
	`);
});
