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

export function cursor(server: NormalizedServer): InstructionMode[] {
	const json = mcpServersJson(server);
	return [{
		label: 'JSON config',
		text: `Add to your Cursor MCP config (~/.cursor/mcp.json):\n\n${json}`,
		markdown: `Add to your Cursor MCP config (\`~/.cursor/mcp.json\`):\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
