import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./Card.css";

const Card = ({ name, type, progress }) => {
	return (
		<div className="card">
			<div className="habit-name">{name}</div>
			<div className="checkboxes-container">
				{progress.map((bool) => (
					<input type="checkbox" value={bool} className={type} key={uuidv4()} />
				))}
			</div>
		</div>
	);
};

export default Card;
