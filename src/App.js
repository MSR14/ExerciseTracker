import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/NavBar.js";
import { ExercisesList } from "./components/ExercisesList.js";
import { EditExercise } from "./components/EditExercise.js";
import { CreateExercise } from "./components/CreateExercise.js";
import { CreateUser } from "./components/CreateUser.js";
// import "./index.css";
// import "./App.css";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<ExercisesList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
