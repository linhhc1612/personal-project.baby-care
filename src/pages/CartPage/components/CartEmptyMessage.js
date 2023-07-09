import classNames from 'classnames/bind';

import * as Icons from '~/components/Icons';
import styles from '~/pages/CartPage/CartPage.module.scss';

const cx = classNames.bind(styles);

function CartEmptyMessage() {
    return (
        <div className={cx('text-center', 'cart-empty-message')}>
            <Icons.CartIcon width="8rem" height="8rem" />
            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
        </div>
    );
}

export default CartEmptyMessage;
