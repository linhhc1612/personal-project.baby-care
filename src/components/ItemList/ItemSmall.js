import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemList.module.scss';

const cx = classNames.bind(styles);

function ItemSmall({ to, title }) {
    return (
        <Link to={to} className={cx('nav-link-small')}>
            {title}
        </Link>
    );
}

export default ItemSmall;
