import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import QuickFilters from "@/components/QuickFilters";
import TripPlannerForm, { TripFormData } from "@/components/TripPlannerForm";
import ItineraryResults from "@/components/ItineraryResults";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [itinerary, setItinerary] = useState<any[] | null>(null);
  const [formData, setFormData] = useState<TripFormData | null>(null);
  const [totalCost, setTotalCost] = useState("$0");
  const [co2Estimate, setCo2Estimate] = useState("0 kg");
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    setFormData(data);

    try {
      const { data: result, error } = await supabase.functions.invoke("generate-itinerary", {
        body: data,
      });

      if (error) throw error;
      if (result?.error) throw new Error(result.error);

      setItinerary(result.itinerary);
      setTotalCost(result.totalCost || "$0");
      setCo2Estimate(result.co2Estimate || "0 kg");
      setTips(result.tips || []);

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error("Itinerary generation failed:", err);
      toast({
        title: "Generation failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      <QuickFilters />
      <FeatureHighlights />
      <TripPlannerForm onSubmit={handleSubmit} isLoading={isLoading} />

      {itinerary && formData && (
        <div id="results">
          <ItineraryResults
            destination={formData.destination}
            itinerary={itinerary}
            totalCost={totalCost}
            co2Estimate={co2Estimate}
            tips={tips}
            onRegenerate={handleRegenerate}
            onEditPreferences={handleEditPreferences}
          />
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
