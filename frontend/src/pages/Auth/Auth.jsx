import { useContext, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import "./Auth.css";
import { userContext } from "../../contexts/UserContext";

const Auth = () => {
	const [authState, setAuthState] = useState("default");

	const signupFormRef = useRef(null);
	const loginFormRef = useRef(null);

	const { user, signup, login } = useContext(userContext);

	const navigate = useNavigate();

	//FUNCTIONS
	function handleClick(e) {
		if (e.target.id == "login-button") {
			if (authState == "login") {
				return;
			}
			setAuthState("login");
		} else {
			if (authState == "signup") {
				return;
			}
			setAuthState("signup");
		}
	}

	async function handleSignup(e) {
		try {
			e.preventDefault();
			const formData = new FormData(signupFormRef.current);
			const data = Object.fromEntries(formData.entries());
			await signup(data);
		} catch (e) {
			console.error(e.message);
		}
	}

	async function handleLogin(e) {
		try {
			e.preventDefault();
			const formData = new FormData(loginFormRef.current);
			const data = Object.fromEntries(formData.entries());
			await login(data);
			navigate("/habits");
			toast.success("Login successful");
		} catch (e) {
			console.error(e.message);
		}
	}

	//USE_EFFECT
	useEffect(() => {
		if (user) {
			navigate("/habits");
		}
	}, [user]);

	//USE_GSAP
	useGSAP(() => {
		//When state is login animate
		if (authState == "login") {
			gsap.to("#login-form", {
				xPercent: 0,
			});
			gsap.to("#signup-form", {
				xPercent: 100,
			});
			gsap.to("#slider", {
				xPercent: 0,
			});
		}

		//When state is signup animate
		if (authState == "signup") {
			gsap.to("#login-form", {
				xPercent: -100,
			});
			gsap.to("#signup-form", {
				xPercent: -100,
			});
			gsap.to("#slider", {
				xPercent: 100,
			});
		}
	}, [authState]);

	return (
		<main className="auth-page">
			<section className="left-side">
				<div className="wrapper">
					<div className="buttons-wrapper">
						<button id="login-button" onClick={handleClick}>
							Login
						</button>
						<button id="signup-button" onClick={handleClick}>
							Signup
						</button>
						<div id="slider"></div>
					</div>

					<div className="form-wrapper">
						{/* Signup form */}
						<form id="signup-form" ref={signupFormRef}>
							<h1>Welcome</h1>
							<p>“Build the life you want, one habit at a time.”</p>
							<input type="text" placeholder="Username" name="username" />
							<input type="email" placeholder="Email" name="email" />
							<input type="password" placeholder="Password" name="password" />
							<input
								type="password"
								placeholder="Confirm Password"
								name="confirmPassword"
							/>
							<button onClick={handleSignup}>Signup</button>
						</form>

						{/* Login form */}
						<form id="login-form" ref={loginFormRef}>
							<h1>Welcome back</h1>
							<p>“Build the life you want, one habit at a time.”</p>
							<input type="email" placeholder="Email" name="email" />
							<input type="password" placeholder="Password" name="password" />
							<button onClick={handleLogin}>Login</button>
						</form>
					</div>
				</div>
			</section>
			<section className="right-side">
				<div className="img">
					<img
						src="/images/girl-crossing-dates.png"
						alt="girl-crossing-dates"
					/>
				</div>
			</section>
		</main>
	);
};

export default Auth;
