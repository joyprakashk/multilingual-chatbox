const SARVAM_API_KEY = "9e95e478-07bd-4d90-ad75-7cbefa3d8172";
const TRANSLATE_URL = "https://api.sarvam.ai/translate";
const TTS_URL = "https://api.sarvam.ai/text-to-speech";

export type ChatMessage = {
  content: string;
  role: "user" | "assistant";
  timestamp?: string;
};

// ✅ Fixed: Correct payload structure for translation
export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
  try {
    const response = await fetch(TRANSLATE_URL, {
      method: "POST",
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_language_code: sourceLang,
        target_language_code: targetLang,
        speaker_gender: "Male",
        mode: "classic-colloquial",
        model: "mayura:v1",
        enable_preprocessing: false,
        input: text
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.translated_text || "Translation not available";
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text if translation fails
  }
};

// ✅ Fixed: Improved Chat Assistant API call with correct translation
export const getChatResponse = async (messages: ChatMessage[], userLang: string): Promise<string> => {
  try {
    // Translate user input before sending it to AI
    const lastMessage = messages[messages.length - 1];
    const translatedUserMessage = await translateText(lastMessage.content, userLang, "en-IN");

    // Format the conversation history for AI processing
    const chatHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join("\n");
    
    const prompt = `
      You are Dhan AI, a multilingual financial assistant that helps users understand loan eligibility,
      guides them through the loan application process, and provides financial literacy tips.
      
      Current conversation in ${userLang}:
      ${chatHistory}
      
      Assistant:
    `;

    const response = await fetch(TRANSLATE_URL, {
      method: "POST",
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "sarvam-bhashini",
        prompt: prompt,
        max_tokens: 800,
        temperature: 0.7,
        stop: ["User:", "user:"]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const assistantReply = data.choices[0].text.trim();

    // ✅ Translate the assistant's response back to user’s language
    return await translateText(assistantReply, "en-IN", userLang);
  } catch (error) {
    console.error("Chat response error:", error);
    return "I apologize, but I am having trouble connecting to my knowledge base right now. Please try again later.";
  }
};

// ✅ Fixed: Added Text-to-Speech API call
export const textToSpeech = async (text: string, language: string): Promise<string> => {
  try {
    const response = await fetch(TTS_URL, {
      method: "POST",
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: language,
        speaker: "meera",
        pitch: 0,
        pace: 1.65,
        loudness: 1.5,
        speech_sample_rate: 8000,
        enable_preprocessing: false,
        model: "bulbul:v1",
        eng_interpolation_wt: 123,
        override_triplets: {}
      })
    });

    if (!response.ok) {
      throw new Error(`TTS API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.audio_url || "Audio not available";
  } catch (error) {
    console.error("TTS error:", error);
    return "Text-to-Speech conversion failed.";
  }
};
