import React from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Home.css";

const Home = () => {
	const navigate = useNavigate();

	useGSAP(() => {
		const tl = gsap.timeline();
		tl.from("h1", {
			opacity: 0,
			yPercent: 30,
			duration: 0.5,
		});
		tl.from("p", {
			opacity: 0,
			yPercent: 50,
			duration: 0.5,
		});
	}, []);
	return (
		<main className="home">
			<section className="hero-section">
				<div className="wrapper">
					<div className="text-wrapper">
						<h1>Get 1% better every day</h1>
						<p>Build good habits and break bad ones</p>
					</div>
					<button
						className="get-started"
						onClick={() => {
							navigate("/auth");
						}}
					>
						Get Started
					</button>
				</div>
			</section>
			<svg viewBox="0 0 200 200" width="200" height="200">
				<path
					id="myPath"
					d="M 10 80 Q 95 10 180 80"
					stroke="#000"
					stroke-width="3"
					fill="none"
				/>
			</svg>
		</main>
	);
};

export default Home;
