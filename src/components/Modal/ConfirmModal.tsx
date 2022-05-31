import React, {FC} from 'react';

interface ConfirmModalProps {
    title: string,
    yesButtonHandler: () => void,
    noButtonHandler: () => void,
    setModalOpen: (value: boolean) => void
}

const ConfirmModal: FC<ConfirmModalProps> = ({title, yesButtonHandler, setModalOpen, noButtonHandler}) => {
    const buttonsHandler = (handler: () => void) => {
        handler()
        setModalOpen(false)
    }

    return (
        <div className='confirm-modal'>
            <h4 className='confirm-modal__title'>{title}</h4>
            <button className="modal-btn" onClick={() => buttonsHandler(yesButtonHandler)}>Да</button>
            <button className="modal-btn" onClick={noButtonHandler}>Нет</button>
        </div>
    );
};

export default ConfirmModal;