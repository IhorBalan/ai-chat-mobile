import { useState, useCallback } from 'react';

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

// Mock AI responses
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

// Mock initial messages
const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    type: 'ai',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: 2,
    type: 'user',
    content: 'Hi! Can you help me with some questions about UI/UX design?',
    timestamp: new Date(Date.now() - 3300000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: 3,
    type: 'ai',
    content:
      "Absolutely! I'd be happy to help you with UI/UX design questions. What would you like to know?",
    timestamp: new Date(Date.now() - 3000000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: 4,
    type: 'user',
    content: 'What are the key principles of good UI design?',
    timestamp: new Date(Date.now() - 2700000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
  {
    id: 5,
    type: 'ai',
    content:
      "Great question! Here are the key principles of good UI design:\n\n1. **Clarity** - The interface should be easy to understand at a glance\n2. **Consistency** - Elements should behave and look similar throughout\n3. **Feedback** - Users should know what's happening through visual cues\n4. **Simplicity** - Avoid unnecessary complexity\n5. **Accessibility** - Design should be usable by everyone",
    timestamp: new Date(Date.now() - 2400000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
];

export function useChatService(): ChatService {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback((content: string) => {
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

    // Simulate AI response after a delay
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: getMockAIResponse(content),
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500); // 1.5 second delay to simulate AI processing
  }, []);

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
