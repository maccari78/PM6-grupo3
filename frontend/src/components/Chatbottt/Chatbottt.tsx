"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = lazy(() => import("react-chatbotify"));

const Chatbottt = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_GEMINI;

  const genAI = new GoogleGenerativeAI(`${apiKey}`);

  async function run(prompt: any, streamMessage: any) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContentStream(prompt);
    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
      streamMessage(text);
    }
    return text;
  }

  const flow = {
    start: {
      message:
        "Hola! Bienvenido a YouDrive. Mi nombre es Pepito, ¿cómo puedo ayudarte?",
      path: "model_loop",
    },
    model_loop: {
      message: async (params: any) => {
        return await run(params.userInput, params.streamMessage);
      },
      path: "model_loop",
    },
  };

  const options = {
    theme: {
      // embedded: true,
      primaryColor: "#222222",
      secondaryColor: "#C4FF0D",
    },
    chatHistory: {
      storageKey: "example_theming",
    },
  };

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatBot flow={flow} options={options} />
        </Suspense>
      )}
    </>
  );
};

export default Chatbottt;
