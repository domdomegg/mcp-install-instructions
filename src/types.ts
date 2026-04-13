/** Remote MCP server (streamable HTTP or SSE) */
export type RemoteServerInput = {
	url: string;
	name?: string;
	transport?: 'http' | 'sse';
};

/** Local MCP server (stdio) */
export type StdioServerInput = {
	command: string;
	args?: string[];
	env?: Record<string, string>;
	name?: string;
};

/**
 * Subset of the MCP registry server.json schema.
 * See https://github.com/modelcontextprotocol/registry
 */
export type ServerJson = {
	name: string;
	packages?: ServerJsonPackage[];
	remotes?: ServerJsonRemote[];
};

export type ServerJsonPackage = {
	registryType: string;
	identifier: string;
	version?: string;
	runtimeHint?: string;
	runtimeArguments?: ServerJsonArgument[];
	packageArguments?: ServerJsonArgument[];
	environmentVariables?: ServerJsonKeyValue[];
	transport: {
		type: string;
	};
};

export type ServerJsonRemote = {
	type: string;
	url: string;
};

export type ServerJsonArgument = {
	type: 'positional' | 'named';
	name?: string;
	value?: string;
	valueHint?: string;
	isRequired?: boolean;
};

export type ServerJsonKeyValue = {
	name: string;
	value?: string;
	description?: string;
	isRequired?: boolean;
	isSecret?: boolean;
};

export type ServerInput = RemoteServerInput | StdioServerInput | ServerJson;

/** Normalized internal representation used by generators */
export type NormalizedServer = {
	name: string;
	remote?: {url: string; transport: 'http' | 'sse'};
	stdio?: {command: string; args: string[]; env: Record<string, string>};
};

export type InstructionMode = {
	label: string;
	text: string;
	markdown: string;
};

export type ClientInstructions = {
	id: string;
	name: string;
	methods: InstructionMode[];
};
