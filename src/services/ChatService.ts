import { useState, useCallback } from 'react';
import {
  getAICompletion,
  type OpenAIMessage,
  AIServiceError,
} from './AIService';

export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface ChatService {
  messages: Message[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
}

// Mock AI responses as fallback
const getMockAIResponse = (userMessage: string): string => {
  const responses = [
    "That's an interesting question! Let me think about that for a moment.",
    "I understand what you're asking. Here's my perspective on that topic.",
    "Great point! Based on what you've shared, I'd like to explore this further.",
    'Thanks for bringing that up! Let me provide you with some insights on that.',
    "I appreciate you asking about that. Here's what I think might be helpful.",
  ];

  // Simple keyword-based responses
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! How can I help you today?';
  }

  if (
    lowerMessage.includes('how are you') ||
    lowerMessage.includes("how's it going")
  ) {
    return "I'm doing great, thank you for asking! How can I assist you?";
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'd be happy to help! What specific questions do you have?";
  }

  if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
    return "You're welcome! Is there anything else I can help you with?";
  }

  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return 'Goodbye! Feel free to reach out if you need anything else.';
  }

  // Return a random response for other messages
  return responses[Math.floor(Math.random() * responses.length)];
};

export function useChatService(): ChatService {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: Message = {
        id: Date.now(),
        type: 'user',
        content: content.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);

      setIsLoading(true);

      try {
        // Build conversation history from existing messages
        const conversationHistory: OpenAIMessage[] = [];

        // Add recent messages to context (last 10 messages for context)
        const recentMessages = messages.slice(-10);
        for (const msg of recentMessages) {
          conversationHistory.push({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content,
          });
        }

        // Add the current user message
        conversationHistory.push({
          role: 'user',
          content: content.trim(),
        });

        // Get AI response from OpenAI
        const aiContent = await getAICompletion(conversationHistory, {
          model: 'gpt-4o',
          temperature: 0.7,
          maxTokens: 1000,
        });

        const aiResponse: Message = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiContent,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, aiResponse]);
      } catch (error) {
        console.error('AI service error:', error);

        // Fallback to mock response if AI service fails
        const fallbackResponse: Message = {
          id: Date.now() + 1,
          type: 'ai',
          content:
            error instanceof AIServiceError
              ? `Sorry, I encountered an error: ${error.message}`
              : getMockAIResponse(content),
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, fallbackResponse]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
  };
}
