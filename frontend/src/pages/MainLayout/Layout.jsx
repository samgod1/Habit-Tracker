import { Outlet } from "react-router-dom";

import "./Layout.css";
import { Sidebar } from "../../components/index.js";

const Layout = () => {
	return (
		<>
			<div className="layout">
				<Sidebar />
				<div className="layout-content">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Layout;
