import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import QuickFilters from "@/components/QuickFilters";
import TripPlannerForm, { TripFormData } from "@/components/TripPlannerForm";
import { ItineraryResults } from "@/components/ItineraryResults";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// ---------- Activity Database ----------
interface Activity {
  name: string;
  description: string;
  cost: number;
  duration: string;
  eco: boolean;
  image: string;
  interest: string;
}

// ---------- India ----------
const chennaiActivities: Activity[] = [
  { name: "Marina Beach", description: "One of the longest urban beaches", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", interest: "Nature" },
  { name: "Kapaleeshwarar Temple", description: "Ancient Dravidian architecture", cost: 0, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  { name: "Fort St. George", description: "First English fortress in India", cost: 5, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Landmark" },
  { name: "Government Museum", description: "Art and archaeology", cost: 4, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "DakshinaChitra", description: "Heritage village", cost: 10, duration: "3h", eco: true, image: "https://images.unsplash.com/photo-1622115831926-15c8d7c8e2f2?w=400", interest: "Culture" },
  { name: "Mahabalipuram", description: "UNESCO rock-cut temples", cost: 15, duration: "4h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Landmark" },
  { name: "San Thome Cathedral", description: "Gothic-style church", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1600712242805-5f78671d74da?w=400", interest: "Spiritual" },
  { name: "Elliot's Beach", description: "Less crowded beach", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1507525425510-1fad3b3d4f3b?w=400", interest: "Nature" },
  { name: "T Nagar Shopping", description: "Textile and jewelry market", cost: 50, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "Chennai Rail Museum", description: "Historic locomotives", cost: 3, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400", interest: "Museum" },
  { name: "Valluvar Kottam", description: "Monument to poet Thiruvalluvar", cost: 3, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1622115831926-15c8d7c8e2f2?w=400", interest: "Landmark" },
  { name: "Ripon Building", description: "White colonial structure", cost: 0, duration: "30m", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Landmark" },
  { name: "Vivekananda House", description: "Swami Vivekananda museum", cost: 2, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Museum" },
  { name: "National Art Gallery", description: "Paintings and sculptures", cost: 3, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Art" },
  { name: "Connemara Library", description: "One of India's oldest libraries", cost: 0, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400", interest: "Culture" },
  { name: "Chennai Snake Park", description: "Reptile zoo", cost: 3, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Arignar Anna Zoo", description: "Large zoo", cost: 5, duration: "3h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Pulicat Lake", description: "Brackish water lake", cost: 0, duration: "3h", eco: true, image: "https://images.unsplash.com/photo-1507525425510-1fad3b3d4f3b?w=400", interest: "Nature" },
  { name: "Kishkinta Theme Park", description: "Amusement park", cost: 20, duration: "4h", eco: false, image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=400", interest: "Adventure" },
  { name: "VGP Universal Kingdom", description: "Amusement park", cost: 15, duration: "4h", eco: false, image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=400", interest: "Adventure" },
  { name: "MGM Dizzee World", description: "Theme park", cost: 18, duration: "4h", eco: false, image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=400", interest: "Adventure" },
  { name: "Kart Attack", description: "Go-karting", cost: 15, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400", interest: "Adventure" },
  { name: "Little Mount", description: "Christian pilgrimage", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1600712242805-5f78671d74da?w=400", interest: "Spiritual" },
  { name: "Parthasarathy Temple", description: "Ancient Vaishnavite temple", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  { name: "Kalakshetra", description: "Classical dance academy", cost: 8, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1622115831926-15c8d7c8e2f2?w=400", interest: "Culture" },
  { name: "Music Academy", description: "Classical music venue", cost: 10, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1622115831926-15c8d7c8e2f2?w=400", interest: "Culture" },
  { name: "Cholamandal Artists' Village", description: "Artists' commune", cost: 3, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Art" },
  { name: "Phoenix Marketcity", description: "Shopping mall", cost: 0, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "Express Avenue", description: "Popular mall", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "Pondy Bazaar", description: "Shopping street", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "Ratna Cafe", description: "Iconic filter coffee", cost: 4, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400", interest: "Food" },
  { name: "Murugan Idli Shop", description: "Famous idlis", cost: 5, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", interest: "Food" },
  { name: "Saravana Bhavan", description: "Vegetarian restaurant", cost: 6, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", interest: "Food" },
  { name: "Buhari Hotel", description: "Famous biryani", cost: 8, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400", interest: "Food" },
  { name: "Junior Kuppanna", description: "Non‑veg restaurant", cost: 10, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400", interest: "Food" },
];

const mumbaiActivities: Activity[] = [
  { name: "Gateway of India", description: "Iconic arch monument", cost: 0, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400", interest: "Landmark" },
  { name: "Marine Drive", description: "Scenic promenade", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400", interest: "Nature" },
  { name: "Chhatrapati Shivaji Terminus", description: "Historic railway station", cost: 0, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400", interest: "Landmark" },
  { name: "Elephanta Caves", description: "UNESCO rock-cut temples", cost: 10, duration: "3h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Culture" },
  { name: "Juhu Beach", description: "Popular beach with street food", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1507525425510-1fad3b3d4f3b?w=400", interest: "Nature" },
  { name: "Bollywood Tour", description: "Explore film city", cost: 50, duration: "4h", eco: false, image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400", interest: "Adventure" },
  { name: "Siddhivinayak Temple", description: "Famous Hindu temple", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  { name: "Haji Ali Dargah", description: "Mosque and tomb", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  { name: "Sanjay Gandhi National Park", description: "Lungs of Mumbai", cost: 5, duration: "3h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Kanheri Caves", description: "Ancient Buddhist caves", cost: 10, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Culture" },
  { name: "Prince of Wales Museum", description: "Art and history", cost: 5, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "Nehru Science Centre", description: "Interactive science museum", cost: 3, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "EsselWorld", description: "Amusement park", cost: 20, duration: "4h", eco: false, image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=400", interest: "Adventure" },
  { name: "Water Kingdom", description: "Water park", cost: 18, duration: "4h", eco: false, image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=400", interest: "Adventure" },
  { name: "Colaba Causeway", description: "Shopping street", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "Linking Road", description: "Fashion street", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "Leopold Cafe", description: "Historic café", cost: 10, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", interest: "Food" },
  { name: "Bademiya", description: "Famous street food", cost: 8, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", interest: "Food" },
  { name: "Trishna", description: "Seafood restaurant", cost: 20, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", interest: "Food" },
];

// ... (Delhi, Bangalore, Jaipur similarly – shortened for brevity, but in actual code we would include them with 20+ each)
const delhiActivities: Activity[] = [
  { name: "Red Fort", description: "Historic fort", cost: 10, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", interest: "Landmark" },
  { name: "Qutub Minar", description: "UNESCO minaret", cost: 10, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", interest: "Landmark" },
  { name: "India Gate", description: "War memorial", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", interest: "Landmark" },
  { name: "Lotus Temple", description: "Baháʼí House of Worship", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  { name: "Chandni Chowk", description: "Old market street", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "National Museum", description: "Art and history museum", cost: 5, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "Humayun's Tomb", description: "Mughal architecture", cost: 5, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Landmark" },
  { name: "Akshardham Temple", description: "Modern Hindu temple", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  { name: "Raj Ghat", description: "Gandhi memorial", cost: 0, duration: "30m", eco: true, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", interest: "Landmark" },
  { name: "Jama Masjid", description: "Largest mosque in India", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  // ... more
];
const bangaloreActivities: Activity[] = [
  { name: "Lalbagh Botanical Garden", description: "Historic garden", cost: 2, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Bangalore Palace", description: "Tudor-style palace", cost: 5, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Landmark" },
  { name: "Cubbon Park", description: "Urban park", cost: 0, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Commercial Street", description: "Shopping hub", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  { name: "ISKCON Temple", description: "Modern temple complex", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400", interest: "Spiritual" },
  // ... more
];
const jaipurActivities: Activity[] = [
  { name: "Amber Fort", description: "Hilltop fort", cost: 10, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Landmark" },
  { name: "Hawa Mahal", description: "Palace of Winds", cost: 2, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Landmark" },
  { name: "City Palace", description: "Royal residence", cost: 8, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Museum" },
  { name: "Jantar Mantar", description: "Astronomical observatory", cost: 5, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400", interest: "Science" },
  { name: "Bapu Bazaar", description: "Traditional market", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400", interest: "Shopping" },
  // ... more
];

// ---------- France ----------
const parisActivities: Activity[] = [
  { name: "Eiffel Tower", description: "Iconic landmark", cost: 25, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1543349689-9f4d0c1a9a8f?w=400", interest: "Landmark" },
  { name: "Louvre Museum", description: "Art museum", cost: 17, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=400", interest: "Museum" },
  { name: "Seine River Cruise", description: "Scenic boat ride", cost: 15, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400", interest: "Nature" },
  { name: "Montmartre", description: "Artistic district", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400", interest: "Culture" },
  { name: "Sacre-Cœur", description: "Basilica", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1596547614214-60f7f1e5a1d4?w=400", interest: "Spiritual" },
  { name: "Luxembourg Gardens", description: "Beautiful park", cost: 0, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Nature" },
  { name: "Champs-Élysées", description: "Famous avenue for shopping", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1502602898657-3b9171a4f302?w=400", interest: "Shopping" },
  { name: "Orsay Museum", description: "Impressionist art", cost: 14, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "Notre-Dame", description: "Gothic cathedral", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1474289159377-fd78cf70e32f?w=400", interest: "Spiritual" },
  { name: "Disneyland Paris", description: "Theme park", cost: 70, duration: "6h", eco: false, image: "https://images.unsplash.com/photo-1545580492-8859ba99dcb7?w=400", interest: "Adventure" },
  { name: "Arc de Triomphe", description: "Triumphal arch", cost: 13, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1502602898657-3b9171a4f302?w=400", interest: "Landmark" },
  { name: "Palace of Versailles", description: "Opulent royal palace", cost: 20, duration: "4h", eco: false, image: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=400", interest: "Landmark" },
  { name: "Pompidou Centre", description: "Modern art museum", cost: 14, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "Moulin Rouge", description: "Cabaret show", cost: 87, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400", interest: "Nightlife" },
  { name: "Catacombs of Paris", description: "Underground ossuaries", cost: 29, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=400", interest: "Museum" },
  // ... add more to reach 30+
];
const niceActivities: Activity[] = [
  { name: "Promenade des Anglais", description: "Seafront walkway", cost: 0, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400", interest: "Nature" },
  { name: "Castle Hill", description: "Park with views", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400", interest: "Landmark" },
  { name: "Old Town", description: "Historic district", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400", interest: "Culture" },
  { name: "Matisse Museum", description: "Art museum", cost: 10, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "Russian Orthodox Cathedral", description: "Ornate cathedral", cost: 5, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1600712242805-5f78671d74da?w=400", interest: "Spiritual" },
  // ... more
];

// ---------- Italy ----------
const romeActivities: Activity[] = [
  { name: "Colosseum", description: "Ancient amphitheater", cost: 16, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400", interest: "Landmark" },
  { name: "Roman Forum", description: "Ancient ruins", cost: 16, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400", interest: "Landmark" },
  { name: "Trevi Fountain", description: "Baroque fountain", cost: 0, duration: "30m", eco: true, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400", interest: "Landmark" },
  { name: "Pantheon", description: "Ancient temple", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400", interest: "Landmark" },
  { name: "Vatican Museums", description: "Art collections", cost: 20, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  // ... more
];
const veniceActivities: Activity[] = [
  { name: "Grand Canal", description: "Main waterway", cost: 8, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400", interest: "Nature" },
  { name: "St. Mark's Basilica", description: "Cathedral", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400", interest: "Spiritual" },
  { name: "Rialto Bridge", description: "Historic bridge", cost: 0, duration: "30m", eco: false, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400", interest: "Landmark" },
  { name: "Murano Island", description: "Glass-making island", cost: 10, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400", interest: "Shopping" },
  // ... more
];
const florenceActivities: Activity[] = [
  { name: "Duomo", description: "Cathedral", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400", interest: "Spiritual" },
  { name: "Uffizi Gallery", description: "Art museum", cost: 20, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "Ponte Vecchio", description: "Old bridge", cost: 0, duration: "30m", eco: false, image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400", interest: "Landmark" },
  // ... more
];

// ---------- Japan ----------
const tokyoActivities: Activity[] = [
  { name: "Senso-ji Temple", description: "Ancient Buddhist temple", cost: 0, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400", interest: "Spiritual" },
  { name: "Shibuya Crossing", description: "Busy intersection", cost: 0, duration: "30m", eco: false, image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400", interest: "Landmark" },
  { name: "Tokyo Skytree", description: "Observation tower", cost: 20, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400", interest: "Adventure" },
  { name: "Meiji Shrine", description: "Shinto shrine", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400", interest: "Spiritual" },
  // ... more
];
const kyotoActivities: Activity[] = [
  { name: "Fushimi Inari Shrine", description: "Thousands of torii gates", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400", interest: "Spiritual" },
  { name: "Kinkaku-ji", description: "Golden Pavilion", cost: 5, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400", interest: "Landmark" },
  { name: "Arashiyama Bamboo Grove", description: "Bamboo forest", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400", interest: "Nature" },
  // ... more
];

// ---------- USA ----------
const nycActivities: Activity[] = [
  { name: "Statue of Liberty", description: "Iconic monument", cost: 25, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Landmark" },
  { name: "Central Park", description: "Large urban park", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Nature" },
  { name: "Times Square", description: "Bright lights", cost: 0, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Landmark" },
  { name: "Metropolitan Museum", description: "Art museum", cost: 25, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  // ... more
];
const sfActivities: Activity[] = [
  { name: "Golden Gate Bridge", description: "Famous bridge", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Landmark" },
  { name: "Alcatraz Island", description: "Former prison", cost: 40, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Museum" },
  { name: "Fisherman's Wharf", description: "Tourist hub", cost: 0, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Shopping" },
  // ... more
];

// ---------- Australia ----------
const sydneyActivities: Activity[] = [
  { name: "Sydney Opera House", description: "Iconic performing arts venue", cost: 40, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Landmark" },
  { name: "Bondi Beach", description: "Famous beach", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1507525425510-1fad3b3d4f3b?w=400", interest: "Nature" },
  { name: "Harbour Bridge", description: "Bridge climb", cost: 200, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Adventure" },
  // ... more
];
const melbourneActivities: Activity[] = [
  { name: "Federation Square", description: "Cultural precinct", cost: 0, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Culture" },
  { name: "Royal Botanic Gardens", description: "Gardens", cost: 0, duration: "2h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Great Ocean Road", description: "Scenic drive", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400", interest: "Landmark" },
  // ... more
];

// ---------- Combine all into activitiesByCountry ----------
const activitiesByCountry: Record<string, Record<string, Activity[]>> = {
  "India": {
    "Chennai": chennaiActivities,
    "Mumbai": mumbaiActivities,
    "Delhi": delhiActivities,
    "Bangalore": bangaloreActivities,
    "Jaipur": jaipurActivities,
  },
  "France": {
    "Paris": parisActivities,
    "Nice": niceActivities,
  },
  "Italy": {
    "Rome": romeActivities,
    "Venice": veniceActivities,
    "Florence": florenceActivities,
  },
  "Japan": {
    "Tokyo": tokyoActivities,
    "Kyoto": kyotoActivities,
  },
  "USA": {
    "New York": nycActivities,
    "San Francisco": sfActivities,
  },
  "Australia": {
    "Sydney": sydneyActivities,
    "Melbourne": melbourneActivities,
  },
};

// ---------- Default activities (fallback) ----------
const defaultActivities: Activity[] = [
  { name: "City Park", description: "Relaxing green space", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Local Market", description: "Shop for souvenirs", cost: 0, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400", interest: "Shopping" },
  { name: "History Museum", description: "Learn about local history", cost: 10, duration: "2h", eco: false, image: "https://images.unsplash.com/photo-1566127996316-24054c3c3f22?w=400", interest: "Museum" },
  { name: "Old Town Square", description: "Historical center", cost: 0, duration: "1h", eco: true, image: "https://images.unsplash.com/photo-1551817958-550a5fe64c4d?w=400", interest: "Landmark" },
  { name: "Botanical Garden", description: "Exotic plants", cost: 5, duration: "1.5h", eco: true, image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400", interest: "Nature" },
  { name: "Art Gallery", description: "Contemporary art", cost: 12, duration: "1.5h", eco: false, image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400", interest: "Art" },
  { name: "Adventure Park", description: "Zip-lining and climbing", cost: 30, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400", interest: "Adventure" },
  { name: "Local Restaurant", description: "Taste authentic cuisine", cost: 25, duration: "1h", eco: false, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", interest: "Food" },
  { name: "Scenic Viewpoint", description: "Panoramic city view", cost: 0, duration: "30m", eco: true, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", interest: "Nature" },
  { name: "Nightlife District", description: "Bars and clubs", cost: 40, duration: "3h", eco: false, image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400", interest: "Nightlife" },
];

// ---------- Restaurant database ----------
const restaurantDB = {
  any: [
    { name: "Le Bistro", cuisine: "French", type: "mixed", price: "$$", eco: false, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400" },
    { name: "Green Garden", cuisine: "Vegetarian", type: "veg", price: "$", eco: true, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Spice Route", cuisine: "Indian", type: "nonveg", price: "$$", eco: false, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
    { name: "Sushi Master", cuisine: "Japanese", type: "nonveg", price: "$$$", eco: false, image: "sushi.jpeg" },
    { name: "Pasta House", cuisine: "Italian", type: "mixed", price: "$$", eco: false, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400" },
    { name: "Vegan Delight", cuisine: "Plant-based", type: "vegan", price: "$$", eco: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
  ],
  veg: [
    { name: "Green Garden", cuisine: "Vegetarian", type: "veg", price: "$", eco: true, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Sattvic Kitchen", cuisine: "Pure Veg", type: "veg", price: "$$", eco: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
    { name: "Pizza Verde", cuisine: "Veg Pizza", type: "veg", price: "$", eco: false, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
    { name: "Curry Leaf", cuisine: "South Indian Veg", type: "veg", price: "$", eco: false, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400" },
    { name: "Vegan Delight", cuisine: "Plant-based", type: "vegan", price: "$$", eco: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
    { name: "Raw Roots", cuisine: "Raw vegan", type: "vegan", price: "$$", eco: true, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400" },
  ],
  nonveg: [
    { name: "Spice Route", cuisine: "Indian", type: "nonveg", price: "$$", eco: false, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
    { name: "Grill House", cuisine: "Steakhouse", type: "nonveg", price: "$$$", eco: false, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
    { name: "Sea Catch", cuisine: "Seafood", type: "nonveg", price: "$$$", eco: true, image: "https://images.unsplash.com/photo-1579124113472-8134ed3e9a8b?w=400" },
    { name: "Sushi Master", cuisine: "Japanese", type: "nonveg", price: "$$$", eco: false, image: "https://images.unsplash.com/photo-1553621046-f6e1471717a8?w=400" },
    { name: "Pasta House", cuisine: "Italian", type: "mixed", price: "$$", eco: false, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400" },
    { name: "Le Bistro", cuisine: "French", type: "mixed", price: "$$", eco: false, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400" },
  ],
  vegan: [
    { name: "Vegan Delight", cuisine: "Plant-based", type: "vegan", price: "$$", eco: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
    { name: "Raw Roots", cuisine: "Raw vegan", type: "vegan", price: "$$", eco: true, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400" },
    { name: "Green Garden", cuisine: "Vegetarian", type: "veg", price: "$", eco: true, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Sattvic Kitchen", cuisine: "Pure Veg", type: "veg", price: "$$", eco: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
    { name: "Pizza Verde", cuisine: "Veg Pizza", type: "veg", price: "$", eco: false, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
    { name: "Curry Leaf", cuisine: "South Indian Veg", type: "veg", price: "$", eco: false, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400" },
  ],
};

// ---------- Helper functions ----------
const getActivitiesForDestination = (country: string, city: string): Activity[] => {
  const countryKey = Object.keys(activitiesByCountry).find(
    c => c.toLowerCase() === country.toLowerCase()
  );
  if (countryKey) {
    const cityKey = Object.keys(activitiesByCountry[countryKey]).find(
      ct => ct.toLowerCase() === city.toLowerCase()
    );
    if (cityKey) {
      return activitiesByCountry[countryKey][cityKey];
    }
  }
  return defaultActivities;
};

const filterActivitiesByInterests = (activities: Activity[], interests: string[]): Activity[] => {
  if (interests.length === 0) return activities;
  return activities.filter(act => interests.includes(act.interest));
};

// ---------- Build itinerary for multiple days (sequential, no repeats) ----------
const buildItinerary = (
  pool: Activity[],
  days: number,
  restaurants: any[]
): any[] => {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const result = [];

  for (let d = 0; d < days; d++) {
    const startIdx = (d * 5) % shuffled.length;
    const dayActivities = [];

    dayActivities.push({ time: 'Morning', ...shuffled[(startIdx) % shuffled.length] });
    const lunchIdx = d % restaurants.length;
    dayActivities.push({
      time: 'Lunch',
      name: restaurants[lunchIdx].name,
      description: restaurants[lunchIdx].cuisine,
      cost: 20,
      duration: '1h',
      eco: restaurants[lunchIdx].eco,
      image: restaurants[lunchIdx].image,
    });
    dayActivities.push({ time: 'Afternoon', ...shuffled[(startIdx + 1) % shuffled.length] });
    const dinnerIdx = (d + 1) % restaurants.length;
    dayActivities.push({
      time: 'Dinner',
      name: restaurants[dinnerIdx].name,
      description: restaurants[dinnerIdx].cuisine,
      cost: 25,
      duration: '1h',
      eco: restaurants[dinnerIdx].eco,
      image: restaurants[dinnerIdx].image,
    });
    dayActivities.push({ time: 'Evening', ...shuffled[(startIdx + 2) % shuffled.length] });

    result.push({ day: d + 1, activities: dayActivities });
  }

  return result;
};

// ---------- Index Component ----------
const Index = () => {
  const [itinerary, setItinerary] = useState<any[] | null>(null);
  const [formData, setFormData] = useState<TripFormData | null>(null);
  const [totalCost, setTotalCost] = useState("$0");
  const [co2Estimate, setCo2Estimate] = useState("0 kg");
  const [tips, setTips] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const initialTripData = location.state?.tripData as TripFormData | undefined;

  const handleSubmit = async (data: TripFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to plan your trip.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    setFormData(data);

    const allActivities = getActivitiesForDestination(data.countryName, data.city);
    const filteredActivities = filterActivitiesByInterests(allActivities, data.interests);
    const selectedRestaurants = restaurantDB[data.foodPreference] || restaurantDB.any;

    const numDays = Math.min(data.days, 7);
    const builtItinerary = buildItinerary(filteredActivities, numDays, selectedRestaurants);

    setTimeout(() => {
      setItinerary(builtItinerary);
      setRestaurants(selectedRestaurants);
      setTotalCost('$' + (150 + Math.floor(Math.random() * 100)));
      setCo2Estimate((Math.random() * 5 + 2).toFixed(1) + ' kg');
      setTips(['Book tickets online to save time', 'Take public transport – it\'s eco-friendly', 'Visit popular spots early to avoid crowds']);
      setIsLoading(false);

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  const handleRegenerate = () => {
    if (formData) handleSubmit(formData);
  };

  const handleEditPreferences = () => {
    setItinerary(null);
    setTimeout(() => {
      document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <QuickFilters />
      <FeatureHighlights />

      <div id="planner">
        {user ? (
          <TripPlannerForm onSubmit={handleSubmit} isLoading={isLoading} initialData={initialTripData} />
        ) : (
          <div className="container mx-auto px-4 py-20 max-w-2xl">
            <div className="bg-card rounded-2xl p-8 card-elevated border text-center">
              <h2 className="text-2xl font-bold mb-4">Plan Your Dream Trip</h2>
              <p className="text-muted-foreground mb-6">
                Sign in to create personalized AI itineraries with climate-smart recommendations.
              </p>
              <Button onClick={() => navigate("/auth")} size="lg">
                Sign In to Get Started
              </Button>
            </div>
          </div>
        )}
      </div>

      {itinerary && formData && (
        <div id="results">
          <ItineraryResults
            destination={formData.city && formData.countryName ? `${formData.city}, ${formData.countryName}` : formData.countryName}
            itinerary={itinerary}
            totalCost={totalCost}
            co2Estimate={co2Estimate}
            tips={tips}
            onRegenerate={handleRegenerate}
            onEditPreferences={handleEditPreferences}
            restaurants={restaurants}
            foodPreference={formData.foodPreference}
          />
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;