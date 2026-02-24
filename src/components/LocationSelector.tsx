import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Hardcoded country and city data (expanded for demo)
const countries = [
  { 
    id: "in", 
    name: "India", 
    cities: [
      "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", 
      "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Goa"
    ] 
  },
  { 
    id: "fr", 
    name: "France", 
    cities: ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Toulouse"] 
  },
  { 
    id: "it", 
    name: "Italy", 
    cities: ["Rome", "Milan", "Florence", "Venice", "Naples", "Turin"] 
  },
  { 
    id: "es", 
    name: "Spain", 
    cities: ["Madrid", "Barcelona", "Seville", "Valencia", "Granada", "Bilbao"] 
  },
  { 
    id: "us", 
    name: "United States", 
    cities: ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Las Vegas"] 
  },
  { 
    id: "uk", 
    name: "United Kingdom", 
    cities: ["London", "Manchester", "Edinburgh", "Birmingham", "Glasgow", "Liverpool"] 
  },
  { 
    id: "jp", 
    name: "Japan", 
    cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Sapporo", "Fukuoka"] 
  },
  { 
    id: "cn", 
    name: "China", 
    cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou"] 
  },
  { 
    id: "br", 
    name: "Brazil", 
    cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Curitiba"] 
  },
  { 
    id: "de", 
    name: "Germany", 
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"] 
  },
  { 
    id: "au", 
    name: "Australia", 
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast"] 
  },
  { 
    id: "mx", 
    name: "Mexico", 
    cities: ["Mexico City", "Cancún", "Guadalajara", "Monterrey", "Tijuana", "Puebla"] 
  },
  { 
    id: "th", 
    name: "Thailand", 
    cities: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Koh Samui"] 
  },
  { 
    id: "tr", 
    name: "Turkey", 
    cities: ["Istanbul", "Antalya", "Ankara", "Izmir", "Bodrum", "Marmaris"] 
  },
  { 
    id: "ae", 
    name: "UAE", 
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah", "Fujairah", "Ajman"] 
  },
];

interface LocationSelectorProps {
  onCountryChange: (countryId: string, countryName: string) => void;
  onCityChange: (city: string) => void;
  selectedCountryId?: string;
  selectedCity?: string;
  className?: string;
}

export function LocationSelector({
  onCountryChange,
  onCityChange,
  selectedCountryId = "",
  selectedCity = "",
  className,
}: LocationSelectorProps) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const selectedCountry = countries.find((c) => c.id === selectedCountryId);
  const availableCities = selectedCountry?.cities || [];

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {/* Country Combobox */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Country *</label>
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={countryOpen}
              className="w-full justify-between"
            >
              {selectedCountry ? selectedCountry.name : "Select country..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.id}
                      value={country.name}
                      onSelect={() => {
                        onCountryChange(country.id, country.name);
                        setCountryOpen(false);
                        // Reset city when country changes
                        onCityChange("");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCountryId === country.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* City Combobox – enabled only when a country is selected */}
      <div className="space-y-2">
        <label className="text-sm font-medium">City *</label>
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              disabled={!selectedCountry}
              className="w-full justify-between"
            >
              {selectedCity ? selectedCity : "Select city..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search city..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {availableCities.map((city) => (
                    <CommandItem
                      key={city}
                      value={city}
                      onSelect={() => {
                        onCityChange(city);
                        setCityOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCity === city ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}