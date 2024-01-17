import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const CreateExercise = () => {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });
  const [users, setUsers] = useState([]);
  // Event handler for updating the state when input values change
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");

        if (response.ok) {
          const data = await response.json();
          setUsers(data.map((user) => user.username));
          setExercise((prevExercise) => ({
            ...prevExercise,
            username: data[0].username,
          }));
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
    //console.log(exercise);
  };
  const handleDateChange = (date) => {
    setExercise((prevExercise) => ({
      ...prevExercise,
      date: date,
    }));
    //console.log(exercise);
  };
  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use the 'exercise' state variable for further processing or submission
    try {
      const response = await fetch("exercises/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Server response:", data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    //console.log(exercise);
    window.location = "/";
    // Additional logic for handling the exercise data (e.g., sending to the server)
  };
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            name="username"
            value={exercise.username}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            name="description"
            value={exercise.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={exercise.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={exercise.date}
              onChange={handleDateChange}
              name="date"
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
