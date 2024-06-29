import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';

import useDebounce from '../../../hooks/useDebounce';

interface ITextArea
{
	label?: string;
	defaultValue: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

}
const TextArea: React.FC<ITextArea> = ({ label,defaultValue,placeholder,onChange }) =>
{
	const debounce = useDebounce(onChange,500);
	return (
		<>
			{
				label &&
				<label htmlFor="textarea" className="font-bold block mb-2">{label}</label>
			}
			<InputTextarea
				id='textarea'
				placeholder={placeholder}
				defaultValue={defaultValue}
				onChange={debounce}
				rows={5}
				cols={30}
				style={{ width: '100%' }}
				required />
		</>
	);
};

export default TextArea;
