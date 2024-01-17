import React, { useEffect, useState } from "react";
import { Exercise } from "./Exercise";
export const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("/exercises");

        if (response.ok) {
          const data = await response.json();
          setExercises(data);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchExercises();
  }, []);

  const deleteExercise = async (id) => {
    try {
      const response = await fetch(`/exercises/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Assuming you want to update the exercises list after a successful delete
        const updatedExercises = exercises.filter(
          (exercise) => exercise.id !== id
        );
        setExercises(updatedExercises);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting exercise with ID ${id}:`, error);
    }
  };
  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <Exercise
              exercise={exercise}
              deleteExercise={deleteExercise}
              key={exercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
