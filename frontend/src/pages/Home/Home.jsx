import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useContext, useEffect } from "react";
import { ScrollTrigger } from "gsap/all";

import "./Home.css";
import { PageTransitionContext } from "../../components/PageTransition/PageTransition";
import { userContext } from "../../contexts/UserContext";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	const navigate = useNavigate();

	const { handlePageChange } = useContext(PageTransitionContext);
	const { user } = useContext(userContext);

	useEffect(() => {
		if (user) {
			navigate("/habits");
		}
	}, [user]);

	useGSAP(() => {
		const tl = gsap.timeline();
		tl.from(".hero-h1", {
			opacity: 0,
			yPercent: 30,
			duration: 0.5,
		});
		tl.from(".hero-p", {
			opacity: 0,
			yPercent: 50,
			duration: 0.5,
		});

		//svg-path animation
		const path = document.getElementById("stroke-path");
		const pathLength = path.getTotalLength();

		path.style.strokeDasharray = pathLength;
		path.style.strokeDashoffset = pathLength;

		gsap.to(path, {
			strokeDashoffset: 0,
			scrollTrigger: {
				trigger: ".spotlight-section",
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		});

		const cards = document.querySelectorAll(".card");

		cards.forEach((card) => {
			gsap.from(card.querySelector(".spotlight-h1"), {
				opacity: 0,
				yPercent: 30,
				duration: 0.5,
				scrollTrigger: {
					trigger: card,
					toggleActions: "play none none reverse",
					start: "bottom bottom",
				},
			});

			gsap.from(card.querySelector(".spotlight-p"), {
				opacity: 0,
				yPercent: 50,
				duration: 0.5,
				scrollTrigger: {
					trigger: card,
					toggleActions: "play none none reverse",
					start: "bottom bottom",
				},
			});
		});
	}, []);

	return (
		<main className="home">
			<section className="hero-section">
				<div className="wrapper">
					<div className="text-wrapper">
						<h1 className="hero-h1">Get 1% better every day</h1>
						<p className="hero-p">Build good habits and break bad ones</p>
					</div>
					<button
						className="get-started"
						onClick={() => {
							handlePageChange("/auth");
						}}
					>
						Get Started
					</button>
				</div>
			</section>
			<section className="spotlight-section">
				<div className="row">
					<div className="img">
						<img
							src="/images/appointment-booking-with-calendar.png"
							alt="calendar-marked"
						/>
					</div>
					<div className="col">
						<div className="card">
							<h1 className="spotlight-h1">Create a habit</h1>
							<p className="spotlight-p">
								Start by defining what you want to improve. Creating a habit
								gives your goal a clear shape and direction. Once it’s written
								down, it becomes easier to commit and take action every day.
							</p>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="img">
						<img src="/images/calendar-checked.svg" alt="calendar-checked" />
					</div>
					<div className="col">
						<div className="card">
							<h1 className="spotlight-h1">Track your habits</h1>
							<p className="spotlight-p">
								See your habits clearly, day by day. Tracking shows what you are
								doing consistently and where you are slipping. This makes it
								easier to stay accountable and build better routines over time.
							</p>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<div className="card">
							<h1 className="spotlight-h1">Feel Good</h1>
							<p className="spotlight-p">
								Checking off habits gives a sense of progress. Even small wins
								feel rewarding and keep you motivated. This positive feeling
								helps you stay consistent instead of giving up.
							</p>
						</div>
					</div>
					<div className="img">
						<img src="/images/feeling-good.svg" alt="calendar-checked" />
					</div>
				</div>

				<div className="row">
					<div className="img">
						<img src="images/success.svg" alt="success" />
					</div>
					<div className="col">
						<div className="card">
							<h1 className="spotlight-h1">Achieve Your Goals</h1>
							<p className="spotlight-p">
								Big goals are built from small daily actions. A habit tracker
								helps you focus on those daily steps, stay consistent, and
								slowly move closer to the goals you care about.
							</p>
						</div>
					</div>
				</div>

				<div id="svg-path">
					<svg
						viewBox="0 0 1231 2662"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="stroke-path"
							d="M657.12 106.501C657.12 106.501 163.12 103.001 133.62 494.001C81.7557 1181.43 1194.62 895.001 1120.62 1496C1070.16 1905.78 314.621 2106.5 133.621 1745C-47.3794 1383.5 735.119 1260.5 657.12 2555"
							stroke="black"
							strokeWidth="213"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</section>
		</main>
	);
};

export default Home;
