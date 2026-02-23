import { motion } from "framer-motion";
import {
  Leaf, Cloud, Map, MessageCircle, BarChart3, Zap, Gem, Utensils,
} from "lucide-react";

const features = [
  { icon: Zap, title: "AI Itineraries", desc: "Smart schedules tailored to your style" },
  { icon: Cloud, title: "Climate-Smart Scheduling", desc: "Weather-optimized activity planning" },
  { icon: Leaf, title: "Eco-Mode", desc: "Prioritize eco-friendly attractions" },
  { icon: BarChart3, title: "Carbon Tracker", desc: "Track your trip's environmental impact" },
  { icon: Map, title: "Interactive Maps", desc: "Visualize your journey on a map" },
  { icon: MessageCircle, title: "Voice Chatbot", desc: "Plan trips through conversation" },
  { icon: Gem, title: "Hidden Gems", desc: "Discover offbeat local favorites" },
  { icon: Utensils, title: "Food Explorer", desc: "Find authentic local cuisine" },
];

const FeatureHighlights = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Travel Smarter, Travel Greener
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need for a perfect, planet-friendly adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-xl p-5 card-elevated border text-center"
            >
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center mb-3 mx-auto">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
