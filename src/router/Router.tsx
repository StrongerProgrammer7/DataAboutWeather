import { lazy } from "react";
import { Navigate } from "react-router-dom";


const Main = lazy(() => import("../pages/Main"));


interface IRouterItem
{
	key: string;
	path: string;
	index?: boolean;
	component: JSX.Element | null;
}

export const routes: IRouterItem[] =
	[
		{ key: "0x7",path: "/",index: true,component: <Main /> },
		{ key: "0x8",path: "*",component: <Navigate to="/" replace={true} /> },
	];
