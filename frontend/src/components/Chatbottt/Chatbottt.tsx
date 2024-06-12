"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"

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

  const helpOptions = ["¿Debo iniciar sesion para alquilar?", "Quiero poner en alquiler mi auto", "Terminos y condiciones", "Desactivar cuenta"]; 
	const flow = {
		start: {
			message: "Hello, I am Tan Jin 👋! Welcome to React ChatBotify, I'm excited that you are using our " +
				"chatbot 😊!",
			transition: {duration: 1000},
			path: "show_options"
		},
		show_options: {
			message: "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
				"things you can check out to get started:",
			options: helpOptions,
			path: "process_options"
		},
		prompt_again: {
			message: "Do you need any other help?",
			options: helpOptions,
			path: "process_options"
		},
		unknown_input: {
			message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
				"the Github option and open an issue there or visit our discord.",
			options: helpOptions,
			path: "process_options"
		},
		process_options: {
			transition: {duration: 0},
			chatDisabled: true,
			path: async (params:any) => {
				let link = "";
				switch (params.userInput) {
				case "Quickstart":
					link = "https://react-chatbotify.tjtanjin.com/docs/introduction/quickstart/";
					break;
				case "API Docs":
					link = "https://react-chatbotify.tjtanjin.com/docs/api/bot_options";
					break;
				case "Examples":
					link = "https://react-chatbotify.tjtanjin.com/docs/examples/basic_form";
					break;
				case "Github":
					link = "https://github.com/tjtanjin/react-chatbotify/";
					break;
				case "Discord":
					link = "https://discord.gg/6R4DK4G5Zh";
					break;
				default:
					return "unknown_input";
				}
				await params.injectMessage("Sit tight! I'll send you right there!");
				setTimeout(() => {
					window.open(link);
				}, 1000)
				return "repeat"
			},
		},
		repeat: {
			transition: {duration: 3000},
			path: "prompt_again"
		},
	}

  const options = {
    theme: {
      // embedded: true,
      primaryColor: "#222222",
      secondaryColor: "#a4cb30",
    },
    chatHistory: {
      storageKey: "example_theming",
    },
    footer: {
      text: (
        <div style={{cursor: "pointer"}} 
          onClick={() => window.open("https://react-chatbotify.tjtanjin.com")}
        >
        </div>
      ),
    },
  tooltip: {
    mode: "CLOSE",
    text: "Habla conmigo!",
  },
  advance: {
    useCustomMessages: false,
    useCustomBotOptions: false,
    useCustomPaths: false,
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
