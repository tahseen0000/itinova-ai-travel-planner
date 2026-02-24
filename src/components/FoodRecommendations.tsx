import React from 'react';
import { Utensils, Leaf, Beef, Vegan } from 'lucide-react';

interface Restaurant {
  name: string;
  cuisine: string;
  type: 'veg' | 'nonveg' | 'vegan' | 'mixed';
  price: string;
  eco?: boolean;
  image?: string;
}

interface FoodRecommendationsProps {
  restaurants: Restaurant[];
  preference: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'veg':
      return <Leaf className="w-4 h-4 text-green-600" />;
    case 'nonveg':
      return <Beef className="w-4 h-4 text-red-600" />;
    case 'vegan':
      return <Vegan className="w-4 h-4 text-green-700" />;
    default:
      return <Utensils className="w-4 h-4 text-gray-600" />;
  }
};

export const FoodRecommendations: React.FC<FoodRecommendationsProps> = ({
  restaurants,
  preference,
}) => {
  const preferenceLabel: Record<string, string> = {
    any: 'All',
    veg: 'Vegetarian',
    nonveg: 'Non‑Vegetarian',
    vegan: 'Vegan',
  };

  const label = preferenceLabel[preference] || 'All';

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Utensils className="w-6 h-6" />
        Recommended Places to Eat
        <span className="text-sm font-normal bg-green-100 text-green-800 px-3 py-1 rounded-full ml-2">
          {label} options
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((r, idx) => (
          <div key={idx} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            {r.image && (
              <img src={r.image} alt={r.name} className="w-full h-32 object-cover rounded-md mb-2" />
            )}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{r.name}</h3>
              <div className="flex items-center gap-1">
                {getTypeIcon(r.type)}
                {r.eco && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                    Eco
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {r.cuisine} • {r.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};