import type {ServerInput, NormalizedServer, ServerJson} from './types';

function isServerJson(input: ServerInput): input is ServerJson {
	return 'name' in input && ('packages' in input || 'remotes' in input);
}

function isRemote(input: ServerInput): input is {url: string; name?: string; transport?: 'http' | 'sse'} {
	return 'url' in input && !('packages' in input || 'remotes' in input);
}

function nameFromUrl(url: string): string {
	const match = /^https?:\/\/([^/]+)(\/.*)?$/.exec(url);
	if (!match) {
		return 'mcp-server';
	}

	const hostname = match[1]!;
	const pathname = (match[2] ?? '').replace(/\/mcp\/?$/, '').replace(/^\/+|\/+$/g, '');
	return pathname || hostname.replace(/\./g, '-');
}

export function normalize(input: ServerInput): NormalizedServer {
	if (isServerJson(input)) {
		return normalizeServerJson(input);
	}

	if (isRemote(input)) {
		return {
			name: input.name ?? nameFromUrl(input.url),
			remote: {url: input.url, transport: input.transport ?? 'http'},
		};
	}

	// stdio
	return {
		name: input.name ?? input.args?.find((a) => !a.startsWith('-')) ?? input.command,
		stdio: {
			command: input.command,
			args: input.args ?? [],
			env: input.env ?? {},
		},
	};
}

function normalizeServerJson(json: ServerJson): NormalizedServer {
	const server: NormalizedServer = {name: json.name};

	if (json.remotes?.length) {
		const remote = json.remotes[0]!;
		server.remote = {url: remote.url, transport: remote.type === 'sse' ? 'sse' : 'http'};
	}

	if (json.packages?.length) {
		const pkg = json.packages[0]!;
		const command = pkg.runtimeHint ?? 'npx';
		const args: string[] = [];

		for (const arg of pkg.runtimeArguments ?? []) {
			if (arg.name) {
				args.push(arg.name);
			}

			if (arg.value) {
				args.push(arg.value);
			}
		}

		args.push(pkg.identifier);

		for (const arg of pkg.packageArguments ?? []) {
			if (arg.name) {
				args.push(arg.name);
			}

			if (arg.value) {
				args.push(arg.value);
			}
		}

		const env: Record<string, string> = {};
		for (const e of pkg.environmentVariables ?? []) {
			env[e.name] = e.value ?? `<${e.description ?? e.name}>`;
		}

		server.stdio = {command, args, env};
	}

	return server;
}
