const { getAIResponse } = require('./config/ai');

async function testAI() {
  console.log('Testing AI connection...');
  
  try {
    const response = await getAIResponse('Hello, are you working?');
    console.log('AI Response:', response);
  } catch (error) {
    console.error('AI Test Error:', error);
  }
}

testAI();
