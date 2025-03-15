
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-8">About Dhan AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h2 className="text-xl font-bold mb-2">What is Dhan AI?</h2>
          <div className="text-sm text-blue-500 mb-4">Instant Loans, Better Futures with DhanAI</div>
          
          <p className="mb-4">
            Dhan AI is a conversational assistant designed to help you understand loan
            eligibility, guide you through the loan application process, and provide financial
            literacy tips. What makes Dhan AI special is its ability to communicate in multiple
            languages, making financial information accessible to everyone regardless of
            their native language.
          </p>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h2 className="text-xl font-bold mb-2">Key Features</h2>
          <div className="text-sm text-blue-500 mb-4">What makes Dhan AI unique?</div>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="font-bold text-brand-blue mr-2">•</span>
              <div>
                <span className="font-semibold">Multilingual Support:</span> Communicate in your preferred language
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-brand-blue mr-2">•</span>
              <div>
                <span className="font-semibold">Voice Interaction:</span> Speak naturally with the assistant
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-brand-blue mr-2">•</span>
              <div>
                <span className="font-semibold">Loan Eligibility Calculator:</span> Get personalized loan estimates
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-brand-blue mr-2">•</span>
              <div>
                <span className="font-semibold">Financial Tips:</span> Learn best practices for financial health
              </div>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-brand-blue mr-2">•</span>
              <div>
                <span className="font-semibold">Loan Application Guidance:</span> Step-by-step assistance
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">How to Use Dhan AI</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h3 className="text-lg font-bold mb-3">Step 1: Choose Your Language</h3>
          <p className="text-gray-700">
            Select your preferred language from the dropdown menu in the top navigation bar. The entire
            application will be translated to your chosen language.
          </p>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h3 className="text-lg font-bold mb-3">Step 2: Ask Questions</h3>
          <p className="text-gray-700">
            Type or speak your questions about loans, eligibility, or financial advice in the chat interface.
            You can use your native language, and the assistant will respond in the same language.
          </p>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h3 className="text-lg font-bold mb-3">Step 3: Explore Tools</h3>
          <p className="text-gray-700">
            Use the loan eligibility calculator to get personalized estimates based on your financial
            situation. Browse the financial tips section for general advice on improving your financial health.
          </p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h3 className="text-lg font-bold mb-2">Is my data secure?</h3>
          <p className="text-gray-700">
            Yes, Dhan AI prioritizes your privacy and security. We do not store your conversations or personal information. All data is processed securely and is not shared with third parties.
          </p>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h3 className="text-lg font-bold mb-2">How accurate are the loan eligibility estimates?</h3>
          <p className="text-gray-700">
            The estimates provided are based on general lending criteria and are meant to give you a general idea of your eligibility. Actual loan approval depends on the specific lender's criteria and a comprehensive assessment of your financial situation.
          </p>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-6 border">
          <h3 className="text-lg font-bold mb-2">Which languages are supported?</h3>
          <p className="text-gray-700">
            Dhan AI currently supports multiple Indian languages including Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, and Assamese, in addition to English. We're continuously working to add more languages.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-sm p-6 border mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">Have questions or feedback about Dhan AI? We'd love to hear from you!</p>
        
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-blue-700 transition">
            Email Support
          </button>
          <button className="px-4 py-2 border border-brand-blue text-brand-blue rounded-md hover:bg-gray-50 transition">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
