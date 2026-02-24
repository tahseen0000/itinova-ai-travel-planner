import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface TripData {
  countryName: string;
  city: string;
  days: number;
  persons: number;
  budget: string;
  interests: string[];
  weather: string;
  foodPreference: 'any' | 'veg' | 'nonveg' | 'vegan';
  pace: string;
  ecoMode: boolean;
  hiddenGems: boolean;
}

const questions = [
  { key: 'countryName', text: "Which country would you like to visit?" },
  { key: 'city', text: "Which city?" },
  { key: 'days', text: "How many days? (1-14)" },
  { key: 'persons', text: "How many persons?" },
  { key: 'budget', text: "Budget? (Low, Medium, High, Luxury)" },
  { key: 'interests', text: "Interests? (comma-separated, e.g., Landmark, Museum, Food)" },
  { key: 'weather', text: "Weather preference? (Sunny, Rainy, Cold, Any)" },
  { key: 'foodPreference', text: "Food preference? (Any, Vegetarian, Non-Veg, Vegan)" },
  { key: 'pace', text: "Pace? (Relaxed, Moderate, Packed)" },
  { key: 'ecoMode', text: "Enable Eco-Mode? (Yes/No)" },
  { key: 'hiddenGems', text: "Include hidden gems? (Yes/No)" },
];

const Chatbot = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! 🌍 I'm your travel assistant. Let's plan your perfect trip." },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [tripData, setTripData] = useState<Partial<TripData>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);

    const currentQuestion = questions[step];
    let parsedValue: any = input.trim();

    if (currentQuestion.key === 'days' || currentQuestion.key === 'persons') {
      parsedValue = parseInt(parsedValue) || 1;
    } else if (currentQuestion.key === 'budget') {
      const val = parsedValue.toLowerCase();
      if (val.includes('low')) parsedValue = 'Low';
      else if (val.includes('medium') || val.includes('med')) parsedValue = 'Medium';
      else if (val.includes('high')) parsedValue = 'High';
      else if (val.includes('luxury')) parsedValue = 'Luxury';
      else parsedValue = 'Medium';
    } else if (currentQuestion.key === 'interests') {
      parsedValue = parsedValue.split(',').map((s: string) => s.trim()).filter(Boolean);
    } else if (currentQuestion.key === 'weather') {
      const val = parsedValue.toLowerCase();
      if (val.includes('sun')) parsedValue = 'sunny';
      else if (val.includes('rain')) parsedValue = 'rainy';
      else if (val.includes('cold')) parsedValue = 'cold';
      else parsedValue = 'any';
    } else if (currentQuestion.key === 'foodPreference') {
      const val = parsedValue.toLowerCase();
      if (val.includes('veg') && !val.includes('non')) parsedValue = 'veg';
      else if (val.includes('non')) parsedValue = 'nonveg';
      else if (val.includes('vegan')) parsedValue = 'vegan';
      else parsedValue = 'any';
    } else if (currentQuestion.key === 'pace') {
      const val = parsedValue.toLowerCase();
      if (val.includes('relax')) parsedValue = 'relaxed';
      else if (val.includes('moderate')) parsedValue = 'moderate';
      else if (val.includes('pack')) parsedValue = 'packed';
      else parsedValue = 'moderate';
    } else if (currentQuestion.key === 'ecoMode' || currentQuestion.key === 'hiddenGems') {
      parsedValue = parsedValue.toLowerCase().startsWith('y');
    }

    setTripData(prev => ({ ...prev, [currentQuestion.key]: parsedValue }));
    setInput("");

    if (step < questions.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "bot", content: questions[nextStep].text }]);
      }, 300);
    } else {
      // Last question answered – set step to length to show button
      setStep(questions.length);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: "bot", content: "Great! I've got all your preferences. Click below to generate your AI itinerary." }
        ]);
      }, 300);
    }
  };

  const handleGenerate = () => {
    const fullData: TripData = {
      countryName: tripData.countryName || "",
      city: tripData.city || "",
      days: tripData.days || 3,
      persons: tripData.persons || 1,
      budget: tripData.budget || "Medium",
      interests: tripData.interests || [],
      weather: tripData.weather || "any",
      foodPreference: tripData.foodPreference || "any",
      pace: tripData.pace || "moderate",
      ecoMode: tripData.ecoMode || false,
      hiddenGems: tripData.hiddenGems || false,
    };
    navigate('/planner', { state: { tripData: fullData } });
    setOpen(false);
  };

  const startConversation = () => {
    setOpen(true);
    setMessages([{ role: "bot", content: questions[0].text }]);
    setStep(0);
    setTripData({});
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={startConversation}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full hero-gradient flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="hero-gradient px-4 py-3 flex items-center justify-between">
              <span className="font-semibold text-primary-foreground text-sm">🌿 Travel Assistant</span>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-primary-foreground/80 hover:text-primary-foreground" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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

            <div className="p-3 border-t">
              {step === questions.length ? (
                <Button onClick={handleGenerate} className="w-full gap-2">
                  Generate My Itinerary <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
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
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;