import React from "react";

import "./Card.css";

const habits = ["Read book"];

const Card = ({ name, progress }) => {
	return (
		<div className="card-container">
			<div className="habit-name">{name}</div>
			<div className="checkboxes-container">
				{progress.map((bool) => (
					<input type="checkbox" value={bool} />
				))}
			</div>
		</div>
	);
};

export default Card;
