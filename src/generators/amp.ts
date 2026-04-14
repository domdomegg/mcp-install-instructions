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

	return JSON.stringify({'amp.mcpServers': {[server.name]: entry}}, null, 2);
}

export function amp(server: NormalizedServer): InstructionMode[] {
	const modes: InstructionMode[] = [];

	if (server.remote) {
		const cmd = `amp mcp add ${server.name} ${server.remote.url}`;
		modes.push({
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		});
	} else {
		const envFlags = Object.entries(server.stdio!.env).map(([k, v]) => `--env ${k}=${v}`);
		const parts = ['amp mcp add', ...envFlags, server.name, '--', server.stdio!.command, ...server.stdio!.args];
		const cmd = parts.join(' ');
		modes.push({
			label: 'CLI',
			text: `Run:\n\n${cmd}`,
			markdown: `Run:\n\n\`\`\`sh\n${cmd}\n\`\`\``,
		});
	}

	const json = mcpServersJson(server);
	modes.push({
		label: 'JSON config',
		text: `Add to your Amp settings (~/.config/amp/settings.json, or VS Code settings):\n\n${json}`,
		markdown: `Add to your Amp settings (\`~/.config/amp/settings.json\`, or VS Code settings):\n\n\`\`\`json\n${json}\n\`\`\``,
	});

	return modes;
}
