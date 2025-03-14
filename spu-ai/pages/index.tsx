'use client';

import { useState, useRef, useEffect } from 'react';
import useClipboard from 'react-use-clipboard';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
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
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
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
            </div>

            {/* Chat Container */}
            <div className="h-[calc(100vh-16rem)] overflow-y-auto p-6 space-y-4">
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
                    <div className="flex space-x-2">
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