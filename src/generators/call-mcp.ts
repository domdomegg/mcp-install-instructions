import type {NormalizedServer, InstructionMode} from '../types';

function serversJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {type: 'http', url: server.remote.url};
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

	return JSON.stringify({mcpServers: {[server.name]: entry}}, null, 2);
}

export function callMcp(server: NormalizedServer): InstructionMode[] {
	// call-mcp does not support the legacy SSE transport
	if (server.remote?.transport === 'sse') {
		return [];
	}

	const modes: InstructionMode[] = [];

	// JSON config
	const json = serversJson(server);
	modes.push({
		label: 'JSON config',
		text: `Add to your call-mcp config (~/.config/call-mcp/servers.json):\n\n${json}\n\nThen call it with:\n\ncall-mcp tools ${server.name}\ncall-mcp call ${server.name} <tool> --args '{...}'`,
		markdown: `Add to your call-mcp config (\`~/.config/call-mcp/servers.json\`):\n\n\`\`\`json\n${json}\n\`\`\`\n\nThen call it with:\n\n\`\`\`sh\ncall-mcp tools ${server.name}\ncall-mcp call ${server.name} <tool> --args '{...}'\n\`\`\``,
	});

	// Claude.ai connectors (remote only)
	if (server.remote) {
		const textSteps = [
			`Add the server at claude.ai/customize/connectors with the URL: ${server.remote.url}`,
			'It will automatically be available in call-mcp when logged in to Claude Code with the same account',
		].map((s, i) => `${i + 1}. ${s}`).join('\n');

		const mdSteps = [
			`Add the server at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) with the URL: ${server.remote.url}`,
			'It will automatically be available in call-mcp when logged in to Claude Code with the same account',
		].map((s, i) => `${i + 1}. ${s}`).join('\n');

		modes.push({
			label: 'Via Claude.ai',
			text: textSteps,
			markdown: mdSteps,
		});
	}

	return modes;
}
