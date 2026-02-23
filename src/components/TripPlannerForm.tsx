import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Sun, CloudRain, Snowflake, Cloud, Gem, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const interestOptions = [
  "Landmark", "Museum", "Nature", "Food", "Shopping", "Adventure",
  "Waterpark", "Wildlife", "Spiritual", "Art", "Nightlife", "Photography",
  "Wellness", "Local Crafts", "Farm Visits", "Stargazing",
];

const weatherOptions = [
  { value: "sunny", icon: Sun, label: "Sunny" },
  { value: "rainy", icon: CloudRain, label: "Rainy" },
  { value: "cold", icon: Snowflake, label: "Cold" },
  { value: "any", icon: Cloud, label: "Any" },
];

export interface TripFormData {
  destination: string;
  days: number;
  persons: number;
  budget: string;
  interests: string[];
  weather: string;
  ecoMode: boolean;
  pace: string;
  hiddenGems: boolean;
}

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

const TripPlannerForm = ({ onSubmit, isLoading }: TripPlannerFormProps) => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [persons, setPersons] = useState(1);
  const [budget, setBudget] = useState("Medium");
  const [interests, setInterests] = useState<string[]>([]);
  const [weather, setWeather] = useState("any");
  const [ecoMode, setEcoMode] = useState(false);
  const [pace, setPace] = useState("moderate");
  const [hiddenGems, setHiddenGems] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({ destination, days, persons, budget, interests, weather, ecoMode, pace, hiddenGems });
  };

  return (
    <section id="planner" className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-card rounded-2xl p-8 card-elevated border">
            <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
              Plan Your Trip
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, Tokyo, Bali..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              {/* Days, Persons & Budget row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="days">Days</Label>
                  <Input
                    id="days"
                    type="number"
                    min={1}
                    max={14}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="persons">Persons</Label>
                  <Input
                    id="persons"
                    type="number"
                    min={1}
                    max={20}
                    value={persons}
                    onChange={(e) => setPersons(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        interests.includes(interest)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weather */}
              <div className="space-y-2">
                <Label>Weather Preference</Label>
                <div className="flex flex-wrap gap-2">
                  {weatherOptions.map((w) => (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() => setWeather(w.value)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        weather === w.value
                          ? "bg-primary/10 border-primary text-foreground"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      <w.icon className="w-4 h-4" /> {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pace */}
              <div className="space-y-2">
                <Label>Pace</Label>
                <div className="flex gap-2">
                  {["relaxed", "moderate", "packed"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPace(p)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${
                        pace === p
                          ? "bg-primary/10 border-primary text-foreground"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-eco" />
                    <Label htmlFor="eco-mode" className="cursor-pointer">Eco-Mode</Label>
                    <span className="text-xs text-muted-foreground">Prioritize eco-friendly spots</span>
                  </div>
                  <Switch id="eco-mode" checked={ecoMode} onCheckedChange={setEcoMode} />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-accent" />
                    <Label htmlFor="hidden-gems" className="cursor-pointer">Hidden Gems</Label>
                    <span className="text-xs text-muted-foreground">Include offbeat locations</span>
                  </div>
                  <Switch id="hidden-gems" checked={hiddenGems} onCheckedChange={setHiddenGems} />
                </div>
              </div>

              <Button type="submit" className="w-full hero-gradient text-primary-foreground" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating with AI...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Generate AI Itinerary
                  </span>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TripPlannerForm;
