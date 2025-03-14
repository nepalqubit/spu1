/**
 * OpenRouter API integration
 * This utility handles communication with OpenRouter.ai for enhanced AI capabilities.
 */

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Generates an AI response using OpenRouter
 * @param messages Message history for context
 * @param originalAnswer Optional baseline answer from local knowledge base
 * @returns Enhanced AI response
 */
export async function getOpenRouterResponse(
  messages: Message[],
  originalAnswer?: string
): Promise<string> {
  try {
    // Prepare system context
    const systemContext: Message = {
      role: 'system',
      content: `You are the RevX AI Assistant, a helpful and professional assistant for RevX, a comprehensive technology and digital solutions provider specializing in software development, digital marketing, data science, AI solutions, and OTA (Online Travel Agency) revenue optimization.
      
If provided, enhance the following baseline answer with more precise details while maintaining the same key information: ${originalAnswer || ''}

Always maintain a professional, helpful tone. Be concise but thorough.`
    };

    // Construct API request
    const response = await fetch(process.env.OPENROUTER_URL || 'https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://revx.pro',
        'X-Title': 'RevX AI Assistant'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku', // Using Claude 3 Haiku for quick, cost-effective responses
        messages: [systemContext, ...messages],
        temperature: 0.3, // Low temperature for more factual responses
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    
    // Return AI generated content
    return data.choices[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response at this time. Please try again.";
    
  } catch (error) {
    console.error('Error in OpenRouter API call:', error);
    
    // Fallback to original answer if available, or return error message
    return originalAnswer || 
      "I'm experiencing some technical difficulties. Please try again later.";
  }
} 