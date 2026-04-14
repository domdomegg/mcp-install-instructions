import type {NormalizedServer, InstructionMode} from '../types';

function configToml(server: NormalizedServer): string {
	const lines: string[] = ['[[mcp_servers]]'];
	lines.push(`name = "${server.name}"`);

	if (server.remote) {
		lines.push('transport = "streamable-http"');
		lines.push(`url = "${server.remote.url}"`);
	} else {
		lines.push('transport = "stdio"');
		lines.push(`command = "${server.stdio!.command}"`);
		lines.push(`args = [${server.stdio!.args.map((a) => `"${a}"`).join(', ')}]`);

		const envEntries = Object.entries(server.stdio!.env);
		if (envEntries.length > 0) {
			const envInline = envEntries.map(([k, v]) => `"${k}" = "${v}"`).join(', ');
			lines.push(`env = { ${envInline} }`);
		}
	}

	return lines.join('\n');
}

export function mistralVibe(server: NormalizedServer): InstructionMode[] {
	if (server.remote?.transport === 'sse') {
		return [];
	}

	const toml = configToml(server);
	return [{
		label: 'TOML config',
		text: `Add to your Mistral Vibe config (~/.vibe/config.toml):\n\n${toml}`,
		markdown: `Add to your Mistral Vibe config (\`~/.vibe/config.toml\`):\n\n\`\`\`toml\n${toml}\n\`\`\``,
	}];
}
