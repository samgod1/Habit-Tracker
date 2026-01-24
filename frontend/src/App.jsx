import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Home, Auth, Layout, Habits, Progress } from "./pages/index.js";
import { PageTransition } from "./components/index.js";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <PageTransition />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/auth",
					element: <Auth />,
				},
				{
					element: <Layout />,
					children: [
						{
							path: "/habits",
							element: <Habits />,
						},
						{
							path: "/progress",
							element: <Progress />,
						},
					],
				},
			],
		},
	]);

	return (
		<>
			<Toaster
				position="bottom-right"
				style={{ background: "#333", color: "#fff" }}
			/>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
