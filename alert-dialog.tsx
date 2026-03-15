import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

const CHATBOT_RESPONSES: Record<string, string> = {
  "emergency": "In case of medical emergency, please call 911 or search for the nearest hospital using our app. You can also use the SOS button on the home page for immediate assistance.",
  "blood": "You can find nearby blood banks using our app. Search for 'Blood Banks' in your location and we'll show you available resources with contact information.",
  "ambulance": "Looking for ambulance services? Use the search feature and select 'Ambulance Services' category. We'll display the nearest ambulances in your area.",
  "police": "To find police stations, search for 'Police Stations' in the search bar. You can also use the SOS button for emergency assistance.",
  "save": "You can save your favorite emergency resources in your dashboard. Sign in to your account and start saving resources for quick access later.",
  "location": "We use your device's geolocation to find nearby emergency services. Make sure location access is enabled in your browser settings for best results.",
  "hospital": "To find hospitals, use the search bar on the home page and select 'Hospitals'. We'll show you nearby hospitals with their contact details and distances.",
  "help": "I can help you find emergency resources like hospitals, blood banks, ambulance services, and police stations. Just ask or use the search feature!",
  "hi": "Hello! I'm your Emergency Resource Finder assistant. I can help you locate nearby hospitals, blood banks, ambulance services, and police stations.",
  "hello": "Hello! I'm your Emergency Resource Finder assistant. I can help you locate nearby hospitals, blood banks, ambulance services, and police stations.",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hello! I'm your Emergency Resource Finder assistant. How can I help you find emergency services today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for keywords in user message
    for (const [keyword, response] of Object.entries(CHATBOT_RESPONSES)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return "I can help you find emergency resources. You can ask me about hospitals, blood banks, ambulance services, police stations, or how to use the app features.";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      text: generateBotResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110"
        title="Open chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[90vw] bg-white dark:bg-card rounded-lg shadow-2xl border border-border flex flex-col h-96 md:h-[500px]">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">Emergency Assistant</h3>
            <p className="text-sm text-white/90">Always here to help</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
