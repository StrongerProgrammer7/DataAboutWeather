import { TypeMethodFetch } from '../utils/enum/enum';


export async function request<T>(url: string,method = TypeMethodFetch.GET,body = {}): Promise<T | undefined>
{
	try 
	{
		const result = await fetch(url,
			{
				method: method,
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers:
				{
					'Accept': 'application/json'
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(body)
			}
		);
		const text = await result.text();
		if (text)
			return JSON.parse(text) as T;
		else
			return {} as T;

	}
	catch (error) 
	{
		console.log(error);
		throw error;
	}
}
