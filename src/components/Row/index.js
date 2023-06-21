import PropTypes from 'prop-types';

function Row({ children }) {
    return (
        <div className={'container-app'}>
            <div className={'row'}>{children}</div>
        </div>
    );
}

Row.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Row;
