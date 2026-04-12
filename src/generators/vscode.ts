import type {NormalizedServer, InstructionMode} from '../types';

function settingsJson(server: NormalizedServer): string {
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

	return JSON.stringify({[`mcp.${server.name}`]: entry}, null, 2);
}

function deepLink(server: NormalizedServer): string | undefined {
	if (!server.remote) {
		return undefined;
	}

	const config = {name: server.name, config: {type: 'http', url: server.remote.url}};
	const encoded = Buffer.from(JSON.stringify(config)).toString('base64url');
	return `vscode:mcp/install?${encoded}`;
}

export function vscode(server: NormalizedServer): InstructionMode[] {
	const modes: InstructionMode[] = [];

	// Deep link (remote only)
	const link = deepLink(server);
	if (link) {
		modes.push({
			label: 'One-click install',
			text: `Open this link:\n\n${link}`,
			markdown: `[Install in VS Code](${link})`,
		});
	}

	// JSON config
	const json = settingsJson(server);
	modes.push({
		label: 'JSON config',
		text: `Add to your VS Code settings (settings.json):\n\n${json}`,
		markdown: `Add to your VS Code settings (\`settings.json\`):\n\n\`\`\`json\n${json}\n\`\`\``,
	});

	return modes;
}
