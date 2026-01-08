import { FaPlus } from "react-icons/fa";

import { Card } from "../../../components/index.js";
import "./Habits.css";

const habits = [
	{
		id: 1,
		name: "Read Book",
		type: "good",
		progress: [false, false, false, false, false, false, false],
	},
	{
		id: 2,
		name: "Make bed",
		type: "good",
		progress: [false, false, false, false, false, false, false],
	},
];

const Habits = () => {
	return (
		<div className="habits-page">
			<header>
				<span>My habits</span>
				<button className="create-habit">
					<FaPlus />
				</button>
			</header>
			<main>
				<section className="habits">
					<div className="type">Good Habits😇</div>
					{habits.map(
						(habit) =>
							habit.type == "good" && (
								<Card
									key={habit.id}
									name={habit.name}
									progress={habit.progress}
								/>
							)
					)}
				</section>
				<section className="top-priorities">Top Priorities</section>
				<section className="mood-board">Mood board</section>
			</main>
		</div>
	);
};

export default Habits;
