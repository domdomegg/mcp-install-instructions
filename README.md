# mcp-install-instructions

Generate per-client install instructions for MCP servers. Supports remote (HTTP/SSE), stdio (local), and [MCP registry `server.json`](https://github.com/modelcontextprotocol/registry) inputs.

## Usage

```ts
import {generateInstallInstructions} from 'mcp-install-instructions';

// Remote server
const result = generateInstallInstructions('claude-code', {url: 'https://mcp.example.com/mcp'});

// SSE server
const result = generateInstallInstructions('cursor', {url: 'https://mcp.example.com/sse', transport: 'sse'});

// Stdio server
const result = generateInstallInstructions('vscode', {
  command: 'npx',
  args: ['-y', 'some-mcp-server'],
  env: {API_KEY: '...'},
});

// MCP registry server.json
const result = generateInstallInstructions('gemini-cli', {
  name: 'brave-search',
  packages: [{
    registryType: 'npm',
    identifier: '@anthropic/mcp-server-brave',
    runtimeHint: 'npx',
    transport: {type: 'stdio'},
    environmentVariables: [{name: 'BRAVE_API_KEY', description: 'Your Brave API key'}],
  }],
});
```

Returns a `ClientInstructions` object:

```json
{
  "id": "claude-code",
  "name": "Claude Code",
  "methods": [
    {
      "label": "Via Claude.ai",
      "text": "1. Add the server at claude.ai/customize/connectors with the URL: https://mcp.example.com/mcp\n2. It will automatically be available in Claude Code when logged in with the same account",
      "markdown": "1. Add the server at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) with the URL: https://mcp.example.com/mcp\n2. It will automatically be available in Claude Code when logged in with the same account"
    },
    {
      "label": "CLI",
      "text": "Run:\n\nclaude mcp add --transport http mcp-example-com https://mcp.example.com/mcp",
      "markdown": "Run:\n\n```sh\nclaude mcp add --transport http mcp-example-com https://mcp.example.com/mcp\n```"
    },
    {
      "label": "JSON config",
      "text": "Add to your Claude Code config (~/.claude.json or .mcp.json):\n\n\"mcpServers\": {\n  \"mcp-example-com\": {\n    \"type\": \"url\",\n    \"url\": \"https://mcp.example.com/mcp\"\n  }\n}",
      "markdown": "..."
    }
  ]
}
```

Each method has a `label`, plain `text`, and `markdown` with links and code blocks. Clients that don't support the server type (e.g. Claude.ai with stdio) return an empty `methods` array.

Supported clients: `chatgpt`, `claude-ai`, `claude-code`, `cline`, `codex`, `crush`, `cursor`, `gemini-cli`, `goose`, `hermes`, `librechat`, `opencode`, `openclaw`, `roo-code`, `vscode`, `windsurf`.

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
