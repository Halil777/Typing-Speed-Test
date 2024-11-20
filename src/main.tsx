import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./app/App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/theme";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
