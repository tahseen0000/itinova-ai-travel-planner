import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import TripPlannerForm, { TripFormData } from "@/components/TripPlannerForm";
import ItineraryResults from "@/components/ItineraryResults";
import Chatbot from "@/components/Chatbot";

const generateMockItinerary = (data: TripFormData) => {
  const activities = [
    { name: "Morning Walk at Gardens", description: "Explore the botanical gardens and enjoy local flora.", cost: "$5", duration: "2 hrs", timeSlot: "morning", ecoFriendly: true },
    { name: "Local Market Tour", description: `Discover ${data.destination}'s vibrant food markets.`, cost: "$15", duration: "1.5 hrs", timeSlot: "morning", ecoFriendly: false },
    { name: "Museum of History", description: "Learn about the rich cultural heritage of the region.", cost: "$12", duration: "2 hrs", timeSlot: "afternoon", ecoFriendly: true },
    { name: "Café & Local Cuisine", description: "Enjoy traditional dishes at a highly-rated local restaurant.", cost: "$25", duration: "1.5 hrs", timeSlot: "afternoon", ecoFriendly: false },
    { name: "Sunset Viewpoint", description: "Catch a stunning sunset from the city's famous lookout.", cost: "Free", duration: "1 hr", timeSlot: "evening", ecoFriendly: true },
    { name: "Night Market", description: "Browse crafts and street food under the stars.", cost: "$20", duration: "2 hrs", timeSlot: "evening", ecoFriendly: false },
  ];

  return Array.from({ length: data.days }, (_, i) => ({
    day: i + 1,
    activities: activities.map((a, j) => ({
      ...a,
      name: i > 0 ? `${a.name} ${["II", "III", "IV", "V"][i - 1] || ""}`.trim() : a.name,
      ecoFriendly: data.ecoMode ? true : a.ecoFriendly,
    })).slice(0, 3 + (i % 2)),
  }));
};

const Index = () => {
  const [itinerary, setItinerary] = useState<ReturnType<typeof generateMockItinerary> | null>(null);
  const [formData, setFormData] = useState<TripFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: TripFormData) => {
    setIsLoading(true);
    setFormData(data);
    // Simulate API call
    setTimeout(() => {
      setItinerary(generateMockItinerary(data));
      setIsLoading(false);
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1500);
  };

  const handleRegenerate = () => {
    if (formData) handleSubmit(formData);
  };

  const handleEditPreferences = () => {
    setItinerary(null);
    setTimeout(() => {
      document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeatureHighlights />
      <TripPlannerForm onSubmit={handleSubmit} isLoading={isLoading} />

      {itinerary && formData && (
        <div id="results">
          <ItineraryResults
            destination={formData.destination}
            itinerary={itinerary}
            totalCost="$180"
            co2Estimate="2.5 kg"
            onRegenerate={handleRegenerate}
            onEditPreferences={handleEditPreferences}
          />
        </div>
      )}

      <Chatbot />
    </div>
  );
};

export default Index;
