import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/AddUserForm";
import { users as localUsers } from './data/users';

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const savedUsers = localStorage.getItem("users");

        if (savedUsers) {
          try {
            const parsedUsers = JSON.parse(savedUsers);
            setUsers(parsedUsers);
          } catch (e) {
            console.error("Invalid JSON in localStorage, clearing data", e);
            localStorage.removeItem("users");
            await fetchFromAPI();
          }
        } else {
          await fetchFromAPI();
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    const fetchFromAPI = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const fetchedUsers = response.data.map((user) => ({
          ...user,
          company: user.company.name,
          address: `${user.address.suite} ${user.address.street}\n${user.address.city} ${user.address.zipcode}`,
        }));
        setUsers(fetchedUsers);
        localStorage.setItem("users", JSON.stringify(fetchedUsers));
      } catch (error) {
        console.error("Error fetching users from API:", error);
        await loadLocalData();
      }
    };

    const loadLocalData = () => {
      try {
        const fetchedUsers = localUsers.map((user) => ({
          ...user,
          company: user.company.name,
          address: `${user.address.suite} ${user.address.street}\n${user.address.city} ${user.address.zipcode}`,
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error loading local data:", error);
      }
    };

    fetchUsers();
  }, []);

  const sort = (key) => {
    const sortedUsers = [...users].sort((a, b) => {
      let result = a[key] > b[key] ? 1 : -1;
      return sortAsc ? result : -result;
    });
    setSortKey(key);
    setSortAsc(!sortAsc);
    setUsers(sortedUsers);
    localStorage.setItem("users", JSON.stringify(sortedUsers));
  };

  const handleEdit = (userId, field, currentValue) => {
    setEditingUserId(userId);
    setEditingField(field);
    setNewValue(currentValue);
  };

  const saveEdit = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, [editingField]: newValue } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingField(null);
    setEditingUserId(null);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const addUser = () => {
    if (newUser.name && newUser.username && newUser.email) {
      const newUserObject = {
        ...newUser,
        id: users.length + 1,
        company: newUser.company || "Unknown Company",
        address: "N/A",
      };
      const updatedUsers = [...users, newUserObject];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setNewUser({ name: "", username: "", email: "", company: "" });
    }
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      <UserTable
        users={users}
        sortKey={sortKey}
        sortAsc={sortAsc}
        onSort={sort}
        onEdit={handleEdit}
        onDelete={deleteUser}
        onSaveEdit={saveEdit}
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
        onAddUser={addUser}
      />
    </div>
  );
}
