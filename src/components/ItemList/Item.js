import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './ItemList.module.scss';
import ItemSmall from './ItemSmall';
import configs from '~/configs';

const cx = classNames.bind(styles);

function Item({ to, title, icon, itemSmall = false }) {
    return (
        <>
            {itemSmall ? (
                <button className={cx('nav-item')}>
                    <span className={cx('nav-link')}>{title}</span>
                    {icon}
                    <div className={cx('item-small')}>
                        <ItemSmall to={configs.routes.productPage + `@outstanding`} title="Sản phẩm nổi bật" />
                        <ItemSmall to={configs.routes.productPage + `@promotion`} title="Sản phẩm khuyến mãi" />
                        <ItemSmall to={configs.routes.productPage + `@hand-bag`} title="Túi xách" />
                        <ItemSmall to={configs.routes.productPage + `@hat`} title="Mũ, nón" />
                    </div>
                </button>
            ) : (
                <NavLink to={to} className={(nav) => cx('nav-item', { active: nav.isActive })}>
                    <span className={cx('nav-link')}>{title}</span>
                </NavLink>
            )}
        </>
    );
}

export default Item;
