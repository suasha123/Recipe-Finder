import { useEffect, useState, useRef } from "react";
import styles from "./RecipieGenerator.module.css";

export const Result = ({ data }) => {
  const [instruction, setInstruct] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef(null);

  const apiKey = "a9b985ad75274dc98997edab264cdbd5";

  const viewRecipe = (id) => {
    // Clear previous states
    setInstruct("");
    setSummary("");
    setSourceUrl("");
    setError("");
    setLoading(true);

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    // Fetch the recipe details
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((details) => {
        setInstruct(
          details.instructions.replace(/<\/?[^>]+(>|$)/g, "") ||
            "No instructions found."
        );
        setSummary(
          details.summary.replace(/<\/?[^>]+(>|$)/g, "") || "No summary found."
        ); // Handle null summary
        setSourceUrl(details.sourceUrl || "No source URL available."); // Handle null source URL
        setLoading(false); // Stop loading after fetching
        // Scroll to the instructions after loading
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false); // Stop loading on error
        setError("Error loading content");
      });

    // Scroll to the loading message when starting the fetch
  };

  useEffect(() => {
    if (loading || instruction || error) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, instruction, error]);

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
