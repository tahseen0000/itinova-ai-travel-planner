import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ActivityCard } from './ActivityCard';
import { FoodRecommendations } from './FoodRecommendations';

interface ItineraryResultsProps {
  destination: string;
  itinerary: any[];
  totalCost: string;
  co2Estimate: string;
  tips: string[];
  onRegenerate: () => void;
  onEditPreferences: () => void;
  restaurants?: any[];
  foodPreference?: string;
}

export const ItineraryResults = ({
  destination,
  itinerary: initialItinerary,
  totalCost,
  co2Estimate,
  tips,
  onRegenerate,
  onEditPreferences,
  restaurants,
  foodPreference,
}: ItineraryResultsProps) => {
  const [itinerary, setItinerary] = useState(initialItinerary);

  const handleAddNearby = (place: any, dayIndex: number, activityIndex: number) => {
    alert(`✅ ${place.name} added to Day ${dayIndex + 1} after the current activity.`);
  };

  const handleArriveLate = (dayIndex: number, activityIndex: number) => {
    setItinerary(prev => {
      const newItinerary = [...prev];
      const day = { ...newItinerary[dayIndex] };
      const before = day.activities.slice(0, activityIndex);
      const current = { ...day.activities[activityIndex], time: 'Rescheduled' };
      const after = day.activities.slice(activityIndex + 1).map((act, idx) => ({
        ...act,
        time: idx === 0 ? 'Late Afternoon' : 'Evening (adjusted)'
      }));
      day.activities = [...before, current, ...after];
      newItinerary[dayIndex] = day;
      alert(`Day ${dayIndex + 1} replanned based on your late arrival.`);
      return newItinerary;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">Your AI Itinerary for {destination}</h2>
        <div className="flex flex-wrap gap-6 text-sm">
          <span>💰 Total Cost: {totalCost}</span>
          <span>🌍 CO₂ Footprint: {co2Estimate}</span>
        </div>
        <div className="mt-4">
          <p className="font-medium">💡 Tips:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={onRegenerate} variant="outline">Regenerate</Button>
          <Button onClick={onEditPreferences} variant="ghost">Edit Preferences</Button>
        </div>
      </div>

      {itinerary.map((day: any, dayIndex: number) => (
        <div key={dayIndex} className="mb-8">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Day {day.day}</h3>
          <div className="space-y-3">
            {day.activities.map((activity: any, actIndex: number) => (
              <ActivityCard
                key={actIndex}
                activity={activity}
                dayIndex={dayIndex}
                activityIndex={actIndex}
                onAddNearby={handleAddNearby}
                onArriveLate={handleArriveLate}
              />
            ))}
          </div>
        </div>
      ))}

      {restaurants && restaurants.length > 0 && (
        <FoodRecommendations restaurants={restaurants} preference={foodPreference || 'any'} />
      )}
    </div>
  );
};