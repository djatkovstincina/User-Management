import React, { useState } from "react";

function AddUserForm({ newUser, setNewUser, onAddUser }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!newUser.name.trim()) {
      errors.name = "Name is required";
    }
    if (!newUser.username.trim()) {
      errors.username = "Username is required";
    }
    if (!newUser.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email address is invalid";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onAddUser();
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form className="form-inline mb-4" onSubmit={handleSubmit}>
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        {errors.username && (
          <div className="text-danger">{errors.username}</div>
        )}
      </div>
      <div className="form-group mr-2">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        />
      </div>
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Company"
          value={newUser.company}
          onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add User
      </button>
    </form>
  );
}

export default AddUserForm;
