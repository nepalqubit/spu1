import type { NextApiRequest, NextApiResponse } from 'next';
import { getOpenRouterResponse, Message } from '../../utils/openrouter';

// RevX business information database
const businessInfo = {
  name: "RevX",
  description: "RevX is a comprehensive technology and digital solutions provider specializing in software development, digital marketing, data science, AI solutions, and OTA (Online Travel Agency) revenue optimization. We help businesses maximize their revenue through strategic partnerships with major OTAs and enhanced digital presence.",
  services: [
    "Software Development",
    "SEO",
    "Digital Marketing",
    "OTA Solutions",
    "Revenue Optimization",
    "Brand Enhancement",
    "Meta Search Optimization"
  ],
  specialization: "RevX specializes in comprehensive digital solutions with a strong focus on OTA partnerships and revenue optimization. We help businesses maximize their presence across major travel platforms while strengthening their brand identity.",
  experience: "With years of experience in the travel and hospitality industry, RevX has successfully helped numerous businesses optimize their OTA presence and increase revenue through strategic partnerships and digital optimization.",
  contact: {
    email: "info@revx.pro",
    phone: "+1 5107340774",
    address: "Richmond California, USA",
    website: "https://revx.pro",
    nepalOffice: {
      address: "Sherpa Mall, Durbarmarg, Kathmandu, Nepal",
      phone: "+9779820151343",
      mobile: "+9779856031513",
      whatsapp: "+977985031513"
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }
    
    // Get the last user message
    const lastUserMessage = messages
      .filter(msg => msg.role === 'user')
      .pop()?.content || '';

    // First get a baseline answer from our local knowledge base
    const baselineAnswer = getBaselineAnswer(lastUserMessage);
    
    // Then enhance it with OpenRouter AI
    const apiMessages: Message[] = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }));
    
    // Get enhanced response from OpenRouter
    const enhancedResponse = await getOpenRouterResponse(apiMessages, baselineAnswer);
    
    return res.status(200).json({ message: enhancedResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'I apologize, but I encountered an error processing your request. Please try again later.'
    });
  }
}

/**
 * Gets a baseline answer from local knowledge base
 * @param query The user's question
 * @returns A baseline answer from local knowledge
 */
function getBaselineAnswer(query: string): string {
  const lowercaseQuery = query.toLowerCase();
  
  // Enhanced greetings and common phrases handling with more variations
  if (lowercaseQuery.match(/(hello|hi|hey|greetings|good\s+(morning|afternoon|evening|day)|howdy|yo|sup)/i)) {
    const timeOfDay = new Date().getHours();
    let greeting = "Hello";
    if (timeOfDay < 12) greeting = "Good morning";
    else if (timeOfDay < 17) greeting = "Good afternoon";
    else greeting = "Good evening";
    
    return `${greeting}! I'm the RevX AI assistant. How can I help you today? Feel free to ask about our services, success stories, or how to get in touch with us.`;
  }
  else if (lowercaseQuery.match(/(how\s+are\s+you|how're\s+you|how\s+you\s+doing|how's\s+it\s+going|what's\s+up|what\s+is\s+up|what\s+are\s+you\s+up\s+to)/i)) {
    return "I'm doing great, thank you for asking! I'm here to help you learn more about RevX. What would you like to know?";
  }
  else if (lowercaseQuery.match(/(thank\s+you|thanks|appreciate\s+it|thank\s+you\s+so\s+much|thanks\s+a\s+lot|grateful)/i)) {
    return "You're welcome! Is there anything else you'd like to know about RevX?";
  }
  else if (lowercaseQuery.match(/(bye|goodbye|see\s+you|talk\s+to\s+you\s+later|have\s+a\s+good\s+day|take\s+care)/i)) {
    return "Thank you for your interest in RevX! If you need any further assistance, don't hesitate to reach out. Have a great day!";
  }
  else if (lowercaseQuery.match(/(who\s+is\s+revx|about\s+revx|what\s+is\s+revx|tell\s+me\s+about|what\s+does\s+revx\s+do|revx\s+company|revx\s+services|revx\s+description)/i)) {
    return businessInfo.description;
  }
  else if (lowercaseQuery.match(/(services|what\s+do\s+you\s+offer|offer|provide|what\s+can\s+you\s+do|what\s+are\s+your\s+services|what\s+services\s+do\s+you\s+provide)/i)) {
    return `RevX offers a comprehensive suite of services including: ${businessInfo.services.join(", ")}.`;
  }
  else if (lowercaseQuery.match(/(contact|reach|get\s+in\s+touch|call|phone|email|where\s+are\s+you|how\s+to\s+contact|contact\s+information)/i)) {
    return `You can contact RevX at:\n\nHeadquarters:\nEmail: ${businessInfo.contact.email}\nPhone: ${businessInfo.contact.phone}\nAddress: ${businessInfo.contact.address}\n\nNepal Office:\nPhone: ${businessInfo.contact.nepalOffice.phone}\nMobile: ${businessInfo.contact.nepalOffice.mobile}\nWhatsApp: ${businessInfo.contact.nepalOffice.whatsapp}\nAddress: ${businessInfo.contact.nepalOffice.address}`;
  }
  else {
    return "I'm not sure I understand your question. You can ask me about RevX's services, contact information, or specific topics like digital marketing, e-commerce, development, or revenue optimization. How else can I assist you?";
  }
} 