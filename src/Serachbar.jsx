import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const API_KEY = "2828c2d05dc048a0aecdacdae235ea9a";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [instruction, setInstruct] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [nutrition, setNutrition] = useState([]);
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
    setNutrition([]); // Reset nutrition data

    const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    const nutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`;

    try {
      // Fetch recipe details
      const response = await fetch(recipeUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { instructions, summary, sourceUrl } = await response.json();
      setInstruct(
        instructions.replace(/<\/?[^>]+(>|$)/g, "") || "No instructions found."
      );
      setSummary(summary.replace(/<\/?[^>]+(>|$)/g, "") || "No summary found.");
      setSourceUrl(sourceUrl || "No source URL available.");

      // Fetch nutrition data
      const nutritionResponse = await fetch(nutritionUrl);
      if (!nutritionResponse.ok) {
        throw new Error("Error fetching nutrition data.");
      }
      const nutritionData = await nutritionResponse.json();
      setNutrition(nutritionData.nutrients || []);
    } catch (err) {
      setError("Error loading recipe details. Please try again.");
    } finally {
      setFetchingDetails(false);
      setLoading(false);
    }
  };

  // Function to prepare chart data
  const getChartData = () => {
    if (nutrition.length === 0) return null;

    const labels = nutrition.map(item => item.name);
    const data = nutrition.map(item => item.amount);

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#2ECC71'], // Customize colors
          hoverBackgroundColor: ['#FF2A68', '#3488C4', '#FFD633', '#FF5733', '#27B62B'], // Hover colors
        },
      ],
    };
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
          style={{ color: "black" }}
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
          {nutrition.length > 0 && (
            <>
              <h3
                style={{
                  color: "#0a4435",
                  backgroundColor: "transparent",
                  marginBottom: "10px",
                }}
              >
                Nutritional Information:
              </h3>
              {/* Pie Chart */}
              <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <Pie data={getChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
            </>
          )}
          <ul style={{ color: "black" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      color: "black",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Nutrient
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      color: "black",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      color: "black",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody>
                {nutrition.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        color: "black",
                        backgroundColor: "transparent",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        color: "black",
                        backgroundColor: "transparent",
                      }}
                    >
                      {item.amount}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        color: "black",
                        backgroundColor: "transparent",
                      }}
                    >
                      {item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
      )}
    </div>
  );
};
