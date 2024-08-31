import React, { useState } from "react";
import "./styles.css";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/AddUserForm";
import useFetchUsers from "./hooks/useFetchedUsers";
import { sort, handleEdit, saveEdit, deleteUser, addUser } from "./utils/userActions";

export default function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    company: "",
  });
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newValue, setNewValue] = useState("");

  useFetchUsers(setUsers);

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      <UserTable
        users={users}
        sortKey={sortKey}
        sortAsc={sortAsc}
        onSort={(key) => sort(users, setUsers, key, setSortKey, sortAsc, setSortAsc)}
        onEdit={(userId, field, currentValue) => handleEdit(userId, field, currentValue, setEditingUserId, setEditingField, setNewValue)}
        onDelete={(id) => deleteUser(users, setUsers, id)}
        onSaveEdit={() => saveEdit(users, setUsers, editingUserId, editingField, newValue, setEditingField, setEditingUserId)}
        editingField={editingField}
        editingUserId={editingUserId}
        newValue={newValue}
        setNewValue={setNewValue}
        setEditingField={setEditingField}
        setEditingUserId={setEditingUserId}
      />
      <h2>Add User</h2>
      <AddUserForm
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={() => addUser(users, setUsers, newUser, setNewUser)}
      />
    </div>
  );
}
