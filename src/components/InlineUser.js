import React from "react";

function InlineUser({
  user,
  editingField,
  editingUserId,
  newValue,
  setNewValue,
  setEditingField,
  setEditingUserId,
  onSaveEdit,
  onDelete,
  onEdit,
}) {
  return (
    <tr>
      <td>
        {editingField === "name" && editingUserId === user.id ? (
          <>
            <input
              type="text"
              className="form-control"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <button className="btn btn-success btn-sm" onClick={onSaveEdit}>
              Confirm
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setEditingField(null);
                setEditingUserId(null);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{user.name}</span>
            <button
              className="btn btn-primary btn-sm ml-2"
              onClick={() => onEdit(user.id, "name", user.name)}
            >
              Edit
            </button>
          </>
        )}
      </td>
      <td>{user.username}</td>
      <td>
        {editingField === "email" && editingUserId === user.id ? (
          <>
            <input
              type="text"
              className="form-control"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <button className="btn btn-success btn-sm" onClick={onSaveEdit}>
              Confirm
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setEditingField(null);
                setEditingUserId(null);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {user.email}
            <button
              className="btn btn-primary btn-sm ml-2"
              onClick={() => onEdit(user.id, "email", user.email)}
            >
              Edit
            </button>
          </>
        )}
      </td>
      <td>{user.address}</td>
      <td>
        {editingField === "company" && editingUserId === user.id ? (
          <>
            <input
              type="text"
              className="form-control"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <button className="btn btn-success btn-sm" onClick={onSaveEdit}>
              Confirm
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setEditingField(null);
                setEditingUserId(null);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {user.company}
            <button
              className="btn btn-primary btn-sm ml-2"
              onClick={() => onEdit(user.id, "company", user.company)}
            >
              Edit
            </button>
          </>
        )}
      </td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default InlineUser;
