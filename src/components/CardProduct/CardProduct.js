import classNames from 'classnames/bind';

import styles from './CardProduct.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardProduct({ data }) {
    return (
        <>
            <div className={cx('item-product-main')}>
                <Link to={'/product-detail-page/' + `@tensp`} className={cx('image-thumb')}>
                    <span className={cx('label-sale')}>6%</span>
                    <img
                        width={199}
                        height={199}
                        src="https://bizweb.dktcdn.net/100/459/160/products/c57efdb033e91bbf4bc459b715a81972-jpeg.jpg?v=1657182141843"
                        alt=""
                    />
                </Link>

                <div className={cx('info-product')}>
                    <h3 className={cx('product-name')}>
                        <Link to="">Bồ đồ bé trai in hình xe cẩu</Link>
                    </h3>
                    <div className={cx('price-box')}>
                        <span className={cx('price')}>85.000₫</span>
                        <span className={cx('compare-price')}>
                            Giá gốc: <span>90.000₫</span>
                        </span>
                    </div>
                    <div className={cx('quantity-sale')}>
                        <div className={cx('title-count')}>
                            <b>300</b> sản phẩm đã bán
                        </div>
                        <div className={cx('bar-process')}>
                            <div className={cx('count-length-sale')} style={{ width: '90%' }}></div>
                        </div>
                    </div>
                </div>

                <div className={cx('action-card')}>
                    <button className={cx('btn-buy')}>Cho vào giỏ</button>
                </div>
            </div>
        </>
    );
}

export default CardProduct;
