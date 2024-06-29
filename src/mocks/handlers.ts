import { http,HttpResponse } from 'msw';

import EWeather from '../utils/enum/enum';
import { IWeather,IWorker } from '../utils/interfaces/IWeather';

let weather: IWeather[] =
	[
		{
			'id': 1000,
			'datetime': new Date().toString(),
			'temperature': 24,
			'weather': EWeather.SNOWY,
			'workerId': 1,
			'comment': 'Buy'
		},
		{
			'id': 1001,
			'datetime': new Date().toString(),
			'temperature': 20,
			'weather': EWeather.CLOUDY,
			'workerId': 2,
			'comment': 'Sell'
		},
		{
			'id': 1002,
			'datetime': new Date().toString(),
			'temperature': 22,
			'weather': EWeather.SUNNY,
			'workerId': 3,
			'comment': 'Hold'
		},
		{
			'id': 1003,
			'datetime': new Date().toString(),
			'temperature': 31,
			'weather': EWeather.WINDY,
			'workerId': 4,
			'comment': 'Buy'
		},
		{
			'id': 1004,
			'datetime': new Date().toString(),
			'temperature': 11,
			'weather': EWeather.WINDY,
			'workerId': 5,
			'comment': 'Sell'
		},
		{
			'id': 1005,
			'datetime': new Date().toString(),
			'temperature': 10,
			'weather': EWeather.WINDY,
			'workerId': 6,
			'comment': 'Hold'
		},
		{
			'id': 1006,
			'datetime': new Date().toString(),
			'temperature': -10,
			'weather': EWeather.SNOWY,
			'workerId': 7,
			'comment': 'Buy'
		},
		{
			'id': 1007,
			'datetime': new Date().toString(),
			'temperature': -15,
			'weather': EWeather.SNOWY,
			'workerId': 8,
			'comment': 'Sell'
		},
		{
			'id': 1008,
			'datetime': new Date().toString(),
			'temperature': -20,
			'weather': EWeather.SNOWY,
			'workerId': 9,
			'comment': 'Hold'
		},
		{
			'id': 1009,
			'datetime': new Date().toString(),
			'temperature': 0,
			'weather': EWeather.RAINY,
			'workerId': 10,
			'comment': 'Buy'
		}
	];


const workers =
	[
		{ 'id': 1,'name': 'John','surname': 'Doe' },
		{ 'id': 2,'name': 'Jane','surname': 'Smith' },
		{ 'id': 3,'name': 'Alice','surname': 'Johnson' },
		{ 'id': 4,'name': 'Bob','surname': 'Brown' },
		{ 'id': 5,'name': 'Charlie','surname': 'Davis' },
		{ 'id': 6,'name': 'Dana','surname': 'Wilson' },
		{ 'id': 7,'name': 'Evan','surname': 'Martin' },
		{ 'id': 8,'name': 'Fiona','surname': 'Clark' },
		{ 'id': 9,'name': 'George','surname': 'Lewis' },
		{ 'id': 10,'name': 'Hannah','surname': 'Walker' }
	];

type Params = { id: string; };
export const handlers = [
	http.get<never,never,IWeather[],'api/weather'>('api/weather',async () =>
	{
		const temp: IWeather[] = [];
		weather.forEach((elem) =>
		{
			const workerId = elem.workerId;
			let responsibility = undefined;
			if (workerId)
			{
				const worker = workers.find((worker) => worker.id === workerId);
				responsibility = worker;
			}
			temp.push({
				id: elem.id,
				datetime: elem.datetime,
				temperature: elem.temperature,
				weather: elem.weather,
				responsibility: responsibility,
				comment: elem.comment,
				workerId: elem.workerId
			});
		});
		return HttpResponse.json(temp);
	}),

	http.get<never,never,IWorker[],'api/workers'>('api/workers',async () =>
	{
		return HttpResponse.json(workers);
	}),

	http.post<never,IWeather,IWeather,'api/addWeather'>('api/addWeather',async ({ request }) =>
	{
		const id = weather.reduce((max,obj) =>
		{
			if (!obj.id)
				return max;
			return obj.id > max ? obj.id : max;
		},-Infinity);

		const temp = await request.json();
		temp.id = id + 1;
		weather.push(temp);
		return HttpResponse.json(temp);

	}),

	http.delete<Params,never,never,'api/weather/:id'>('api/weather/:id',async ({ params }) =>
	{
		const { id } = params;
		weather = weather.filter((elem) => elem?.id !== Number(id));
		return HttpResponse.json();
	}),
	http.put<Params,IWeather,IWeather,'api/weather/:id'>('api/weather/:id',async ({ params,request }) =>
	{
		const { id } = params;
		const temp = await request.json();
		const index = weather.findIndex((elem) => elem.id === Number(id));
		if (index > -1)
		{
			weather[index] = temp;
		}
		return HttpResponse.json(temp);
	})
];
