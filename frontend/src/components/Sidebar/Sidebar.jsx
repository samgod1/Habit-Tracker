import { useState, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosHome, IoMdTrendingUp, IoIosArrowUp } from "react-icons/io";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Sidebar.css";
import { userContext } from "../../contexts/UserContext";

const pathMap = {
	"/habits": "home",
	"/progress": "progress",
};

const Sidebar = () => {
	const location = useLocation();

	const [isOpen, setIsOpen] = useState(false);
	const [canClickLogout, setCanClickLogout] = useState(false);

	const borderRef = useRef(null);
	const containerRef = useRef(null);

	const { user, loading, logout } = useContext(userContext);

	const navigate = useNavigate();

	async function handleLogout() {
		await logout();
		navigate("/");
	}

	useGSAP(() => {
		if (!loading) {
			const selectedLink = pathMap[location.pathname];

			//This is for setting the border according to the links height
			const activeLink = containerRef.current.querySelector(
				`[data-link = ${selectedLink}]`,
			);
			gsap.set(".border", {
				y: activeLink.offsetTop,
				height: activeLink.offsetHeight,
			});
		}
	}, [loading]);

	useGSAP(() => {
		if (!loading) {
			const selectedLink = pathMap[location.pathname];

			const activeLink = containerRef.current.querySelector(
				`[data-link = ${selectedLink}]`,
			);

			gsap.to(".border", {
				y: activeLink.offsetTop,
				height: activeLink.offsetHeight,
				duration: 0.3,
			});
		}
	}, [location.pathname]);

	useGSAP(() => {
		if (isOpen) {
			gsap.to(".logout-button", {
				opacity: 1,
				yPercent: -100,
				pointerEvents: "all",
				duration: 0.3,
				onComplete: () => {
					setCanClickLogout(true);
				},
			});
		} else {
			gsap.to(".logout-button", {
				opacity: 0,
				yPercent: 0,
				pointerEvents: "none",
				duration: 0.3,
				onComplete: () => {
					setCanClickLogout(false);
				},
			});
		}
	}, [isOpen]);

	if (loading) {
		return <div className="loading">Loading</div>;
	}

	console.log(user?.email);

	return (
		<aside>
			<span className="website-name">Habit Tracker</span>
			<div className="links-container" ref={containerRef}>
				{/* Div that will move up and down according to the selected link */}
				<div className="border" ref={borderRef}></div>

				<Link to="/habits" className="link" data-link="home">
					<IoIosHome size={25} />
					<span>Home</span>
				</Link>
				<Link to="/progress" className="link" data-link="progress">
					<IoMdTrendingUp size={25} />
					Progress
				</Link>
			</div>
			<div
				className="user-section"
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
			>
				<span className="email">{user?.email}</span>
				<IoIosArrowUp />
				<button
					onClick={handleLogout}
					className="logout-button"
					disabled={!canClickLogout}
				>
					Logout
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
