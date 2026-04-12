import {test, expect} from 'vitest';
import {generateInstallInstructions} from './index';

test('remote URL generates instructions for all clients', () => {
	const results = generateInstallInstructions({url: 'https://mcp.example.com/mcp'});
	expect(results).toHaveLength(3);
	expect(results.map((r) => r.id)).toEqual(['claude-ai', 'claude-code', 'vscode']);
});

test('remote URL: claude-code has CLI and JSON modes', () => {
	const [cc] = generateInstallInstructions({url: 'https://mcp.example.com/mcp'}, {client: 'claude-code'});
	expect(cc!.instructions).toHaveLength(2);
	expect(cc!.instructions[0]!.label).toBe('CLI');
	expect(cc!.instructions[0]!.markdown).toContain('claude mcp add');
	expect(cc!.instructions[1]!.label).toBe('JSON config');
	expect(cc!.instructions[1]!.markdown).toContain('"type": "url"');
});

test('remote URL: claude-ai has manual setup', () => {
	const [ca] = generateInstallInstructions({url: 'https://mcp.example.com/mcp'}, {client: 'claude-ai'});
	expect(ca!.instructions).toHaveLength(1);
	expect(ca!.instructions[0]!.markdown).toContain('https://mcp.example.com/mcp');
});

test('remote URL: vscode has deep link and JSON modes', () => {
	const [vs] = generateInstallInstructions({url: 'https://mcp.example.com/mcp'}, {client: 'vscode'});
	expect(vs!.instructions).toHaveLength(2);
	expect(vs!.instructions[0]!.label).toBe('One-click install');
	expect(vs!.instructions[0]!.markdown).toContain('vscode:mcp/install?');
	expect(vs!.instructions[1]!.label).toBe('JSON config');
});

test('stdio server generates instructions', () => {
	const results = generateInstallInstructions({
		command: 'npx',
		args: ['-y', 'some-mcp-server'],
		env: {API_KEY: 'test'},
	});
	expect(results).toHaveLength(3);

	const cc = results.find((r) => r.id === 'claude-code')!;
	expect(cc.instructions[0]!.markdown).toContain('claude mcp add');
	expect(cc.instructions[0]!.markdown).toContain('some-mcp-server');

	const ca = results.find((r) => r.id === 'claude-ai')!;
	expect(ca.instructions[0]!.label).toBe('Not supported');
});

test('stdio: vscode has no deep link', () => {
	const [vs] = generateInstallInstructions({command: 'npx', args: ['-y', 'some-server']}, {client: 'vscode'});
	expect(vs!.instructions).toHaveLength(1);
	expect(vs!.instructions[0]!.label).toBe('JSON config');
});

test('name is derived from URL path', () => {
	const [cc] = generateInstallInstructions({url: 'https://mcp.example.com/mcp'}, {client: 'claude-code'});
	expect(cc!.instructions[0]!.text).toContain('mcp-example-com');
});

test('name can be overridden', () => {
	const [cc] = generateInstallInstructions({url: 'https://mcp.example.com/mcp', name: 'my-server'}, {client: 'claude-code'});
	expect(cc!.instructions[0]!.text).toContain('my-server');
});

test('serverJson with remote', () => {
	const results = generateInstallInstructions({
		name: 'test-server',
		remotes: [{type: 'streamable-http', url: 'https://mcp.example.com/mcp'}],
	});
	const cc = results.find((r) => r.id === 'claude-code')!;
	expect(cc.instructions[0]!.markdown).toContain('https://mcp.example.com/mcp');
});

test('serverJson with package', () => {
	const results = generateInstallInstructions({
		name: 'brave-search',
		packages: [{
			registryType: 'npm',
			identifier: '@anthropic/mcp-server-brave',
			runtimeHint: 'npx',
			transport: {type: 'stdio'},
			environmentVariables: [{name: 'BRAVE_API_KEY', description: 'Your Brave API key', isRequired: true}],
		}],
	});
	const cc = results.find((r) => r.id === 'claude-code')!;
	expect(cc.instructions[0]!.markdown).toContain('@anthropic/mcp-server-brave');
	expect(cc.instructions[1]!.markdown).toContain('BRAVE_API_KEY');
});
