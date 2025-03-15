
import React from 'react';
import Chat from '@/components/Chat';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h1 className="text-2xl font-bold text-brand-blue mb-2">AI Loan Assistant</h1>
          <p className="text-gray-600 mb-6">
            Ask questions about loans, eligibility, or get financial advice. You can type or use voice input.
          </p>
          <div className="h-[500px] border rounded-md overflow-hidden">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
