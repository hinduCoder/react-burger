import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';

const modalElement = document.getElementById('modal');
const Modal = ({ header, onClose, children }) => {
    useEffect(() => {
        const close = event => {
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

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func
};

export default Modal;
