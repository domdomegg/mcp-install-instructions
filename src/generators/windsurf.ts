import type {NormalizedServer, InstructionMode} from '../types';

function mcpServersJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {serverUrl: server.remote.url};
	} else {
		entry = {
			command: server.stdio!.command,
			args: server.stdio!.args,
		};
		if (Object.keys(server.stdio!.env).length > 0) {
			entry.env = server.stdio!.env;
		}
	}

	return JSON.stringify({mcpServers: {[server.name]: entry}}, null, 2);
}

export function windsurf(server: NormalizedServer): InstructionMode[] {
	const json = mcpServersJson(server);
	return [{
		label: 'JSON config',
		text: `Click the MCPs icon in the Cascade panel (or go to Windsurf Settings > Cascade > MCP Servers) and edit ~/.codeium/windsurf/mcp_config.json. Add:\n\n${json}`,
		markdown: `Click the **MCPs** icon in the Cascade panel (or go to **Windsurf Settings > Cascade > MCP Servers**) and edit \`~/.codeium/windsurf/mcp_config.json\`. Add:\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
