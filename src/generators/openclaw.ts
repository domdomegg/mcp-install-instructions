import type {NormalizedServer, InstructionMode} from '../types';

function configJson(server: NormalizedServer): string {
	let entry: Record<string, unknown>;
	if (server.remote) {
		entry = {url: server.remote.url};
	} else {
		entry = {
			command: server.stdio!.command,
			args: server.stdio!.args,
		};
		if (Object.keys(server.stdio!.env).length > 0) {
			entry.env = server.stdio!.env;
		}
	}

	return JSON.stringify({mcp: {servers: {[server.name]: entry}}}, null, 2);
}

export function openclaw(server: NormalizedServer): InstructionMode[] {
	const json = configJson(server);
	const modes: InstructionMode[] = [];

	modes.push({
		label: 'CLI',
		text: `Run:\n\nopenclaw mcp set ${server.name} '${JSON.stringify(server.remote ? {url: server.remote.url} : {command: server.stdio!.command, args: server.stdio!.args})}'`,
		markdown: `Run:\n\n\`\`\`sh\nopenclaw mcp set ${server.name} '${JSON.stringify(server.remote ? {url: server.remote.url} : {command: server.stdio!.command, args: server.stdio!.args})}'\n\`\`\``,
	});

	modes.push({
		label: 'JSON config',
		text: `Add to your OpenClaw config (run openclaw config to find the file):\n\n${json}`,
		markdown: `Add to your OpenClaw config (run \`openclaw config\` to find the file):\n\n\`\`\`json\n${json}\n\`\`\``,
	});

	return modes;
}
