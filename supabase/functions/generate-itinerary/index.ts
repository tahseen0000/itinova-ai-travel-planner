import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { destination, days, budget, interests, weather, ecoMode, pace, persons, hiddenGems } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert travel planner for "Climate & Compass", a climate-conscious travel app. Generate a detailed day-wise travel itinerary.

IMPORTANT: Respond ONLY with valid JSON matching this exact schema:
{
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "name": "Activity Name",
          "description": "Brief description",
          "cost": "$XX",
          "duration": "X hrs",
          "timeSlot": "morning|afternoon|evening",
          "ecoFriendly": true/false,
          "hiddenGem": true/false
        }
      ]
    }
  ],
  "totalCost": "$XXX",
  "co2Estimate": "X.X kg",
  "tips": ["tip1", "tip2"]
}

Rules:
- Each day should have 3-5 activities spread across morning, afternoon, evening
- If ecoMode is true, prioritize eco-friendly attractions and mark them accordingly
- If hiddenGems is true, include lesser-known local spots and mark them
- Adjust activity density based on pace (relaxed=3, moderate=4, packed=5 per day)
- Consider the budget level for cost estimates
- Consider weather preferences when suggesting activities
- Include realistic cost estimates in USD
- Calculate approximate CO2 based on typical tourist activities
- Provide 2-3 sustainable travel tips`;

    const userPrompt = `Plan a ${days}-day trip to ${destination} for ${persons || 1} person(s).
Budget: ${budget}
Interests: ${interests?.join(", ") || "General sightseeing"}
Weather preference: ${weather || "any"}
Eco-mode: ${ecoMode ? "Yes - prioritize eco-friendly options" : "No"}
Pace: ${pace || "moderate"}
Hidden gems: ${hiddenGems ? "Yes - include offbeat locations" : "No"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    // Parse JSON from response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse itinerary");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-itinerary error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
