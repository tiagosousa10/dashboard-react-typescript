import { Routes } from "./routes";
import { useTheme } from "./hooks/theme";

const App = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme.title === "dark" ? "dark" : ""
      }`}
    >
      <Routes />
    </div>
  );
};

export default App;
