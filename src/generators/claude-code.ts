import type {NormalizedServer, InstructionMode} from '../types';

function mcpServersJson(server: NormalizedServer): string {
	if (server.remote) {
		return JSON.stringify({[server.name]: {type: server.remote.transport === 'sse' ? 'sse' : 'url', url: server.remote.url}}, null, 2);
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

	// Claude.ai integration (remote only)
	if (server.remote) {
		const textSteps = [
			`Add the server at claude.ai/customize/connectors with the URL: ${server.remote.url}`,
			'It will automatically be available in Claude Code when logged in with the same account',
		].map((s, i) => `${i + 1}. ${s}`).join('\n');

		const mdSteps = [
			`Add the server at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) with the URL: ${server.remote.url}`,
			'It will automatically be available in Claude Code when logged in with the same account',
		].map((s, i) => `${i + 1}. ${s}`).join('\n');

		modes.push({
			label: 'Via Claude.ai',
			text: textSteps,
			markdown: mdSteps,
		});
	}

	// CLI
	if (server.remote) {
		const transport = server.remote.transport === 'sse' ? 'sse' : 'http';
		const cmd = `claude mcp add --transport ${transport} ${server.name} ${server.remote.url}`;
		modes.push({
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		});
	} else {
		const envFlags = Object.entries(server.stdio!.env).map(([k, v]) => `--env ${k}=${v}`);
		const parts = ['claude mcp add', ...envFlags, server.name, '--', server.stdio!.command, ...server.stdio!.args];
		const cmd = parts.join(' ');
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
