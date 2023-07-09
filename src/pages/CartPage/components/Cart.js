import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as request from '~/untils/httpRequest';
import styles from './CartRow.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart({ data, onClickPlus, onClickMinus, onChangeInput, onClickRemove }) {
    const [valueBuy, setValueBuy] = useState(data.qty_in_cart);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(data.price_product * valueBuy);
    }, [valueBuy]);

    const handleRemoveProduct = async () => {
        try {
            const response = await request.get(`/products/${data.id}`);

            response.status = 'normal';
            response.qty_in_cart = 0;

            await request.put(`/products/${data.id}`, response);
            onClickRemove(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* Desktop */}
            <div className={cx('d-lg-block d-none', 'cart-row')}>
                <div className={cx('cart-product')}>
                    <Link to={`/product-detail-page/${data.id}/${data.name_product}`} className={cx('cart-image')}>
                        <img src={data.image_product} alt={data.name_product} />
                    </Link>
                    <div className={cx('cart-info')}>
                        <div className={cx('cart-name')}>
                            <Link
                                to={`/product-detail-page/${data.id}/${data.name_product}`}
                                className={cx('cart-title')}
                            >
                                {data.name_product}
                            </Link>
                            <button className={cx('cart-remove-product')} onClick={handleRemoveProduct}>
                                Xóa
                            </button>
                        </div>
                        <div className={cx('grid')}>
                            <div className={cx('text-end')}>
                                <span className={cx('cart-price')}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        data.price_product,
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className={cx('grid')}>
                            <div className={cx('group-qty')}>
                                <button
                                    type="button"
                                    className={cx('btn-minus', 'cart-button')}
                                    onClick={() => {
                                        setValueBuy(valueBuy - 1 <= 0 ? 1 : valueBuy - 1);
                                        onClickMinus(
                                            data.price_product,
                                            data.id,
                                            valueBuy - 1 <= -1 ? 1 : valueBuy - 1,
                                        );
                                    }}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    name="qty"
                                    value={valueBuy}
                                    maxLength={3}
                                    pattern="[0-9]*"
                                    className={cx('qty-number')}
                                    onChange={(e) => {
                                        if (e.target.value <= 0) {
                                            setValueBuy(1);
                                            onChangeInput(
                                                data.price_product,
                                                data.id,
                                                e.target.value,
                                                data.qty_in_cart,
                                            );
                                        } else if (e.target.value > parseInt(data.quantity)) {
                                            setValueBuy(parseInt(data.quantity));
                                            onChangeInput(
                                                data.price_product,
                                                data.id,
                                                e.target.value,
                                                data.qty_in_cart,
                                            );
                                        } else {
                                            setValueBuy(e.target.value);
                                            onChangeInput(
                                                data.price_product,
                                                data.id,
                                                e.target.value,
                                                data.qty_in_cart,
                                            );
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className={cx('btn-plus', 'cart-button')}
                                    onClick={() => {
                                        setValueBuy(
                                            valueBuy + 1 > parseInt(data.quantity)
                                                ? parseInt(data.quantity)
                                                : valueBuy + 1,
                                        );
                                        onClickPlus(
                                            data.price_product,
                                            data.id,
                                            valueBuy + 1 > parseInt(data.quantity) + 1
                                                ? parseInt(data.quantity) + 1
                                                : valueBuy + 1,
                                        );
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={cx('grid')}>
                            <div className={cx('text-end')}>
                                <span className={cx('cart-price')}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        total,
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Tablet & Mobile */}
            <div className={cx('d-lg-none d-table', 'cart-product-mb')}>
                <Link to={`/product-detail-page/${data.id}/${data.name_product}`} className={cx('cart-image-mb')}>
                    <img src={data.image_product} alt={data.name_product} />
                </Link>

                <div className={cx('cart-info-mb')}>
                    <div className={cx('cart-name-mb')}>
                        <Link
                            to={`/product-detail-page/${data.id}/${data.name_product}`}
                            className={cx('cart-title-mb')}
                        >
                            {data.name_product}
                        </Link>
                    </div>
                    <div className={cx('grid-mb')}>
                        <div className={cx('cart-item-name')}>
                            <div className={cx('group-qty')}>
                                <button
                                    type="button"
                                    className={cx('btn-minus', 'cart-button')}
                                    onClick={() => {
                                        setValueBuy(valueBuy - 1 <= 0 ? 1 : valueBuy - 1);
                                        onClickMinus(
                                            data.price_product,
                                            data.id,
                                            valueBuy - 1 <= -1 ? 1 : valueBuy - 1,
                                        );
                                    }}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    name="qty"
                                    value={valueBuy}
                                    maxLength={3}
                                    pattern="[0-9]*"
                                    className={cx('qty-number')}
                                    onChange={(e) => {
                                        if (e.target.value <= 0) {
                                            setValueBuy(1);
                                            onChangeInput(
                                                data.price_product,
                                                data.id,
                                                e.target.value,
                                                data.qty_in_cart,
                                            );
                                        } else if (e.target.value > parseInt(data.quantity)) {
                                            setValueBuy(parseInt(data.quantity));
                                            onChangeInput(
                                                data.price_product,
                                                data.id,
                                                e.target.value,
                                                data.qty_in_cart,
                                            );
                                        } else {
                                            setValueBuy(e.target.value);
                                            onChangeInput(
                                                data.price_product,
                                                data.id,
                                                e.target.value,
                                                data.qty_in_cart,
                                            );
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className={cx('btn-plus', 'cart-button')}
                                    onClick={() => {
                                        setValueBuy(
                                            valueBuy + 1 > parseInt(data.quantity)
                                                ? parseInt(data.quantity)
                                                : valueBuy + 1,
                                        );
                                        onClickPlus(
                                            data.price_product,
                                            data.id,
                                            valueBuy + 1 > parseInt(data.quantity) + 1
                                                ? parseInt(data.quantity) + 1
                                                : valueBuy + 1,
                                        );
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={cx('text-end', 'cart-price-mb')}>
                            <span className={cx('cart-price')}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                            </span>
                            <button className={cx('cart-remove-product')}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Cart.propTypes = {
    data: PropTypes.object,
};

export default Cart;
