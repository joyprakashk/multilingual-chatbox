
const SARVAM_API_KEY = '9e95e478-07bd-4d90-ad75-7cbefa3d8172';
const SARVAM_API_URL = 'https://api.sarvam.ai/translate'; // Update this if the actual endpoint is different

export type ChatMessage = {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: string;
};

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await fetch(SARVAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SARVAM_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sarvam-bhashini', // Replace with the appropriate model
        prompt: `Translate the following text to ${targetLanguage}: "${text}"`,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

export const getChatResponse = async (messages: ChatMessage[], language: string): Promise<string> => {
  try {
    // Format the conversation history for the API
    const chatHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    
    const prompt = `
      You are Dhan AI, a multilingual financial assistant that helps users understand loan eligibility,
      guides them through the loan application process, and provides financial literacy tips.
      
      Current conversation in ${language}:
      ${chatHistory}
      
      Assistant:
    `;

    const response = await fetch(SARVAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SARVAM_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sarvam-bhashini', // Replace with the appropriate model
        prompt: prompt,
        max_tokens: 800,
        temperature: 0.7,
        stop: ['User:', 'user:']
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Chat response error:', error);
    return 'I apologize, but I am having trouble connecting to my knowledge base right now. Please try again later.';
  }
};
