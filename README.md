# mcp-install-instructions

Generate per-client install instructions for MCP servers. Supports remote (HTTP), stdio (local), and [MCP registry `server.json`](https://github.com/modelcontextprotocol/registry) inputs.

## Usage

```ts
import {generateInstallInstructions} from 'mcp-install-instructions';

// Remote server
const instructions = generateInstallInstructions({url: 'https://mcp.example.com/mcp'});

// Stdio server
const instructions = generateInstallInstructions({
  command: 'npx',
  args: ['-y', 'some-mcp-server'],
  env: {API_KEY: '...'},
});

// MCP registry server.json
const instructions = generateInstallInstructions({
  name: 'brave-search',
  packages: [{
    registryType: 'npm',
    identifier: '@anthropic/mcp-server-brave',
    runtimeHint: 'npx',
    transport: {type: 'stdio'},
    environmentVariables: [{name: 'BRAVE_API_KEY', description: 'Your Brave API key'}],
  }],
});

// Filter to a specific client
const instructions = generateInstallInstructions({url: 'https://mcp.example.com/mcp'}, {client: 'claude-code'});
```

Returns an array of `ClientInstructions`, each with an `instructions` array containing `{label, text, markdown}` for different install methods (e.g. CLI, JSON config, deep link).

Supported clients: `claude-ai`, `claude-code`, `vscode`.

## Contributing

Pull requests are welcomed on GitHub! To get started:

1. Install Git and Node.js
2. Clone the repository
3. Install dependencies with `npm install`
4. Run `npm run test` to run tests
5. Build with `npm run build`

## Releases

Versions follow the [semantic versioning spec](https://semver.org/).

To release:

1. Use `npm version <major | minor | patch>` to bump the version
2. Run `git push --follow-tags` to push with tags
3. Wait for GitHub Actions to publish to the NPM registry.
