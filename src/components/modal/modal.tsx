import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement, useEffect } from 'react';

const modalElement = document.getElementById('modal')!;

type ModalProps = {
    header?: string;
    onClose: () => void;
    children: ReactElement;
};
const Modal: FC<ModalProps> = ({ header, onClose, children }) => {
    useEffect(() => {
        const close = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keyup', close);
        return () => document.removeEventListener('keyup', close);
    }, [onClose]);
    return createPortal(
        <ModalOverlay onClick={onClose}>
            <section className={`${styles.modal} pt-10 pl-10 pr-10 pb-15`}>
                <header className={styles.header}>
                    <h1 className="text text_type_main-large">{header}</h1>
                    <CloseIcon
                        type="primary"
                        className={styles.close}
                        onClick={onClose}
                    />
                </header>

                <section>{children}</section>
            </section>
        </ModalOverlay>,
        modalElement
    );
};

export default Modal;
