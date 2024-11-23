// SearchBar.js
import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

const API_KEY = "a9b985ad75274dc98997edab264cdbd5";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [instruction, setInstruct] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // New state for selected recipe

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoadding(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}?query=${searchTerm}&cuisine=indian&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data.results);
      setLoadding(false);
      setSearchTerm("");
    } catch (err) {
      setError("Could not fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const viewRecipe = async (id) => {
    setSelectedRecipe(id);
    setFetchingDetails(true);
    setError(null);
    setLoading(true);
    setInstruct("");

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { instructions, summary, sourceUrl } = await response.json();
      setInstruct(
        instructions.replace(/<\/?[^>]+(>|$)/g, "") || "No instructions found."
      );
      setSummary(summary.replace(/<\/?[^>]+(>|$)/g, "") || "No summary found.");
      setSourceUrl(sourceUrl || "No source URL available.");
      // Set the selected recipe ID
    } catch (err) {
      setError("Error loading recipe details. Please try again.");
    } finally {
      setFetchingDetails(false);
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          style={{color : "black"}}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {loadding && (
        <div className={styles.messageContainer}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>Loading recipe details...</span>
        </div>
      )}
      {error && <p className={styles.errorText}>{error}</p>}
      <ul className={styles.cardcontainer}>
        {recipes.map((element) => (
          <li
            key={element.id}
            className={`${styles.recipeCard} ${
              selectedRecipe === element.id ? styles.selected : ""
            }`} // Add border if selected
            onClick={() => viewRecipe(element.id)}
          >
            <div>
              <img
                src={element.image}
                alt={element.title}
                className={styles.recipeImage}
              />
              <h3 className={styles.recipeTitle}>{element.title}</h3>
            </div>
          </li>
        ))}
      </ul>
      {fetchingDetails && (
        <div className={styles.messageContainer}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>Loading recipe details...</span>
        </div>
      )}
      {instruction && (
        <div className={styles.instructionContainer}>
          <h2
            style={{
              color: "#69a71f",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Instructions:
          </h2>
          <p
            style={{
              color: "#333",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            {instruction}
          </p>
          <h3
            style={{
              color: "#0a4435",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Summary:
          </h3>
          <p
            style={{
              color: "#333",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            {summary}
          </p>
          <h3
            style={{
              color: "#0a4435",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
          >
            Source:
          </h3>
          <p style={{ backgroundColor: "transparent" }}>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
            >
              {sourceUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
