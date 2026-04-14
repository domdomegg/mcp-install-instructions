import type {NormalizedServer, InstructionMode} from '../types';

function mcpServersJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {url: server.remote.url};
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

export function kiro(server: NormalizedServer): InstructionMode[] {
	const json = mcpServersJson(server);
	return [{
		label: 'JSON config',
		text: `Add to .kiro/settings/mcp.json (workspace) or ~/.kiro/settings/mcp.json (user). You can open either via the Command Palette: "Kiro: Open workspace MCP config (JSON)" or "Kiro: Open user MCP config (JSON)".\n\n${json}`,
		markdown: `Add to \`.kiro/settings/mcp.json\` (workspace) or \`~/.kiro/settings/mcp.json\` (user). You can open either via the Command Palette: **Kiro: Open workspace MCP config (JSON)** or **Kiro: Open user MCP config (JSON)**.\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
