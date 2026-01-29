import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { HabitProvider } from "./contexts/HabitContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<UserProvider>
			<HabitProvider>
				<App />
			</HabitProvider>
		</UserProvider>
	</StrictMode>,
);
