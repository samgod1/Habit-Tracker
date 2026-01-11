import { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

import "./Dialog.css";

const Dialog = ({ setIsDialogOpen }) => {
	const [isOpen, setIsOpen] = useState(false);

	const emojiDisplay = useRef(null);

	function handleEmojiClick(emojiData) {
		emojiDisplay.current.innerText = emojiData.emoji;
	}

	function handleCreate() {
		setIsDialogOpen(false);
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
					<input type="text" id="habit-name" placeholder="e.g. Read book" />
				</div>
				<div className="input-group">
					<label htmlFor="type">Type:</label>
					<select>
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
				<button className="create-button" onClick={handleCreate}>
					Create
				</button>
			</div>
		</>
	);
};

export default Dialog;
