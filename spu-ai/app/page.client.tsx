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
    expertise: {
      softwareDevelopment: {
        services: [
          "Custom Software Solutions",
          "Web Applications",
          "Mobile Apps",
          "API Development",
          "Cloud Solutions",
          "Legacy System Modernization"
        ],
        benefits: [
          "Scalable and maintainable solutions",
          "Improved operational efficiency",
          "Enhanced user experience",
          "Cost-effective development"
        ]
      },
      digitalMarketing: {
        services: [
          "Search Engine Optimization (SEO)",
          "Social Media Marketing",
          "Content Marketing",
          "Email Marketing",
          "PPC Advertising",
          "Brand Strategy"
        ],
        benefits: [
          "Increased online visibility",
          "Higher conversion rates",
          "Better customer engagement",
          "Improved brand recognition"
        ]
      },
      dataScience: {
        services: [
          "Data Analytics",
          "Business Intelligence",
          "Predictive Modeling",
          "Performance Analytics",
          "Market Research",
          "Competitive Analysis"
        ],
        benefits: [
          "Data-driven decision making",
          "Improved business insights",
          "Better market understanding",
          "Enhanced performance tracking"
        ]
      },
      aiSolutions: {
        services: [
          "AI Integration",
          "Machine Learning",
          "Natural Language Processing",
          "Computer Vision",
          "Predictive Analytics",
          "Automation Solutions"
        ],
        benefits: [
          "Automated processes",
          "Enhanced efficiency",
          "Improved accuracy",
          "Cost reduction"
        ]
      },
      otaSolutions: {
        services: [
          "OTA Channel Management",
          "Revenue Optimization",
          "Rate Parity Management",
          "Inventory Distribution",
          "Booking Engine Integration",
          "Performance Analytics"
        ],
        benefits: [
          "Maximized OTA revenue",
          "Optimized pricing strategy",
          "Enhanced market presence",
          "Improved booking conversion"
        ]
      }
    },
    caseStudies: [
      {
        title: "OTA Revenue Optimization",
        description: "Successfully helped a hotel chain increase their OTA revenue by 40% through strategic partnerships with major platforms like Booking.com, Agoda, and Expedia.",
        results: "40% revenue increase, improved market presence, enhanced brand visibility"
      },
      {
        title: "Digital Transformation",
        description: "Implemented comprehensive digital solutions for a hospitality group, including OTA integration and revenue management systems.",
        results: "25% increase in direct bookings, 35% improvement in OTA performance"
      }
    ],
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
    },
    blogs: [
      "OTA Revenue Optimization Strategies",
      "Maximizing Your Presence on Booking.com",
      "Effective Rate Parity Management",
      "Digital Marketing for Hospitality",
      "AI in Travel Industry",
      "Meta Search Optimization"
    ],
    otaPartners: [
      "Booking.com",
      "Agoda",
      "Ctrip",
      "Trip.com",
      "MakeMyTrip",
      "Expedia"
    ],
    metaSearchPlatforms: [
      "Google Hotel Ads",
      "TripAdvisor",
      "Kayak",
      "Skyscanner",
      "Trivago"
    ]
  };

  const handleQuery = useCallback(async (query: string) => {
    let response = "";
    const lowercaseQuery = query.toLowerCase();
    
    // Add user message to conversation
    setConversation(prev => [...prev, {type: 'user', content: query}]);
    
    // Enhanced greetings and common phrases handling with more variations
    if (lowercaseQuery.match(/(hello|hi|hey|greetings|good\s+(morning|afternoon|evening|day)|howdy|yo|sup)/i)) {
      const timeOfDay = new Date().getHours();
      let greeting = "Hello";
      if (timeOfDay < 12) greeting = "Good morning";
      else if (timeOfDay < 17) greeting = "Good afternoon";
      else greeting = "Good evening";
      
      response = `${greeting}! I'm Spu, RevX's AI assistant. How can I help you today? Feel free to ask about our services, success stories, or how to get in touch with us.`;
    }
    else if (lowercaseQuery.match(/(how\s+are\s+you|how're\s+you|how\s+you\s+doing|how's\s+it\s+going|what's\s+up|what\s+is\s+up|what\s+are\s+you\s+up\s+to)/i)) {
      response = "I'm doing great, thank you for asking! I'm here to help you learn more about RevX. What would you like to know?";
    }
    else if (lowercaseQuery.match(/(thank\s+you|thanks|appreciate\s+it|thank\s+you\s+so\s+much|thanks\s+a\s+lot|grateful)/i)) {
      response = "You're welcome! Is there anything else you'd like to know about RevX?";
    }
    else if (lowercaseQuery.match(/(bye|goodbye|see\s+you|talk\s+to\s+you\s+later|have\s+a\s+good\s+day|take\s+care)/i)) {
      response = "Thank you for your interest in RevX! If you need any further assistance, don't hesitate to reach out. Have a great day!";
    }
    else if (lowercaseQuery.match(/(who\s+is\s+revx|about\s+revx|what\s+is\s+revx|tell\s+me\s+about|what\s+does\s+revx\s+do|revx\s+company|revx\s+services|revx\s+description)/i)) {
      response = businessInfo.description;
    }
    else if (lowercaseQuery.match(/(services|what\s+do\s+you\s+offer|offer|provide|what\s+can\s+you\s+do|what\s+are\s+your\s+services|what\s+services\s+do\s+you\s+provide)/i)) {
      response = `RevX offers a comprehensive suite of services including: ${businessInfo.services.join(", ")}.`;
    }
    else if (lowercaseQuery.match(/(specialization|specialize|industry|what\s+do\s+you\s+specialize\s+in|what's\s+your\s+specialty|what\s+is\s+your\s+expertise)/i)) {
      response = `RevX specializes in enhancing digital presence and revenue of businesses, particularly in the ${businessInfo.specialization}.`;
    }
    else if (lowercaseQuery.match(/(experience|how\s+long|years\s+of\s+experience|how\s+many\s+years|how\s+long\s+have\s+you\s+been)/i)) {
      response = `RevX has ${businessInfo.experience} of experience in the digital consulting industry.`;
    }
    else if (lowercaseQuery.match(/(case\s+stud|success\s+stor|client\s+success|testimonial|portfolio|projects|work\s+examples|previous\s+work)/i)) {
      const caseStudiesText = businessInfo.caseStudies.map(cs => 
        `${cs.title}: ${cs.description}. Results: ${cs.results}.`
      ).join("\n\n");
      response = `Here are some of RevX's success stories:\n\n${caseStudiesText}`;
    }
    else if (lowercaseQuery.match(/(contact|reach|get\s+in\s+touch|call|phone|email|where\s+are\s+you|how\s+to\s+contact|contact\s+information)/i)) {
      response = `You can contact RevX at:\n\nHeadquarters:\nEmail: ${businessInfo.contact.email}\nPhone: ${businessInfo.contact.phone}\nAddress: ${businessInfo.contact.address}\n\nNepal Office:\nPhone: ${businessInfo.contact.nepalOffice.phone}\nMobile: ${businessInfo.contact.nepalOffice.mobile}\nWhatsApp: ${businessInfo.contact.nepalOffice.whatsapp}\nAddress: ${businessInfo.contact.nepalOffice.address}`;
    }
    else if (lowercaseQuery.match(/(usa|us\s+office|united\s+states|california|richmond)/i)) {
      response = `RevX's office is located in ${businessInfo.contact.address}. You can reach them at ${businessInfo.contact.phone}.`;
    }
    else if (lowercaseQuery.match(/(blog|insight|article|thought\s+leadership|resources|content|publications)/i)) {
      response = `RevX shares insights through their blog, covering topics such as:\n\n- ${businessInfo.blogs.join('\n- ')}`;
    }
    else if (lowercaseQuery.match(/(revenue\s+maximization|increase\s+revenue|boost\s+revenue|improve\s+revenue|revenue\s+optimization|revenue\s+management)/i)) {
      response = "RevX's revenue maximization strategies focus on optimizing pricing, improving operational efficiency, and enhancing customer experience. We help businesses identify new revenue streams, reduce costs, and implement data-driven decision-making processes.";
    }
    else if (lowercaseQuery.match(/(website|site|url|web\s+address|online\s+presence|web\s+presence)/i)) {
      response = `You can visit RevX's website at ${businessInfo.contact.website}`;
    }
    else if (lowercaseQuery.match(/(digital\s+marketing|marketing\s+services|seo|social\s+media|online\s+marketing|digital\s+advertising|content\s+marketing)/i)) {
      const dm = businessInfo.expertise.digitalMarketing;
      response = `RevX offers comprehensive digital marketing services including ${dm.services.join(", ")}. These services help businesses achieve ${dm.benefits.join(", ")}.`;
    }
    else if (lowercaseQuery.match(/(ecommerce|online\s+store|digital\s+commerce|online\s+retail|e-commerce|electronic\s+commerce|online\s+shopping)/i)) {
      response = "RevX provides comprehensive e-commerce solutions including custom platform development, payment integration, inventory management, and customer analytics. Our solutions help businesses create successful online stores with enhanced user experience and increased sales.";
    }
    else if (lowercaseQuery.match(/(development|programming|coding|app\s+development|website\s+development|software\s+development|web\s+development|mobile\s+development)/i)) {
      const sd = businessInfo.expertise.softwareDevelopment;
      response = `RevX provides comprehensive development services including ${sd.services.join(", ")}. These solutions offer ${sd.benefits.join(", ")}.`;
    }
    else if (lowercaseQuery.match(/(ai|artificial\s+intelligence|machine\s+learning|deep\s+learning|smart\s+technology|automation)/i)) {
      response = "RevX specializes in AI integration and development, helping businesses leverage artificial intelligence for improved efficiency, customer experience, and decision-making. Our AI solutions include predictive analytics, automated processes, and intelligent customer service systems.";
    }
    else if (lowercaseQuery.match(/(revenue|profit|income|earnings|financial|business\s+growth|profitability|monetization)/i)) {
      response = "RevX's revenue maximization strategies focus on optimizing pricing, improving operational efficiency, and enhancing customer experience. We help businesses identify new revenue streams, reduce costs, and implement data-driven decision-making processes.";
    }
    else if (lowercaseQuery.match(/(software\s+development|web\s+development|app\s+development|programming|coding|development\s+services)/i)) {
      const sd = businessInfo.expertise.softwareDevelopment;
      response = `RevX provides software development services including ${sd.services.join(", ")}. These solutions offer ${sd.benefits.join(", ")}.`;
    }
    else if (lowercaseQuery.match(/(data\s+science|data\s+analytics|big\s+data|machine\s+learning|predictive\s+analytics|business\s+intelligence)/i)) {
      const ds = businessInfo.expertise.dataScience;
      response = `RevX's data science solutions include ${ds.services.join(", ")}. These services help businesses achieve ${ds.benefits.join(", ")}.`;
    }
    else if (lowercaseQuery.match(/(ai|artificial\s+intelligence|machine\s+learning|nlp|computer\s+vision|ai\s+solutions)/i)) {
      const ai = businessInfo.expertise.aiSolutions;
      response = `RevX offers AI solutions including ${ai.services.join(", ")}. These services provide ${ai.benefits.join(", ")}.`;
    }
    else if (lowercaseQuery.match(/(ota|online\s+travel|booking\.com|agoda|ctrip|trip\.com|makemytrip|expedia|travel\s+platform|booking\s+platform)/i)) {
      const otaServices = businessInfo.expertise.otaSolutions.services.join(", ");
      const otaBenefits = businessInfo.expertise.otaSolutions.benefits.join(", ");
      const otaPartners = businessInfo.otaPartners.join(", ");
      response = `RevX provides comprehensive OTA solutions including ${otaServices}. We work with major platforms like ${otaPartners} to help businesses maximize their revenue. Our solutions offer ${otaBenefits}.`;
    }
    else if (lowercaseQuery.match(/(revenue\s+optimization|boost\s+revenue|increase\s+revenue|maximize\s+revenue|revenue\s+management|pricing\s+strategy)/i)) {
      response = `RevX specializes in revenue optimization through strategic OTA partnerships and digital solutions. We help businesses maximize their revenue by optimizing pricing strategies, managing rate parity, and enhancing their presence across major travel platforms.`;
    }
    else if (lowercaseQuery.match(/(meta\s+search|google\s+hotel|tripadvisor|kayak|skyscanner|trivago|travel\s+search)/i)) {
      const metaPlatforms = businessInfo.metaSearchPlatforms.join(", ");
      response = `RevX helps businesses optimize their presence on major meta-search platforms including ${metaPlatforms}. We implement strategies to improve visibility and conversion rates across these platforms.`;
    }
    else if (lowercaseQuery.match(/(brand\s+enhancement|branding|brand\s+visibility|brand\s+presence|brand\s+recognition)/i)) {
      response = `RevX provides comprehensive brand enhancement services to improve your presence across OTAs and meta-search platforms. We help businesses strengthen their brand identity and increase visibility to potential customers.`;
    }
    else if (lowercaseQuery.match(/(website|web\s+site|web\s+development|web\s+design|web\s+presence|online\s+presence)/i)) {
      response = "RevX offers comprehensive website development services including custom web applications, responsive design, e-commerce solutions, and web optimization. Our solutions are built with modern technologies and best practices to ensure high performance and user experience.";
    }
    else if (lowercaseQuery.match(/(mobile\s+app|mobile\s+application|app\s+development|ios|android|cross\s+platform)/i)) {
      response = "RevX develops mobile applications for both iOS and Android platforms, as well as cross-platform solutions. Our mobile app development services include native app development, hybrid app development, and progressive web apps (PWAs).";
    }
    else if (lowercaseQuery.match(/(it\s+consulting|consulting\s+services|technology\s+consulting|digital\s+transformation|tech\s+consulting)/i)) {
      response = "RevX provides IT consulting services to help businesses navigate digital transformation, optimize their technology stack, and implement innovative solutions. Our consulting team offers expertise in software architecture, cloud solutions, and technology strategy.";
    }
    else if (lowercaseQuery.match(/(software\s+architecture|architecture\s+design|system\s+design|technical\s+architecture|solution\s+architecture)/i)) {
      response = "RevX offers software architecture design services to create scalable, maintainable, and efficient systems. Our architects design robust solutions that align with business goals and technical requirements.";
    }
    else if (lowercaseQuery.match(/(cloud|cloud\s+computing|cloud\s+solutions|aws|azure|google\s+cloud)/i)) {
      response = "RevX provides cloud solutions and services, including cloud migration, cloud-native development, and cloud infrastructure management. We work with major cloud providers like AWS, Azure, and Google Cloud.";
    }
    else if (lowercaseQuery.match(/(api|api\s+development|rest\s+api|graphql|api\s+integration|web\s+services)/i)) {
      response = "RevX develops and integrates APIs using modern technologies and best practices. Our API services include RESTful APIs, GraphQL, microservices architecture, and API security implementation.";
    }
    else if (lowercaseQuery.match(/(ui|ux|user\s+interface|user\s+experience|design|interface\s+design)/i)) {
      response = "RevX offers UI/UX design services to create intuitive, user-friendly interfaces. Our design team focuses on creating engaging experiences that enhance user satisfaction and drive business goals.";
    }
    else if (lowercaseQuery.match(/(qa|quality\s+assurance|testing|software\s+testing|test\s+automation|quality\s+testing)/i)) {
      response = "RevX provides comprehensive quality assurance services, including manual testing, automated testing, performance testing, and security testing. We ensure high-quality software delivery through rigorous testing processes.";
    }
    else if (lowercaseQuery.match(/(devops|continuous\s+integration|continuous\s+deployment|ci|cd|automation)/i)) {
      response = "RevX offers DevOps services to streamline software development and deployment processes. Our services include CI/CD pipeline setup, infrastructure automation, containerization, and monitoring solutions.";
    }
    else if (lowercaseQuery.match(/(business\s+intelligence|bi|analytics|reporting|data\s+visualization|dashboard)/i)) {
      response = "RevX provides business intelligence solutions to help organizations make data-driven decisions. Our services include data visualization, dashboard development, reporting systems, and analytics platforms.";
    }
    else if (lowercaseQuery.match(/(machine\s+learning|ml|deep\s+learning|neural\s+networks|predictive\s+modeling)/i)) {
      response = "RevX develops machine learning solutions for various business applications. Our services include predictive modeling, natural language processing, computer vision, and custom ML model development.";
    }
    else if (lowercaseQuery.match(/(big\s+data|data\s+processing|data\s+warehouse|data\s+lake|data\s+analytics)/i)) {
      response = "RevX offers big data solutions to help organizations process and analyze large volumes of data. Our services include data warehousing, data lake implementation, real-time analytics, and data processing pipelines.";
    }
    else if (lowercaseQuery.match(/(digital\s+transformation|digital\s+strategy|digital\s+initiative|digital\s+change|digital\s+modernization)/i)) {
      response = "RevX helps businesses navigate digital transformation by developing comprehensive strategies and implementing modern solutions. Our services include digital strategy consulting, process optimization, and technology modernization.";
    }
    else {
      response = "I'm not sure I understand your question. You can ask me about RevX's services, case studies, contact information, or specific topics like digital marketing, e-commerce, development, or revenue optimization. How else can I assist you?";
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
    },
    {
      command: ['digital marketing', 'marketing services', 'seo', 'social media'],
      callback: () => handleQuery('digital marketing'),
    },
    {
      command: ['ecommerce', 'online store', 'digital commerce', 'online retail'],
      callback: () => handleQuery('ecommerce'),
    },
    {
      command: ['development', 'programming', 'coding', 'app development', 'website development'],
      callback: () => handleQuery('development'),
    },
    {
      command: ['ai', 'artificial intelligence', 'machine learning'],
      callback: () => handleQuery('ai'),
    },
    {
      command: ['revenue', 'profit', 'income', 'earnings'],
      callback: () => handleQuery('revenue'),
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