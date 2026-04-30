"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Dummy bot responses
  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! I'm here to help you with any questions about our surgical instruments. What would you like to know?";
    }
    if (lowerMessage.includes("product") || lowerMessage.includes("instrument")) {
      return "We offer a wide range of high-quality surgical instruments. You can browse by instrument type or surgery type. Would you like to know more about a specific category?";
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "For pricing information, please contact our sales team. You can use the 'Request Quote' button on any product page or visit our contact page.";
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
      return "You can reach us through our contact page or by clicking the 'Contact' button in the navigation. Our team will get back to you promptly.";
    }
    if (lowerMessage.includes("order") || lowerMessage.includes("buy") || lowerMessage.includes("purchase")) {
      return "To place an order, please add products to your inquiry list and request a quote. Our sales team will assist you with the ordering process.";
    }
    if (lowerMessage.includes("quality") || lowerMessage.includes("certification") || lowerMessage.includes("iso")) {
      return "All our products are ISO certified and manufactured to the highest quality standards. You can learn more about our quality and compliance on the Quality page.";
    }
    
    // Default response
    return "Thank you for your message. Our team will review it and get back to you soon. In the meantime, feel free to browse our products or contact us directly for immediate assistance.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 right-4 z-99 flex h-[500px] w-auto flex-col overflow-hidden rounded-lg border border-stroke bg-white shadow-solid-5 dark:border-strokedark dark:bg-blacksection md:left-8 md:right-auto md:w-[400px]">
          {/* Chat Header */}
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-lg bg-primary px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Chat Support</h3>
                <p className="text-xs text-white/80">We're here to help</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
              aria-label="Close chat"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-stroke text-black dark:bg-strokedark dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="flex-shrink-0 border-t border-stroke p-4 dark:border-strokedark">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-stroke bg-white px-4 py-3 text-sm text-black placeholder:text-waterloo focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-black dark:text-white dark:placeholder:text-manatee"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primaryho"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Button */}
      <div className="fixed bottom-8 left-4 right-4 z-99 md:left-8 md:right-auto md:w-auto">
        <button
          onClick={toggleChat}
          className={`ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-solid-5 transition-all duration-300 hover:bg-primaryho hover:shadow-solid-7 md:ml-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
        {isOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
        </button>
      </div>
    </>
  );
}

