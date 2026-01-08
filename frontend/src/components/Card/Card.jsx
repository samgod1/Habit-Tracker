import React from "react";

const habits = ["Read book"];

const Card = ({ name, type, progress }) => {
	return (
		<div>
			<span>{name}</span>
			{progress.map((bool) => (
				<span>
					<input type="checkbox" value={bool} />
				</span>
			))}
		</div>
	);
};

export default Card;
