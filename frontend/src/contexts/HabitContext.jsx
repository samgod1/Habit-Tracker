import axios from "axios";
import toast from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";

export const HabitContext = createContext();

export function HabitProvider({ children }) {
	const [habits, setHabits] = useState([]);
	const [loading, setLoading] = useState(true);

	const { user } = useContext(userContext);

	async function getHabits() {
		try {
			if (!user) {
				return;
			}
			const response = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/api/habit",
				{
					withCredentials: true,
				},
			);
			setHabits(response.data);
			console.log(response.data);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (user) {
			getHabits();
		}
	}, [user]);
	return (
		<HabitContext.Provider value={{ habits, setHabits, loading }}>
			{children}
		</HabitContext.Provider>
	);
}
