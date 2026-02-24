import { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Calendar, Copy, Leaf, Train, Bike, Hotel, Ticket, Car, Utensils, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'react-router-dom';

const offersData = [
  {
    id: 1,
    title: "20% Off Eco-Lodges",
    description: "Sustainable accommodations worldwide.",
    validUntil: "Mar 2026",
    code: "ECOTRAVEL20",
    category: "lodges",
    icon: Hotel,
    gradient: "from-green-400 to-green-600",
    externalUrl: "https://www.booking.com/sustainable-hotels.html",
  },
  {
    id: 2,
    title: "Free Carbon Offset",
    description: "Offset your next trip's carbon footprint.",
    validUntil: "Jun 2026",
    code: "OFFSET2026",
    category: "offset",
    icon: Leaf,
    gradient: "from-blue-400 to-cyan-500",
    externalUrl: "https://www.goldstandard.org/",
  },
  {
    id: 3,
    title: "$50 Off Adventure Tours",
    description: "Guided eco-adventures in 30+ countries.",
    validUntil: "Apr 2026",
    code: "ADVENTURE50",
    category: "tours",
    icon: TreePine,
    gradient: "from-orange-400 to-red-500",
    externalUrl: "https://www.getyourguide.com/",
  },
  {
    id: 4,
    title: "15% Off Train Passes",
    description: "Explore Europe by rail, not air.",
    validUntil: "May 2026",
    code: "RAIL15",
    category: "trains",
    icon: Train,
    gradient: "from-purple-400 to-purple-600",
    externalUrl: "https://www.raileurope.com/",
  },
  {
    id: 5,
    title: "Buy 1 Get 1 Free Museum Pass",
    description: "Access 500+ museums worldwide.",
    validUntil: "Jul 2026",
    code: "MUSEUM2FOR1",
    category: "culture",
    icon: Ticket,
    gradient: "from-pink-400 to-pink-600",
    externalUrl: "https://www.tiqets.com/",
  },
  {
    id: 6,
    title: "30% Off Bike Rentals",
    description: "Eco-friendly city exploration on two wheels.",
    validUntil: "Aug 2026",
    code: "BIKEGREEN30",
    category: "bikes",
    icon: Bike,
    gradient: "from-yellow-400 to-yellow-600",
    externalUrl: "https://www.bikesbooking.com/",
  },
  {
    id: 7,
    title: "20% Off Electric Vehicle Rentals",
    description: "Zero-emission cars for your road trips.",
    validUntil: "Sep 2026",
    code: "EVGREEN20",
    category: "cars",
    icon: Car,
    gradient: "from-teal-400 to-teal-600",
    externalUrl: "https://www.uber.com",
  },
  {
    id: 8,
    title: "Free Walking Tour",
    description: "Guided city walks with local experts.",
    validUntil: "Oct 2026",
    code: "WALKFREE",
    category: "tours",
    icon: Utensils,
    gradient: "from-indigo-400 to-indigo-600",
    externalUrl: "https://www.freetour.com/",
  },
  {
    id: 9,
    title: "5% Cashback on Green Hotels",
    description: "Earn cashback on certified eco-hotels.",
    validUntil: "Dec 2026",
    code: "CASHBACK5",
    category: "lodges",
    icon: Hotel,
    gradient: "from-emerald-400 to-emerald-600",
    externalUrl: "https://www.booking.com/sustainable-hotels.html",
  },
  {
    id: 10,
    title: "2-for-1 National Park Entry",
    description: "Double your adventure in US National Parks.",
    validUntil: "Nov 2026",
    code: "NATURE2FOR1",
    category: "parks",
    icon: TreePine,
    gradient: "from-lime-400 to-lime-600",
    externalUrl: "https://www.nps.gov/index.htm",
  },
];

const categories = ["all", "lodges", "tours", "trains", "bikes", "culture", "cars", "parks", "offset"];

const Offers = () => {
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('filter');
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { toast } = useToast();

  const filteredOffers = offersData.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(search.toLowerCase()) ||
                          offer.description.toLowerCase().includes(search.toLowerCase()) ||
                          offer.code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || offer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBook = (offer: typeof offersData[0]) => {
    window.open(offer.externalUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: "Redirecting...",
      description: `You're being redirected to our partner site.`,
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    toast({
      title: "Code copied!",
      description: `${code} copied to clipboard.`,
    });
  };

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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Offer Zone</h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Exclusive deals for climate-conscious travelers.
            </p>
            <div className="max-w-md mx-auto relative mb-6">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search offers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Offers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredOffers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient header */}
                <div className={`h-32 bg-gradient-to-br ${offer.gradient} flex items-center justify-center relative`}>
                  <offer.icon className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white">
                    {offer.category}
                  </div>
                </div>
                <div className="p-5 bg-card">
                  <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Calendar className="w-3 h-3" /> Valid until {offer.validUntil}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{offer.code}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-primary/10 transition-colors"
                        onClick={() => copyCode(offer.code)}
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleBook(offer)}
                      className="hover:scale-105 transition-transform"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No offers match your search.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Offers;