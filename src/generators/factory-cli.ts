import type {NormalizedServer, InstructionMode} from '../types';

export function factoryCli(server: NormalizedServer): InstructionMode[] {
	if (server.remote) {
		const type = server.remote.transport === 'sse' ? 'sse' : 'http';
		const cmd = `droid mcp add ${server.name} ${server.remote.url} --type ${type}`;
		return [{
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		}];
	}

	const envFlags = Object.entries(server.stdio!.env).map(([k, v]) => `--env ${k}=${v}`);
	const fullCommand = [server.stdio!.command, ...server.stdio!.args].join(' ');
	const parts = ['droid mcp add', ...envFlags, server.name, `"${fullCommand}"`];
	const cmd = parts.join(' ');
	return [{
		label: 'CLI',
		text: `Run:\n\n${cmd}`,
		markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
	}];
}
