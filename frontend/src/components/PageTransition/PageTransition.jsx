import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext } from "react";

import "./PageTransition.css";

export const PageTransitionContext = createContext();

const PageTransition = () => {
	const navigate = useNavigate();
	const location = useLocation();

	function animateIn() {
		const promise = new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: resolve,
			});

			tl.to(".row-1 .block", {
				scaleY: 1,
				stagger: 0.2,
			});
			tl.to(
				".row-2 .block",
				{
					scaleY: 1,
					stagger: 0.2,
				},
				"<",
			);
		});
		return promise;
	}

	function animateOut() {
		const promise = new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: resolve,
			});

			tl.to(".row-1 .block", {
				scaleY: 0,
				stagger: 0.2,
			});
			tl.to(
				".row-2 .block",
				{
					scaleY: 0,
					stagger: 0.2,
				},
				"<",
			);
		});

		return promise;
	}

	async function handlePageChange(link) {
		await animateIn();
		navigate(link);
		await new Promise((resolve) => requestAnimationFrame(resolve));
		await new Promise((resolve) => requestAnimationFrame(resolve));
		await animateOut();
	}

	return (
		<div className="transition-wrapper">
			<div className="transition">
				<div className="transition-row row-1">
					<div className="block"></div>
					<div className="block"></div>
					<div className="block"></div>
					<div className="block"></div>
					<div className="block"></div>
				</div>
				<div className="transition-row row-2">
					<div className="block"></div>
					<div className="block"></div>
					<div className="block"></div>
					<div className="block"></div>
					<div className="block"></div>
				</div>
			</div>

			<PageTransitionContext.Provider value={{ handlePageChange }}>
				<Outlet />
			</PageTransitionContext.Provider>
		</div>
	);
};

export default PageTransition;
