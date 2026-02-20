import React, { useState, useEffect } from "react";
import "./HabitDayBtn.css";
import toast from "react-hot-toast";

const HabitDayBtn = ({ checked, handleChange, day, type }) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (checked) {
			setIsChecked(true);
		}
	}, [checked]);

	const today = new Date().toISOString().split("T")[0];

	return (
		<button
			onClick={() => {
				if (day <= today) {
					handleChange(!isChecked, day);
					setIsChecked(!isChecked);
				} else {
					toast.error("Future dates are unavailable for selection.");
				}
			}}
			className={`habit-circle-btn ${isChecked ? `completed-${type}` : ""}`}
		>
			{isChecked && (
				<svg
					className="check-icon"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={4}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			)}
		</button>
	);
};
export default HabitDayBtn;
