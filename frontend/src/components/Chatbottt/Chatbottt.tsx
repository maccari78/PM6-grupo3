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

  const helpOptions = ["Preguntas frecuentes", "Quiero alquilar mi vehiculo", "Quiero crearme una cuenta", "Como desactivar mi cuenta"]; 
	const flow = {
		start: {
			message: "Hola, Soy Pepito 👋! Bienvenido a YouDrive, estoy emocionado de que uses nuestro " +
				"chatbot 😊!",
			transition: {duration: 1000},
			path: "show_options"
		},
		show_options: {
			message: "Puedes preguntarme lo que quieras!",
			options: helpOptions,
			path: "process_options"
		},
		prompt_again: {
			message: "Necesitas alguna otra ayuda?",
			options: helpOptions,
			path: "process_options"
		},
		unknown_input: {
			message: "Disculpame, no comprendo tu mensaje 😢! Si necesitas ayuda personalizada, puedes clickear en " +
				"contacto",
			options: helpOptions,
			path: "process_options"
		},
		process_options: {
			transition: {duration: 0},
			chatDisabled: false,
			path: async (params:any) => {
				let link = "";
				let message = "";
				switch (params.userInput) {
				case "Preguntas frecuentes":
					link = "/answers";
					break;
				case "Quiero alquilar mi vehiculo":
				 	link = "/vehicleForm";
					break;
				case "Quiero crearme una cuenta":
					link = "/register";
					break;
				case "Como desactivar mi cuenta":
					link = "#";
					break;
				default:
					return "unknown_input";
				}
				await params.injectMessage("Ya mismo te redirijo hacia alli!");
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
