import React from "react";

function AddUserForm({ newUser, setNewUser, onAddUser }) {
  return (
    <form
      className="form-inline mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        onAddUser();
      }}
    >
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </div>
      <div className="form-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
        />
      </div>
      <div className="form-group mr-2">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
