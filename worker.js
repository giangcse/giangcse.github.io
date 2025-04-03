import { GoogleGenerativeAI } from '@google/generative-ai';

export default {
    async fetch(request, env, ctx) {
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle OPTIONS request for CORS
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: corsHeaders
            });
        }

        // Only allow POST requests
        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405, headers: corsHeaders });
        }

        try {
            const { prompt } = await request.json();

            if (!prompt) {
                return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            }

            // Initialize Gemini API
            const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-exp-image-generation",
            });

            const generationConfig = {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseModalities: ["image", "text"],
                responseMimeType: "text/plain",
            };

            // Generate image
            const chatSession = model.startChat({
                generationConfig,
                history: [],
            });

            const result = await chatSession.sendMessage(prompt);
            const candidates = result.response.candidates;
            const images = [];

            // Extract images from response
            for (let candidate of candidates) {
                for (let part of candidate.content.parts) {
                    if (part.inlineData) {
                        images.push(part.inlineData.data);
                    }
                }
            }

            return new Response(JSON.stringify({ images }), {
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });

        } catch (error) {
            console.error('Error:', error);
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });
        }
    }
}; 