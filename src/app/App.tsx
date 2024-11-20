import { useState } from "react";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Results from "../pages/Results";
import Header from "../components/Header";

const sampleText =
  "This is a typing speed test. Type the text as quickly and accurately as you can.";

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
            sampleText={sampleText}
          />
        );
      case "results":
        return (
          <Results
            typedText={typedText}
            sampleText={sampleText}
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
