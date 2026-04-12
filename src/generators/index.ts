import type {NormalizedServer, ClientInstructions, InstructionMode} from '../types';
import {claudeAi} from './claude-ai';
import {claudeCode} from './claude-code';
import {vscode} from './vscode';

export type ClientId = 'claude-ai' | 'claude-code' | 'vscode';

export const clients: Record<ClientId, {name: string; generate: (server: NormalizedServer) => InstructionMode[]}> = {
	'claude-ai': {name: 'Claude.ai', generate: claudeAi},
	'claude-code': {name: 'Claude Code', generate: claudeCode},
	vscode: {name: 'VS Code', generate: vscode},
};

export function generateForClient(server: NormalizedServer, clientId: ClientId): ClientInstructions {
	const client = clients[clientId];
	return {
		id: clientId,
		name: client.name,
		instructions: client.generate(server),
	};
}

export function generateForAll(server: NormalizedServer): ClientInstructions[] {
	return (Object.keys(clients) as ClientId[]).map((id) => generateForClient(server, id));
}
