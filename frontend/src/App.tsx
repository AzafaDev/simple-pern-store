import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import { useStore } from "./stores/useThemeStore";

const App = () => {
  const theme = useStore((state) => state.dataTheme);
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products/:id" element={<ProductsPage/>} />
      </Routes>
    </div>
  )
};

export default App;
