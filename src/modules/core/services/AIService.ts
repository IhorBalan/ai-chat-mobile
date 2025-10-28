/**
 * AI Service for OpenAI API integration
 * Provides methods to communicate with OpenAI's API
 */

// Configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// This will be set from environment variables at runtime
let apiKey: string | null = null;

/**
 * Initialize the API key from environment
 * Call this function at app startup
 */
export function initializeAPIKey(key: string): void {
  apiKey = key;
}

/**
 * Get the API key
 */
export function getAPIKey(): string | null {
  return apiKey;
}

/**
 * OpenAI Message interface
 */
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * OpenAI Chat Completion Request
 */
interface ChatCompletionRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

/**
 * OpenAI Chat Completion Response
 */
export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: OpenAIMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * AI Service Error
 */
export class AIServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

/**
 * Get AI completion from OpenAI API
 * @param messages Array of messages (conversation history)
 * @param options Configuration options
 * @returns Promise with AI response
 */
export async function getAICompletion(
  messages: OpenAIMessage[],
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> {
  if (!apiKey) {
    throw new AIServiceError(
      'OpenAI API key not initialized. Please call initializeAPIKey() first.'
    );
  }

  const { model = 'gpt-4o', temperature = 0.7, maxTokens = 1000 } = options;

  try {
    const requestBody: ChatCompletionRequest = {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    };

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new AIServiceError(
        errorData.error?.message ||
          `API request failed with status ${response.status}`,
        response.status
      );
    }

    const data: ChatCompletionResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new AIServiceError('No response from AI');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }

    throw new AIServiceError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Generate a simple AI response from user input
 * This is a convenience function for single-turn conversations
 * @param userMessage The user's message
 * @param systemPrompt Optional system prompt
 * @returns Promise with AI response
 */
export async function generateAIResponse(
  userMessage: string,
  systemPrompt?: string
): Promise<string> {
  const messages: OpenAIMessage[] = [];

  if (systemPrompt) {
    messages.push({
      role: 'system',
      content: systemPrompt,
    });
  }

  messages.push({
    role: 'user',
    content: userMessage,
  });

  return getAICompletion(messages);
}

/**
 * Stream AI completion from OpenAI API
 * Note: This implementation uses chunks but doesn't return a stream
 * For full streaming, you'd need to handle EventSource or similar
 * @param messages Array of messages
 * @param options Configuration options
 * @returns Promise with full AI response
 */
export async function streamAICompletion(
  messages: OpenAIMessage[],
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> {
  // For now, just use the regular completion
  // In a full implementation, you'd set stream: true and handle chunks
  return getAICompletion(messages, options);
}
