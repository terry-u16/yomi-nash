import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Theory from "./pages/Theory";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="help" element={<Help />} />
        <Route path="theory" element={<Theory />} />
      </Route>
    </Routes>
  );
};

export default App;
