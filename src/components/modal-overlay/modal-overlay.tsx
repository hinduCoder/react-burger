import { FC, MouseEvent, ReactElement } from 'react';
import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
    onClick: () => void;
    children: ReactElement;
};
const ModalOverlay: FC<ModalOverlayProps> = ({ onClick, children }) => {
    const onOverlayClick = (event: MouseEvent<HTMLElement>) => {
        if (event.target === event.currentTarget) {
            onClick?.();
        }
    };
    return (
        <div className={styles.overlay} onClick={onOverlayClick}>
            {children}
        </div>
    );
};

export default ModalOverlay;
