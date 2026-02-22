import { motion } from "framer-motion";
import { Leaf, Cloud, Map, MessageCircle, BarChart3, Zap } from "lucide-react";

const features = [
  { icon: Zap, title: "AI-Powered Itineraries", desc: "Smart schedules tailored to your style" },
  { icon: Cloud, title: "Climate-Smart Scheduling", desc: "Weather-optimized activity planning" },
  { icon: Leaf, title: "Eco-Mode", desc: "Prioritize eco-friendly attractions" },
  { icon: BarChart3, title: "Carbon Footprint Tracker", desc: "Track your trip's environmental impact" },
  { icon: Map, title: "Interactive Map", desc: "Visualize your journey on a map" },
  { icon: MessageCircle, title: "Chatbot Assistant", desc: "Plan trips through conversation" },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-6 card-elevated border"
            >
              <div className="w-11 h-11 rounded-lg hero-gradient flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
