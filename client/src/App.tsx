import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Compiler from "./pages/Compiler";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="code-compiler-ui-theme">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
