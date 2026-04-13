import type {NormalizedServer, InstructionMode} from '../types';

function configYaml(server: NormalizedServer): string {
	const lines = ['extensions:', `  ${server.name}:`];
	if (server.remote) {
		lines.push('    type: streamable_http');
		lines.push(`    uri: ${server.remote.url}`);
	} else {
		lines.push('    type: stdio');
		lines.push(`    cmd: ${server.stdio!.command}`);
		if (server.stdio!.args.length > 0) {
			lines.push(`    args: [${server.stdio!.args.map((a) => `"${a}"`).join(', ')}]`);
		}

		const envEntries = Object.entries(server.stdio!.env);
		if (envEntries.length > 0) {
			lines.push('    envs:');
			for (const [k, v] of envEntries) {
				lines.push(`      ${k}: ${v}`);
			}
		}
	}

	return lines.join('\n');
}

export function goose(server: NormalizedServer): InstructionMode[] {
	const yaml = configYaml(server);
	return [{
		label: 'YAML config',
		text: `Add to your Goose config (~/.config/goose/config.yaml):\n\n${yaml}`,
		markdown: `Add to your Goose config (\`~/.config/goose/config.yaml\`):\n\n\`\`\`yaml\n${yaml}\n\`\`\``,
	}];
}
