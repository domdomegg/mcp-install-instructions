import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('command-code', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		cmd mcp add --scope user --transport http test https://example.com/mcp
		\`\`\`",
		    "text": "Run:

		cmd mcp add --scope user --transport http test https://example.com/mcp",
		  },
		]
	`);
});

test('remote SSE', () => {
	expect(generateInstallInstructions('command-code', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		cmd mcp add --scope user --transport sse test https://example.com/sse
		\`\`\`",
		    "text": "Run:

		cmd mcp add --scope user --transport sse test https://example.com/sse",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('command-code', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		cmd mcp add --scope user --env KEY=val test -- npx -y my-server
		\`\`\`",
		    "text": "Run:

		cmd mcp add --scope user --env KEY=val test -- npx -y my-server",
		  },
		]
	`);
});
