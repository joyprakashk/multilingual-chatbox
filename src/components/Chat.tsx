
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { processWithGemini, ChatMessage } from '@/services/sarvamAIService';
import { useToast } from '@/components/ui/use-toast';

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your loan assistant. I can help you understand loan eligibility, guide you through the application process, and provide financial tips. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const { currentLanguage } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await processWithGemini("hi checking");
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicButton = () => {
    toast({
      title: "Voice input",
      description: "Voice input is not available yet.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const playAudio = () => {
    toast({
      title: "Audio playback",
      description: "Audio playback is not available yet.",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-brand-blue text-white'
                    : 'bg-brand-lightBlue text-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">{message.content}</div>
                  {message.role === 'assistant' && (
                    <button 
                      onClick={playAudio} 
                      className="ml-2 text-slate-500 hover:text-slate-700"
                      aria-label="Play audio"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-brand-lightBlue text-slate-800 rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-brand-blue animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMicButton}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Voice input"
          >
            <Mic className="h-5 w-5 text-gray-600" />
          </button>
          
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."

            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
            rows={1}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={isLoading || inputMessage.trim() === ''}
            className={`p-2 rounded-full ${
              isLoading || inputMessage.trim() === ''
                ? 'bg-gray-200 text-gray-400'
                : 'bg-brand-blue text-white hover:bg-blue-700'
            } transition`}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
