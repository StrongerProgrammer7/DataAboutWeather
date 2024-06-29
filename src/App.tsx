
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';

import Main from './pages/Main';
import store from './store/store';

function App()
{
	return (
		<Provider store={store}>
			<PrimeReactProvider>
				<Main />
			</PrimeReactProvider>
		</Provider>
	);
}

export default App;
