import type {NormalizedServer, InstructionMode} from '../types';

function mcpJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {type: server.remote.transport === 'sse' ? 'sse' : 'http', url: server.remote.url};
	} else {
		entry = {
			type: 'stdio',
			command: server.stdio!.command,
			args: server.stdio!.args,
		};
		if (Object.keys(server.stdio!.env).length > 0) {
			entry.env = server.stdio!.env;
		}
	}

	return JSON.stringify({mcp: {[server.name]: entry}}, null, 2);
}

export function crush(server: NormalizedServer): InstructionMode[] {
	const json = mcpJson(server);
	return [{
		label: 'JSON config',
		text: `Add to .crush.json in your project root (or ~/.config/crush/crush.json for global config):\n\n${json}`,
		markdown: `Add to \`.crush.json\` in your project root (or \`~/.config/crush/crush.json\` for global config):\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
