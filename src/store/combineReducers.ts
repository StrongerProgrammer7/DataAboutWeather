import { weatherApi,workerApi } from '../service/WeatherService';


const combineReducer = {
	[weatherApi.reducerPath]: weatherApi.reducer,
	[workerApi.reducerPath]: workerApi.reducer
};

export default combineReducer;
