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
  const resultRef = useRef(null);

  const apiKey = "a9b985ad75274dc98997edab264cdbd5";

  const viewRecipe = (id) => {
    setInstruct("");
    setSummary("");
    setSourceUrl("");
    setNutrition([]);
    setError("");
    setLoading(true);

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
        setInstruct(
          details.instructions?.replace(/<\/?[^>]+(>|$)/g, "") || "No instructions found."
        );
        setSummary(
          details.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "No summary found."
        );
        setSourceUrl(details.sourceUrl || "No source URL available.");
      })
      .catch((err) => {
        console.error("Error fetching recipe details:", err);
        setError("Failed to load recipe details.");
        setLoading(false);
      });

    // Fetch the nutrition data
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

  useEffect(() => {
    if (loading || instruction || error) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, instruction, error]);

  // Chart data for the nutrition donut chart
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
          <li key={index} onClick={() => viewRecipe(element.id)}>
            <div className={styles.innerdiv}>
              <h3>{element.title}</h3>
              <img src={element.image} alt={element.title} />
            </div>
          </li>
        ))}
      </ul>
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
            </div>
          )}
        </div>
      )}
    </section>
  );
};
