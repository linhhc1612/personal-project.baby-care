import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MenuCanvas.module.scss';

const cx = classNames.bind(styles);

function MenuItemSmall({ data, checkKey }) {
    return (
        <>
            {data.map((result) => (
                <Link
                    to={
                        checkKey === 'product-page'
                            ? '/product-page/' + result.key + '/' + result.title
                            : '/wardrobe-page/' + result.key + '/' + result.title
                    }
                    key={result.id}
                    className={cx('item-small-children')}
                >
                    {result.title}
                </Link>
            ))}
        </>
    );
}

MenuItemSmall.propTypes = {
    data: PropTypes.array.isRequired,
    checkKey: PropTypes.string.isRequired,
};

export default MenuItemSmall;
