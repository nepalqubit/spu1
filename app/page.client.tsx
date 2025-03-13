'use client';

import 'regenerator-runtime/runtime';
import { useState, useEffect, useRef, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';

export default function ClientHome() {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isCopied, setCopyToClipboard] = useClipboard(response, {
    successDuration: 2000,
  });
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // RevX business information database
  const businessInfo = {
    name: "RevX",
    description: "RevX is a digital consulting firm specializing in enhancing the digital presence and revenue of businesses, particularly in the hospitality industry. With over 15 years of experience, RevX offers a comprehensive suite of services designed to drive growth and operational excellence.",
    services: [
      "Website Development and Design", 
      "Search Engine Optimization (SEO)", 
      "Social Media Marketing", 
      "Operational Audits",
      "Revenue Maximization",
      "Strategic Planning",
      "Process Optimization",
      "Technology Integration"
    ],
    specialization: "Hospitality industry",
    experience: "Over 15 years",
    caseStudies: [
      {
        client: "Bar Peepal Resort",
        work: "Operational audits, strategic planning, process optimizations, and technology integrations",
        results: "Increased operational efficiency by 20%, reduced costs by 15%, boosted occupancy rates by 25%, and overall revenue by 30%",
        url: "REVX.PRO"
      },
      {
        client: "Hotel Mhendo",
        work: "Comprehensive website audit, developed a new sitemap, and implemented SEO strategies",
        results: "Improved search engine rankings and increased organic traffic",
        url: "REVX.PRO"
      },
      {
        client: "Adventure Glacier Treks and Expeditions",
        work: "Targeted SEO strategies, including keyword optimization, content marketing, and technical SEO improvements",
        results: "Enhanced online visibility, leading to a 75% increase in organic traffic and a 50% boost in conversion rates",
        url: "REVX.PRO"
      }
    ],
    contactInfo: {
      usOffice: {
        location: "Richmond, California, USA",
        phone: "+1 510-734-0774"
      },
      nepalOffice: {
        location: "Sherpa Mall, Durbarmarg, Kathmandu, Nepal",
        phone: "+977 982-015-1343"
      },
      email: "info@revx.pro",
      website: "revx.pro"
    },
    blogs: [
      "Digital Transformation: Exploring strategies for businesses transitioning from local to global markets",
      "Brand Awareness: Discussing the significance of brand presence and its impact on consumer perception and business success",
      "Leveraging Digital Presence: Highlighting how a strong online presence can drive business growth and customer engagement"
    ]
  };

  // Create a memoized version of the handleQuery function
  const handleQuery = useCallback(async (query: string) => {
    // Response logic based on RevX business information
    let response = "";
    const lowercaseQuery = query.toLowerCase();
    
    // About the company
    if (lowercaseQuery.includes("who is revx") || 
        lowercaseQuery.includes("about revx") || 
        lowercaseQuery.includes("what is revx") || 
        lowercaseQuery.includes("tell me about") || 
        lowercaseQuery.includes("what does revx do")) {
      response = businessInfo.description;
    }
    // Services
    else if (lowercaseQuery.includes("services") || 
             lowercaseQuery.includes("what do you offer") || 
             lowercaseQuery.includes("offer") || 
             lowercaseQuery.includes("provide")) {
      response = `RevX offers a comprehensive suite of services including: ${businessInfo.services.join(", ")}.`;
    }
    // Specialization
    else if (lowercaseQuery.includes("specialization") || 
             lowercaseQuery.includes("specialize") || 
             lowercaseQuery.includes("industry")) {
      response = `RevX specializes in enhancing digital presence and revenue of businesses, particularly in the ${businessInfo.specialization}.`;
    }
    // Experience
    else if (lowercaseQuery.includes("experience") || 
             lowercaseQuery.includes("how long")) {
      response = `RevX has ${businessInfo.experience} of experience in the digital consulting industry.`;
    }
    // Case studies - General
    else if (lowercaseQuery.includes("case stud") || 
             lowercaseQuery.includes("success stor") || 
             lowercaseQuery.includes("client success") ||
             lowercaseQuery.includes("testimonial")) {
      const caseStudiesText = businessInfo.caseStudies.map(cs => 
        `${cs.client}: ${cs.work}. Results: ${cs.results}.`
      ).join("\n\n");
      response = `Here are some of RevX's success stories:\n\n${caseStudiesText}`;
    }
    // Case study - Specific client
    else if (lowercaseQuery.includes("bar peepal")) {
      const caseStudy = businessInfo.caseStudies[0];
      response = `For ${caseStudy.client}, RevX ${caseStudy.work}, resulting in ${caseStudy.results}. More details are available at ${caseStudy.url}.`;
    }
    else if (lowercaseQuery.includes("hotel mhendo")) {
      const caseStudy = businessInfo.caseStudies[1];
      response = `For ${caseStudy.client}, RevX ${caseStudy.work}, resulting in ${caseStudy.results}. More details are available at ${caseStudy.url}.`;
    }
    else if (lowercaseQuery.includes("adventure glacier") || lowercaseQuery.includes("trek")) {
      const caseStudy = businessInfo.caseStudies[2];
      response = `For ${caseStudy.client}, RevX ${caseStudy.work}, resulting in ${caseStudy.results}. More details are available at ${caseStudy.url}.`;
    }
    // Contact information
    else if (lowercaseQuery.includes("contact") || 
             lowercaseQuery.includes("reach") || 
             lowercaseQuery.includes("get in touch") ||
             lowercaseQuery.includes("call") ||
             lowercaseQuery.includes("phone") ||
             lowercaseQuery.includes("email")) {
      response = `You can contact RevX at:\n\nUS Office: ${businessInfo.contactInfo.usOffice.location}, Phone: ${businessInfo.contactInfo.usOffice.phone}\n\nNepal Office: ${businessInfo.contactInfo.nepalOffice.location}, Phone: ${businessInfo.contactInfo.nepalOffice.phone}\n\nEmail: ${businessInfo.contactInfo.email}`;
    }
    // Location specific
    else if (lowercaseQuery.includes("usa") || 
             lowercaseQuery.includes("us office") || 
             lowercaseQuery.includes("united states") ||
             lowercaseQuery.includes("california")) {
      response = `RevX's US office is located in ${businessInfo.contactInfo.usOffice.location}. You can reach them at ${businessInfo.contactInfo.usOffice.phone}.`;
    }
    else if (lowercaseQuery.includes("nepal") || 
             lowercaseQuery.includes("nepal office") || 
             lowercaseQuery.includes("kathmandu")) {
      response = `RevX's Nepal office is located at ${businessInfo.contactInfo.nepalOffice.location}. You can reach them at ${businessInfo.contactInfo.nepalOffice.phone}.`;
    }
    // Blog/Insights
    else if (lowercaseQuery.includes("blog") || 
             lowercaseQuery.includes("insight") || 
             lowercaseQuery.includes("article") ||
             lowercaseQuery.includes("thought leadership")) {
      response = `RevX shares insights through their blog, covering topics such as:\n\n- ${businessInfo.blogs.join('\n- ')}`;
    }
    // Revenue maximization specifically
    else if (lowercaseQuery.includes("revenue maximization") || 
             lowercaseQuery.includes("increase revenue") || 
             lowercaseQuery.includes("boost revenue")) {
      response = "RevX provides strategic revenue management solutions aimed at increasing occupancy rates and maximizing profitability for hospitality clients.";
    }
    // Website
    else if (lowercaseQuery.includes("website") || 
             lowercaseQuery.includes("site") || 
             lowercaseQuery.includes("url") ||
             lowercaseQuery.includes("web address")) {
      response = `You can visit RevX's website at ${businessInfo.contactInfo.website}`;
    }
    // Greetings
    else if (lowercaseQuery.includes("hello") || 
             lowercaseQuery.includes("hi") || 
             lowercaseQuery.includes("hey") ||
             lowercaseQuery.includes("greetings")) {
      response = "Hello! I'm Spu, RevX's AI assistant. How can I help you learn more about RevX's digital consulting services today?";
    }
    // Default response
    else {
      response = "I'm not sure I understand your question. You can ask me about RevX's services, case studies, contact information, or specific clients like Bar Peepal Resort. How else can I assist you?";
    }
    
    setResponse(response);
  }, []);

  const commands = [
    {
      command: ['hello', 'hi', 'hey'],
      callback: () => handleQuery('hello'),
    },
    {
      command: ['what is RevX', 'who is RevX', 'tell me about RevX'],
      callback: () => handleQuery('about revx'),
    },
    {
      command: 'what services do you offer',
      callback: () => handleQuery('services'),
    },
    {
      command: ['how can I contact you', 'contact information'],
      callback: () => handleQuery('contact'),
    },
    {
      command: ['case studies', 'success stories'],
      callback: () => handleQuery('case studies'),
    }
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    // Check for microphone permission
    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => setMicrophoneError(null))
        .catch(error => setMicrophoneError(error.message || 'Microphone permission denied'));
    }
  }, []);

  useEffect(() => {
    // Update listening state based on actual SpeechRecognition state
    setIsListening(listening);
  }, [listening]);

  const toggleListening = () => {
    try {
      if (listening) {
        SpeechRecognition.stopListening();
      } else {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
      setMicrophoneError('Failed to start speech recognition');
    }
  };
  
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleQuery(textInput);
      setTextInput('');
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">
          Speech recognition is not supported in this browser.
          Please try Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {microphoneError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700">Microphone error: {microphoneError}</p>
          <p className="mt-1 text-sm">Please check your browser permissions and try again.</p>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full flex items-center justify-center ${
            isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors duration-200`}
        >
          {isListening ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
        <div className="text-sm font-medium">
          {isListening ? (
            <span className="flex items-center text-red-500">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Listening...
            </span>
          ) : (
            <span className="text-gray-500">Click to start</span>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Query:</h2>
        <p className="text-gray-600 min-h-[40px]">{transcript || 'Click the microphone button and speak your question...'}</p>
      </div>

      <form onSubmit={handleTextSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={inputRef}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>

      {response && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-blue-700">Response:</h2>
            <button
              onClick={() => setCopyToClipboard()}
              className="text-sm bg-white px-2 py-1 rounded border border-blue-200 text-blue-600"
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-blue-700 whitespace-pre-line">{response}</div>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Try asking:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "What is RevX?", 
            "What services does RevX offer?", 
            "Tell me about RevX's case studies", 
            "How can I contact RevX?",
            "What is RevX's experience?"
          ].map((question) => (
            <button 
              key={question}
              onClick={() => {
                setTextInput(question);
                handleQuery(question);
              }}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 