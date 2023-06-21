import PropTypes from 'prop-types';

function MenuCanvas({ children }) {
    return <>{children}</>;
}

MenuCanvas.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuCanvas;
