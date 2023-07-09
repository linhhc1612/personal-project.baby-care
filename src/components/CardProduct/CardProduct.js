import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as request from '~/untils/httpRequest';
import styles from './CardProduct.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function CardProduct({ typeDefault = true, data }) {
    const handleAddToCart = async () => {
        try {
            const response = await request.get(`/products/${data.id}`);

            response.status = 'in-cart';
            if (response.qty_in_cart !== 0) {
                response.qty_in_cart += 1;
            } else {
                response.qty_in_cart = 1;
            }

            await request.put(`/products/${data.id}`, response);
            notify();
        } catch (error) {
            console.log(error);
        }
    };

    const emptyHandle = () => {
        return;
    };

    const notify = () =>
        toast.success('Thêm vào giỏ hàng thành công!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

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
                        <span className={cx('price')}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                data.price_product - (data.price_product * data.sale) / 100,
                            )}
                        </span>
                        <span className={cx('compare-price')}>
                            Giá gốc:{' '}
                            <span>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                    data.price_product,
                                )}
                            </span>
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
                    <Button
                        to={data.quantity >= 100 ? `` : `/product-detail-page/${data.id}/${data.name_product}`}
                        onClick={data.quantity >= 100 ? handleAddToCart : emptyHandle}
                        outline
                        rounded
                    >
                        {data.quantity >= 100 ? 'Cho vào giỏ' : 'Lựa chọn'}
                    </Button>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            </div>
        </>
    );
}

CardProduct.propTypes = {
    data: PropTypes.object,
    typeDefault: PropTypes.bool,
};

export default CardProduct;
