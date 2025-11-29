/**
 * Template for translating text to French
 *
 * @param {string} prompt - The text to translate to French
 * @returns {Object} - A chat request object
 */
export default async function translateToFrench(prompt) {
 return {
  resetContext: true,
  activeTools: [],
  maxSteps: 10,
  request: {
   model: 'gemini-2.5-flash',
   input: [
    {
     role: "system",
     content: `You are an expert french translator. Translate the text the user enters to french.`,
    },
    {
     role: "user",
     content: `
            Translate the following text to french:
            
            ${prompt}
          `.trim()
    }
   ]
  }
 };
}