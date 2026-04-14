import type {NormalizedServer, InstructionMode} from '../types';

export function commandCode(server: NormalizedServer): InstructionMode[] {
	if (server.remote) {
		const transport = server.remote.transport === 'sse' ? 'sse' : 'http';
		const cmd = `cmd mcp add --scope user --transport ${transport} ${server.name} ${server.remote.url}`;
		return [{
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		}];
	}

	const envFlags = Object.entries(server.stdio!.env).map(([k, v]) => `--env ${k}=${v}`);
	const parts = ['cmd mcp add --scope user', ...envFlags, server.name, '--', server.stdio!.command, ...server.stdio!.args];
	const cmd = parts.join(' ');
	return [{
		label: 'CLI',
		text: `Run:\n\n${cmd}`,
		markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
	}];
}
