import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('chatgpt', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Manual setup (requires Pro, Plus, Business, Enterprise, or Education plan)",
		    "markdown": "1. Go to [Settings > Apps > Advanced settings](https://chatgpt.com/#settings/Connectors/Advanced) and enable Developer mode
		2. Click "Create app" and enter the server URL: https://example.com/mcp
		3. Select Developer mode from the Plus menu to use the server in conversations",
		    "text": "1. Go to Settings > Apps > Advanced settings and enable Developer mode
		2. Click "Create app" and enter the server URL: https://example.com/mcp
		3. Select Developer mode from the Plus menu to use the server in conversations",
		  },
		]
	`);
});

test('stdio: returns empty', () => {
	expect(generateInstallInstructions('chatgpt', {command: 'npx', args: ['-y', 'server']}).methods).toHaveLength(0);
});
