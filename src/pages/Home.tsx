import { FC } from "react";
import { Typography, Button, Box } from "@mui/material";

interface HomeProps {
  onStartTest: () => void;
}

const Home: FC<HomeProps> = ({ onStartTest }) => {
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
      <Typography variant="h3" gutterBottom>
        Welcome to Typing Speed Test
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Test your typing speed and accuracy in just 1 minute.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
        onClick={onStartTest}
      >
        Start Test
      </Button>
    </Box>
  );
};

export default Home;
