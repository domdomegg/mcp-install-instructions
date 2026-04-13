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

export function cline(server: NormalizedServer): InstructionMode[] {
	const json = mcpServersJson(server);
	return [{
		label: 'JSON config',
		text: `In VS Code, click the Cline icon in the sidebar, open the menu (⋮), select "MCP Servers", then click "Configure MCP Servers" to edit cline_mcp_settings.json. Add:\n\n${json}`,
		markdown: `In VS Code, click the Cline icon in the sidebar, open the menu (⋮), select "MCP Servers", then click "Configure MCP Servers" to edit \`cline_mcp_settings.json\`. Add:\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
