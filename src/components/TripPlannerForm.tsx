import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Sun, CloudRain, Snowflake, Cloud, Gem, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationSelector } from "@/components/LocationSelector";
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
  countryId: string;
  countryName: string;
  city: string;
  days: number;
  persons: number;
  budget: string;
  interests: string[];
  foodPreference: 'any' | 'veg' | 'nonveg' | 'vegan';
  weather: string;
  pace: string;
  ecoMode: boolean;
  hiddenGems: boolean;
}

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
  initialData?: TripFormData; // <-- new prop
}

const TripPlannerForm = ({ onSubmit, isLoading, initialData }: TripPlannerFormProps) => {
  const [countryId, setCountryId] = useState("");
  const [countryName, setCountryName] = useState("");
  const [city, setCity] = useState("");
  const [days, setDays] = useState(3);
  const [persons, setPersons] = useState(1);
  const [budget, setBudget] = useState("Medium");
  const [interests, setInterests] = useState<string[]>([]);
  const [foodPreference, setFoodPreference] = useState<'any' | 'veg' | 'nonveg' | 'vegan'>('any');
  const [weather, setWeather] = useState("any");
  const [pace, setPace] = useState("moderate");
  const [ecoMode, setEcoMode] = useState(false);
  const [hiddenGems, setHiddenGems] = useState(false);

  // Pre‑fill form when initialData changes (e.g., after chatbot)
  useEffect(() => {
    if (initialData) {
      setCountryId(initialData.countryId || "");
      setCountryName(initialData.countryName || "");
      setCity(initialData.city || "");
      setDays(initialData.days || 3);
      setPersons(initialData.persons || 1);
      setBudget(initialData.budget || "Medium");
      setInterests(initialData.interests || []);
      setFoodPreference(initialData.foodPreference || "any");
      setWeather(initialData.weather || "any");
      setPace(initialData.pace || "moderate");
      setEcoMode(initialData.ecoMode || false);
      setHiddenGems(initialData.hiddenGems || false);
    }
  }, [initialData]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleCountryChange = (id: string, name: string) => {
    setCountryId(id);
    setCountryName(name);
    setCity("");
  };

  const handleCityChange = (city: string) => {
    setCity(city);
  };

  const getBudgetRange = () => {
    const ranges = {
      Low: { min: 50, max: 100 },
      Medium: { min: 100, max: 200 },
      High: { min: 200, max: 350 },
      Luxury: { min: 350, max: 500 },
    };
    const range = ranges[budget as keyof typeof ranges] || ranges.Medium;
    const minTotal = range.min * days * persons;
    const maxTotal = range.max * days * persons;
    return { min: minTotal, max: maxTotal };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryId || !city) return;
    onSubmit({
      countryId,
      countryName,
      city,
      days,
      persons,
      budget,
      interests,
      foodPreference,
      weather,
      pace,
      ecoMode,
      hiddenGems,
    });
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
              <LocationSelector
                onCountryChange={handleCountryChange}
                onCityChange={handleCityChange}
                selectedCountryId={countryId}
                selectedCity={city}
                className="grid-cols-2"
              />

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

              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                <span className="font-medium">Estimated total:</span> ${getBudgetRange().min} – ${getBudgetRange().max}
                <span className="text-xs ml-2">
                  (based on {days} days, {persons} {persons === 1 ? 'person' : 'persons'})
                </span>
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="food-preference">Food Preference</Label>
                <select
                  id="food-preference"
                  value={foodPreference}
                  onChange={(e) => setFoodPreference(e.target.value as any)}
                  className="w-full p-2 border rounded bg-background"
                >
                  <option value="any">Any</option>
                  <option value="veg">Vegetarian</option>
                  <option value="nonveg">Non‑Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>

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