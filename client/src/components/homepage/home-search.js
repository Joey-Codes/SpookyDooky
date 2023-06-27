import "../../styles/homepage/home-search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomeSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleQuerySearch = (event) => {
    event.preventDefault();
    if (query !== "") {
        navigate(`/places?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="home-search">
      <br />
      <br />
      <form onSubmit={handleQuerySearch}>
        <input
          className="readexpro home-searchbar"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="readexpro home-search-submit">
          GO
        </button>
      </form>
      <h2 className="readexpro italic">Search for a place or city</h2>
    </div>
  );
};
