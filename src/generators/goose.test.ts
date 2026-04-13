import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('goose', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "YAML config",
		    "markdown": "Add to your Goose config (\`~/.config/goose/config.yaml\`):

		\`\`\`yaml
		extensions:
		  test:
		    type: streamable_http
		    uri: https://example.com/mcp
		\`\`\`",
		    "text": "Add to your Goose config (~/.config/goose/config.yaml):

		extensions:
		  test:
		    type: streamable_http
		    uri: https://example.com/mcp",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('goose', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "YAML config",
		    "markdown": "Add to your Goose config (\`~/.config/goose/config.yaml\`):

		\`\`\`yaml
		extensions:
		  test:
		    type: stdio
		    cmd: npx
		    args: ["-y", "my-server"]
		    envs:
		      KEY: val
		\`\`\`",
		    "text": "Add to your Goose config (~/.config/goose/config.yaml):

		extensions:
		  test:
		    type: stdio
		    cmd: npx
		    args: ["-y", "my-server"]
		    envs:
		      KEY: val",
		  },
		]
	`);
});
