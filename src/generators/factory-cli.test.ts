import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('factory-cli', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		droid mcp add test https://example.com/mcp --type http
		\`\`\`",
		    "text": "Run:

		droid mcp add test https://example.com/mcp --type http",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('factory-cli', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		droid mcp add --env KEY=val test "npx -y my-server"
		\`\`\`",
		    "text": "Run:

		droid mcp add --env KEY=val test "npx -y my-server"",
		  },
		]
	`);
});
