import type {NormalizedServer, InstructionMode} from '../types';

function configToml(server: NormalizedServer): string {
	if (server.remote) {
		return `[mcp_servers.${server.name}]\nurl = "${server.remote.url}"`;
	}

	const lines = [`[mcp_servers.${server.name}]`];
	lines.push(`command = "${server.stdio!.command}"`);
	lines.push(`args = [${server.stdio!.args.map((a) => `"${a}"`).join(', ')}]`);

	const envEntries = Object.entries(server.stdio!.env);
	if (envEntries.length > 0) {
		lines.push('');
		lines.push(`[mcp_servers.${server.name}.env]`);
		for (const [k, v] of envEntries) {
			lines.push(`${k} = "${v}"`);
		}
	}

	return lines.join('\n');
}

export function codex(server: NormalizedServer): InstructionMode[] {
	const toml = configToml(server);
	return [{
		label: 'TOML config',
		text: `Add to your Codex config (~/.codex/config.toml):\n\n${toml}`,
		markdown: `Add to your Codex config (\`~/.codex/config.toml\`):\n\n\`\`\`toml\n${toml}\n\`\`\``,
	}];
}
