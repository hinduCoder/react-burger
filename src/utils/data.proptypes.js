import PropTypes from 'prop-types';

export default PropTypes.shape({
    _id: PropTypes.string.isRequired,
    localId: PropTypes.number,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    count: PropTypes.number
});
