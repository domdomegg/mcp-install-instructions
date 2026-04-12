import type {NormalizedServer, InstructionMode} from '../types';

export function claudeAi(server: NormalizedServer): InstructionMode[] {
	if (!server.remote) {
		return [{
			label: 'Not supported',
			text: 'Claude.ai only supports remote MCP servers. Use a local client like Claude Code instead.',
			markdown: 'Claude.ai only supports remote MCP servers. Use a local client like Claude Code instead.',
		}];
	}

	const steps = [
		'Open Claude.ai and go to Settings',
		'Navigate to "Integrations" and click "Add more"',
		`Add a new integration with the URL: ${server.remote.url}`,
	].map((s, i) => `${i + 1}. ${s}`).join('\n');

	return [{
		label: 'Manual setup',
		text: steps,
		markdown: steps,
	}];
}
