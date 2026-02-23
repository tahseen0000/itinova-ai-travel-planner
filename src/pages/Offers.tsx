import { motion } from "framer-motion";
import { Tag, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const offers = [
  { title: "20% Off Eco-Lodges", code: "ECOTRAVEL20", discount: "20% OFF", validity: "Valid until Mar 2026", partner: "🌿 GreenStay", desc: "Sustainable accommodations worldwide." },
  { title: "Free Carbon Offset", code: "OFFSET2026", discount: "FREE", validity: "Valid until Jun 2026", partner: "🌍 EarthFund", desc: "Offset your next trip's carbon footprint." },
  { title: "$50 Off Adventure Tours", code: "ADVENTURE50", discount: "$50 OFF", validity: "Valid until Apr 2026", partner: "🏔️ WildTrails", desc: "Guided eco-adventures in 30+ countries." },
  { title: "15% Off Train Passes", code: "RAIL15", discount: "15% OFF", validity: "Valid until May 2026", partner: "🚂 RailEurope", desc: "Explore Europe by rail, not air." },
  { title: "Buy 1 Get 1 Free Museum Pass", code: "MUSEUM2FOR1", discount: "BOGO", validity: "Valid until Jul 2026", partner: "🏛️ CulturePass", desc: "Access 500+ museums worldwide." },
  { title: "30% Off Bike Rentals", code: "BIKEGREEN30", discount: "30% OFF", validity: "Valid until Aug 2026", partner: "🚲 CycleCity", desc: "Eco-friendly city exploration on two wheels." },
];

const Offers = () => {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code copied!", description: `${code} has been copied to clipboard.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Offer Zone</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Exclusive deals for climate-conscious travelers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border card-elevated p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{offer.partner.split(" ")[0]}</span>
                  <span className="bg-accent/15 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {offer.discount}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{offer.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{offer.desc}</p>
                <p className="text-xs text-muted-foreground mb-4">{offer.validity}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => copyCode(offer.code)}>
                    <Copy className="w-3 h-3" /> {offer.code}
                  </Button>
                  <Button size="sm" className="hero-gradient text-primary-foreground gap-1">
                    <ExternalLink className="w-3 h-3" /> Book
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Offers;
