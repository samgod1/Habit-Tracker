import React, { useContext } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import "./ContextMenu.css";
import toast from "react-hot-toast";
import axios from "axios";
import { HabitContext } from "../../contexts/HabitContext";

const ContextMenu = ({ ref, id, setHabitToEdit, setIsDialogOpen }) => {
	const { habits, setHabits } = useContext(HabitContext);

	function handleEditButton() {
		const habitToEdit = habits.find((habit) => habit._id == id);
		setHabitToEdit(habitToEdit);
		setIsDialogOpen(true);
	}

	async function handleDeleteButton() {
		const newHabits = habits.filter((habit) => {
			return habit._id != id;
		});

		setHabits(newHabits);

		try {
			await axios.delete(
				import.meta.env.VITE_BACKEND_URL + "/api/habit/" + id,
				{ withCredentials: true },
			);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	return (
		<div
			ref={ref}
			className="context-menu"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<button className="edit-button" onClick={handleEditButton}>
				<MdEdit />
				<span>Edit</span>
			</button>
			<button className="delete-button" onClick={handleDeleteButton}>
				<MdDelete />
				<span>Delete</span>
			</button>
		</div>
	);
};

export default ContextMenu;
