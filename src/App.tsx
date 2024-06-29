
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';

import store from './store/store';

import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

function App()
{
	return (
		<Provider store={store}>
			<PrimeReactProvider>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</PrimeReactProvider>
		</Provider>
	);
}

export default App;
