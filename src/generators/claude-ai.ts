import type {NormalizedServer, InstructionMode} from '../types';

export function claudeAi(server: NormalizedServer): InstructionMode[] {
	if (!server.remote) {
		return [];
	}

	const textSteps = [
		'Go to claude.ai/customize/connectors',
		'Click the + icon, then "Add custom connector"',
		`Enter the server URL: ${server.remote.url}`,
	].map((s, i) => `${i + 1}. ${s}`).join('\n');

	const mdSteps = [
		'Go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors)',
		'Click the + icon, then "Add custom connector"',
		`Enter the server URL: ${server.remote.url}`,
	].map((s, i) => `${i + 1}. ${s}`).join('\n');

	return [{
		label: 'Manual setup',
		text: textSteps,
		markdown: mdSteps,
	}];
}
