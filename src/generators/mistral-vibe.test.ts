import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('mistral-vibe', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "TOML config",
		    "markdown": "Add to your Mistral Vibe config (\`~/.vibe/config.toml\`):

		\`\`\`toml
		[[mcp_servers]]
		name = "test"
		transport = "streamable-http"
		url = "https://example.com/mcp"
		\`\`\`",
		    "text": "Add to your Mistral Vibe config (~/.vibe/config.toml):

		[[mcp_servers]]
		name = "test"
		transport = "streamable-http"
		url = "https://example.com/mcp"",
		  },
		]
	`);
});

test('remote SSE (not supported)', () => {
	expect(generateInstallInstructions('mistral-vibe', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toEqual([]);
});

test('stdio', () => {
	expect(generateInstallInstructions('mistral-vibe', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "TOML config",
		    "markdown": "Add to your Mistral Vibe config (\`~/.vibe/config.toml\`):

		\`\`\`toml
		[[mcp_servers]]
		name = "test"
		transport = "stdio"
		command = "npx"
		args = ["-y", "my-server"]
		env = { "KEY" = "val" }
		\`\`\`",
		    "text": "Add to your Mistral Vibe config (~/.vibe/config.toml):

		[[mcp_servers]]
		name = "test"
		transport = "stdio"
		command = "npx"
		args = ["-y", "my-server"]
		env = { "KEY" = "val" }",
		  },
		]
	`);
});
