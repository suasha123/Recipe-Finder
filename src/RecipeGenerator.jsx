import React, { useState, useRef, useEffect } from "react";
import styles from "./RecipieGenerator.module.css";
import logo from "./assets/confused.jpg";
import { Result } from "./Result";

export const RecipieGenerator = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);

  const [input, setInput] = useState("");
  const [option, setOption] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const resultRef = useRef(null);

  const changeInput = (input) => {
    setInput(input);
  };

  const changeOption = (option) => {
    setOption(option);
  };

  function apiKey() {
    setHasFetched(true);
    const apiKey = "2828c2d05dc048a0aecdacdae235ea9a";
    const ingredients = input.replace(/\s+/g, ",");
    const diet = option;
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}${
      diet ? `&diet=${diet}` : ""
    }`;
    setIsLoading(true);
    setError("");
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setEmpty(data.length === 0);
        setInput("");
        console.log(data);
        setOption("");
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (isLoading || data.length > 0 || error) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.heading}>
            <span style={{ color: "#ffa300", backgroundColor: "transparent" }}>
              Confused
            </span>{" "}
            about what to{" "}
            <span style={{ color: "#ffa300", backgroundColor: "transparent" }}>
              cook?
            </span>
          </h1>
          <p className={styles.para}>
            Get recipes based on the available ingredients you have...
          </p>
          <p className={styles.para}>
            Also filter the recipes based on your dietary restrictions
          </p>
        </div>

        <div className={styles.containerimg}>
          <img src={logo} alt="Confused about what to cook" />
        </div>
      </div>

      <div className={styles.input}>
        <section className={styles.forminput}>
          <h3>
            We Will Serve You Better: Enter Your Ingredients and Preferences!
          </h3>

          <div className={styles.inputcontainer}>
            <input
              className={styles.inputconatinerr}
              placeholder="Enter your available ingredients"
              value={input}
              onChange={(event) => changeInput(event.target.value)}
            />
          </div>

          <div className={styles.dropdownContainer}>
            <label htmlFor="dietSelect" className={styles.dropdownLabel}>
              Dietary Preference:
            </label>
            <select
              id="dietSelect"
              className={styles.dietSelect}
              onChange={(event) => changeOption(event.target.value)}
            >
              <option value="">None</option>
              <option value="vegan">Vegan</option>
              <option value="glutenFree">Gluten-Free</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="dairyFree">Dairy-Free</option>
            </select>
          </div>

          <div className={styles.btn}>
            <button type="submit" className={styles.searchBtn} onClick={apiKey}>
              Submit
            </button>
          </div>
        </section>
      </div>

      {hasFetched && (
        <div ref={resultRef} className={styles.resultcontainer}>
          {isLoading ? (
            <div className={styles.messageContainer}>
              <div className={styles.loadingSpinner}></div>
              <span className={styles.loadingText}>Loading recipes...</span>
            </div>
          ) : error ? (
            <div className={styles.messageContainer}>
              <span className={styles.errorText}>{error}</span>
            </div>
          ) : isEmpty ? (
            <div className={styles.messageContainer}>
              <span className={styles.emptyText}>
                No recipe found for the ingredients provided.
              </span>
            </div>
          ) : (
            <Result data={data} />
          )}
        </div>
      )}
    </>
  );
};
