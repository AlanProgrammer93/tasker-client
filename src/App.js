import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/404";
import Main from "./components/nav/Main";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Main />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
