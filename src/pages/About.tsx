import { motion } from "framer-motion";
import { Compass, Leaf, Globe, Heart, Users, TreePine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Leaf, title: "Sustainability First", desc: "Every recommendation considers its environmental impact." },
  { icon: Globe, title: "Global Perspective", desc: "Connecting travelers with authentic experiences worldwide." },
  { icon: Heart, title: "Community Driven", desc: "Empowering local communities through responsible tourism." },
  { icon: Users, title: "Inclusive Travel", desc: "Making travel accessible and enjoyable for everyone." },
  { icon: TreePine, title: "Carbon Conscious", desc: "Tracking and offsetting your travel footprint." },
  { icon: Compass, title: "Smart Discovery", desc: "AI-powered recommendations for hidden gems." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About Climate & Compass
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We believe travel should inspire wonder while preserving the planet for future explorers.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Climate & Compass was born from a simple idea: travel should be both extraordinary and responsible. 
            We use AI to craft personalized itineraries that balance unforgettable experiences with environmental 
            consciousness. From hidden gems to carbon tracking, every feature is designed to make sustainable 
            travel the easiest choice.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 border card-elevated"
              >
                <div className="w-11 h-11 rounded-lg hero-gradient flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
