import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./Search";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="App-border">
          <Search defaultCity="Sydney" />
        </div>
        <footer>
          <a
            href="https://github.com/QueenVivi/react-weather-application"
            title="github page for the code source"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-source
          </a>{" "}
          coded by{" "}
          <a
            href="https://www.linkedin.com/in/vivian-ux/"
            title="Vivian's linkedin page"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vivian Xu
          </a>
        </footer>
      </div>
    </div>
  );
}
