import './index.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';


async function enableMocking() 
{
	if (process.env.NODE_ENV !== 'development')
	{
		return;
	}
	const { worker } = await import('./mocks/browser.ts');

	return worker.start();
}

enableMocking().then(() =>
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)

);

