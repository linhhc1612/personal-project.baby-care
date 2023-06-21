import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './MenuCanvas.module.scss';

const cx = classNames.bind(styles);

function MenuItemSmall({ data }) {
    return (
        <>
            {data.map((result) => (
                <Link to={result.path} key={result.id} className={cx('item-small-children')}>
                    {result.title}
                </Link>
            ))}
        </>
    );
}

MenuItemSmall.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MenuItemSmall;
