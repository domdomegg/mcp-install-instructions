import type {NormalizedServer, InstructionMode} from '../types';

function mcpJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {type: 'remote', url: server.remote.url};
	} else {
		entry = {
			type: 'local',
			command: [server.stdio!.command, ...server.stdio!.args],
		};
		if (Object.keys(server.stdio!.env).length > 0) {
			entry.environment = server.stdio!.env;
		}
	}

	return JSON.stringify({mcp: {[server.name]: entry}}, null, 2);
}

export function opencode(server: NormalizedServer): InstructionMode[] {
	const json = mcpJson(server);
	return [{
		label: 'JSON config',
		text: `Add to opencode.json in your project root (or run opencode to generate one):\n\n${json}`,
		markdown: `Add to \`opencode.json\` in your project root (or run \`opencode\` to generate one):\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
