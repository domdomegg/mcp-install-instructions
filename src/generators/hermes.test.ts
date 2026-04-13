import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('hermes', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "YAML config",
		    "markdown": "Add to your Hermes config (\`~/.hermes/config.yaml\`):

		\`\`\`yaml
		mcp_servers:
		  test:
		    url: https://example.com/mcp
		\`\`\`",
		    "text": "Add to your Hermes config (~/.hermes/config.yaml):

		mcp_servers:
		  test:
		    url: https://example.com/mcp",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('hermes', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "YAML config",
		    "markdown": "Add to your Hermes config (\`~/.hermes/config.yaml\`):

		\`\`\`yaml
		mcp_servers:
		  test:
		    command: npx
		    args: ["-y", "my-server"]
		    env:
		      KEY: val
		\`\`\`",
		    "text": "Add to your Hermes config (~/.hermes/config.yaml):

		mcp_servers:
		  test:
		    command: npx
		    args: ["-y", "my-server"]
		    env:
		      KEY: val",
		  },
		]
	`);
});
