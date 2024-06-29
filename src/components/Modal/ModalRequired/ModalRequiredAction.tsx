import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FC,memo } from 'react';
import ReactDOM from 'react-dom';

import scss from './modalrequired.module.scss';

interface IModal<TApplyParams = unknown,TCancelPArams = unknown>
{
	isVisible: boolean;
	approveAction: (...args: TApplyParams[]) => void;
	cancelAction: (...args: TCancelPArams[]) => void;
}
const ModalRequiredAction: FC<IModal> = ({ isVisible,approveAction,cancelAction }) =>
{

	return ReactDOM.createPortal(
		<Dialog visible={isVisible}
			className={scss.modal}
			headerClassName={scss.modal__header}
			onHide={() => 
			{
				return;
			}}>
			<p className={scss.modal_title}> Are you sure?</p>
			<div className={scss.btn_wrapper}>
				<Button
					className={`${scss.btn} ${scss.btn_save}`}
					label="Sure"
					icon="pi pi-check"
					onClick={approveAction}
					autoFocus />
				<Button
					className={`${scss.btn} ${scss.btn_close} p-button-text`}
					label="Cancel"
					icon="pi pi-times"
					onClick={cancelAction} />
			</div>
		</Dialog>
		,document.getElementById('portal')!
	);
};

const MemoizedModalRequiredAction = memo(ModalRequiredAction);
export default MemoizedModalRequiredAction;
