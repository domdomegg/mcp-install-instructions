import type {NormalizedServer, InstructionMode} from '../types';

export function chatgpt(server: NormalizedServer): InstructionMode[] {
	if (!server.remote) {
		return [];
	}

	const textSteps = [
		'Go to Settings > Apps > Advanced settings and enable Developer mode',
		`Click "Create app" and enter the server URL: ${server.remote.url}`,
		'Select Developer mode from the Plus menu to use the server in conversations',
	].map((s, i) => `${i + 1}. ${s}`).join('\n');

	const mdSteps = [
		'Go to [Settings > Apps > Advanced settings](https://chatgpt.com/#settings/Connectors/Advanced) and enable Developer mode',
		`Click "Create app" and enter the server URL: ${server.remote.url}`,
		'Select Developer mode from the Plus menu to use the server in conversations',
	].map((s, i) => `${i + 1}. ${s}`).join('\n');

	return [{
		label: 'Manual setup (requires Pro, Plus, Business, Enterprise, or Education plan)',
		text: textSteps,
		markdown: mdSteps,
	}];
}
