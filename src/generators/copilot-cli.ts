import type {NormalizedServer, InstructionMode} from '../types';

export function copilotCli(server: NormalizedServer): InstructionMode[] {
	if (server.remote) {
		const steps = [
			'Start Copilot CLI with: copilot',
			'Run: /mcp add',
			`Set Server name: ${server.name}`,
			'Set Server Type: HTTP or SSE (pick to match the server)',
			`Set URL: ${server.remote.url}`,
			'Press CTRL+S to save',
		];

		const mdSteps = [
			'Start Copilot CLI with: `copilot`',
			'Run: `/mcp add`',
			`Set **Server name:** \`${server.name}\``,
			'Set **Server Type:** HTTP or SSE (pick to match the server)',
			`Set **URL:** \`${server.remote.url}\``,
			'Press `CTRL+S` to save',
		];

		return [{
			label: 'Interactive setup',
			text: steps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
			markdown: mdSteps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
		}];
	}

	const fullCommand = [server.stdio!.command, ...server.stdio!.args].join(' ');
	const envJson = Object.keys(server.stdio!.env).length > 0 ? JSON.stringify(server.stdio!.env) : null;

	const steps = [
		'Start Copilot CLI with: copilot',
		'Run: /mcp add',
		`Set Server name: ${server.name}`,
		'Set Server Type: Local (STDIO)',
		`Set Command: ${fullCommand}`,
		...(envJson ? [`Set Environment Variables (JSON): ${envJson}`] : []),
		'Press CTRL+S to save',
	];

	const mdSteps = [
		'Start Copilot CLI with: `copilot`',
		'Run: `/mcp add`',
		`Set **Server name:** \`${server.name}\``,
		'Set **Server Type:** Local (STDIO)',
		`Set **Command:** \`${fullCommand}\``,
		...(envJson ? [`Set **Environment Variables (JSON):** \`${envJson}\``] : []),
		'Press `CTRL+S` to save',
	];

	return [{
		label: 'Interactive setup',
		text: steps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
		markdown: mdSteps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
	}];
}
