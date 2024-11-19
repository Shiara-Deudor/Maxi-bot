// api/chat.js
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const dotenv = require("dotenv");
  
  dotenv.config();
  
  const MODEL_NAME = "gemini-1.5-pro";
  const API_KEY = process.env.API_KEY;
  
  async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            { text: "You are Maxi, a friendly but professional and loyal assistant who works for Shiara..." } // Add your full user prompt here
          ],
        },
        {
          role: "model",
          parts: [
            { text: "Hello there! (´｡• ᵕ •｡) ♡  Nice to meet you! I'm Maxi, Shiara's friendly assistant. What can I do for you today? ٩(◕‿◕)۶\n" }
          ],
        },
      ],
    });
  
    const result = await chat.sendMessage(userInput);
    return result.response.text();
  }
  
  module.exports = async (req, res) => {
    if (req.method === "POST") {
      try {
        const { userInput } = req.body;
        if (!userInput) {
          return res.status(400).json({ error: "Invalid request body" });
        }
  
        const response = await runChat(userInput);
        return res.status(200).json({ response });
      } catch (error) {
        console.error("Error in chat API:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  };
  