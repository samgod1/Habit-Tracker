import { useState, createContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function signup(data) {
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/api/auth/signup",
				data,
				{
					withCredentials: true,
				}
			);
			setUser(response);
			setLoading(false);
			toast.success("Signup successful");
		} catch (e) {
			toast.error(e?.response?.data?.message);
			throw new Error(e);
		}
	}

	async function login(data) {
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
				data,
				{
					withCredentials: true,
				}
			);
			setUser(response);
			setLoading(false);
			toast.success("Login Successful");
		} catch (e) {
			console.log(e);
			toast.error(e?.response?.data?.message);
			throw new Error(e);
		}
	}

	async function logout() {
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/api/auth/logout",
				{},
				{
					withCredentials: true,
				}
			);
		} catch (e) {
			console.log(e);
			throw new Error(e);
		} finally {
			setUser(null);
		}
	}

	async function fetchUserData() {
		try {
			const response = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/api/user/",
				{
					withCredentials: true,
				}
			);
			setUser(response.data);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setUser(null);
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
