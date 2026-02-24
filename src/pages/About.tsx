import { motion } from "framer-motion";
import { Leaf, Globe, Users, Heart, Zap, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "Every recommendation considers its environmental impact.",
    color: "text-green-600",
    borderColor: "border-green-500",
    bg: "bg-green-100",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Connecting travelers with authentic experiences worldwide.",
    color: "text-blue-600",
    borderColor: "border-blue-500",
    bg: "bg-blue-100",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Empowering local communities through responsible tourism.",
    color: "text-purple-600",
    borderColor: "border-purple-500",
    bg: "bg-purple-100",
  },
  {
    icon: Heart,
    title: "Inclusive Travel",
    description: "Making travel accessible and enjoyable for everyone.",
    color: "text-red-600",
    borderColor: "border-red-500",
    bg: "bg-red-100",
  },
  {
    icon: Zap,
    title: "Carbon Conscious",
    description: "Tracking and offsetting your travel footprint.",
    color: "text-yellow-600",
    borderColor: "border-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    icon: Sparkles,
    title: "Smart Discovery",
    description: "AI-powered recommendations for hidden gems.",
    color: "text-indigo-600",
    borderColor: "border-indigo-500",
    bg: "bg-indigo-100",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-3">About Climate & Compass</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to make travel smarter, greener, and more meaningful.
            </p>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card p-6 rounded-xl border-l-4 ${value.borderColor} shadow-sm hover:shadow-md transition`}
                >
                  <div className={`w-12 h-12 rounded-full ${value.bg} flex items-center justify-center mb-4`}>
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Story / Mission */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-green-50 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Itinova was born from a simple idea: travel should enrich both the traveler and the destination.
              We combine AI with climate science to craft itineraries that minimize carbon footprint while maximizing authentic experiences.
            </p>
            <p className="text-muted-foreground">
              From hidden gems to eco‑certified stays, we're here to help you explore responsibly. Join us in making travel a force for good.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;