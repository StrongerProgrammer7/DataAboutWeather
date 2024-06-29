import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { weatherApi,workerApi } from '../service/WeatherService';
import combineReducer from './combineReducers';


const store = configureStore(
	{
		reducer: combineReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			serializableCheck: false
		}).concat(logger)
			.concat(weatherApi.middleware)
			.concat(workerApi.middleware)
	}
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
