import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import gsap from "gsap";

import "./Layout.css";
import { Sidebar } from "../../components/index.js";

export const SidebarContext = createContext();

const Layout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	function openSidebar() {
		const sidebar = document.querySelector("aside");
		sidebar.classList.add("open");
		const overlay = document.querySelector(".overlay");
		overlay.style.display = "block";
		setIsSidebarOpen(true);
	}

	function closeSidebar() {
		const sidebar = document.querySelector("aside");
		sidebar.classList.remove("open");
		const overlay = document.querySelector(".overlay");
		overlay.style.display = "none";
		setIsSidebarOpen(false);
	}

	return (
		<>
			<SidebarContext.Provider
				value={{ openSidebar, closeSidebar, isSidebarOpen }}
			>
				<div className="layout">
					<div className="overlay" onClick={closeSidebar}></div>
					<Sidebar />
					<div className="layout-content">
						<Outlet />
					</div>
				</div>
			</SidebarContext.Provider>
		</>
	);
};

export default Layout;
