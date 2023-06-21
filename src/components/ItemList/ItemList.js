import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ItemList.module.scss';

const cx = classNames.bind(styles);

function ItemList({ children, className }) {
    const classes = cx('item-big', className);

    return <div className={classes}>{children}</div>;
}

ItemList.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default ItemList;
