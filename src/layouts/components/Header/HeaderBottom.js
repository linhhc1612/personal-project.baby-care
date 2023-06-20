import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import configs from '~/configs';
import styles from './Header.module.scss';
import * as Icons from '~/components/Icons';
import ItemList, { Item } from '~/components/ItemList';

const cx = classNames.bind(styles);

function HeaderBottom() {
    return (
        <div className={cx('row justify-content-between px-web bg-menu')}>
            <div className={cx('col-lg-8')}>
                <div className={cx('navigation')}>
                    <button className={cx('btn-prev')}>
                        <Icons.PrevIcon />
                    </button>
                    <button className={cx('btn-next')}>
                        <Icons.NextIcon />
                    </button>
                    <div className={cx('nav-horizontal')}>
                        <ItemList>
                            <Item title="Trang chủ" to={configs.routes.homePage} />
                            <Item
                                title="Sản phẩm"
                                to={configs.routes.productPage}
                                icon={<Icons.DownIcon className={cx('ms-1 text-white')} />}
                                itemSmall={true}
                            />
                            <Item title="Tin tức" to={configs.routes.newsPage} />
                            <Item title="Sản phẩm yêu thích" to={configs.routes.favoritePage} />
                            <Item title="Liên hệ" to={configs.routes.contactPage} />
                            <Item title="Hệ thống cửa hàng" to={configs.routes.storePage} />
                            <Item title="Tủ đồ của bé" to={configs.routes.wardrobePage} />
                        </ItemList>
                    </div>
                </div>
            </div>

            <div className={cx('col-lg-4 text-end d-none d-lg-flex justify-content-end align-items-center')}>
                <div className={cx('d-flex align-items-center me-5', 'form-search')}>
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                    <Icons.SearchIcon className={cx('text-main', 'icon')} />
                </div>
                <Link
                    to={configs.routes.cartPage}
                    className={cx('d-flex justify-content-center align-items-center', 'cart-wrapper')}
                >
                    <Icons.CartIcon className={cx('text-main')} />
                    <span className={cx('bage')}>0</span>
                </Link>
            </div>
        </div>
    );
}

export default HeaderBottom;
