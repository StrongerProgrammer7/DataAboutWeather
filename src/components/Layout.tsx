import { ProgressSpinner } from 'primereact/progressspinner';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () =>
{
	return (
		<Suspense fallback={<ProgressSpinner animationDuration='0.5s' />}>
			<Outlet />
		</Suspense>
	);
};

export default Layout;
