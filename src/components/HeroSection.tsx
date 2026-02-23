import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToPlanner = () => {
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Scenic travel landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight"
        >
          Plan Your Perfect Trip with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto"
        >
          Climate Smart, Instantly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={scrollToPlanner}
            className="hero-gradient text-primary-foreground text-base px-8 py-6 gap-2 shadow-lg"
          >
            Get Started <ArrowDown className="w-4 h-4 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
