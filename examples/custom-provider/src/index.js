process.env.OPENAI_API_KEY = 'sk-...'

const { TestManager, registerProvider } = require('mcp-testing-framework')
const { MyCustomProvider } = require('./provider/custom-provider')

const main = async () => {
  registerProvider('my-custom', MyCustomProvider)

  const tester = new TestManager({
    // Number of rounds for each model test execution
    testRound: 10,
    // Minimum threshold for passing tests (decimal between 0-1)
    passThreshold: 0.8,
    // List of models to test
    modelsToTest: [
      'openai:gpt-4o',
      'openai:gpt-4o-mini',
      // 'my-custom:my-custom-model', // custom provider example
    ],
    // Test case definitions
    testCases: [
      {
        prompt:
          'Help me calculate my BMI index, my weight is 90kg, my height is 180cm',
        expectedOutput: {
          serverName: 'example-server',
          toolName: 'calculate-bmi',
          parameters: {
            weightKg: 90,
            heightM: 1.8,
          },
        },
      },
    ],
    // MCP server configuration
    mcpServers: [
      {
        name: 'example-server',
        url: 'http://caculate-bmi.mcp-testing-framework.tech/sse',
      },
    ],
  })

  await tester.evaluate()
}

main().catch(console.error)
