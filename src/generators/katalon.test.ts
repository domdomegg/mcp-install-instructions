import {test, expect} from 'vitest';
import {generateInstallInstructions} from '../index';

test('remote', () => {
	expect(generateInstallInstructions('katalon', {url: 'https://example.com/mcp', name: 'test'}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Studio settings",
		    "markdown": "Open **Katalon Studio** and go to [StudioAssist settings](https://docs.katalon.com/katalon-studio/studioassist/mcp-servers/setting-up-chrome-devtools-mcp-server-for-studioassist)
		Add a new MCP server with these settings:
		  - **Connection URL:** \`https://example.com/mcp\`
		  - **Transport type:** \`HTTP\`",
		    "text": "Open Katalon Studio and go to StudioAssist settings
		Add a new MCP server with these settings:
		  - Connection URL: https://example.com/mcp
		  - Transport type: HTTP",
		  },
		]
	`);
});

test('stdio', () => {
	expect(generateInstallInstructions('katalon', {
		command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}, name: 'test',
	}).methods).toMatchInlineSnapshot(`
		[
		  {
		    "label": "Via MCP proxy",
		    "markdown": "1. Install the [MCP proxy](https://docs.katalon.com/katalon-studio/studioassist/mcp-servers/setting-up-mcp-proxy-for-stdio-mcp-servers)
		2. Start the MCP server via the proxy:

		   \`\`\`sh
		   KEY=val mcp-proxy --transport streamablehttp --port 8080 -- npx -y my-server
		   \`\`\`
		3. In **Katalon Studio**, add the server to StudioAssist with:
		   - **Connection URL:** \`http://127.0.0.1:8080/mcp\`
		   - **Transport type:** \`HTTP\`",
		    "text": "1. Install the MCP proxy (see Katalon's MCP proxy setup guide)
		2. Start the MCP server via the proxy:

		KEY=val mcp-proxy --transport streamablehttp --port 8080 -- npx -y my-server
		3. In Katalon Studio, add the server to StudioAssist with:
		   - Connection URL: http://127.0.0.1:8080/mcp
		   - Transport type: HTTP",
		  },
		]
	`);
});
