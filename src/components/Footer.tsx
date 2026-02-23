import { Link } from "react-router-dom";
import { Compass, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How does Climate & Compass work?", a: "Our AI analyzes your preferences — destination, budget, interests, and eco-priorities — to create personalized, climate-smart itineraries in seconds." },
  { q: "Is my data safe?", a: "Absolutely. We use enterprise-grade encryption and never share your personal data with third parties." },
  { q: "What is Eco-Mode?", a: "Eco-Mode prioritizes eco-friendly attractions, sustainable transport, and low-carbon activities in your itinerary." },
  { q: "Can I edit my itinerary after generation?", a: "Yes! You can regenerate, edit preferences, or manually adjust activities at any time." },
];

const Footer = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <footer className="bg-card border-t">
      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h3>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                {faq.q}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold">
              <Compass className="w-5 h-5" />
              Climate & Compass
            </Link>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
              <Link to="/explore" className="hover:text-foreground transition-colors">Explore</Link>
              <Link to="/offers" className="hover:text-foreground transition-colors">Offers</Link>
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} Climate & Compass. Travel smart, travel green.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
