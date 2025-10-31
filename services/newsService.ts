import { GoogleGenAI, Type } from '@google/genai';
import { Article } from '../types';
import { Language } from "../App";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const articleSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The headline of the news article." },
    description: { type: Type.STRING, description: "A brief summary of the news article." },
    url: { type: Type.STRING, description: "The direct URL to the full article." },
    image: { type: Type.STRING, description: "The URL of the main image associated with the article." },
    publishedAt: { type: Type.STRING, description: "The publication date in ISO 8601 format." },
    source: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The name of the news source (e.g., 'Reuters')." },
      },
      required: ['name'],
    },
  },
  required: ['title', 'description', 'url', 'image', 'publishedAt', 'source'],
};

const schema = {
  type: Type.ARRAY,
  items: articleSchema,
  description: "A list of news articles."
};


export const fetchNews = async (language: Language, category: string, searchQuery: string): Promise<Article[]> => {
    const model = 'gemini-2.5-flash';
    let prompt: string;

    if (searchQuery) {
        prompt = language === 'ar' 
            ? `أحضر لي أفضل 12 مقالًا إخباريًا عالميًا ذا صلة بكلمة البحث "${searchQuery}". يجب أن تكون المقالات حديثة وذات صلة ومترجمة إلى اللغة العربية.`
            : `Fetch the 12 most relevant global news articles for the search query "${searchQuery}". The articles should be recent, relevant, and in English.`;
    } else {
        const promptForCategory = language === 'ar' 
            ? `أحضر لي أحدث 12 مقالًا إخباريًا عالميًا بارزًا في تصنيف "${category}". يجب أن تكون المقالات حديثة وذات صلة ومترجمة إلى اللغة العربية.`
            : `Fetch the 12 latest top global news articles in the "${category}" category. The articles should be recent, relevant, and in English.`;
        
        const promptForGeneral = language === 'ar' 
            ? "أحضر لي أحدث 12 مقالًا إخباريًا عالميًا بارزًا في مجالات متنوعة مثل التكنولوجيا والسياسة والرياضة. يجب أن تكون المقالات حديثة وذات صلة ومترجمة إلى اللغة العربية."
            : "Fetch the 12 latest top global news articles across various categories like technology, politics, and sports. The articles should be recent and relevant.";

        prompt = category === 'general' ? promptForGeneral : promptForCategory;
    }


    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        
        const jsonText = response.text.trim();
        // Handle cases where the API might return an empty string for no results
        if (!jsonText) {
            return [];
        }
        const articles = JSON.parse(jsonText);
        
        if (!Array.isArray(articles)) {
            console.error("Parsed response is not an array:", articles);
            throw new Error("Invalid response format from API.");
        }
        
        return articles;

    } catch (error) {
        console.error("Error fetching news from Gemini API:", error);
        const errorMessage = language === 'ar' 
            ? "فشل في جلب الأخبار من Gemini. قد تكون هناك مشكلة في واجهة برمجة التطبيقات. يرجى المحاولة مرة أخرى لاحقًا."
            : "Failed to fetch news from Gemini. There might be an issue with the API. Please try again later.";
        
        if (error instanceof Error) {
            throw new Error(`${errorMessage} (${error.message})`);
        }

        throw new Error(errorMessage);
    }
};