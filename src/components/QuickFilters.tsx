import { motion } from "framer-motion";
import { Compass, Leaf, Plane, Hotel, Car, Utensils, Gem, Tag } from "lucide-react";

const filters = [
  { icon: Compass, label: "Discover" },
  { icon: Leaf, label: "EcoEscapes" },
  { icon: Plane, label: "FlySmarter" },
  { icon: Hotel, label: "StayUnique" },
  { icon: Car, label: "RideGreen" },
  { icon: Utensils, label: "FoodQuest" },
  { icon: Gem, label: "GemHunt" },
  { icon: Tag, label: "Offers" },
];

const QuickFilters = () => (
  <section className="py-6 border-b bg-background">
    <div className="container mx-auto px-4">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((f, i) => (
          <motion.button
            key={f.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors whitespace-nowrap shrink-0"
          >
            <f.icon className="w-4 h-4" />
            {f.label}
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

export default QuickFilters;
