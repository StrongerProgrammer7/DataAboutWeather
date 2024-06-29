import { Route,Routes } from "react-router-dom";

import { routes } from "../router/Router";
import Layout from "./Layout";


const AppRouter = () =>
{
	return (
		<Routes>
			<Route element={<Layout />}>
				{
					routes.map((route) =>
					{
						return (
							<Route key={route.key} path={route.path} index={route?.index ?? false} element={route.component} />
						);
					})
				}
			</Route>
		</Routes>
	);
};

export default AppRouter;
