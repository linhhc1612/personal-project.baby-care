import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import * as request from '~/untils/httpRequest';
import styles from './CartPage.module.scss';
import configs from '~/configs';
import CartEmptyMessage from './components/CartEmptyMessage';
import Cart from './components/Cart';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CartPage() {
    const [arrProduct, setArrProduct] = useState([]);
    const [showBill, setShowBill] = useState(false);
    const [ckClickRemove, setCkClickRemove] = useState(false);

    const param = useParams();

    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        // API Product
        const fetchApiProduct = async () => {
            try {
                const response = await request.get('/products');
                const arrInCart = [];

                response.map((product) => {
                    if (product.status === 'in-cart') arrInCart.push(product);
                });

                let newTotalAll = 0;

                arrInCart.forEach((data) => {
                    newTotalAll += data.price_product * data.qty_in_cart;
                });

                setArrProduct(response);
                setTotalValue(newTotalAll);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiProduct();
    }, [ckClickRemove]);

    const handlePlusTotal = async (price, id, qty) => {
        let newObj = {};

        arrProduct.map((data) => {
            if (qty >= parseInt(data.quantity) + 1) {
                setTotalValue(totalValue);
            } else {
                setTotalValue(totalValue + price);
            }
            if (data.id === id) {
                data.qty_in_cart = qty > parseInt(data.quantity) ? parseInt(data.quantity) : qty;
                newObj = data;
            }
        });

        await request.put(`/products/${id}`, newObj);
    };

    const handleMinusTotal = async (price, id, qty) => {
        let newObj = {};
        if (qty <= 0) {
            setTotalValue(totalValue);
        } else {
            setTotalValue(totalValue - price);
        }

        arrProduct.map((data) => {
            if (data.id === id) {
                data.qty_in_cart = qty === 0 ? 1 : qty;
                newObj = data;
            }
        });

        await request.put(`/products/${id}`, newObj);
    };

    const handleCheckTotal = async (price, id, newQty, oldQty) => {
        let newObj = {};
        setTotalValue(price * newQty + totalValue - price * oldQty);

        arrProduct.map((data) => {
            if (data.id === id) {
                data.qty_in_cart = newQty;
                newObj = data;
            }
        });

        await request.put(`/products/${id}`, newObj);
    };

    const handleClickRomove = () => {
        setCkClickRemove(!ckClickRemove);
    };

    return (
        <>
            <Breadcrumb className={cx('row container-app')}>
                <Breadcrumb.Item href={configs.routes.homePage}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>{param.value}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <h2 className={cx('title-module')}>{param.value}</h2>

                <div
                    className={cx(
                        totalValue !== 0 ? 'col-lg-9' : 'col-lg-12',
                        'col-12 order-lg-1 order-2',
                        'cart-left',
                    )}
                >
                    <div className={cx('d-lg-block d-none', 'cart-page')}>
                        {totalValue === 0 && <CartEmptyMessage />}

                        {totalValue !== 0 && (
                            <div className={cx('cart-product')}>
                                <div className={cx('cart-header')}>
                                    <div>Thông tin sản phẩm</div>
                                    <div>Đơn giá</div>
                                    <div>Số lượng</div>
                                    <div>Thành tiền</div>
                                </div>
                                <div className={cx('cart-body')}>
                                    {arrProduct.map(
                                        (result) =>
                                            result.status === 'in-cart' && (
                                                <Cart
                                                    key={result.id}
                                                    data={result}
                                                    onClickPlus={handlePlusTotal}
                                                    onClickMinus={handleMinusTotal}
                                                    onChangeInput={handleCheckTotal}
                                                    onClickRemove={handleClickRomove}
                                                />
                                            ),
                                    )}
                                </div>
                                <div className={cx('cart-footer')}>
                                    <div className={cx('row')}>
                                        <div className={cx('col-lg-4 col-12 offset-lg-8', 'total')}>
                                            <div className={cx('cart-subtotal')}>
                                                <div className={cx('title')}>Tổng tiền:</div>
                                                <div className={cx('text-end', 'subtotal')}>
                                                    <span className={cx('fw-bold')}>
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(totalValue)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('cart-btn-buy')}>
                                                <Button primary rounded>
                                                    Thanh toán
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('d-lg-none d-block', 'cart-mobile')}>
                        {totalValue === 0 && <CartEmptyMessage />}

                        {totalValue !== 0 && (
                            <div className={cx('cart-product')}>
                                <div className={cx('cart-body')}>
                                    {arrProduct.map(
                                        (result) =>
                                            result.status === 'in-cart' && (
                                                <Cart
                                                    key={result.id}
                                                    data={result}
                                                    onClickPlus={handlePlusTotal}
                                                    onClickMinus={handleMinusTotal}
                                                    onChangeInput={handleCheckTotal}
                                                />
                                            ),
                                    )}
                                </div>
                                <div className={cx('cart-footer')}>
                                    <div className={cx('cart-subtotal')}>
                                        <div className={cx('title')}>Tổng tiền:</div>
                                        <div className={cx('text-end', 'subtotal')}>
                                            <span className={cx('fw-bold')}>
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(totalValue)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('cart-btn-buy')}>
                                        <Button primary rounded>
                                            Thanh toán
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {totalValue !== 0 && (
                    <div className={cx('col-lg-3 col-12 order-lg-2 order-1', 'cart-right')}>
                        <div className={cx('formVAT')}>
                            <h4>Thời gian giao hàng</h4>
                            <div className={cx('time-deli')}>
                                <div className={cx('date-pick')}>
                                    <input type="date" />
                                </div>
                                <div className={cx('date-time')}>
                                    <select className={cx('time-deli-cta')}>
                                        <option defaultValue>Chọn thời gian</option>
                                        <option value="08h00 - 12h00">08h00 - 12h00</option>
                                        <option value="14h00 - 18h00">14h00 - 18h00</option>
                                        <option value="19h00 - 21h00">19h00 - 21h00</option>
                                    </select>
                                </div>
                            </div>
                            <div className={cx('r-bill')}>
                                <div className={cx('checkbox')}>
                                    <input type="checkbox" id="check-bill" onClick={() => setShowBill(!showBill)} />
                                    <label className="title" htmlFor="check-bill">
                                        Xuất hóa đơn công ty
                                    </label>
                                </div>
                                <div className={cx(showBill ? 'd-block' : 'd-none', 'bill-field')}>
                                    <div className={cx('form-group')}>
                                        <label>Tên công ty</label>
                                        <input type="text" className={cx('form-control')} placeholder="Tên công ty" />
                                    </div>
                                    <div className={cx('form-group')}>
                                        <label>Mã số thuế</label>
                                        <input type="number" className={cx('form-control')} placeholder="Mã số thuế" />
                                    </div>
                                    <div className={cx('form-group')}>
                                        <label>Địa chỉ công ty</label>
                                        <textarea
                                            className={cx('form-control')}
                                            placeholder="Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
                                        ></textarea>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <label>Email nhận hoá đơn</label>
                                        <input
                                            type="text"
                                            className={cx('form-control')}
                                            placeholder="Email nhận hoá đơn"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPage;
