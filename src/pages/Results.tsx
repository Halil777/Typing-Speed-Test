import { FC } from "react";
import { Typography, Button, Box } from "@mui/material";

interface ResultsProps {
  typedText: string;
  sampleText: string;
  onRestart: () => void;
}

const Results: FC<ResultsProps> = ({ typedText, sampleText, onRestart }) => {
  // Подсчет слов в минуту (WPM)
  const calculateWPM = () => {
    const wordsTyped = typedText.trim().split(/\s+/).length;
    return wordsTyped; // За минуту
  };

  // Подсчет точности
  const calculateAccuracy = () => {
    const sampleWords = sampleText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);
    const correctWords = typedWords.filter(
      (word, index) => word === sampleWords[index]
    ).length;
    return Math.round((correctWords / sampleWords.length) * 100);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 64px)", // Учитываем высоту Header
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Test Results
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Words Per Minute (WPM): {calculateWPM()}
      </Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        Accuracy: {calculateAccuracy()}%
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onRestart}
        sx={{ mt: 4 }}
      >
        Restart Test
      </Button>
    </Box>
  );
};

export default Results;
