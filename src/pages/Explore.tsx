import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Leaf, Clock, DollarSign, Star, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuggestPlaceModal from "@/components/SuggestPlaceModal";

const samplePlaces = [
  // ... (your existing places array) ...
  { name: "Kyoto Bamboo Grove", location: "Kyoto, Japan", cost: "Free", bestTime: "Mar-May", eco: true, rating: 4.8, image: "🎋", description: "Walk through towering bamboo stalks in this serene forest.", hiddenGem: false },
  { name: "Hallstatt Village", location: "Austria", cost: "$10", bestTime: "Jun-Sep", eco: true, rating: 4.9, image: "🏔️", description: "A fairy-tale lakeside village nestled in the Alps.", hiddenGem: false },
  { name: "Cenotes of Yucatán", location: "Mexico", cost: "$15", bestTime: "Nov-Apr", eco: true, rating: 4.7, image: "🌊", description: "Swim in natural sinkholes with crystal-clear water.", hiddenGem: true },
  { name: "Chefchaouen", location: "Morocco", cost: "Free", bestTime: "Apr-Jun", eco: true, rating: 4.6, image: "🏘️", description: "The iconic blue-painted city in the Rif Mountains.", hiddenGem: true },
  { name: "Plitvice Lakes", location: "Croatia", cost: "$25", bestTime: "May-Sep", eco: true, rating: 4.9, image: "💧", description: "A cascade of 16 terraced lakes connected by waterfalls.", hiddenGem: false },
  { name: "Cappadocia", location: "Turkey", cost: "$150", bestTime: "Apr-Jun", eco: false, rating: 4.8, image: "🎈", description: "Hot air balloon rides over fairy chimneys at sunrise.", hiddenGem: false },
  { name: "Socotra Island", location: "Yemen", cost: "$50", bestTime: "Oct-Apr", eco: true, rating: 4.9, image: "🌴", description: "Alien-like landscapes with unique dragon's blood trees.", hiddenGem: true },
  { name: "Giethoorn", location: "Netherlands", cost: "$12", bestTime: "May-Sep", eco: true, rating: 4.8, image: "🛶", description: "A car-free village with canals instead of roads.", hiddenGem: true },
  { name: "Salar de Uyuni", location: "Bolivia", cost: "$25", bestTime: "Dec-Apr", eco: false, rating: 4.8, image: "🪞", description: "World's largest salt flat, a mirror in rainy season.", hiddenGem: false },
  { name: "Zhangjiajie", location: "China", cost: "$40", bestTime: "Apr-Oct", eco: true, rating: 4.7, image: "🏞️", description: "The towering sandstone pillars that inspired Avatar.", hiddenGem: false },
  { name: "Faroe Islands", location: "Denmark", cost: "$$$", bestTime: "Jun-Aug", eco: true, rating: 4.9, image: "🏝️", description: "Dramatic cliffs and waterfalls in the North Atlantic.", hiddenGem: true },
  { name: "Bled Island", location: "Slovenia", cost: "$15", bestTime: "May-Sep", eco: true, rating: 4.8, image: "🏰", description: "A picturesque island with a church in the middle of Lake Bled.", hiddenGem: false },
  { name: "Petra", location: "Jordan", cost: "$70", bestTime: "Mar-May", eco: false, rating: 4.9, image: "🏛️", description: "Ancient Nabatean city carved into rose-red cliffs.", hiddenGem: false },
  { name: "Banff National Park", location: "Canada", cost: "$30", bestTime: "Jun-Sep", eco: true, rating: 4.9, image: "🏔️", description: "Turquoise lakes and rugged mountain scenery.", hiddenGem: false },
  { name: "Angkor Wat", location: "Cambodia", cost: "$37", bestTime: "Nov-Mar", eco: false, rating: 4.8, image: "🛕", description: "The largest religious monument in the world.", hiddenGem: false },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filteredPlaces = samplePlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(search.toLowerCase()) ||
                          place.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ? true :
                          filter === 'eco' ? place.eco :
                          filter === 'hidden' ? place.hiddenGem : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Explore Places</h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Discover hidden gems and iconic destinations around the world.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search places..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filter === 'eco' ? 'default' : 'outline'}
                onClick={() => setFilter('eco')}
                size="sm"
              >
                <Leaf className="w-4 h-4 mr-1" /> Eco
              </Button>
              <Button
                variant={filter === 'hidden' ? 'default' : 'outline'}
                onClick={() => setFilter('hidden')}
                size="sm"
              >
                Hidden Gems
              </Button>
            </div>
            <Button
              onClick={() => setModalOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Suggest a Place
            </Button>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredPlaces.map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border card-elevated overflow-hidden hover:shadow-lg transition"
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
                    {place.hiddenGem && (
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                        Hidden Gem
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
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No places found matching your criteria.
            </div>
          )}
        </div>
      </main>
      <Footer />
      <SuggestPlaceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Explore;