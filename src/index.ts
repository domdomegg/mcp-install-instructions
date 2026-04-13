import type {
	ServerInput, NormalizedServer, ClientInstructions, InstructionMode,
} from './types';
import {normalize} from './normalize';
import {chatgpt} from './generators/chatgpt';
import {claudeAi} from './generators/claude-ai';
import {claudeCode} from './generators/claude-code';
import {cline} from './generators/cline';
import {codex} from './generators/codex';
import {crush} from './generators/crush';
import {cursor} from './generators/cursor';
import {geminiCli} from './generators/gemini-cli';
import {goose} from './generators/goose';
import {hermes} from './generators/hermes';
import {librechat} from './generators/librechat';
import {opencode} from './generators/opencode';
import {openclaw} from './generators/openclaw';
import {rooCode} from './generators/roo-code';
import {vscode} from './generators/vscode';
import {windsurf} from './generators/windsurf';

export type {
	ServerInput, ClientInstructions, InstructionMode, NormalizedServer, RemoteServerInput, StdioServerInput, ServerJson,
} from './types';

const clients = {
	chatgpt: {name: 'ChatGPT', generate: chatgpt},
	'claude-ai': {name: 'Claude.ai', generate: claudeAi},
	'claude-code': {name: 'Claude Code', generate: claudeCode},
	cline: {name: 'Cline', generate: cline},
	codex: {name: 'Codex', generate: codex},
	crush: {name: 'Crush', generate: crush},
	cursor: {name: 'Cursor', generate: cursor},
	'gemini-cli': {name: 'Gemini CLI', generate: geminiCli},
	goose: {name: 'Goose', generate: goose},
	hermes: {name: 'Hermes', generate: hermes},
	librechat: {name: 'LibreChat', generate: librechat},
	opencode: {name: 'OpenCode', generate: opencode},
	openclaw: {name: 'OpenClaw', generate: openclaw},
	'roo-code': {name: 'Roo Code', generate: rooCode},
	vscode: {name: 'VS Code', generate: vscode},
	windsurf: {name: 'Windsurf', generate: windsurf},
} satisfies Record<string, {name: string; generate: (server: NormalizedServer) => InstructionMode[]}>;

export type ClientId = keyof typeof clients;

export function generateInstallInstructions(client: ClientId, server: ServerInput): ClientInstructions {
	const c = clients[client];
	const normalized = normalize(server);
	return {
		id: client,
		name: c.name,
		methods: c.generate(normalized),
	};
}
