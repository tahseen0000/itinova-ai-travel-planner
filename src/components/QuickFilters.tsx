import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Leaf, Plane, Home, Bike, Utensils, Gem, Tag,
  Sparkles, Globe, Cloud, Map, Coffee, Mountain, Camera
} from 'lucide-react';

const filters = [
  { 
    name: 'Discover', 
    icon: Compass,
    color: 'from-blue-400 to-blue-500',
    description: 'Find your next adventure',
    hoverIcon: Sparkles,
    path: '/explore',
  },
  { 
    name: 'EcoEscapes', 
    icon: Leaf,
    color: 'from-green-400 to-green-500',
    description: 'Sustainable stays & eco-lodges',
    hoverIcon: Globe,
    externalUrl: 'https://www.ecobnb.com/', // dedicated eco-lodges platform
  },
  { 
    name: 'FlySmarter', 
    icon: Plane,
    color: 'from-purple-400 to-purple-500',
    description: 'Low-carbon flight options',
    hoverIcon: Cloud,
    externalUrl: 'https://www.google.com/travel/flights',
  },
  { 
    name: 'StayUnique', 
    icon: Home,
    color: 'from-orange-400 to-orange-500',
    description: 'Treehouses, houseboats & more',
    hoverIcon: Home,
    externalUrl: 'https://www.glampinghub.com/', // unique glamping stays
  },
  { 
    name: 'RideGreen', 
    icon: Bike,
    color: 'from-yellow-400 to-yellow-500',
    description: 'Bike rentals & eco-transport',
    hoverIcon: Map,
    externalUrl: 'https://www.bikesbooking.com/',
  },
  { 
    name: 'FoodQuest', 
    icon: Utensils,
    color: 'from-red-400 to-red-500',
    description: 'Local food experiences',
    hoverIcon: Coffee,
    externalUrl: 'https://www.eatwith.com/', // food experiences with locals
  },
  { 
    name: 'GemHunt', 
    icon: Gem,
    color: 'from-pink-400 to-pink-500',
    description: 'Hidden gems & secret spots',
    hoverIcon: Mountain,
    path: '/explore?filter=hidden',
  },
  { 
    name: 'Offers', 
    icon: Tag,
    color: 'from-indigo-400 to-indigo-500',
    description: 'Exclusive deals & discounts',
    hoverIcon: Camera,
    path: '/offers',
  },
];

const QuickFilters = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (filter: typeof filters[0]) => {
    if (filter.externalUrl) {
      window.open(filter.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (filter.path) {
      navigate(filter.path);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-semibold text-foreground mb-2">Explore by Interest</h2>
        <p className="text-muted-foreground">Find exactly what you're looking for</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 max-w-6xl mx-auto">
        {filters.map((filter, index) => (
          <motion.div
            key={filter.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => handleClick(filter)}
            className="relative group cursor-pointer"
          >
            <div className={`
              relative p-4 rounded-xl bg-gradient-to-br ${filter.color} 
              shadow-lg hover:shadow-xl transition-all duration-300
              transform hover:-translate-y-1
            `}>
              {/* Background pattern */}
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon container */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <filter.icon className="w-6 h-6 text-white" />
                <span className="text-xs font-medium text-white text-center">
                  {filter.name}
                </span>
              </div>

              {/* Hover description overlay */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-48 p-3 bg-card rounded-lg shadow-xl border z-20"
                  >
                    <div className="flex items-start gap-2">
                      <filter.hoverIcon className="w-4 h-4 text-primary mt-0.5" />
                      <p className="text-xs text-muted-foreground">{filter.description}</p>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-card border-t border-l rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickFilters;