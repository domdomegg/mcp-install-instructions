import type {NormalizedServer, InstructionMode} from '../types';

function warpJson(server: NormalizedServer): string {
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

	return JSON.stringify({[server.name]: entry}, null, 2);
}

export function warp(server: NormalizedServer): InstructionMode[] {
	const json = warpJson(server);
	return [{
		label: 'JSON config',
		text: `Go to Settings | MCP Servers > + Add, select "CLI Server (Command)" for stdio or "Streamable HTTP or SSE Server (URL)" for remote, and use:\n\n${json}`,
		markdown: `Go to **Settings | MCP Servers** > **+ Add**, select **CLI Server (Command)** for stdio or **Streamable HTTP or SSE Server (URL)** for remote, and use:\n\n\`\`\`json\n${json}\n\`\`\``,
	}];
}
