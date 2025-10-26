import Constants from 'expo-constants';
import { initializeAPIKey } from '../services/AIService';

/**
 * Initialize API configuration
 * Call this function at app startup before using AI services
 */
export function initializeAPIConfig(): void {
  const apiKey =
    Constants.expoConfig?.extra?.openaiApiKey || process.env.OPENAI_API_KEY;

  if (apiKey) {
    initializeAPIKey(apiKey);
    console.log('✅ OpenAI API key loaded successfully');
  } else {
    console.warn(
      '⚠️ OpenAI API key not found. Set OPENAI_API_KEY in your .env file or app.config.js'
    );
  }
}

/**
 * Get the OpenAI API key
 */
export function getAPIKey(): string | undefined {
  return (
    Constants.expoConfig?.extra?.openaiApiKey || process.env.OPENAI_API_KEY
  );
}
