import type {NormalizedServer, InstructionMode} from '../types';

function settingsJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		if (server.remote.transport === 'sse') {
			entry = {url: server.remote.url};
		} else {
			entry = {httpUrl: server.remote.url};
		}
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

export function geminiCodeAssist(server: NormalizedServer): InstructionMode[] {
	const json = settingsJson(server);
	return [{
		label: 'JSON config',
		text: `Follow Gemini Code Assist's configure MCP guide and add to your MCP config:\n\n${json}`,
		markdown: `Follow [Gemini Code Assist's configure MCP guide](https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer#configure-mcp-servers) and add to your MCP config:\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
