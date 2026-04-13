import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('claude-ai', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Manual setup",
		    "markdown": "1. Go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors)
		2. Click the + icon, then "Add custom connector"
		3. Enter the server URL: https://example.com/mcp",
		    "text": "1. Go to claude.ai/customize/connectors
		2. Click the + icon, then "Add custom connector"
		3. Enter the server URL: https://example.com/mcp",
		  },
		]
	`);
});

test('stdio: returns empty', () => {
	expect(generateInstallInstructions('claude-ai', {command: 'npx', args: ['-y', 'server']}).methods).toHaveLength(0);
});
