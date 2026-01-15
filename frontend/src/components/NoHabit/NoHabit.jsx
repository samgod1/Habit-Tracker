import React from "react";

import "./NoHabit.css";

const NoHabit = () => {
	const iconSize = { width: "168px", height: "168px" };
	return (
		<div className="no-habits">
			<div className="wrapper">
				<img
					src="/images/no-habit-image.png"
					alt="no-habit-image"
					width={200}
				/>
				<span>Develop a habit</span>
				<span>Each step counts</span>
			</div>
		</div>
	);
};

export default NoHabit;
