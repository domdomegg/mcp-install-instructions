import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('librechat', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "YAML config",
		    "markdown": "Add to \`librechat.yaml\` in your LibreChat project root:

		\`\`\`yaml
		mcpServers:
		  test:
		    type: sse
		    url: https://example.com/mcp
		\`\`\`",
		    "text": "Add to librechat.yaml in your LibreChat project root:

		mcpServers:
		  test:
		    type: sse
		    url: https://example.com/mcp",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('librechat', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "YAML config",
		    "markdown": "Add to \`librechat.yaml\` in your LibreChat project root:

		\`\`\`yaml
		mcpServers:
		  test:
		    type: stdio
		    command: npx
		    args: ["-y", "my-server"]
		    env:
		      KEY: val
		\`\`\`",
		    "text": "Add to librechat.yaml in your LibreChat project root:

		mcpServers:
		  test:
		    type: stdio
		    command: npx
		    args: ["-y", "my-server"]
		    env:
		      KEY: val",
		  },
		]
	`);
});
