import React, {FC} from 'react';
import './Modal.scss'

interface ModalProps {
    children: React.ReactNode,
    title: string,
    setModalOpen: (value: boolean) => void,
    isModalOpen: boolean
}

const Modal:FC<ModalProps> = ({children, title, setModalOpen, isModalOpen}) => {
    return (
        <div className={"modal" + (isModalOpen ? ' active' : '')} onClick={() => setModalOpen(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal__title">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;