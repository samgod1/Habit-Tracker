import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Auth } from "./pages/index.js";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/auth",
			element: <Auth />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
