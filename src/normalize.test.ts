import {test, expect, describe} from 'vitest';
import {normalize} from './normalize';

describe('normalize', () => {
	test('remote URL', () => {
		expect(normalize({url: 'https://mcp.example.com/mcp'})).toMatchInlineSnapshot(`
			{
			  "name": "mcp-example-com",
			  "remote": {
			    "transport": "http",
			    "url": "https://mcp.example.com/mcp",
			  },
			}
		`);
	});

	test('remote URL with SSE transport', () => {
		expect(normalize({url: 'https://example.com/sse', transport: 'sse'})).toMatchInlineSnapshot(`
			{
			  "name": "sse",
			  "remote": {
			    "transport": "sse",
			    "url": "https://example.com/sse",
			  },
			}
		`);
	});

	test('stdio', () => {
		expect(normalize({command: 'npx', args: ['-y', 'my-server'], env: {KEY: 'val'}})).toMatchInlineSnapshot(`
			{
			  "name": "my-server",
			  "stdio": {
			    "args": [
			      "-y",
			      "my-server",
			    ],
			    "command": "npx",
			    "env": {
			      "KEY": "val",
			    },
			  },
			}
		`);
	});

	test('serverJson with remote', () => {
		expect(normalize({name: 'test', remotes: [{type: 'sse', url: 'https://example.com/sse'}]})).toMatchInlineSnapshot(`
			{
			  "name": "test",
			  "remote": {
			    "transport": "sse",
			    "url": "https://example.com/sse",
			  },
			}
		`);
	});

	test('serverJson with package', () => {
		expect(normalize({
			name: 'brave',
			packages: [{
				registryType: 'npm',
				identifier: '@anthropic/mcp-server-brave',
				runtimeHint: 'npx',
				transport: {type: 'stdio'},
				environmentVariables: [{name: 'API_KEY', description: 'Key'}],
			}],
		})).toMatchInlineSnapshot(`
			{
			  "name": "brave",
			  "stdio": {
			    "args": [
			      "@anthropic/mcp-server-brave",
			    ],
			    "command": "npx",
			    "env": {
			      "API_KEY": "<Key>",
			    },
			  },
			}
		`);
	});

	test('name derived from hostname when path is /mcp', () => {
		expect(normalize({url: 'https://mcp.example.com/mcp'}).name).toBe('mcp-example-com');
	});

	test('name derived from path', () => {
		expect(normalize({url: 'https://example.com/my-server/mcp'}).name).toBe('my-server');
	});

	test('explicit name overrides derivation', () => {
		expect(normalize({url: 'https://mcp.example.com/mcp', name: 'custom'}).name).toBe('custom');
	});
});
