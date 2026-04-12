import type {NormalizedServer, InstructionMode} from '../types';

function mcpServersJson(server: NormalizedServer): string {
	if (server.remote) {
		return JSON.stringify({[server.name]: {type: 'url', url: server.remote.url}}, null, 2);
	}

	const entry: Record<string, unknown> = {
		type: 'stdio',
		command: server.stdio!.command,
		args: server.stdio!.args,
	};
	if (Object.keys(server.stdio!.env).length > 0) {
		entry.env = server.stdio!.env;
	}

	return JSON.stringify({[server.name]: entry}, null, 2);
}

export function claudeCode(server: NormalizedServer): InstructionMode[] {
	const modes: InstructionMode[] = [];

	// CLI
	if (server.remote) {
		const cmd = `claude mcp add --transport http ${server.name} ${server.remote.url}`;
		modes.push({
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		});
	} else {
		const parts = ['claude mcp add', server.name, server.stdio!.command, ...server.stdio!.args];
		const envFlags = Object.entries(server.stdio!.env).map(([k, v]) => `-e ${k}=${v}`);
		const cmd = [...parts, ...envFlags].join(' ');
		modes.push({
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		});
	}

	// JSON config
	const json = mcpServersJson(server);
	modes.push({
		label: 'JSON config',
		text: `Add to your Claude Code config (~/.claude.json or .mcp.json):\n\n"mcpServers": ${json}`,
		markdown: `Add to your Claude Code config (\`~/.claude.json\` or \`.mcp.json\`):\n\n\`\`\`json\n"mcpServers": ${json}\n\`\`\``,
	});

	return modes;
}
