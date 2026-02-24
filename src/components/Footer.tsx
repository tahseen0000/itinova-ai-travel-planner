import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Compass, Mail, Twitter, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const faqData: Record<string, { question: string; answer: string }[]> = {
  "/": [
    { 
      question: "How does the AI generate itineraries?", 
      answer: "Our AI analyzes your preferences, destination, climate data, and millions of traveler reviews to create personalized day plans. It considers eco-friendly options, hidden gems, and optimal scheduling to minimize crowds and maximize enjoyment." 
    },
    { 
      question: "Is Climate & Compass free to use?", 
      answer: "Yes! Basic itinerary generation is completely free. Premium features like carbon offsetting, exclusive offers, and advanced filters are available with a subscription starting at $4.99/month." 
    },
    { 
      question: "What makes your itineraries climate-smart?", 
      answer: "We prioritize low-carbon activities, public transport options, and eco-certified accommodations. Each itinerary includes a CO₂ footprint estimate and tips to reduce your impact." 
    },
    { 
      question: "Can I use the app offline?", 
      answer: "Once you generate an itinerary, you can access it offline on our mobile app. Web version requires internet for generation but saved itineraries are cached." 
    },
  ],
  "/explore": [
    { 
      question: "What are hidden gems?", 
      answer: "Hidden gems are offbeat, lesser-known locations recommended by locals and travel experts – places that aren't overcrowded but offer authentic experiences." 
    },
    { 
      question: "How do I filter places by eco-friendly?", 
      answer: "Use the 'Eco' filter button above the list to see only sustainable accommodations and attractions that meet our green criteria." 
    },
    { 
      question: "How often is the place database updated?", 
      answer: "We update our database weekly with new locations, reviews, and eco-certifications from trusted sources like Booking.com, TripAdvisor, and local tourism boards." 
    },
    { 
      question: "Can I submit a hidden gem?", 
      answer: "Absolutely! If you know a special place, click 'Suggest a Place' on the Explore page. Our team reviews submissions and adds the best ones." 
    },
    { 
      question: "What do the badges (Eco, Hidden Gem) mean?", 
      answer: "Eco badges indicate sustainable practices (green certifications, low waste, etc.). Hidden Gem badges highlight places with high authenticity but low tourist traffic." 
    },
  ],
  "/offers": [
    { 
      question: "How do I use a promo code?", 
      answer: "Click 'Copy code' next to the offer, then click 'Book' to visit our partner site. Paste the code at checkout to apply the discount." 
    },
    { 
      question: "Are these offers really exclusive?", 
      answer: "Yes! We've partnered with eco-conscious brands to bring you discounts you won't find elsewhere. Many offers are negotiated specifically for our community." 
    },
    { 
      question: "Do offers expire?", 
      answer: "Each offer has a validity date clearly shown. Be sure to book before the deadline to enjoy the discount." 
    },
    { 
      question: "Can I combine multiple offers?", 
      answer: "Usually no – most offers cannot be combined. Check the terms on the partner site for details." 
    },
    { 
      question: "What if a booking doesn't work?", 
      answer: "Contact our support at offers@climatecompass.com and we'll help you resolve the issue or find an alternative deal." 
    },
  ],
  "/planner": [
    { 
      question: "What is Eco-Mode?", 
      answer: "Eco-Mode prioritizes sustainable accommodations, low‑carbon transport, and eco‑certified activities to minimize your travel footprint. It also suggests off‑peak timings to reduce overcrowding." 
    },
    { 
      question: "Can I save my itinerary?", 
      answer: "Absolutely! Create a free account to save itineraries, add to wishlist, and access them later from your dashboard." 
    },
    { 
      question: "How accurate are the cost estimates?", 
      answer: "Cost estimates are based on average prices for attractions, meals, and transport in your destination. They're a guideline – actual costs may vary." 
    },
    { 
      question: "Can I customize the generated itinerary?", 
      answer: "Yes! After generation, you can drag-and-drop activities, replace them with alternatives, or add your own stops. Your changes are saved to your account." 
    },
    { 
      question: "What does 'pace' mean?", 
      answer: "Pace controls how relaxed or packed your days are. 'Relaxed' leaves plenty of free time; 'Packed' schedules every hour with activities." 
    },
  ],
  "/about": [
    { 
      question: "Who is behind Climate & Compass?", 
      answer: "We're a team of travel enthusiasts and climate scientists from six countries, united by a mission to make travel more sustainable and accessible." 
    },
    { 
      question: "How do you measure carbon footprint?", 
      answer: "We use emission factors from reputable sources like the International Energy Agency and the UN, based on activity types, distances, and transport modes." 
    },
    { 
      question: "Do you donate to environmental causes?", 
      answer: "Yes! 5% of our premium subscription revenue goes to verified carbon offset projects and reforestation initiatives." 
    },
    { 
      question: "How can I partner with you?", 
      answer: "If you're a travel brand or eco-organization, email us at partners@climatecompass.com. We'd love to collaborate." 
    },
    { 
      question: "What's next for Climate & Compass?", 
      answer: "We're working on group trip planning, real-time weather integration, and augmented reality features to enhance your travel experience." 
    },
  ],
};

const defaultFaq = [
  { 
    question: "How do I contact support?", 
    answer: "Email us at support@climatecompass.com and we'll get back to you within 24 hours. You can also use the chatbot on our homepage." 
  },
  { 
    question: "Is my data secure?", 
    answer: "We use industry‑standard encryption and never share your personal information with third parties. Read our Privacy Policy for details." 
  },
  { 
    question: "Can I delete my account?", 
    answer: "Yes – go to your Dashboard → Settings → Delete Account. This permanently removes your data and itineraries." 
  },
];

const Footer = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const location = useLocation();
  const path = location.pathname;

  // Get FAQs for current page, or use default if none defined
  const currentFaqs = faqData[path] || defaultFaq;

  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {currentFaqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition"
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 py-3 bg-card text-muted-foreground text-sm border-t"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Footer main content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t pt-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
              <Compass className="w-5 h-5" />
              Itinova
            </div>
            <p className="text-sm text-muted-foreground">
              Travel smarter, travel greener – AI-powered itineraries for the conscious explorer.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/explore" className="hover:text-primary transition">Explore</Link></li>
              <li><Link to="/offers" className="hover:text-primary transition">Offers</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10 transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10 transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary/10 transition">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-8 pt-4 border-t">
          © {new Date().getFullYear()} Climate & Compass. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;