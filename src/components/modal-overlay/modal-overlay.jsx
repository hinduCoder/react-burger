import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";
const ModalOverlay = ({ onClick, children }) => {
    const onOverlayClick = event => {
        if (event.target === event.currentTarget) {
            onClick?.()
        }
    }
    return (
        <div className={styles.overlay} onClick={onOverlayClick}>
            {children}
        </div>);
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func
}

export default ModalOverlay;