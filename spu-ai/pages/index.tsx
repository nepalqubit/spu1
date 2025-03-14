'use client';

import { useState, useRef, useEffect } from 'react';
import useClipboard from 'react-use-clipboard';
import Head from 'next/head';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  enhanced?: boolean;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 2000,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMessage }] }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message,
        enhanced: true 
      }]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string) => {
    setTextToCopy(content);
  };

  return (
    <>
      <Head>
        <title>RevX AI Assistant</title>
        <meta name="description" content="Your comprehensive digital solutions assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">RevX AI Assistant</h1>
              <p className="text-blue-100 text-sm mt-1">Enhanced with OpenRouter AI</p>
            </div>

            {/* Chat Container */}
            <div className="h-[calc(100vh-16rem)] overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-medium text-gray-700 mb-2">Welcome to RevX AI Assistant</h2>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Ask me anything about RevX's services, digital solutions, or how we can help your business grow.
                  </p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} chat-message`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.role === 'assistant' && message.enhanced && (
                      <div className="flex items-center mb-2 text-xs text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        AI Enhanced
                      </div>
                    )}
                    <div className="prose prose-sm">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                    <button
                      onClick={() => handleCopy(message.content)}
                      className={`mt-2 text-xs ${
                        message.role === 'user'
                          ? 'text-blue-100 hover:text-white'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {textToCopy === message.content && isCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl p-4 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-blue-700 mr-2">Generating AI response</div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200">
              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-24 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  rows={1}
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                    isLoading || !input.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
} 