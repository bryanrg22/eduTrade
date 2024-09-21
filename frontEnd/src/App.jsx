import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from 'react'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Tracker" element={<Tracker />} />
    </Routes>
  </Router>
);

export default App;