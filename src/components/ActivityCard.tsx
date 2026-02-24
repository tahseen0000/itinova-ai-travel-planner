import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Plus } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Activity {
  time: string;
  name: string;
  description: string;
  cost: number;
  duration: string;
  eco?: boolean;
  image?: string;
}

interface ActivityCardProps {
  activity: Activity;
  dayIndex: number;
  activityIndex: number;
  onAddNearby: (place: any, dayIndex: number, activityIndex: number) => void;
  onArriveLate: (dayIndex: number, activityIndex: number) => void;
}

// Generate varied nearby places based on day/activity index
const getNearbyPlaces = (dayIndex: number, activityIndex: number) => {
  const sets = [
    [
      { name: 'City Garden', duration: '45 min', description: 'Peaceful park with fountains', cost: 0, eco: true, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400' },
      { name: 'Local Art Gallery', duration: '1 hr', description: 'Contemporary exhibits', cost: 12, eco: false, image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400' },
      { name: 'Historic Church', duration: '30 min', description: 'Centuries-old architecture', cost: 0, eco: true, image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=400' },
    ],
    [
      { name: 'Street Food Market', duration: '1.5 hr', description: 'Taste local delicacies', cost: 20, eco: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
      { name: 'Viewpoint', duration: '20 min', description: 'Panoramic city view', cost: 0, eco: true, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { name: 'Wine Tasting', duration: '1 hr', description: 'Sample local wines', cost: 35, eco: false, image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=400' },
    ],
    [
      { name: 'Botanical Garden', duration: '1 hr', description: 'Exotic plants and flowers', cost: 8, eco: true, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400' },
      { name: 'Craft Market', duration: '1 hr', description: 'Handmade souvenirs', cost: 0, eco: false, image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400' },
      { name: 'Old Town Square', duration: '45 min', description: 'Historical center', cost: 0, eco: true, image: 'https://images.unsplash.com/photo-1551817958-550a5fe64c4d?w=400' },
    ],
  ];
  const setIndex = (dayIndex + activityIndex) % sets.length;
  return sets[setIndex];
};

export const ActivityCard = ({ activity, dayIndex, activityIndex, onAddNearby, onArriveLate }: ActivityCardProps) => {
  const [showNearby, setShowNearby] = useState(false);
  const { convertPrice } = useCurrency();

  const parseDuration = (dur: string) => {
    const match = dur.match(/(\d+(?:\.\d+)?)h/);
    return match ? parseFloat(match[1]) : 1;
  };

  const originalHours = parseDuration(activity.duration);
  const reducedHours = 1;
  const timeSaved = originalHours - reducedHours;
  const nearbyPlaces = getNearbyPlaces(dayIndex, activityIndex);

  const handleAddNearby = (place: any) => {
    onAddNearby(place, dayIndex, activityIndex);
    alert(`✅ Added ${place.name} to Day ${dayIndex + 1}!`);
  };

  return (
    <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
      <div className="flex gap-3">
        {activity.image && (
          <img src={activity.image} alt={activity.name} className="w-20 h-20 object-cover rounded-md" />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-semibold text-primary">{activity.time}:</span>{' '}
              <span className="font-medium">{activity.name}</span>
              {activity.eco && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Eco
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onArriveLate(dayIndex, activityIndex)} className="gap-1">
                <Clock className="w-4 h-4" />
                I arrived late
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowNearby(!showNearby)} className="gap-1">
                <Clock className="w-4 h-4" />
                Spend less time
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span>💰 {convertPrice(activity.cost)}</span>
            <span>⏱️ {activity.duration}</span>
          </div>
        </div>
      </div>

      {showNearby && (
        <div className="mt-4 pt-3 border-t">
          <p className="text-sm font-medium mb-2 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Nearby alternatives to fill {timeSaved.toFixed(1)} hours:
          </p>
          <div className="space-y-2">
            {nearbyPlaces.map((place, idx) => (
              <div key={idx} className="flex items-center justify-between bg-muted/30 p-2 rounded">
                <div className="flex items-center gap-2">
                  {place.image && (
                    <img src={place.image} alt={place.name} className="w-12 h-12 object-cover rounded" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{place.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {place.description} · {place.duration} · {convertPrice(place.cost)}
                      {place.eco && <span className="ml-2 text-green-600">Eco</span>}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleAddNearby(place)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};