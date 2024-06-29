import { ProgressSpinner } from 'primereact/progressspinner';

import { TableWeatherData } from '../components/Table/';
import { weatherApi } from '../service/WeatherService';
import scss from './main.module.scss';


const Main = () => 
{
	const weatherData = weatherApi.useGetAllWeatherQuery('');

	return (
		<div className={scss.main}>
			{
				weatherData.data && !weatherData.isLoading &&
				<TableWeatherData
					data={weatherData.data}
				/>
			}
			{
				weatherData.isLoading &&
				<div className={scss.wrapper_spinner}>
					<ProgressSpinner animationDuration='0.5s' />
				</div>
			}
		</div>
	);
};

export default Main;
