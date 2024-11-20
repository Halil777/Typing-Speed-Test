import { useState } from "react";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Results from "../pages/Results";
import Header from "../components/Header";

const App = () => {
  const [currentSection, setCurrentSection] = useState<
    "home" | "test" | "results"
  >("home");
  const [typedText, setTypedText] = useState("");

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Home onStartTest={() => setCurrentSection("test")} />;
      case "test":
        return (
          <Test
            onComplete={(text) => {
              setTypedText(text);
              setCurrentSection("results");
            }}
          />
        );
      case "results":
        return (
          <Results
            typedText={typedText}
            onRestart={() => setCurrentSection("home")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      {renderSection()}
    </div>
  );
};

export default App;
