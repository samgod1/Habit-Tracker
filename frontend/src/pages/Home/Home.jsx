import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useContext } from "react";
import { ScrollTrigger } from "gsap/all";

import "./Home.css";
import { PageTransitionContext } from "../../components/PageTransition/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	const { handlePageChange } = useContext(PageTransitionContext);

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
				markers: true,
			},
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
							handlePageChange("/auth");
						}}
					>
						Get Started
					</button>
				</div>
			</section>
			<section className="spotlight-section">
				<div id="svg-path">
					<svg
						width="1051"
						height="2832"
						viewBox="0 0 1051 2832"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="stroke-path"
							d="M588.89 80.015C588.89 80.015 167.332 161.997 167.332 494.565C167.332 827.134 940.229 1144.96 968.844 1497.27C1021.85 2149.86 80 2071.66 80 1740.3C80 1408.94 683.5 1452.01 683.5 2751.01"
							stroke="black"
							stroke-width="160"
							stroke-linecap="round"
						/>
					</svg>
				</div>
			</section>
		</main>
	);
};

export default Home;
