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
];

const Habits = () => {
	return (
		<div className="habits">
			<header>
				<span>My habits</span>
				<button>
					<FaPlus />
					Create
				</button>
			</header>
			<main>
				<div>Good Habits😇</div>
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
			</main>
		</div>
	);
};

export default Habits;
