import { FC } from 'react';

import scss from './pulsarbtn.module.scss';

interface IPulsarBtn
{
	title: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const PulsarBtn: FC<IPulsarBtn> = ({ title,onClick }) => 
{
	return (
		<div className={scss.btn_container}>
			<button
				data-testid={`cypress-pulsar-btn-${title}`}
				className={scss.btn}
				onClick={onClick}>{title}
			</button>
		</div>
	);
};

export default PulsarBtn;
