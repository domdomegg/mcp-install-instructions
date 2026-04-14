import type {
	ServerInput, NormalizedServer, ClientInstructions, InstructionMode,
} from './types';
import {normalize} from './normalize';
import {amp} from './generators/amp';
import {antigravity} from './generators/antigravity';
import {chatgpt} from './generators/chatgpt';
import {claudeAi} from './generators/claude-ai';
import {claudeCode} from './generators/claude-code';
import {cline} from './generators/cline';
import {codex} from './generators/codex';
import {commandCode} from './generators/command-code';
import {copilotCli} from './generators/copilot-cli';
import {crush} from './generators/crush';
import {cursor} from './generators/cursor';
import {factoryCli} from './generators/factory-cli';
import {geminiCli} from './generators/gemini-cli';
import {geminiCodeAssist} from './generators/gemini-code-assist';
import {goose} from './generators/goose';
import {hermes} from './generators/hermes';
import {jetbrains} from './generators/jetbrains';
import {katalon} from './generators/katalon';
import {kiro} from './generators/kiro';
import {librechat} from './generators/librechat';
import {mistralVibe} from './generators/mistral-vibe';
import {opencode} from './generators/opencode';
import {openclaw} from './generators/openclaw';
import {qoder} from './generators/qoder';
import {qoderCli} from './generators/qoder-cli';
import {rooCode} from './generators/roo-code';
import {visualStudio} from './generators/visual-studio';
import {vscode} from './generators/vscode';
import {warp} from './generators/warp';
import {windsurf} from './generators/windsurf';

export type {
	ServerInput, ClientInstructions, InstructionMode, NormalizedServer, RemoteServerInput, StdioServerInput, ServerJson,
} from './types';

const clients = {
	amp: {name: 'Amp', generate: amp},
	antigravity: {name: 'Antigravity', generate: antigravity},
	chatgpt: {name: 'ChatGPT', generate: chatgpt},
	'claude-ai': {name: 'Claude.ai', generate: claudeAi},
	'claude-code': {name: 'Claude Code', generate: claudeCode},
	cline: {name: 'Cline', generate: cline},
	codex: {name: 'Codex', generate: codex},
	'command-code': {name: 'Command Code', generate: commandCode},
	'copilot-cli': {name: 'Copilot CLI', generate: copilotCli},
	crush: {name: 'Crush', generate: crush},
	cursor: {name: 'Cursor', generate: cursor},
	'factory-cli': {name: 'Factory CLI', generate: factoryCli},
	'gemini-cli': {name: 'Gemini CLI', generate: geminiCli},
	'gemini-code-assist': {name: 'Gemini Code Assist', generate: geminiCodeAssist},
	goose: {name: 'Goose', generate: goose},
	hermes: {name: 'Hermes', generate: hermes},
	jetbrains: {name: 'JetBrains AI Assistant & Junie', generate: jetbrains},
	katalon: {name: 'Katalon Studio', generate: katalon},
	kiro: {name: 'Kiro', generate: kiro},
	librechat: {name: 'LibreChat', generate: librechat},
	'mistral-vibe': {name: 'Mistral Vibe', generate: mistralVibe},
	opencode: {name: 'OpenCode', generate: opencode},
	openclaw: {name: 'OpenClaw', generate: openclaw},
	qoder: {name: 'Qoder', generate: qoder},
	'qoder-cli': {name: 'Qoder CLI', generate: qoderCli},
	'roo-code': {name: 'Roo Code', generate: rooCode},
	'visual-studio': {name: 'Visual Studio', generate: visualStudio},
	vscode: {name: 'VS Code', generate: vscode},
	warp: {name: 'Warp', generate: warp},
	windsurf: {name: 'Windsurf', generate: windsurf},
} satisfies Record<string, {name: string; generate: (server: NormalizedServer) => InstructionMode[]}>;

export type ClientId = keyof typeof clients;

export const clientIds = Object.keys(clients) as ClientId[];

export function generateInstallInstructions(client: ClientId, server: ServerInput): ClientInstructions {
	const c = clients[client];
	const normalized = normalize(server);
	return {
		id: client,
		name: c.name,
		methods: c.generate(normalized),
	};
}
