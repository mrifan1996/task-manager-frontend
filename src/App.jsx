import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectBoard from "./pages/ProjectBoard";
import ProjectList from "./pages/ProjectList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/project/:id" element={<ProjectBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
