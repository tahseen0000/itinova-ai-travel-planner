import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Sun, CloudRain } from "lucide-react";
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

const interestOptions = ["Nature", "Museums", "Food", "Shopping", "Adventure", "Relaxation"];

export interface TripFormData {
  destination: string;
  days: number;
  budget: string;
  interests: string[];
  weather: "sunny" | "rainy";
  ecoMode: boolean;
}

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

const TripPlannerForm = ({ onSubmit, isLoading }: TripPlannerFormProps) => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("Medium");
  const [interests, setInterests] = useState<string[]>([]);
  const [weather, setWeather] = useState<"sunny" | "rainy">("sunny");
  const [ecoMode, setEcoMode] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({ destination, days, budget, interests, weather, ecoMode });
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

              {/* Days & Budget row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="days">Number of Days</Label>
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
                  <Label>Budget</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
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
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
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
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setWeather("sunny")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      weather === "sunny"
                        ? "bg-accent/20 border-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    <Sun className="w-4 h-4" /> Sunny
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeather("rainy")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      weather === "rainy"
                        ? "bg-ocean/20 border-ocean text-foreground"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    <CloudRain className="w-4 h-4" /> Rainy
                  </button>
                </div>
              </div>

              {/* Eco Mode */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-eco" />
                  <Label htmlFor="eco-mode" className="cursor-pointer">
                    Eco-Mode
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Prioritize eco-friendly spots
                  </span>
                </div>
                <Switch id="eco-mode" checked={ecoMode} onCheckedChange={setEcoMode} />
              </div>

              <Button type="submit" className="w-full hero-gradient text-primary-foreground" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  "Generate Itinerary"
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
