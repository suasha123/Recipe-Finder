import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "./Navbar";
import { Hero } from "./HeroSection";
import { Feature } from "./Features";
import { Surya } from "./Aside";
import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecipieGenerator } from "./RecipeGenerator";
import { SearchBar } from "./Serachbar";
import { Footer } from "./Footer";
export const Main = () => {
  const ref = useRef(null);
  const scrollToFeature = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <StrictMode>
        <Router>
          <Navbar />
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <Hero onClick={scrollToFeature} />
                  <Surya />
                  <div ref={ref}>
                    <Feature />
                  </div>
                </>
              }
            />
            {/* Recipe Generator Route */}
            <Route path="/generate-recipes" element={<RecipieGenerator />} />
            
            {/* Search Route */}
            <Route path="/search" element={<SearchBar />} />
          </Routes>
          <Footer /> {/* Footer component here */}
        </Router>
      </StrictMode>
  
  );
};

createRoot(document.getElementById("root")).render(<Main />);
