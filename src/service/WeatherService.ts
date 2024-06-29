import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../utils/const';
import { IWeather,IWorker } from '../utils/interfaces/IWeather';

export const weatherApi = createApi(
	{
		reducerPath: 'weatherApi',
		baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
		endpoints: (builder) => (
			{
				getAllWeather: builder.query<IWeather[],string>({
					query: () => (
						{
							url: '/weather'
						}
					),
					extraOptions: { maxRetries: 20 }

				})
			})
	});


export const workerApi = createApi(
	{
		reducerPath: 'workerApi',
		baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
		endpoints: (builder) => (
			{
				getAllWorkers: builder.query<IWorker[],string>({

					query: () => (
						{
							url: '/workers'
						}
					),
					extraOptions: { maxRetries: 20 }

				})
			}
		)
	});
