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

export function antigravity(server: NormalizedServer): InstructionMode[] {
	const json = mcpServersJson(server);
	return [{
		label: 'JSON config',
		text: `Follow Antigravity's docs (antigravity.google/docs/mcp) to install a custom MCP server, and add:\n\n${json}`,
		markdown: `Follow [Antigravity's docs](https://antigravity.google/docs/mcp) to install a custom MCP server, and add:\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
