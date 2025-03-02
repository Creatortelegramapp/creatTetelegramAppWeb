import { useState, useEffect } from "react";
import { searchBox } from "../../../Services/HttpServices/SearchHttpServices.js";
import { Link } from "react-router-dom";

export default function SearchBox({ className }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const response = await searchBox(searchTerm);
    const filteredResults = response?.data?.data || [];
    setResults(filteredResults);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => setQuery("");

  return (
      <div className={`relative w-full h-full ${className || ""}`}>
        <div className="w-full flex items-center border border-qgray-border bg-white rounded-lg p-2">
          <input
              type="text"
              className="w-full p-1 outline-none"
              placeholder="Որոնել..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
              <span className="cursor-pointer text-gray-500" onClick={handleClear}>
            ×
          </span>
          )}
        </div>

        {results.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
              {results.map((item) => (
                  <li key={item.id} className="p-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                    <Link to={`/single-product/${item.id}`} className="w-full h-full block">
                      <span className="font-bold">{item.name}</span>
                    </Link>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}
