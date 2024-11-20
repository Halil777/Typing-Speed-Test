import { FC, useState, useEffect } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";

const sampleText =
  "This is a typing speed test. Type the text as quickly and accurately as you can.";

interface TestProps {
  sampleText: string; // Передача текста для теста
  onComplete: (typedText: string) => void; // Колбэк для передачи результата
}

const Test: FC<TestProps> = ({ sampleText, onComplete }) => {
  const [inputText, setInputText] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // Таймер на 60 секунд
  const [isTestActive, setIsTestActive] = useState(true);

  // Таймер обратного отсчета
  useEffect(() => {
    if (timeLeft > 0 && isTestActive) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleComplete();
    }
  }, [timeLeft, isTestActive]);

  // Завершение теста
  const handleComplete = () => {
    setIsTestActive(false);
    onComplete(inputText.trim()); // Передаем введенный текст в колбэк
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
        {sampleText}
      </Typography>
      <TextField
        fullWidth
        multiline
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
