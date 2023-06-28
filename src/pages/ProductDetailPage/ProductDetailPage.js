/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-concat */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Breadcrumb } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';

import * as request from '~/untils/httpRequest';
import * as Icons from '~/components/Icons';
import configs from '~/configs';
import styles from './ProductDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import Service from '~/components/Service';

const cx = classNames.bind(styles);

function ProductDetailPage() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [albumProduct, setAlbumProduct] = useState([]);
    const [objProduct, setObjProduct] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});
    const [valueBuy, setValueBuy] = useState(1);
    const [arrService, setArrService] = useState([]);

    const param = useParams();
    const timerComponents = [];
    const [formatPrice, setFormatPrice] = useState();
    const [formatPriceSale, setFormatPriceSale] = useState();

    useEffect(() => {
        // API Product
        const fetchApiProduct = async () => {
            try {
                const response = await request.get('db/data-product.json');
                const newAlbum = [];

                response.data.forEach((data) => {
                    if (data.id === param.id) {
                        newAlbum.push(data);
                        newAlbum.forEach((data) => setAlbumProduct(data.album));

                        const formatPri = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            data.price_product,
                        );
                        const formatPriSale = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(data.price_product - (data.price_product * data.sale) / 100);

                        setFormatPrice(formatPri);
                        setFormatPriceSale(formatPriSale);
                        return setObjProduct(data);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchApiProduct();

        // API Service
        const fetchApiService = async () => {
            try {
                const response = await request.get('db/data-service.json');

                setArrService(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiService();
    }, []);

    Object.keys(timeLeft).forEach((interval, index) => {
        const index2 = index + 999;

        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={index} className={cx('time-in-day')}>
                {timeLeft[interval]}
            </span>,
            <span key={index2} className={cx('dot')}>
                :
            </span>,
        );
    });

    // Count down
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`10/01/${year}`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        if (timeLeft.hours < 10) {
            timeLeft.hours = '0' + timeLeft.hours;
        }

        if (timeLeft.minutes < 10) {
            timeLeft.minutes = '0' + timeLeft.minutes;
        }

        if (timeLeft.seconds < 10) {
            timeLeft.seconds = '0' + timeLeft.seconds;
        }
        return timeLeft;
    };

    return (
        <>
            <Breadcrumb className={cx('row container-app')}>
                <Breadcrumb.Item href={configs.routes.homePage}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href={'/product-page/' + `@outstanding/Sản phẩm nổi bật`}>
                    Sản phẩm nổi bật
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{param.name}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <div className={cx('col-lg-4 col-md-12 col-12 mb-3', 'detail-image')}>
                    <Swiper
                        style={{
                            height: 'auto',
                            margin: '0 0 20px 0',
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {albumProduct.map((result, index) => (
                            <SwiperSlide key={index} className={cx('text-center')}>
                                <img src={result.image_large} alt={result.image_large} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        navigation={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {albumProduct.map((result, index) => (
                            <SwiperSlide key={index}>
                                <img src={result.image_small} alt={result.image_small} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={cx('col-lg-8 col-md-12 col-12', 'detail-info')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-7 col-md-7 col-12 mb-3')}>
                            <h1 className={cx('title-product')}>{objProduct.name_product}</h1>
                            <div className={cx('flex-vd')}>
                                <div className={cx('vendor')}>
                                    <span>Thương hiệu:</span>
                                    {objProduct.trade_mark}
                                </div>
                                <div className={cx('sku-product')}>
                                    Mã sản phẩm:
                                    <strong className={cx('ms-2')}>{objProduct.id}</strong>
                                </div>
                            </div>
                            <div className={cx('group-action-button')}>
                                <div className={cx('flash-detail')}>
                                    <div className={cx('timer')}>
                                        <p>
                                            NHANH TAY CHỈ CÒN <br />
                                            <span>Mua ngay kẻo lỡ</span>
                                        </p>
                                        <div className={cx('count-down')}>
                                            {timerComponents.length ? timerComponents : <span>Count Down!</span>}
                                        </div>
                                    </div>
                                    <div className={cx('quantity-sale')}>
                                        <div className={cx('title-count')}>
                                            <b>{objProduct.sold}</b> sản phẩm đã bán
                                        </div>
                                        <div className={cx('bar-process')}>
                                            <div
                                                className={cx('count-length-sale')}
                                                style={{ width: `${objProduct.length_sale}` + '%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('group-power')}>
                                    <div className={cx('price-box')}>
                                        <span className={cx('special-price')}>
                                            {formatPriceSale ? formatPriceSale : 'Đang cập nhật'}
                                        </span>
                                        <span className={cx('old-price')}>
                                            Giá cũ:{' '}
                                            <del className={cx('price')}>
                                                {formatPrice ? formatPrice : 'Đang cập nhật'}
                                            </del>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('form-product')}>
                                    <div className={cx('custom-btn')}>
                                        <div className={cx('content')}>
                                            <button
                                                className={cx('btn-minus')}
                                                onClick={() => setValueBuy(valueBuy - 1 <= 0 ? 1 : valueBuy - 1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className={cx('qty')}
                                                value={valueBuy}
                                                maxLength={3}
                                                onChange={(e) => setValueBuy(e.target.value <= 0 ? 1 : e.target.value)}
                                            />
                                            <button
                                                className={cx('btn-plus')}
                                                onClick={() =>
                                                    setValueBuy(
                                                        valueBuy + 1 > parseInt(objProduct.quantity)
                                                            ? parseInt(objProduct.quantity)
                                                            : valueBuy + 1,
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('btn-mua')}>
                                        <button type="submit" className={cx('add-to-cart')}>
                                            <span>
                                                <Icons.CartIcon2 className={cx('text-main')} />
                                            </span>
                                            Cho vào giỏ
                                        </button>
                                        <button type="button" className={cx('buy-now')}>
                                            Mua ngay<em>Thanh toán online hoặc ship COD</em>
                                        </button>
                                    </div>
                                </div>
                                <ul className={cx('social-media')}>
                                    <li>Chia sẻ ngay: </li>
                                    <li className={cx('social-media-item')}>
                                        <a href="#">
                                            <Icons.FacebookIcon />
                                            Chia sẻ
                                        </a>
                                    </li>
                                    <li className={cx('social-media-item')}>
                                        <a href="#">
                                            <Icons.YoutubeIcon />
                                            Chia sẻ
                                        </a>
                                    </li>
                                    <li className={cx('social-media-item')}>
                                        <a href="#">
                                            <Icons.InstagramIcon />
                                            Chia sẻ
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('col-lg-5 col-md-5 col-12 mb-3')}>
                            <div className={cx('service')}>
                                <h2>Dịch vụ khách hàng</h2>

                                <div className={cx('wrapper')}>
                                    {arrService.map((result) => (
                                        <Service key={result.id} data={result} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailPage;
