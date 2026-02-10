import { useContext, useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import toast from "react-hot-toast";

import "./Dialog.css";
import { HabitContext } from "../../contexts/HabitContext";

const Dialog = ({ setIsDialogOpen, habitToEdit, setHabitToEdit }) => {
	const [isOpen, setIsOpen] = useState(false);

	const emojiPicker = useRef(null);
	const buttonRef = useRef(null);

	const emojiDisplay = useRef(null);
	const nameRef = useRef(null);
	const typeRef = useRef(null);

	const { setHabits } = useContext(HabitContext);

	function handleEmojiClick(emojiData) {
		emojiDisplay.current.innerText = emojiData.emoji;
	}

	async function createOrUpdateHabit() {
		setIsDialogOpen(false);
		const icon = emojiDisplay.current.innerText;
		const name = nameRef.current.value;
		const type = typeRef.current.value;

		try {
			if (!habitToEdit) {
				const response = await axios.post(
					"/api/habit/create",
					{
						icon: icon,
						name: name,
						type: type,
					},
					{
						withCredentials: true,
					},
				);
				setHabits((prev) => [...prev, response.data]);
			} else {
				const response = await axios.put(
					"/api/habit/" + habitToEdit._id,
					{
						icon: icon,
						name: name,
						type: type,
					},
					{ withCredentials: true },
				);

				setHabits((prev) =>
					prev.map((habit) =>
						habitToEdit._id == habit._id ? response.data : habit,
					),
				);

				setHabitToEdit(null);
			}
		} catch (e) {
			toast.error(e?.response?.data?.message || e);
		}
	}

	useEffect(() => {
		function handleMouseDown(e) {
			if (
				emojiPicker.current &&
				!emojiPicker.current.contains(e.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(e.target)
			) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleMouseDown);
		}

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
		};
	}, [isOpen]);

	useEffect(() => {
		if (habitToEdit) {
			if (emojiDisplay.current)
				emojiDisplay.current.innerText = habitToEdit.icon;
			if (nameRef.current) nameRef.current.value = habitToEdit.name;
			if (typeRef.current) typeRef.current.value = habitToEdit.type;
		}
	}, [habitToEdit]);

	return (
		<>
			<div
				className="backdrop"
				onClick={() => {
					setIsDialogOpen(false);
				}}
			></div>
			<div className="dialog">
				<div className="emoji-section">
					<span className="emoji-circle">
						<span className="emoji-display" ref={emojiDisplay}>
							😊
						</span>
						<button
							className="edit-button"
							ref={buttonRef}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							<FaPen />
						</button>
						<div ref={emojiPicker}>
							<EmojiPicker
								className="emoji-picker"
								theme="dark"
								open={isOpen}
								skinTonesDisabled={true}
								onEmojiClick={handleEmojiClick}
							/>
						</div>
					</span>
				</div>
				<div className="input-group">
					<label htmlFor="habit-name">Habit name:</label>
					<input
						type="text"
						id="habit-name"
						placeholder="e.g. Read book"
						ref={nameRef}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="type">Type:</label>
					<select ref={typeRef}>
						<option value="good">Good</option>
						<option value="bad">Bad</option>
					</select>
				</div>
				<button className="create-button" onClick={createOrUpdateHabit}>
					{habitToEdit ? "Edit" : "Create"}
				</button>
			</div>
		</>
	);
};

export default Dialog;
