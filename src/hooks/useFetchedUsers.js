import { useEffect } from "react";
import axios from "axios";
import { users as localUsers } from '../data/users';

const useFetchUsers = (setUsers) => {
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
    }, [setUsers]);
};

export default useFetchUsers;
