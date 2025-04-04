/**
 * MCP Schema definition
 */
module.exports = {
  schema_version: "v1",
  name: "n8n-workflow-mcp",
  description: "An MCP server for generating and managing n8n workflows from natural language or mermaid diagrams",
  contact_email: "",
  functions: [
    {
      name: "createWorkflowFromNL",
      description: "Create an n8n workflow from natural language instructions",
      parameters: {
        type: "object",
        properties: {
          instruction: {
            type: "string",
            description: "Natural language description of the desired workflow"
          }
        },
        required: ["instruction"]
      },
      returns: {
        type: "object",
        properties: {
          workflow: {
            type: "object",
            description: "The generated n8n workflow definition"
          },
          message: {
            type: "string",
            description: "Status message"
          }
        }
      }
    },
    {
      name: "createWorkflowFromMermaid",
      description: "Create an n8n workflow from a mermaid diagram",
      parameters: {
        type: "object",
        properties: {
          diagram: {
            type: "string",
            description: "Mermaid diagram describing the workflow"
          }
        },
        required: ["diagram"]
      },
      returns: {
        type: "object",
        properties: {
          workflow: {
            type: "object",
            description: "The generated n8n workflow definition"
          },
          message: {
            type: "string",
            description: "Status message"
          }
        }
      }
    },
    {
      name: "getSuggestedNodes",
      description: "Get suggested n8n nodes for a specific workflow intent",
      parameters: {
        type: "object",
        properties: {
          intent: {
            type: "string",
            description: "Description of the workflow intent"
          }
        },
        required: ["intent"]
      },
      returns: {
        type: "object",
        properties: {
          suggestions: {
            type: "array",
            description: "List of suggested nodes",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Node name"
                },
                type: {
                  type: "string",
                  description: "Node type"
                },
                purpose: {
                  type: "string",
                  description: "Node purpose"
                },
                order: {
                  type: "number",
                  description: "Suggested order in workflow"
                }
              }
            }
          },
          message: {
            type: "string",
            description: "Status message"
          }
        }
      }
    },
    {
      name: "generateNodeCode",
      description: "Generate JavaScript code for an n8n Function node",
      parameters: {
        type: "object",
        properties: {
          purpose: {
            type: "string",
            description: "Purpose of the function"
          },
          inputs: {
            type: "array",
            description: "Input variable descriptions",
            items: {
              type: "string"
            }
          },
          outputs: {
            type: "array",
            description: "Expected output variable descriptions",
            items: {
              type: "string"
            }
          }
        },
        required: ["purpose"]
      },
      returns: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "Generated JavaScript code"
          },
          message: {
            type: "string",
            description: "Status message"
          }
        }
      }
    },
    {
      name: "deployWorkflow",
      description: "Deploy a workflow to n8n",
      parameters: {
        type: "object",
        properties: {
          workflow: {
            type: "object",
            description: "n8n workflow definition"
          },
          activate: {
            type: "boolean",
            description: "Whether to activate the workflow"
          }
        },
        required: ["workflow"]
      },
      returns: {
        type: "object",
        properties: {
          workflowId: {
            type: "string",
            description: "ID of the deployed workflow"
          },
          message: {
            type: "string",
            description: "Status message"
          }
        }
      }
    }
  ]
};
