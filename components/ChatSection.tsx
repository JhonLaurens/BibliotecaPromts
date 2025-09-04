import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';
import { Icon } from './icons';
import Spinner from './common/Spinner';
import { CHAT_PROMPTS } from '../constants';

const API_KEY = process.env.API_KEY;

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = useCallback(() => {
    if (!API_KEY) {
      setError("Clave de API no encontrada. Por favor, configúrala en tus variables de entorno.");
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'Eres un asistente de IA útil y creativo.',
        },
      });
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Fallo al inicializar el modelo de IA. Por favor, revisa tu clave de API.");
    }
  }, []);

  useEffect(() => {
    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async (prompt?: string) => {
    const messageToSend = prompt || input;
    if (isLoading || !messageToSend.trim()) return;

    if (!chatRef.current) {
        setError("El chat no está inicializado. Por favor, revisa tu clave de API.");
        return;
    }

    setIsLoading(true);
    setError(null);
    const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: messageToSend }] };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    try {
      const stream = await chatRef.current.sendMessageStream({ message: messageToSend });
      
      let currentModelMessage = "";
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "" }] }]);

      for await (const chunk of stream) {
        currentModelMessage += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: currentModelMessage }]};
          return newMessages;
        });
      }
    } catch (e) {
      console.error(e);
      setError("Ocurrió un error al comunicarse con la IA. Por favor, intenta de nuevo.");
      // Remove the empty model message on error
      setMessages(prev => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[80vh] bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
      <div className="p-4 border-b border-gray-700 text-center">
        <h2 className="text-xl font-bold text-purple-400">Chat con IA</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-400">
              <h3 className="text-lg font-semibold mb-4">¿Cómo puedo ayudarte hoy?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHAT_PROMPTS.map((prompt) => (
                  <button key={prompt.id} onClick={() => handlePromptClick(prompt.prompt)} className="bg-gray-700 p-4 rounded-lg text-left hover:bg-gray-600 transition-colors">
                    <p className="font-semibold text-purple-400">{prompt.title}</p>
                    <p className="text-sm text-gray-300">{prompt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-md p-3 rounded-lg ${
                  msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
              </div>
            </div>
          ))}
           {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="max-w-md p-3 rounded-lg bg-gray-700 text-gray-200">
                <Spinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {error && <div className="p-4 text-red-400 text-center border-t border-gray-700">{error}</div>}
      <div className="p-4 border-t border-gray-700 flex items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pregúntame lo que sea..."
          disabled={isLoading}
          className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="send" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
