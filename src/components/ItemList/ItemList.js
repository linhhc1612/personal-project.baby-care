import classNames from 'classnames/bind';

import styles from './ItemList.module.scss';

const cx = classNames.bind(styles);

function ItemList({ children }) {
    return <div className={cx('item-big')}>{children}</div>;
}

export default ItemList;
