import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ItemList.module.scss';

const cx = classNames.bind(styles);

function ItemSmall({ data, checkKey }) {
    return (
        <Link
            to={checkKey === 'product-page' ? '/product-page/' + data.key : '/wardrobe-page/' + data.key}
            className={cx('nav-link-small')}
        >
            {data.title}
        </Link>
    );
}

ItemSmall.propTypes = {
    data: PropTypes.object.isRequired,
    checkKey: PropTypes.string.isRequired,
};

export default ItemSmall;
