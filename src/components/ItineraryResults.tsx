import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Leaf, Clock, DollarSign, RotateCcw, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Activity {
  name: string;
  description: string;
  cost: string;
  duration: string;
  timeSlot: string;
  ecoFriendly: boolean;
}

interface DayPlan {
  day: number;
  activities: Activity[];
}

interface ItineraryResultsProps {
  destination: string;
  itinerary: DayPlan[];
  totalCost: string;
  co2Estimate: string;
  onRegenerate: () => void;
  onEditPreferences: () => void;
}

const ItineraryResults = ({
  destination,
  itinerary,
  totalCost,
  co2Estimate,
  onRegenerate,
  onEditPreferences,
}: ItineraryResultsProps) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-bold mb-2 text-foreground text-center">
            Your {destination} Itinerary
          </h2>

          {/* Summary Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 mt-4">
            <div className="flex items-center gap-1.5 bg-accent/15 text-accent-foreground px-3 py-1.5 rounded-full text-sm font-medium">
              <DollarSign className="w-4 h-4" /> {totalCost}
            </div>
            <div className="flex items-center gap-1.5 bg-eco/15 text-eco px-3 py-1.5 rounded-full text-sm font-medium">
              <Leaf className="w-4 h-4" /> CO₂: {co2Estimate}
            </div>
          </div>

          {/* Day Cards */}
          <div className="space-y-4">
            {itinerary.map((dayPlan) => (
              <div
                key={dayPlan.day}
                className="bg-card rounded-xl border card-elevated overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedDay(expandedDay === dayPlan.day ? null : dayPlan.day)
                  }
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground text-lg">
                    Day {dayPlan.day}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedDay === dayPlan.day ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedDay === dayPlan.day && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        {dayPlan.activities.map((activity, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-3 rounded-lg bg-muted/50"
                          >
                            <span className="text-xs font-medium text-muted-foreground mt-1 w-16 shrink-0 uppercase">
                              {activity.timeSlot}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-medium text-foreground">
                                  {activity.name}
                                </span>
                                {activity.ecoFriendly && (
                                  <span className="bg-eco/15 text-eco text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                    <Leaf className="w-3 h-3" /> Eco
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {activity.description}
                              </p>
                              <div className="flex gap-4 mt-1.5 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" /> {activity.cost}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {activity.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            <Button onClick={onRegenerate} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" /> Regenerate
            </Button>
            <Button onClick={onEditPreferences} variant="outline" className="gap-2">
              <Edit3 className="w-4 h-4" /> Edit Preferences
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ItineraryResults;
