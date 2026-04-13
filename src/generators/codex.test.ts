import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('codex', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "TOML config",
		    "markdown": "Add to your Codex config (\`~/.codex/config.toml\`):

		\`\`\`toml
		[mcp_servers.test]
		url = "https://example.com/mcp"
		\`\`\`",
		    "text": "Add to your Codex config (~/.codex/config.toml):

		[mcp_servers.test]
		url = "https://example.com/mcp"",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('codex', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "TOML config",
		    "markdown": "Add to your Codex config (\`~/.codex/config.toml\`):

		\`\`\`toml
		[mcp_servers.test]
		command = "npx"
		args = ["-y", "my-server"]

		[mcp_servers.test.env]
		KEY = "val"
		\`\`\`",
		    "text": "Add to your Codex config (~/.codex/config.toml):

		[mcp_servers.test]
		command = "npx"
		args = ["-y", "my-server"]

		[mcp_servers.test.env]
		KEY = "val"",
		  },
		]
	`);
});
