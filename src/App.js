import { Routes, Route } from "react-router-dom";
import Setting from "./components/pages/Setting";
import Questions from "./components/pages/Questions";
import Result from "./components/pages/Result";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Setting />} />
      <Route path="/question" element={<Questions />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
