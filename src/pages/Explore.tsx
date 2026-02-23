import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Leaf, Clock, DollarSign, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const samplePlaces = [
  { name: "Kyoto Bamboo Grove", location: "Kyoto, Japan", cost: "Free", bestTime: "Mar-May", eco: true, rating: 4.8, image: "🎋", description: "Walk through towering bamboo stalks in this serene forest." },
  { name: "Hallstatt Village", location: "Austria", cost: "$10", bestTime: "Jun-Sep", eco: true, rating: 4.9, image: "🏔️", description: "A fairy-tale lakeside village nestled in the Alps." },
  { name: "Cenotes of Yucatán", location: "Mexico", cost: "$15", bestTime: "Nov-Apr", eco: true, rating: 4.7, image: "🌊", description: "Swim in natural sinkholes with crystal-clear water." },
  { name: "Chefchaouen", location: "Morocco", cost: "Free", bestTime: "Apr-Jun", eco: true, rating: 4.6, image: "🏘️", description: "The iconic blue-painted city in the Rif Mountains." },
  { name: "Plitvice Lakes", location: "Croatia", cost: "$25", bestTime: "May-Sep", eco: true, rating: 4.9, image: "💧", description: "A cascade of 16 terraced lakes connected by waterfalls." },
  { name: "Cappadocia", location: "Turkey", cost: "$150", bestTime: "Apr-Jun", eco: false, rating: 4.8, image: "🎈", description: "Hot air balloon rides over fairy chimneys at sunrise." },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const filtered = samplePlaces.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Explore Places</h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Discover hidden gems and iconic destinations around the world.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search places, restaurants, hidden gems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border card-elevated overflow-hidden"
              >
                <div className="h-40 hero-gradient flex items-center justify-center text-6xl">
                  {place.image}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{place.name}</h3>
                    {place.eco && (
                      <span className="bg-eco/15 text-eco text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Leaf className="w-3 h-3" /> Eco
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{place.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {place.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {place.cost}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {place.bestTime}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {place.rating}</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    View Details
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

export default Explore;
