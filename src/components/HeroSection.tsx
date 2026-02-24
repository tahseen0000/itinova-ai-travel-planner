import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Compass } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Mouse position for glow effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typewriter effect for subheading
  const [subtext, setSubtext] = useState("");
  const fullSubtext = "Sustainable travel, powered by AI."; // <-- changed
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullSubtext.length) {
        setSubtext(fullSubtext.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  const scrollToPlanner = () => {
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  };

  // Floating particles (random positions)
  const particles = [...Array(12)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 10,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={heroBg} alt="Scenic travel landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-transparent" />
      </motion.div>

      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 80%)`,
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Rotating compass icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Compass className="w-12 h-12 text-green-300" />
        </motion.div>

        {/* Staggered headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.2 },
            },
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight"
        >
          {"Plan Your Perfect Trip with AI".split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Typewriter subheading with new text */}
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto min-h-[2rem]">
          {subtext}
          <span className="animate-pulse">|</span>
        </p>

        {/* Glowing button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            onClick={scrollToPlanner}
            className="relative bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white text-base px-8 py-6 gap-2 shadow-lg overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            Get Started <ArrowDown className="w-4 h-4 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;