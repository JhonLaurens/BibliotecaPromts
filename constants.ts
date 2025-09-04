import type { Prompt } from './types';

export const SOFTWARE_PROMPTS: Prompt[] = [
  {
    id: 1,
    category: 'Generación de Código',
    title: 'Componente React desde Descripción',
    description: 'Genera un componente funcional de React en TypeScript basado en una descripción.',
    prompt: 'Crea un componente funcional de React usando TypeScript y Tailwind CSS. El componente debe ser una tarjeta de perfil de usuario. Necesita aceptar props para `nombre` (string), `avatarUrl` (string), y `biografia` (string). La tarjeta debe tener una sombra sutil, esquinas redondeadas, y mostrar el avatar en un círculo.'
  },
  {
    id: 2,
    category: 'Generación de Código',
    title: 'Endpoint de API en Python',
    description: 'Genera un endpoint de Flask en Python para una tarea específica.',
    prompt: 'Escribe una función de Python usando el framework Flask para crear un nuevo endpoint de API `/api/usuarios`. Este endpoint debe manejar peticiones GET para devolver una lista JSON estática de usuarios y peticiones POST para añadir un nuevo usuario a la lista (en memoria). Incluye validación básica para la petición POST para asegurar que los campos `nombre` y `email` estén presentes.'
  },
  {
    id: 3,
    category: 'Depuración',
    title: 'Explicar y Corregir Bug',
    description: 'Analiza un fragmento de código, explica el bug y proporciona una versión corregida.',
    prompt: `Explica el bug en el siguiente código de JavaScript y proporciona la versión corregida. La función se supone que debe obtener datos y actualizar el estado, pero está causando un bucle infinito.

\`\`\`javascript
const [data, setData] = useState(null);

useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(json => setData(json));
}, [data]);
\`\`\``
  },
  {
    id: 4,
    category: 'Pruebas',
    title: 'Escribir Pruebas Unitarias',
    description: 'Genera pruebas unitarias para una función dada usando un framework específico.',
    prompt: 'Escribe un conjunto de pruebas unitarias para la siguiente función de utilidad de JavaScript usando el framework de pruebas Jest. Cubre casos extremos como arrays vacíos, arrays con un elemento y arrays con números duplicados. \n\nFunción a probar: `const findMax = (numbers) => Math.max(...numbers);`'
  },
  {
    id: 5,
    category: 'Documentación',
    title: 'Generar Comentarios de Código',
    description: 'Añade comentarios JSDoc completos a una función dada.',
    prompt: `Añade comentarios JSDoc completos a la siguiente función de TypeScript. Explica qué hace la función, cuáles son sus parámetros (incluyendo tipos), y qué devuelve.

\`\`\`typescript
export const calculateDiscount = (price: number, percentage: number): number => {
  if (percentage < 0 || percentage > 100) {
    throw new Error('El porcentaje debe estar entre 0 y 100.');
  }
  return price - (price * (percentage / 100));
}
\`\`\``
  },
   {
    id: 6,
    category: 'Refactorización',
    title: 'Refactorizar a Async/Await',
    description: 'Convierte una función basada en Promesas para usar la sintaxis moderna de async/await.',
    prompt: `Refactoriza la siguiente función de JavaScript, que usa .then() y .catch(), para usar la sintaxis async/await para una mejor legibilidad.

\`\`\`javascript
function getUserData(userId) {
  return fetch(\`https://api.example.com/users/\${userId}\`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error en fetch:', error);
    });
}
\`\`\``
  }
];

export const CHAT_PROMPTS: Prompt[] = [
  {
    id: 7,
    category: 'Creatividad',
    title: 'Cuentacuentos',
    description: 'Pide a la IA que genere una historia corta sobre cualquier tema.',
    prompt: 'Escribe una historia corta sobre un robot que descubre la música por primera vez.'
  },
  {
    id: 8,
    category: 'Productividad',
    title: 'Resumir Texto',
    description: 'Pega un texto largo y pide un resumen conciso.',
    prompt: 'Resume el siguiente artículo en tres puntos clave: [Pega el artículo aquí]'
  },
  {
    id: 9,
    category: 'Aprendizaje',
    title: 'Explicación Sencilla',
    description: 'Pide explicaciones complejas de forma sencilla.',
    prompt: 'Explícame qué es la computación cuántica como si tuviera 10 años.'
  },
  {
    id: 10,
    category: 'Planificación',
    title: 'Itinerario de Viaje',
    description: 'Genera un plan detallado para un viaje.',
    prompt: 'Crea un itinerario de 5 días para un viaje a Kioto, Japón, centrado en la cultura y la gastronomía.'
  },
];

export const IMAGE_PROMPTS: Prompt[] = [
  {
    id: 11,
    category: 'Fotorrealismo',
    title: 'Retrato Detallado',
    description: 'Un retrato fotorrealista de un anciano sabio con una barba larga y ojos penetrantes.',
    prompt: 'Un retrato fotorrealista y muy detallado de un anciano sabio, con una larga barba blanca, arrugas profundas que cuentan historias, y ojos amables pero penetrantes. Iluminación cinematográfica.'
  },
  {
    id: 12,
    category: 'Fantasía',
    title: 'Ciudad Flotante',
    description: 'Una majestuosa ciudad flotante en el cielo al atardecer, con cascadas que caen al vacío.',
    prompt: 'Arte digital épico de una majestuosa ciudad flotante en el cielo, durante un atardecer vibrante. Cascadas caen desde los bordes de la isla hacia las nubes. Estilo de fantasía, muy detallado.'
  },
  {
    id: 13,
    category: 'Cyberpunk',
    title: 'Gato Neón',
    description: 'Un gato Sphynx con implantes cyberpunk y ojos de neón, en un callejón lluvioso de una ciudad futurista.',
    prompt: 'Un gato Sphynx con intrincados implantes cyberpunk y brillantes ojos de neón, agazapado en un callejón oscuro y lluvioso de una ciudad futurista. Reflejos de neón en los charcos. Estilo cyberpunk, atmosférico.'
  },
  {
    id: 14,
    category: 'Surrealismo',
    title: 'Bosque de Cristal',
    description: 'Un bosque surrealista donde los árboles están hechos de cristal de colores y la luz se refracta a través de ellos.',
    prompt: 'Una pintura digital surrealista de un bosque donde todos los árboles están hechos de cristal de colores translúcido. La luz del sol se refracta a través de ellos creando un espectáculo de colores. Onírico y etéreo.'
  },
];
