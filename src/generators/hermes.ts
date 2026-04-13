import type {NormalizedServer, InstructionMode} from '../types';

function configYaml(server: NormalizedServer): string {
	const lines = ['mcp_servers:', `  ${server.name}:`];
	if (server.remote) {
		lines.push(`    url: ${server.remote.url}`);
	} else {
		lines.push(`    command: ${server.stdio!.command}`);
		if (server.stdio!.args.length > 0) {
			lines.push(`    args: [${server.stdio!.args.map((a) => `"${a}"`).join(', ')}]`);
		}

		const envEntries = Object.entries(server.stdio!.env);
		if (envEntries.length > 0) {
			lines.push('    env:');
			for (const [k, v] of envEntries) {
				lines.push(`      ${k}: ${v}`);
			}
		}
	}

	return lines.join('\n');
}

export function hermes(server: NormalizedServer): InstructionMode[] {
	const yaml = configYaml(server);
	return [{
		label: 'YAML config',
		text: `Add to your Hermes config (~/.hermes/config.yaml):\n\n${yaml}`,
		markdown: `Add to your Hermes config (\`~/.hermes/config.yaml\`):\n\n\`\`\`yaml\n${yaml}\n\`\`\``,
	}];
}
