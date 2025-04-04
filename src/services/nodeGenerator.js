const { OpenAI } = require('openai');
const n8nService = require('./n8nService');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Suggest nodes based on intent
 * @param {string} intent - The user's intent
 * @returns {Array} - Array of suggested nodes
 */
async function suggestNodes(intent) {
  try {
    // Get available n8n nodes
    const availableNodes = await n8nService.getAvailableNodes();
    
    // Use OpenAI to suggest appropriate nodes
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert in n8n workflows and nodes. Your task is to suggest the most appropriate n8n nodes for a specific intent.
          
Given the following list of available nodes in the user's n8n instance, suggest which nodes would be best for their workflow intent.

Available nodes: ${JSON.stringify(availableNodes.map(node => node.name))}

Provide your output as a JSON array of objects with these properties:
- name: The name of the node
- type: The node type (e.g., 'n8n-nodes-base.webhook')
- purpose: A brief description of how this node will be used in the workflow
- order: The suggested order in the workflow (1 for first node, etc.)

Suggest only the most relevant nodes (maximum 5) that directly address the user's intent.`
        },
        {
          role: "user",
          content: `My workflow intent: ${intent}`
        }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const suggestions = JSON.parse(response.choices[0].message.content);
    return suggestions.suggestions || [];
  } catch (error) {
    console.error('Error suggesting nodes:', error);
    throw new Error('Failed to suggest nodes. Please try with a more specific intent.');
  }
}

/**
 * Generate code for a Function node
 * @param {string} purpose - The purpose of the function
 * @param {Array} inputs - Array of input variable descriptions
 * @param {Array} outputs - Array of expected output variable descriptions
 * @returns {string} - Generated JavaScript code
 */
async function generateFunctionCode(purpose, inputs = [], outputs = []) {
  try {
    // Prepare inputs and outputs information
    const inputsStr = inputs.length > 0 
      ? `Expected inputs: ${inputs.join(', ')}` 
      : 'No specific inputs provided';
    
    const outputsStr = outputs.length > 0 
      ? `Expected outputs: ${outputs.join(', ')}` 
      : 'No specific outputs provided';
    
    // Use OpenAI to generate function code
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert JavaScript developer specializing in n8n Function nodes. Your task is to write JavaScript code for an n8n Function node.

n8n Function nodes:
- Receive input data via the 'items' variable
- Must return an array of items as output
- Can use the 'helpers' object for utility functions
- Should follow n8n best practices

Write clean, efficient code that accomplishes the specified purpose.
Include comments explaining the logic.
Handle potential errors and edge cases.
Format your response as ONLY the JavaScript code, with no additional explanations.`
        },
        {
          role: "user",
          content: `Please write the JavaScript code for a Function node with this purpose: ${purpose}

${inputsStr}
${outputsStr}

The code should be fully functional within an n8n Function node.`
        }
      ],
      temperature: 0.2
    });

    // Return the generated code
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating function code:', error);
    throw new Error('Failed to generate function code. Please try with a more specific purpose.');
  }
}

module.exports = {
  suggestNodes,
  generateFunctionCode
};
