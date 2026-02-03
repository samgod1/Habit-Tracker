import React, { useState, useEffect } from "react";
import "./HabitDayBtn.css";

const HabitDayBtn = ({ checked, handleChange, day, type }) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (checked) {
			setIsChecked(true);
		}
	}, [checked]);

	return (
		<button
			onClick={() => {
				handleChange(!isChecked, day);
				setIsChecked(!isChecked);
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
