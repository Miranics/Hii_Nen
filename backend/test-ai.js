import dotenv from 'dotenv';
import { getAIResponse } from './config/ai.js';

// Load environment variables first
dotenv.config();

async function testHiiNenAI() {
  console.log('Testing HiiNen AI Co-founder...');
  console.log('GITHUB_TOKEN available:', process.env.GITHUB_TOKEN ? 'Yes' : 'No');
  
  try {
    const response = await getAIResponse('Hi, I\'m starting a new SaaS startup. Can you help me with market validation?');
    console.log('HiiNen AI Response:', response);
  } catch (error) {
    console.error('AI Test Error:', error);
  }
}

testHiiNenAI();
