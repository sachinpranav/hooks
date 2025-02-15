import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    key: 'DATABASE_URL',
    question: 'Enter your PostgreSQL database URL (format: postgresql://user:password@host:port/dbname): '
  },
  {
    key: 'GEMINI_API_KEY',
    question: 'Enter your Gemini AI API key: '
  }
];

const envContent = [];

async function askQuestions() {
  console.log('\n🚀 Setting up environment variables for Instagram Hooks Generator\n');
  
  for (const { key, question } of questions) {
    const answer = await new Promise(resolve => rl.question(question, resolve));
    envContent.push(`${key}=${answer}`);
  }

  fs.writeFileSync('.env', envContent.join('\n'));
  console.log('\n✅ Environment variables have been saved to .env file');
  console.log('\nNext steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run db:push');
  console.log('3. Start the app with: npm run dev\n');
  
  rl.close();
}

askQuestions().catch(console.error);
