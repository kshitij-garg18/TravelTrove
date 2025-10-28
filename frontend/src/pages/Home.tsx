import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import { Destination } from "../types/Destination";

/**
 * Temporary Home page with dummy destinations and client-side search.
 * Later we'll call backend for relevance sorting and images.
 */

const DUMMY: Destination[] = [
  { id: "goa", name: "Goa", summary: "Beaches, nightlife, and seafood", image: "/placeholder.jpg", rating: 4.3 },
  { id: "manali", name: "Manali", summary: "Himalayan valley, adventure and chill", image: "/placeholder.jpg", rating: 4.5 },
  { id: "jaipur", name: "Jaipur", summary: "Rajasthan forts and palaces", image: "/placeholder.jpg", rating: 4.2 },
];

const Home: React.FC = () => {
  const [results, setResults] = useState<Destination[]>(DUMMY);

  const handleSearch = (q: string) => {
    if (!q) {
      setResults(DUMMY);
      return;
    }
    const lower = q.toLowerCase();
    // very simple relevance: name match > summary match
    const scored = DUMMY
      .map(d => {
        let score = 0;
        if (d.name.toLowerCase().includes(lower)) score += 10;
        if (d.summary.toLowerCase().includes(lower)) score += 5;
        if ((d.rating ?? 0) >= 4.5) score += 1;
        return { d, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.d);
    setResults(scored.length ? scored : DUMMY.filter(d => d.name.toLowerCase().includes(lower) || d.summary.toLowerCase().includes(lower)));
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <h2>Popular Destinations</h2>
      <div className="destination-grid">
        {results.map(dest => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  );
};

export default Home;
