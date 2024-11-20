import { FC, useState, useEffect } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { wordList } from "../utils/words";

// Массив слов для теста

interface TestProps {
  onComplete: (typedText: string, wordsPerMinute: number) => void; // Колбэк для передачи результата
}

const Test: FC<TestProps> = ({ onComplete }) => {
  const [inputText, setInputText] = useState(""); // Введённый текст
  const [timeLeft, setTimeLeft] = useState(60); // Таймер на 60 секунд
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Индекс текущего слова
  const [wordsTyped, setWordsTyped] = useState(0); // Количество правильно набранных слов
  const [isTestActive, setIsTestActive] = useState(true); // Активность теста
  const [currentWord, setCurrentWord] = useState(wordList[currentWordIndex]); // Текущее слово

  // Таймер обратного отсчета
  useEffect(() => {
    if (timeLeft > 0 && isTestActive) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleComplete();
    }
  }, [timeLeft, isTestActive]);

  // Обновление слова по мере завершения
  useEffect(() => {
    if (inputText.trim() === currentWord) {
      // Увеличиваем счетчик правильно набранных слов
      setWordsTyped((prev) => prev + 1);

      // Обновляем индекс для следующего слова, либо начинаем с первого слова, если дошли до конца списка
      setCurrentWordIndex((prev) => (prev + 1) % wordList.length);

      // Устанавливаем следующее слово
      setCurrentWord(wordList[(currentWordIndex + 1) % wordList.length]);

      // Очищаем поле ввода
      setInputText("");
    }
  }, [inputText, currentWord]); // Добавляем currentWord, чтобы обновить слово

  // Завершение теста
  const handleComplete = () => {
    setIsTestActive(false);
    const wordsPerMinute = Math.floor((wordsTyped / (60 - timeLeft)) * 60); // Рассчитываем WPM
    onComplete(inputText.trim(), wordsPerMinute); // Передаем результат
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
        backgroundColor: "#121212",
        color: "#fff",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Typing Speed Test
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#bdbdbd",
          mb: 3,
          maxWidth: "600px",
          lineHeight: 1.6,
          textAlign: "justify",
        }}
      >
        Type the words as quickly and accurately as you can.
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Current word: <strong>{currentWord}</strong>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={!isTestActive}
        sx={{
          backgroundColor: "#1e1e1e",
          color: "#ffffff",
          maxWidth: "600px",
          mb: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#4a4a4a",
            },
            "&:hover fieldset": {
              borderColor: "#fff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6200ea",
            },
            "& textarea": {
              color: "#fff",
            },
          },
        }}
      />
      <Typography variant="h6" color={timeLeft <= 10 ? "error" : "#fff"}>
        Time left: {timeLeft}s
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Words typed: {wordsTyped}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleComplete}
        disabled={!isTestActive}
        sx={{ mt: 3 }}
      >
        Complete Test
      </Button>
    </Box>
  );
};

export default Test;
