import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import toast from "react-hot-toast";

import "./Dialog.css";

const Dialog = ({ setIsDialogOpen, setHabits }) => {
	const [isOpen, setIsOpen] = useState(false);

	const emojiDisplay = useRef(null);
	const nameRef = useRef(null);
	const typeRef = useRef(null);

	function handleEmojiClick(emojiData) {
		emojiDisplay.current.innerText = emojiData.emoji;
	}

	async function createHabit() {
		const icon = emojiDisplay.current.innerText;
		const name = nameRef.current.value;
		const type = typeRef.current.value;
		console.log(icon, name, type);
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/api/habit/create",
				{
					icon: icon,
					name: name,
					type: type,
				},
				{
					withCredentials: true,
				}
			);
			setHabits((prev) => [...prev, response.data]);
			setIsDialogOpen(false);
		} catch (e) {
			toast.error(e?.response?.data?.message || e);
		}
	}

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
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							<FaPen />
						</button>
						<EmojiPicker
							className="emoji-picker"
							theme="dark"
							open={isOpen}
							skinTonesDisabled={true}
							onEmojiClick={handleEmojiClick}
						/>
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
				<div className="input-group">
					<label htmlFor="notify">Notify:</label>
					<input type="text" id="notify" placeholder="e.g. 10" />
					<select>
						<option value="am">Am</option>
						<option value="pm">Pm</option>
					</select>
				</div>
				<button className="create-button" onClick={createHabit}>
					Create
				</button>
			</div>
		</>
	);
};

export default Dialog;
