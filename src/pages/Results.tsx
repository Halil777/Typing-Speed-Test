import { FC } from "react";
import { Typography, Button, Box } from "@mui/material";
import { wordList } from "../utils/words";

interface ResultsProps {
  typedText: string;
  startTime: number; // Test başlanyn wagt
  endTime: number; // Test tamamlanýan wagt
  onRestart: () => void;
}

const Results: FC<ResultsProps> = ({
  typedText,
  startTime,
  endTime,
  onRestart,
}) => {
  // Подсчет слов в минуту (WPM)
  const calculateWPM = () => {
    const wordsTyped = typedText.trim().split(/\s+/).length;

    // Вычисляем количество секунд, прошедших с начала теста
    const timeInSeconds = (endTime - startTime) / 1000;

    // Переводим в минуты
    const timeInMinutes = timeInSeconds / 60;

    // Возвращаем WPM (слов в минуту)
    return Math.round(wordsTyped / timeInMinutes);
  };

  // Подсчет точности
  const calculateAccuracy = () => {
    const typedWords = typedText.trim().split(/\s+/);
    const correctWords = typedWords.filter(
      (word, index) => word === wordList[index]
    ).length;
    return Math.round((correctWords / wordList.length) * 100);
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
