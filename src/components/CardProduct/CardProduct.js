import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './CardProduct.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CardProduct({ typeDefault = true, data, checkData }) {
    const renderPrice = data.price_product;
    const [formatPrice, setFormatPrice] = useState(renderPrice);
    const [formatPriceSale, setFormatPriceSale] = useState(renderPrice - (renderPrice * data.sale) / 100);

    useEffect(() => {
        const format = () => {
            const formatPri = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                formatPrice,
            );
            const formatPriSale = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                formatPriceSale,
            );

            setFormatPrice(formatPri);
            setFormatPriceSale(formatPriSale);
        };

        format();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={cx('item-product-main')}>
                <Link to={'/product-detail-page/' + `${data.id}/${data.name_product}`} className={cx('image-thumb')}>
                    <span className={cx('label-sale')}>{data.sale}%</span>
                    <img width={199} height={199} src={data.image_product} alt={data.name_product} />
                </Link>

                <div className={cx('info-product', typeDefault ? '' : 'flash')}>
                    <h3 className={cx('product-name')}>
                        <Link to={'/product-detail-page/' + `${data.id}/${data.name_product}`}>
                            {data.name_product}
                        </Link>
                    </h3>
                    <div className={cx('price-box')}>
                        <span className={cx('price')}>{formatPriceSale}</span>
                        <span className={cx('compare-price')}>
                            Giá gốc: <span>{formatPrice}</span>
                        </span>
                    </div>
                    {!typeDefault && (
                        <div className={cx('quantity-sale')}>
                            <div className={cx('title-count')}>
                                <b>{data.sold}</b> sản phẩm đã bán
                            </div>
                            <div className={cx('bar-process')}>
                                <div
                                    className={cx('count-length-sale')}
                                    style={{ width: `${data.length_sale}` + '%' }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={cx('action-card', typeDefault ? '' : 'flash')}>
                    <Button outline rounded>
                        {data.quantity >= 100 ? 'Cho vào giỏ' : 'Lựa chọn'}
                    </Button>
                </div>
            </div>
        </>
    );
}

CardProduct.propTypes = {
    data: PropTypes.object,
    typeDefault: PropTypes.bool,
    checkData: PropTypes.string,
};

export default CardProduct;
