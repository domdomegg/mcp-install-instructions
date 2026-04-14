import type {NormalizedServer, InstructionMode} from '../types';

function mcpServersJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {type: 'sse', url: server.remote.url};
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

export function qoder(server: NormalizedServer): InstructionMode[] {
	const json = mcpServersJson(server);
	return [{
		label: 'JSON config',
		text: `In Qoder Settings, go to MCP > My Servers > + Add, and use:\n\n${json}`,
		markdown: `In **Qoder Settings**, go to **MCP** > **My Servers** > **+ Add**, and use:\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
