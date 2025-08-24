import { create } from 'zustand';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversation: string | null;
  isLoading: boolean;
  setConversations: (conversations: Conversation[]) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setActiveConversation: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  messages: {},
  activeConversation: null,
  isLoading: false,
  setConversations: (conversations) => set({ conversations }),
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),
  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    })),
  setActiveConversation: (activeConversation) => set({ activeConversation }),
  setLoading: (isLoading) => set({ isLoading }),
}));