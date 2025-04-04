# n8n Workflow MCP

An MCP (Model Calling Protocol) server for generating and managing n8n workflows based on natural language instructions or mermaid diagrams.

## Features

- Convert natural language instructions to n8n workflows
- Parse mermaid diagrams into workflow definitions
- Generate code for n8n Function nodes
- Dynamically create and deploy workflows to n8n
- Recommend node configurations based on intent

## Architecture

This MCP server exposes functionality via standard MCP protocol, allowing it to be used with any MCP-compatible client.

## Installation

```bash
npm install
npm start
```

## Configuration

Copy `.env.example` to `.env` and configure your n8n instance:

```
N8N_URL=http://localhost:5678
N8N_API_KEY=your_api_key
PORT=3001
```

## Usage

The MCP can be used by any MCP-compatible client. Example:

```javascript
// Example of calling the MCP from a client
const response = await fetch('http://localhost:3001/v1/mcp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    function: 'createWorkflowFromNL',
    parameters: {
      instruction: 'Create a workflow that sends a Slack message when a new GitHub issue is created'
    }
  })
});

const result = await response.json();
```

## API Functions

The MCP exposes the following functions:

- `createWorkflowFromNL`: Create a workflow from natural language
- `createWorkflowFromMermaid`: Create a workflow from a mermaid diagram
- `getSuggestedNodes`: Get suggested nodes for a specific intent
- `generateNodeCode`: Generate code for a Function node
- `deployWorkflow`: Deploy a workflow to n8n

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
