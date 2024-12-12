import { useEffect, useState, useRef } from "react";
import styles from "./RecipieGenerator.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

export const Result = ({ data }) => {
  const [instruction, setInstruct] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [nutrition, setNutrition] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipeTitle, setSelectedRecipeTitle] = useState(""); // New state to hold the selected recipe title
  const resultRef = useRef(null);

  const apiKey = "2828c2d05dc048a0aecdacdae235ea9a";

  // Fetch recipe details and nutrition info
  const viewRecipe = (id, title) => {
    setInstruct("");
    setSummary("");
    setSourceUrl("");
    setNutrition([]);
    setError("");
    setLoading(true);
    setSaved(false); // Reset saved state
    setSelectedRecipeTitle(title); // Store the title when the recipe card is clicked

    const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    const nutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`;

    fetch(recipeUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching recipe details.");
        }
        return response.json();
      })
      .then((details) => {
        setInstruct(details.instructions?.replace(/<\/?[^>]+(>|$)/g, "") || "No instructions found.");
        setSummary(details.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No summary found.");
        setSourceUrl(details.sourceUrl || "No source URL available.");
      })
      .catch((err) => {
        console.error("Error fetching recipe details:", err);
        setError("Failed to load recipe details.");
        setLoading(false);
      });

    fetch(nutritionUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching nutrition data.");
        }
        return response.json();
      })
      .then((nutritionData) => {
        setNutrition(nutritionData.nutrients || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching nutrition data:", err);
        setNutrition([]);
        setError("Failed to load nutrition data.");
        setLoading(false);
      });
  };

  // Function to save the recipe to localStorage
  const saveRecipe = () => {
    const recipeData = {
      title: selectedRecipeTitle, // Use the selected title here
      instruction,
      summary,
      sourceUrl,
      nutrition,
    };
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedRecipes.push(recipeData);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    setSaved(true); // Update saved state to show confirmation
    loadSavedRecipes(); // Reload saved recipes after saving
  };

  // Function to load saved recipes from localStorage
  const loadSavedRecipes = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipes); // Update state with saved recipes
  };

  // Function to clear saved recipes from localStorage
  const clearSavedRecipes = () => {
    localStorage.removeItem("savedRecipes");
    setSavedRecipes([]);
    setSaved(false);
  };

  useEffect(() => {
    // Load saved recipes when component mounts
    loadSavedRecipes();
    if (loading || instruction || error) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, instruction, error]);

  const chartData = {
    labels: nutrition.map((item) => item.name),
    datasets: [
      {
        data: nutrition.map((item) => item.amount),
        backgroundColor: [
          "#D32F2F", "#1976D2", "#388E3C", "#FBC02D", "#8E24AA", "#0288D1",
        ],
        hoverBackgroundColor: [
          "#C2185B", "#1565C0", "#2C6A3B", "#F57F17", "#7B1FA2", "#0277BD",
        ],
      },
    ],
  };

  return (
    <section className={styles.resultcontainer}>
      <h1 style={{ color: "#69a71f" }}>
        SHOWING RECIPE BASED ON INGREDIENTS YOU SEARCHED FOR
      </h1>
      <ul>
        {data.map((element, index) => (
          <li key={index} onClick={() => viewRecipe(element.id, element.title)}>
            <div className={styles.innerdiv}>
              <h3>{element.title}</h3>
              <img src={element.image} alt={element.title} />
            </div>
          </li>
        ))}
      </ul>

      {/* Saved Recipes Section */}
      <h2 style={{color : "black"}}>Saved Recipes:</h2>
      <div className={styles.savedRecipesContainer}>
        {savedRecipes.length > 0 ? (
          <ul>
            {savedRecipes.map((recipe, index) => (
              <li key={index} className={styles.savedRecipeItem} style={{backgroundColor : "#69a71f"}}>
                <h3>{recipe.title}</h3>
                <p style={{backgroundColor : "transparent"}}>{recipe.summary}</p>
                <a href={recipe.sourceUrl} style={{backgroundColor : "#ffa300" , display : "inline-block" , marginTop : "10px", textDecoration : "none" , color : "white"}}  target="_blank" rel="noopener noreferrer">
                  View Source
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{color : "#ffa300" , position : "relative" , bottom : "15px"}}>No saved recipes.</p>
        )}
      </div>

      {/* Recipe Details Section */}
      {(instruction || summary || loading || error) && (
        <div ref={resultRef} className={styles.resultcontainerr}>
          {loading ? (
            <div className={styles.messageContainer}>
              <div className={styles.loadingSpinner}></div>
              <span className={styles.loadingText}>Loading recipes...</span>
            </div>
          ) : error ? (
            <div className={styles.messageContainer}>
              <span className={styles.errorText}>{error}</span>
            </div>
          ) : (
            <div className={styles.instructionContainer}>
              <h2>Instructions:</h2>
              <p>{instruction}</p>
              <h3>Summary:</h3>
              <p>{summary}</p>

              {/* Doughnut Chart */}
              <div className={styles.chartContainer}>
                <Doughnut data={chartData} options={{ responsive: true }} />
              </div>

              {/* Nutritional Information Table */}
              <h3>Nutritional Information:</h3>
              <table className={styles.nutritionTable}>
                <thead>
                  <tr>
                    <th>Nutrition</th>
                    <th>Amount</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {nutrition.length > 0 ? (
                    nutrition.map((item, index) => (
                      <tr key={index}>
                        <td style={{color : "black"}}>{item.name}</td>
                        <td style={{color : "black"}}>{item.amount}</td>
                        <td style={{color : "black"}}>{item.unit}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No nutrition information available.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <h3>Source:</h3>
              <p>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  {sourceUrl}
                </a>
              </p>

              {/* Save Recipe Button */}
              <button onClick={saveRecipe} className={styles.saveButton}>
                Save Recipe
              </button>

              {/* Clear Recipe Button */}
              <button onClick={clearSavedRecipes} className={styles.clearButton}>
                Clear Saved Recipes
              </button>

              {saved && (
                <div className={styles.savedMessage}>
                  Recipe saved successfully!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
