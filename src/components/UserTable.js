import React from "react";
import InlineUser from "./InlineUser";

function UserTable({
  users,
  sortKey,
  sortAsc,
  onSort,
  onEdit,
  onDelete,
  onSaveEdit,
  editingField,
  editingUserId,
  newValue,
  setNewValue,
  setEditingField,
  setEditingUserId,
}) {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th onClick={() => onSort("name")} style={{ cursor: "pointer" }}>
            Name {sortKey === "name" ? (sortAsc ? "▲" : "▼") : ""}
          </th>
          <th onClick={() => onSort("username")} style={{ cursor: "pointer" }}>
            Username {sortKey === "username" ? (sortAsc ? "▲" : "▼") : ""}
          </th>
          <th onClick={() => onSort("email")} style={{ cursor: "pointer" }}>
            Email {sortKey === "email" ? (sortAsc ? "▲" : "▼") : ""}
          </th>
          <th onClick={() => onSort("address")} style={{ cursor: "pointer" }}>
            Address {sortKey === "address" ? (sortAsc ? "▲" : "▼") : ""}
          </th>
          <th onClick={() => onSort("company")} style={{ cursor: "pointer" }}>
            Company {sortKey === "company" ? (sortAsc ? "▲" : "▼") : ""}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <InlineUser
            key={user.id}
            user={user}
            editingField={editingField}
            editingUserId={editingUserId}
            newValue={newValue}
            setNewValue={setNewValue}
            setEditingField={setEditingField}
            setEditingUserId={setEditingUserId}
            onSaveEdit={onSaveEdit}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
