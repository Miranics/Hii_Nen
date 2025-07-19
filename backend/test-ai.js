import dotenv from 'dotenv';
import { getAIResponse } from './config/ai.js';

// Load environment variables first
dotenv.config();

async function testAI() {
  console.log('Testing AI connection...');
  console.log('GITHUB_TOKEN available:', process.env.GITHUB_TOKEN ? 'Yes' : 'No');
  
  try {
    const response = await getAIResponse('Hello, are you working?');
    console.log('AI Response:', response);
  } catch (error) {
    console.error('AI Test Error:', error);
  }
}

testAI();
