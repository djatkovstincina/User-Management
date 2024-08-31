export const sort = (users, setUsers, sortKey, setSortKey, sortAsc, setSortAsc) => {
    const sortedUsers = [...users].sort((a, b) => {
        let result = a[sortKey] > b[sortKey] ? 1 : -1;
        return sortAsc ? result : -result;
    });
    setSortKey(sortKey);
    setSortAsc(!sortAsc);
    setUsers(sortedUsers);
    localStorage.setItem("users", JSON.stringify(sortedUsers));
};

export const handleEdit = (userId, field, currentValue, setEditingUserId, setEditingField, setNewValue) => {
    setEditingUserId(userId);
    setEditingField(field);
    setNewValue(currentValue);
};

export const saveEdit = (users, setUsers, editingUserId, editingField, newValue, setEditingField, setEditingUserId) => {
    const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...user, [editingField]: newValue } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingField(null);
    setEditingUserId(null);
};

export const deleteUser = (users, setUsers, id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const addUser = (users, setUsers, newUser, setNewUser) => {
    if (newUser.name && newUser.username && newUser.email) {
        const newUserObject = {
            ...newUser,
            id: users.length + 1,
            company: newUser.company || "Unknown Company",
            address: newUser.address || "N/A",
        };
        const updatedUsers = [...users, newUserObject];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setNewUser({ name: "", username: "", email: "", address: "", company: "" });
    }
};
