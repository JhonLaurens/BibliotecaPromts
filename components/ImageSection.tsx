import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Icon } from './icons';
import Spinner from './common/Spinner';
import { IMAGE_PROMPTS } from '../constants';

const API_KEY = process.env.API_KEY;

const ImageSection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Por favor, introduce un prompt.');
      return;
    }
     if (!API_KEY) {
      setError("Clave de API no encontrada. Por favor, configúrala en tus variables de entorno.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });
      
      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        const generatedUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        setImageUrl(generatedUrl);
      } else {
        setError('La generación de imagen falló. El modelo no devolvió ninguna imagen.');
      }
    } catch (e) {
      console.error(e);
      setError('Ocurrió un error durante la generación de la imagen. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePromptClick = (promptText: string) => {
    setPrompt(promptText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          Generador de Imágenes con IA
        </h2>
        <p className="mt-2 text-lg text-gray-400">
          Convierte tus ideas en imágenes asombrosas. Describe lo que quieres ver.
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col md:flex-row gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: Un plano cinematográfico de un robot meditando en un frondoso bosque futurista"
          rows={3}
          className="flex-grow bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="sparkles" className="w-5 h-5" />
          {isLoading ? 'Generando...' : 'Generar'}
        </button>
      </div>

      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      
      <div className="mt-8 w-full flex justify-center items-center">
        {isLoading && (
          <div className="w-full max-w-lg h-96 bg-gray-800 rounded-lg flex flex-col justify-center items-center border-2 border-dashed border-gray-600">
            <Spinner />
            <p className="mt-4 text-gray-400">Creando tu obra maestra...</p>
          </div>
        )}
        {!isLoading && imageUrl && (
            <div className="w-full max-w-lg">
                <img src={imageUrl} alt={prompt} className="rounded-lg shadow-2xl w-full h-full object-cover" />
                <a 
                    href={imageUrl} 
                    download={`ai-generada-${Date.now()}.jpeg`}
                    className="block text-center w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Descargar Imagen
                </a>
            </div>
        )}
        {!isLoading && !imageUrl && (
            <div className="w-full max-w-lg">
                <div className="h-96 bg-gray-800/50 rounded-lg flex flex-col justify-center items-center border-2 border-dashed border-gray-700 mb-8">
                    <Icon name="image" className="w-16 h-16 text-gray-600 mb-4" />
                    <p className="text-gray-500">Tu imagen generada aparecerá aquí.</p>
                </div>
                 <h3 className="text-xl font-semibold text-center text-gray-300 mb-4">O prueba uno de estos ejemplos:</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {IMAGE_PROMPTS.map((p) => (
                        <div key={p.id} onClick={() => handlePromptClick(p.prompt)} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-500 cursor-pointer transition-colors">
                            <p className="font-semibold text-purple-400 text-sm mb-1">{p.title}</p>
                            <p className="text-gray-400 text-xs">{p.description}</p>
                        </div>
                    ))}
                 </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
