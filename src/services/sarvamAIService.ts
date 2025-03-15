import { GoogleGenerativeAI } from "@google/generative-ai";

// API Keys and URLs
const SARVAM_API_KEY = "5d280688-3449-4c40-b203-881c8657c1c1"; // Replace with your actual Sarvam API key
const GEMINI_API_KEY = "AIzaSyDVJle3NRhYEtRf6h2gczUUcvpI3Hi3Y6Q"; // Replace with your actual Gemini API key
const TRANSLATE_URL = "https://api.sarvam.ai/translate";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export type ChatMessage = {
  content: string;
  role: "user" | "assistant";
  timestamp?: string;
};

/**
 * Translates text from one language to another using Sarvam API
 * @param text - Text to translate
 * @param sourceLang - Source language code (e.g., "hi-IN")
 * @param targetLang - Target language code (e.g., "en-IN")
 * @returns Translated text
 */
export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
  try {
    const response = await fetch(TRANSLATE_URL, {
      method: "POST",
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: text,
        source_language_code: sourceLang,
        target_language_code: targetLang,
        speaker_gender: "Male",
        mode: "formal",
        enable_preprocessing: true
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.translated_text || "Translation not available";
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text if translation fails
  }
};

/**
 * Processes text with Google Gemini
 * @param text - Text to process with Gemini
 * @returns Gemini's response
 */
export const processWithGemini = async (text: string): Promise<string> => {
  try {
    const result = await model.generateContent(text);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Error processing your request with AI.";
  }
};

/**
 * Main function to handle multilingual input and get AI response
 * @param inputText - User input text in any supported language
 * @param inputLang - Language code of the input (e.g., "hi-IN")
 * @returns AI response in the original input language
 */
export const getMultilingualAIResponse = async (inputText: string, inputLang: string): Promise<string> => {
  try {
    // Step 1: Translate input to English (if not already in English)
    let translatedInput = inputText;
    if (inputLang !== "en-IN") {
      translatedInput = await translateText(inputText, inputLang, "en-IN");
    }
    
    // Step 2: Process the translated input with Gemini
    const geminiResponse = await processWithGemini(translatedInput);
    
    // Step 3: Translate Gemini's response back to the original language (if not English)
    if (inputLang !== "en-IN") {
      return await translateText(geminiResponse, "en-IN", inputLang);
    }
    
    return geminiResponse;
  } catch (error) {
    console.error("Error in multilingual processing:", error);
    
    // Return error message in the input language
    const errorMessage = "I apologize, but I encountered an error processing your request.";
    if (inputLang !== "en-IN") {
      try {
        return await translateText(errorMessage, "en-IN", inputLang);
      } catch {
        return errorMessage;
      }
    }
    return errorMessage;
  }
};

/**
 * Maintains a chat conversation with multilingual support
 */
export class MultilingualChatHandler {
  private messages: ChatMessage[] = [];
  private userLanguage: string;
  
  constructor(userLanguage: string = "en-IN") {
    this.userLanguage = userLanguage;
  }
  
  /**
   * Sets the user's preferred language
   */
  setLanguage(languageCode: string): void {
    this.userLanguage = languageCode;
  }
  
  /**
   * Adds a message to the conversation history
   */
  addMessage(message: ChatMessage): void {
    this.messages.push({
      ...message,
      timestamp: new Date().toISOString()
    });
  }
  
  /**
   * Gets conversation history
   */
  getMessages(): ChatMessage[] {
    return this.messages;
  }
  
  /**
   * Sends a user message and gets an AI response
   */
  async sendMessage(userInput: string): Promise<ChatMessage> {
    // Add user message to history
    this.addMessage({
      content: userInput,
      role: "user"
    });
    
    // Format conversation history for context
    const conversationContext = this.messages
      .slice(-5) // Include last 5 messages for context
      .map(msg => `${msg.role}: ${msg.content}`)
      .join("\n");
    
    // Process with multilingual pipeline
    const aiResponse = await getMultilingualAIResponse(
      `Previous conversation:\n${conversationContext}\n\nPlease respond to the latest message.`, 
      this.userLanguage
    );
    
    // Add AI response to history
    const assistantMessage: ChatMessage = {
      content: aiResponse,
      role: "assistant"
    };
    
    this.addMessage(assistantMessage);
    return assistantMessage;
  }
  
  /**
   * Clears the conversation history
   */
  clearConversation(): void {
    this.messages = [];
  }
}

// Example usage
async function runExample() {
  // Example with Hindi input
  const hindiInput = "मुझे लोन के बारे में जानकारी चाहिए";
  console.log("Processing Hindi input:", hindiInput);
  const hindiResponse = await getMultilingualAIResponse(hindiInput, "hi-IN");
  console.log("Response in Hindi:", hindiResponse);
  
  // Example with chat
  const chat = new MultilingualChatHandler("hi-IN");
  const response = await chat.sendMessage("नमस्ते, मैं आज कैसे मदद कर सकता हूं?");
  console.log("Chat response:", response.content);
}