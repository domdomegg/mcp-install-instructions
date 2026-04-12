import type {ServerInput, ClientInstructions} from './types';
import {normalize} from './normalize';
import {generateForClient, generateForAll, type ClientId} from './generators';

export type {
	ServerInput, ClientInstructions, InstructionMode, NormalizedServer, RemoteServerInput, StdioServerInput, ServerJson,
} from './types';
export type {ClientId} from './generators';

export function generateInstallInstructions(server: ServerInput, options?: {client?: ClientId}): ClientInstructions[] {
	const normalized = normalize(server);
	if (options?.client) {
		return [generateForClient(normalized, options.client)];
	}

	return generateForAll(normalized);
}
