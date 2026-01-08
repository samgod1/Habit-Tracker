import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHome, IoMdTrendingUp, IoIosArrowUp } from "react-icons/io";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Sidebar.css";
import { userContext } from "../../contexts/UserContext";
import { all } from "axios";

const Sidebar = () => {
	const [selectedLink, setSelectedLink] = useState("home");
	const [isOpen, setIsOpen] = useState(false);
	const [canClickLogout, setCanClickLogout] = useState(false);

	const borderRef = useRef(null);
	const containerRef = useRef(null);

	const { logout } = useContext(userContext);

	const navigate = useNavigate();

	async function handleLogout() {
		await logout();
		navigate("/");
	}

	useGSAP(() => {
		//This is for setting the border accroding to the links height
		const activeLink = containerRef.current.querySelector(
			`[data-link = ${selectedLink}]`
		);
		gsap.set(".border", {
			height: activeLink.offsetHeight,
		});
	}, []);

	useGSAP(() => {
		const activeLink = containerRef.current.querySelector(
			`[data-link = ${selectedLink}]`
		);

		gsap.to(".border", {
			y: activeLink.offsetTop,
			height: activeLink.offsetHeight,
			duration: 0.3,
		});
	}, [selectedLink]);

	useGSAP(() => {
		if (isOpen) {
			gsap.to(".logout-button", {
				opacity: 1,
				yPercent: -100,
				pointerEvents: "all",
				onComplete: () => {
					setCanClickLogout(true);
				},
			});
		} else {
			gsap.to(".logout-button", {
				opacity: 0,
				yPercent: 0,
				pointerEvents: "none",
				onComplete: () => {
					setCanClickLogout(false);
				},
			});
		}
	}, [isOpen]);

	return (
		<aside>
			<span className="website-name">Habit Tracker</span>
			<div className="links-container" ref={containerRef}>
				{/* Div that will move up and down according to the selected link */}
				<div className="border" ref={borderRef}></div>

				<Link
					to="/habits"
					className="link"
					data-link="home"
					onClick={() => {
						setSelectedLink("home");
					}}
				>
					<IoIosHome size={25} />
					<span>Home</span>
				</Link>
				<Link
					to="/progress"
					className="link"
					data-link="progress"
					onClick={() => {
						setSelectedLink("progress");
					}}
				>
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
				<span className="email">useremail@gmail.com</span>
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
