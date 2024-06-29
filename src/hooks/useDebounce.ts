
import { useEffect,useMemo,useRef } from 'react';

function debounce<Params extends unknown[]>(
	func: (...args: Params) => unknown,
	timeout: number
): (...args: Params) => void
{
	let timer: NodeJS.Timeout;
	return (...args: Params) =>
	{
		clearTimeout(timer);
		timer = setTimeout(() =>
		{
			func(...args);
		},timeout);
	};
}

const useDebounce = <T extends unknown[],S>(
	callback: (...args: T) => S,delay = 1000
) => 
{
	const ref = useRef(callback);
	useEffect(() =>
	{
		ref.current = callback;
	},[callback]);

	const debouncedCallback = useMemo(() =>
	{
		const func = (...arg: T) =>
		{
			return ref.current(...arg);
		};

		return debounce(func,delay);
	},[delay]);
	return debouncedCallback;
};

export default useDebounce;
