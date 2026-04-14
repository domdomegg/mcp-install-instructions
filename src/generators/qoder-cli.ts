import type {NormalizedServer, InstructionMode} from '../types';

export function qoderCli(server: NormalizedServer): InstructionMode[] {
	if (server.remote) {
		const transport = server.remote.transport === 'sse' ? 'sse' : 'streamable-http';
		const cmd = `qodercli mcp add -s user -t ${transport} ${server.name} ${server.remote.url}`;
		return [{
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		}];
	}

	const envFlags = Object.entries(server.stdio!.env).map(([k, v]) => `-e ${k}=${v}`);
	const parts = ['qodercli mcp add -s user', ...envFlags, server.name, '--', server.stdio!.command, ...server.stdio!.args];
	const cmd = parts.join(' ');
	return [{
		label: 'CLI',
		text: `Run:\n\n${cmd}`,
		markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
	}];
}
