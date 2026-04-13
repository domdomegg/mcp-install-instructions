import type {NormalizedServer, InstructionMode} from '../types';

function mcpServersJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {url: server.remote.url, transportType: server.remote.transport === 'sse' ? 'sse' : 'streamable-http'};
	} else {
		entry = {
			command: server.stdio!.command,
			args: server.stdio!.args,
			transportType: 'stdio',
		};
		if (Object.keys(server.stdio!.env).length > 0) {
			entry.env = server.stdio!.env;
		}
	}

	return JSON.stringify({mcpServers: {[server.name]: entry}}, null, 2);
}

export function rooCode(server: NormalizedServer): InstructionMode[] {
	const json = mcpServersJson(server);
	return [{
		label: 'JSON config',
		text: `In the Roo Code pane, click the settings icon, scroll to the bottom, and click "Edit Global MCP" or "Edit Project MCP". Add:\n\n${json}`,
		markdown: `In the Roo Code pane, click the settings icon, scroll to the bottom, and click **Edit Global MCP** (for \`mcp_settings.json\`) or **Edit Project MCP** (for \`.roo/mcp.json\`). Add:\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
