import axios from "axios";
import toast from "react-hot-toast";
import { createContext, useEffect, useState } from "react";

export const HabitContext = createContext();

export function HabitProvider({ children }) {
	const [habits, setHabits] = useState([]);
	const [loading, setLoading] = useState(true);

	async function getHabits() {
		try {
			const response = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/api/habit",
				{
					withCredentials: true,
				}
			);
			setHabits(response.data);
			setLoading(false);
		} catch (e) {
			toastast.error(e?.response?.data?.message || e.message);
		}
	}

	useEffect(() => {
		getHabits();
	}, []);
	return (
		<HabitContext.Provider value={{ habits, setHabits, loading }}>
			{children}
		</HabitContext.Provider>
	);
}
