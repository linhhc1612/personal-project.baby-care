import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ItemList.module.scss';

const cx = classNames.bind(styles);

function ItemSmall({ data }) {
    return (
        <Link to={data.path} className={cx('nav-link-small')}>
            {data.title}
        </Link>
    );
}

ItemSmall.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ItemSmall;
