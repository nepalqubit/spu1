'use client';

import 'regenerator-runtime/runtime';
import { useState, useEffect, useRef, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { SpeechSetup } from '../app/components/SpeechSetup';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    regeneratorRuntime: any;
  }
}

export default function ClientHome() {
  const [speechInitialized, setSpeechInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [conversation, setConversation] = useState<{type: 'user' | 'assistant', content: string}[]>([]);
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopyToClipboard] = useClipboard(textToCopy, {
    successDuration: 2000,
  });
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !window.regeneratorRuntime) {
        window.regeneratorRuntime = require('regenerator-runtime');
      }
      setSpeechInitialized(true);
    } catch (error) {
      console.error('Failed to initialize regenerator-runtime:', error);
    }
  }, []);

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

  const handleQuery = useCallback(async (query: string) => {
    let response = "";
    const lowercaseQuery = query.toLowerCase();
    
    // Add user message to conversation
    setConversation(prev => [...prev, {type: 'user', content: query}]);
    
    // Enhanced greetings and common phrases handling
    if (lowercaseQuery.includes("hello") || 
        lowercaseQuery.includes("hi") || 
        lowercaseQuery.includes("hey") ||
        lowercaseQuery.includes("greetings") ||
        lowercaseQuery.includes("good morning") ||
        lowercaseQuery.includes("good afternoon") ||
        lowercaseQuery.includes("good evening") ||
        lowercaseQuery.includes("howdy")) {
      const timeOfDay = new Date().getHours();
      let greeting = "Hello";
      if (timeOfDay < 12) greeting = "Good morning";
      else if (timeOfDay < 17) greeting = "Good afternoon";
      else greeting = "Good evening";
      
      response = `${greeting}! I'm Spu, RevX's AI assistant. How can I help you today? Feel free to ask about our services, success stories, or how to get in touch with us.`;
    }
    else if (lowercaseQuery.includes("how are you") ||
             lowercaseQuery.includes("how're you") ||
             lowercaseQuery.includes("how you doing") ||
             lowercaseQuery.includes("how's it going")) {
      response = "I'm doing great, thank you for asking! I'm here to help you learn more about RevX. What would you like to know?";
    }
    else if (lowercaseQuery.includes("thank") ||
             lowercaseQuery.includes("thanks") ||
             lowercaseQuery.includes("appreciate")) {
      response = "You're welcome! Is there anything else you'd like to know about RevX?";
    }
    else if (lowercaseQuery.includes("bye") ||
             lowercaseQuery.includes("goodbye") ||
             lowercaseQuery.includes("see you") ||
             lowercaseQuery.includes("talk to you later")) {
      response = "Thank you for your interest in RevX! If you need any further assistance, don't hesitate to reach out. Have a great day!";
    }
    else if (lowercaseQuery.includes("who is revx") || 
        lowercaseQuery.includes("about revx") || 
        lowercaseQuery.includes("what is revx") || 
        lowercaseQuery.includes("tell me about") || 
        lowercaseQuery.includes("what does revx do")) {
      response = businessInfo.description;
    }
    else if (lowercaseQuery.includes("services") || 
             lowercaseQuery.includes("what do you offer") || 
             lowercaseQuery.includes("offer") || 
             lowercaseQuery.includes("provide")) {
      response = `RevX offers a comprehensive suite of services including: ${businessInfo.services.join(", ")}.`;
    }
    else if (lowercaseQuery.includes("specialization") || 
             lowercaseQuery.includes("specialize") || 
             lowercaseQuery.includes("industry")) {
      response = `RevX specializes in enhancing digital presence and revenue of businesses, particularly in the ${businessInfo.specialization}.`;
    }
    else if (lowercaseQuery.includes("experience") || 
             lowercaseQuery.includes("how long")) {
      response = `RevX has ${businessInfo.experience} of experience in the digital consulting industry.`;
    }
    else if (lowercaseQuery.includes("case stud") || 
             lowercaseQuery.includes("success stor") || 
             lowercaseQuery.includes("client success") ||
             lowercaseQuery.includes("testimonial")) {
      const caseStudiesText = businessInfo.caseStudies.map(cs => 
        `${cs.client}: ${cs.work}. Results: ${cs.results}.`
      ).join("\n\n");
      response = `Here are some of RevX's success stories:\n\n${caseStudiesText}`;
    }
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
    else if (lowercaseQuery.includes("contact") || 
             lowercaseQuery.includes("reach") || 
             lowercaseQuery.includes("get in touch") ||
             lowercaseQuery.includes("call") ||
             lowercaseQuery.includes("phone") ||
             lowercaseQuery.includes("email")) {
      response = `You can contact RevX at:\n\nUS Office: ${businessInfo.contactInfo.usOffice.location}, Phone: ${businessInfo.contactInfo.usOffice.phone}\n\nNepal Office: ${businessInfo.contactInfo.nepalOffice.location}, Phone: ${businessInfo.contactInfo.nepalOffice.phone}\n\nEmail: ${businessInfo.contactInfo.email}`;
    }
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
    else if (lowercaseQuery.includes("blog") || 
             lowercaseQuery.includes("insight") || 
             lowercaseQuery.includes("article") ||
             lowercaseQuery.includes("thought leadership")) {
      response = `RevX shares insights through their blog, covering topics such as:\n\n- ${businessInfo.blogs.join('\n- ')}`;
    }
    else if (lowercaseQuery.includes("revenue maximization") || 
             lowercaseQuery.includes("increase revenue") || 
             lowercaseQuery.includes("boost revenue")) {
      response = "RevX provides strategic revenue management solutions aimed at increasing occupancy rates and maximizing profitability for hospitality clients.";
    }
    else if (lowercaseQuery.includes("website") || 
             lowercaseQuery.includes("site") || 
             lowercaseQuery.includes("url") ||
             lowercaseQuery.includes("web address")) {
      response = `You can visit RevX's website at ${businessInfo.contactInfo.website}`;
    }
    else {
      response = "I'm not sure I understand your question. You can ask me about RevX's services, case studies, contact information, or specific clients like Bar Peepal Resort. How else can I assist you?";
    }
    
    setResponse(response);
    // Add assistant response to conversation
    setConversation(prev => [...prev, {type: 'assistant', content: response}]);
  }, []);

  const commands = [
    {
      command: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
      callback: () => handleQuery('hello'),
    },
    {
      command: ['how are you', "how's it going", 'how you doing'],
      callback: () => handleQuery('how are you'),
    },
    {
      command: ['thank you', 'thanks', 'appreciate it'],
      callback: () => handleQuery('thank you'),
    },
    {
      command: ['goodbye', 'bye', 'see you', 'talk to you later'],
      callback: () => handleQuery('goodbye'),
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
    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
        console.log('Requesting microphone permission...');
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            console.log('Microphone permission granted');
            setMicrophoneError(null);
          })
          .catch(error => {
            console.error("Microphone error:", error);
            setMicrophoneError(error.message || 'Microphone permission denied');
          });
      } else {
        console.warn('MediaDevices API not available in this browser');
        setMicrophoneError('MediaDevices API not available in this browser. Please use a modern browser.');
      }
    } catch (error) {
      console.error('Error requesting microphone permissions:', error);
      setMicrophoneError('Error requesting microphone permissions: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }, []);

  useEffect(() => {
    setIsListening(listening);
    console.log('Speech recognition listening state:', listening);
    
    if (!browserSupportsSpeechRecognition) {
      console.error('Speech recognition is not supported in this browser');
      setMicrophoneError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }, [listening, browserSupportsSpeechRecognition]);

  const toggleListening = () => {
    try {
      if (listening) {
        SpeechRecognition.stopListening();
        console.log('Speech recognition stopped');
      } else {
        resetTranscript();
        if (typeof window !== 'undefined') {
          if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            console.log('Starting speech recognition...');
            SpeechRecognition.startListening({ continuous: true });
          } else {
            console.error('Speech recognition not available in this browser');
            setMicrophoneError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
            throw new Error('Speech recognition not available in this browser');
          }
        } else {
          console.error('Window object not available');
          throw new Error('Window object not available');
        }
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
      setMicrophoneError('Failed to start speech recognition: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };
  
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleQuery(textInput);
      setTextInput('');
    }
  };

  // Auto-scroll to bottom of chat when conversation updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  if (!speechInitialized) {
    return <div className="p-4 text-center">Initializing speech recognition...</div>;
  }

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
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-[600px]">
      {microphoneError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700">Microphone error: {microphoneError}</p>
          <p className="mt-1 text-sm">Please check your browser permissions and try again.</p>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full flex items-center justify-center ${
            isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors duration-200`}
        >
          {isListening ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <span className="text-gray-500">Click microphone to start voice input</span>
          )}
        </div>
      </div>

      {/* Chat container with message bubbles */}
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto mb-4 p-2 space-y-4 bg-gray-50 rounded-lg"
        style={{ height: 'calc(100% - 180px)' }}
      >
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-center">
            <div>
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>Start a conversation with RevX AI Assistant</p>
              <p className="text-sm mt-2">Ask about our services, case studies, or contact information</p>
            </div>
          </div>
        ) : (
          conversation.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <span className="text-xs font-medium">RevX Assistant</span>
                  </div>
                )}
                <div className="whitespace-pre-line">{message.content}</div>
                {message.type === 'assistant' && (
                  <button
                    onClick={() => {
                      setTextToCopy(message.content);
                      setCopyToClipboard();
                    }}
                    className="text-xs mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded"
                  >
                    {isCopied && textToCopy === message.content ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        
        {/* Show transcript while listening */}
        {isListening && transcript && (
          <div className="flex justify-end">
            <div className="max-w-[80%] p-3 bg-blue-200 text-blue-800 rounded-lg rounded-br-none italic">
              {transcript}
              <div className="text-xs text-blue-600 mt-1">Listening...</div>
            </div>
          </div>
        )}
      </div>

      {/* Input form at bottom */}
      <form onSubmit={handleTextSubmit} className="mt-auto">
        <div className="flex gap-2 items-center">
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
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center"
            disabled={!textInput.trim()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>

      {/* Quick questions section */}
      <div className="mt-4">
        <h3 className="text-xs font-medium text-gray-500 mb-2">Try asking:</h3>
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