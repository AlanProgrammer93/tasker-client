import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Home from './pages/Home';
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/404";
import Main from "./components/nav/Main";
import './App.css';
import { AuthProvider } from "./context/auth";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Main />
        <Toaster toastOptions={{duration: 2000}} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />

          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
