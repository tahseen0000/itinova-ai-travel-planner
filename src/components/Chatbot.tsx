import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  content: string;
}

const botFlow = [
  "Hi! 🌍 I'm your travel assistant. Where would you like to go?",
  "Great choice! How many days will your trip be? (1-14)",
  "What's your budget? (Low, Medium, or High)",
  "What are your interests? (Nature, Museums, Food, Shopping, Adventure, Relaxation)",
  "Do you prefer sunny or rainy weather?",
  "Would you like to enable Eco-Mode for eco-friendly recommendations? (Yes/No)",
  "Awesome! I've got all I need. 🎉 Head over to the trip planner to see your personalized itinerary!",
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: botFlow[0] },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const nextStep = Math.min(step, botFlow.length - 1);
    const botMsg: Message = { role: "bot", content: botFlow[nextStep] };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setStep((s) => s + 1);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full hero-gradient flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="hero-gradient px-4 py-3 flex items-center justify-between">
              <span className="font-semibold text-primary-foreground text-sm">
                🌿 Travel Assistant
              </span>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-primary-foreground/80 hover:text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your answer..."
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button size="icon" onClick={sendMessage} className="hero-gradient shrink-0">
                <Send className="w-4 h-4 text-primary-foreground" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
