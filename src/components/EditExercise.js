import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditExercise = () => {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/exercises/${id}`);
        if (response.ok) {
          const data = await response.json();
          setExercise({
            username: data.username,
            description: data.description,
            duration: data.duration,
            date: new Date(data.date),
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");

        if (response.ok) {
          const data = await response.json();
          setUsers(data.map((user) => user.username));
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchExercise();
    fetchUsers();
  }, [id]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/exercises/update/${id}`, {
        method: "PUT",
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
    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
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
            value={exercise.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={handleDateChange} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
