import { useState, createContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function signup(data) {
		try {
			const response = await axios.post("/api/auth/signup", data, {
				withCredentials: true,
			});
			setUser(response.data);
			toast.success("Signup successful");
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
			throw new Error(e);
		} finally {
			setLoading(false);
		}
	}

	async function login(data) {
		try {
			const response = await axios.post("/api/auth/login", data, {
				withCredentials: true,
			});
			setUser(response.data);
			console.log(response.data);
			toast.success("Login Successful");
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
			throw new Error(e);
		} finally {
			setLoading(false);
		}
	}

	async function logout() {
		try {
			const response = await axios.post(
				"/api/auth/logout",
				{},
				{
					withCredentials: true,
				},
			);
		} catch (e) {
			console.log(e);
			throw new Error(e);
		} finally {
			setUser(null);
			setLoading(false);
		}
	}

	async function fetchUserData() {
		try {
			const response = await axios.get("/api/user/", {
				withCredentials: true,
			});
			setUser(response.data);
		} catch (e) {
			console.log(e);
			setUser(null);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<userContext.Provider value={{ user, loading, signup, login, logout }}>
			{children}
		</userContext.Provider>
	);
};
