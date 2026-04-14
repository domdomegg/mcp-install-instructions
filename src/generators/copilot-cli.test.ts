import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('copilot-cli', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Interactive setup",
		    "markdown": "1. Start Copilot CLI with: \`copilot\`
		2. Run: \`/mcp add\`
		3. Set **Server name:** \`test\`
		4. Set **Server Type:** HTTP or SSE (pick to match the server)
		5. Set **URL:** \`https://example.com/mcp\`
		6. Press \`CTRL+S\` to save",
		    "text": "1. Start Copilot CLI with: copilot
		2. Run: /mcp add
		3. Set Server name: test
		4. Set Server Type: HTTP or SSE (pick to match the server)
		5. Set URL: https://example.com/mcp
		6. Press CTRL+S to save",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('copilot-cli', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Interactive setup",
		    "markdown": "1. Start Copilot CLI with: \`copilot\`
		2. Run: \`/mcp add\`
		3. Set **Server name:** \`test\`
		4. Set **Server Type:** Local (STDIO)
		5. Set **Command:** \`npx -y my-server\`
		6. Set **Environment Variables (JSON):** \`{"KEY":"val"}\`
		7. Press \`CTRL+S\` to save",
		    "text": "1. Start Copilot CLI with: copilot
		2. Run: /mcp add
		3. Set Server name: test
		4. Set Server Type: Local (STDIO)
		5. Set Command: npx -y my-server
		6. Set Environment Variables (JSON): {"KEY":"val"}
		7. Press CTRL+S to save",
		  },
		]
	`);
});
