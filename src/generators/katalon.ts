import type {NormalizedServer, InstructionMode} from '../types';

export function katalon(server: NormalizedServer): InstructionMode[] {
	if (server.remote) {
		const transport = server.remote.transport === 'sse' ? 'SSE' : 'HTTP';
		const steps = [
			'Open Katalon Studio and go to StudioAssist settings',
			'Add a new MCP server with these settings:',
			`  - Connection URL: ${server.remote.url}`,
			`  - Transport type: ${transport}`,
		];

		const mdSteps = [
			'Open **Katalon Studio** and go to [StudioAssist settings](https://docs.katalon.com/katalon-studio/studioassist/mcp-servers/setting-up-chrome-devtools-mcp-server-for-studioassist)',
			'Add a new MCP server with these settings:',
			`  - **Connection URL:** \`${server.remote.url}\``,
			`  - **Transport type:** \`${transport}\``,
		];

		return [{
			label: 'Studio settings',
			text: steps.join('\n'),
			markdown: mdSteps.join('\n'),
		}];
	}

	const envPrefix = Object.entries(server.stdio!.env).map(([k, v]) => `${k}=${v}`).join(' ');
	const childCommand = [server.stdio!.command, ...server.stdio!.args].join(' ');
	const proxyCmd = `${envPrefix ? `${envPrefix} ` : ''}mcp-proxy --transport streamablehttp --port 8080 -- ${childCommand}`;

	const text = [
		'1. Install the MCP proxy (see Katalon\'s MCP proxy setup guide)',
		`2. Start the MCP server via the proxy:\n\n${proxyCmd}`,
		'3. In Katalon Studio, add the server to StudioAssist with:\n   - Connection URL: http://127.0.0.1:8080/mcp\n   - Transport type: HTTP',
	].join('\n');

	const markdown = [
		'1. Install the [MCP proxy](https://docs.katalon.com/katalon-studio/studioassist/mcp-servers/setting-up-mcp-proxy-for-stdio-mcp-servers)',
		`2. Start the MCP server via the proxy:\n\n   \`\`\`sh\n   ${proxyCmd}\n   \`\`\``,
		'3. In **Katalon Studio**, add the server to StudioAssist with:\n   - **Connection URL:** `http://127.0.0.1:8080/mcp`\n   - **Transport type:** `HTTP`',
	].join('\n');

	return [{
		label: 'Via MCP proxy',
		text,
		markdown,
	}];
}
