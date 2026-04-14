import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('qoder-cli', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		qodercli mcp add -s user -t streamable-http test https://example.com/mcp
		\`\`\`",
		    "text": "Run:

		qodercli mcp add -s user -t streamable-http test https://example.com/mcp",
		  },
		]
	`);
});

test('remote SSE', () => {
	expect(generateInstallInstructions('qoder-cli', {url: 'https://example.com/sse', name: 'test', transport: 'sse'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		qodercli mcp add -s user -t sse test https://example.com/sse
		\`\`\`",
		    "text": "Run:

		qodercli mcp add -s user -t sse test https://example.com/sse",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('qoder-cli', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "CLI",
		    "markdown": "Run:

		\`\`\`sh
		qodercli mcp add -s user -e KEY=val test -- npx -y my-server
		\`\`\`",
		    "text": "Run:

		qodercli mcp add -s user -e KEY=val test -- npx -y my-server",
		  },
		]
	`);
});
