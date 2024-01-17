import React, { useState } from "react";

export const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
  });

  // Event handler for updating the state when input values change
  const handleChange = (e) => {
    setUser({ username: e.target.value });
    //console.log(exercise);
  };
  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use the 'exercise' state variable for further processing or submission
    try {
      const response = await fetch("/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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

    setUser({ username: "" });
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            name="description"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
