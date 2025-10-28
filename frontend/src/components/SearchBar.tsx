import React, { useState } from "react";

interface Props {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handle = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (onSearch) onSearch(query.trim());
    else console.log("Search query:", query);
  };

  return (
    <form className="search-bar" onSubmit={handle}>
      <input
        aria-label="search destinations"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destinations, e.g. Goa, Manali, Leh..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
