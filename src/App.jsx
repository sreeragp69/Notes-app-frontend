import React from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="dashboard" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </Router>
);

const App = () => {
  return <>{routes}</>;
};

export default App;
