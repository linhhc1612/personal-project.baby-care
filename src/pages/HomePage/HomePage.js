/* eslint-disable array-callback-return */
/* eslint-disable no-useless-concat */
import 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as request from '~/untils/httpRequest';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/css/grid';

import { Navigation, Grid } from 'swiper';

import styles from './HomePage.module.scss';
import CardProduct from '~/components/CardProduct';
import CategoryList from './components/CategotyList';
import Button from '~/components/Button';
import imgSlider from '~/assets/upload/slider_1.jpg';
import imgBanner from '~/assets/upload/bannerlarge.jpg';
import imgCam1 from '~/assets/upload/bgcam_1.jpg';
import imgCam2 from '~/assets/upload/bgcam_2.jpg';
import imgBestSale from '~/assets/upload/bestseler.jpg';

const cx = classNames.bind(styles);

function HomePage() {
    const [timeLeft, setTimeLeft] = useState({});
    const [arrProduct, setArrProduct] = useState([]);
    const [arrCategory, setArrCategory] = useState([{}]);
    const timerComponents = [];

    // API Product Flash sale
    useEffect(() => {
        const fetchApiProduct = async () => {
            try {
                const response = await request.get('db/data-product.json');

                return setArrProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApiProduct();

        const fetchApiCategory = async () => {
            try {
                const response = await request.get('db/data-category.json');

                setArrCategory(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApiCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {/* Slider */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-slider')}>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                        <SwiperSlide>
                            <Link to={'product-page' + `\\@all`} className={cx('img-slider')}>
                                <img src={imgSlider} alt="slider" />
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            {/* Flash Sale */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-flash')}>
                    <div className={cx('inner')}>
                        <div className={cx('title-sale')}>
                            <div className={cx('timer')}>
                                <h2 className={cx('title')}>
                                    <Link to={'product-page' + `\\@promotion`} className={cx('text-main')}>
                                        Deal sốc mỗi ngày
                                    </Link>
                                </h2>
                                <div className={cx('count-down')}>
                                    {timerComponents.length ? timerComponents : <span>Count Down!</span>}
                                </div>
                            </div>
                        </div>

                        <Swiper
                            spaceBetween={20}
                            slidesPerView={5}
                            navigation={true}
                            modules={[Navigation]}
                            breakpoints={{
                                360: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 10,
                                },
                                992: {
                                    slidesPerView: 5,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {arrProduct.map(
                                (result) =>
                                    result.flash && (
                                        <SwiperSlide key={result.id}>
                                            <CardProduct data={result} typeDefault={false} checkData="flash" />
                                        </SwiperSlide>
                                    ),
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Product Outstanding */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-outstanding')}>
                    <div className={cx('d-flex', 'block-title')}>
                        <Button to={'product-page' + `\\@outstanding`} primary rounded className={cx('btn-category')}>
                            <span className={cx('fw-bold')}>Mẫu mới về</span>
                        </Button>

                        <ul className={cx('tab-list')}>
                            {arrCategory.map(
                                (result) =>
                                    result.new && <CategoryList key={result.id} data={result} checkData="small" />,
                            )}
                        </ul>
                    </div>

                    <Swiper
                        slidesPerView={5}
                        grid={{
                            fill: 'row',
                            rows: 2,
                        }}
                        spaceBetween={10}
                        navigation
                        modules={[Grid, Navigation]}
                        breakpoints={{
                            360: {
                                slidesPerView: 1.5,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 10,
                            },
                            992: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {arrProduct.map(
                            (result) =>
                                !result.flash && (
                                    <SwiperSlide key={result.id}>
                                        <CardProduct data={result} typeDefault={true} />
                                    </SwiperSlide>
                                ),
                        )}
                    </Swiper>
                </div>
            </div>
            {/* Banner */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-banner')}>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                        <SwiperSlide>
                            <Link to={'product-page' + `\\@all`} className={cx('img-banner')}>
                                <img src={imgBanner} alt="Banner" />
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            {/* Top */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-top')}>
                    <h2 className={cx('title-module')}>Top danh mục</h2>

                    <ul className={cx('wrapper')}>
                        {arrCategory.map((result, index) => (
                            <CategoryList key={index} data={result} checkData="large" />
                        ))}
                    </ul>
                </div>
            </div>
            {/* Deal */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-deal')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-6 col-12 mb-3')}>
                            <div className={cx('item')} style={{ backgroundImage: `url(${imgCam1})` }}>
                                <h2>Giá sốc mỗi ngày</h2>
                                <h5>Số lượng có hạn</h5>
                                <div className={cx('deal-content')}>
                                    <h6>Bộ sưu tập mùa hè cho bé Thiết kế mới</h6>
                                    <p>
                                        Giá chỉ từ <span>125K</span>
                                    </p>
                                    <div className={cx('time-map')}>
                                        <p>Nhanh tay kẻo hết!</p>
                                        <div className={cx('count-down')}>
                                            {timerComponents.length ? timerComponents : <span>Count Down!</span>}
                                        </div>
                                        <Button
                                            to={'/product-page/' + `@outstanding`}
                                            className={'w-fit-content'}
                                            outlineWhite
                                            rounded
                                        >
                                            Xem ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-6 col-12 mb-3')}>
                            <div className={cx('item')} style={{ backgroundImage: `url(${imgCam2})` }}>
                                <h2>Bé chơi bé khỏe</h2>
                                <h5>Số lượng rất ít</h5>
                                <div className={cx('deal-content')}>
                                    <h6>Bộ sưu tập đồ chơi trí tuệ cho bé</h6>
                                    <p>
                                        Chỉ từ <span>250K</span>
                                    </p>
                                    <div className={cx('time-map')}>
                                        <p>Mua ngay kẻo hết!</p>
                                        <div className={cx('count-down')}>
                                            {timerComponents.length ? timerComponents : <span>Count Down!</span>}
                                        </div>
                                        <Button
                                            to={'/product-page/' + `@outstanding`}
                                            className={'w-fit-content'}
                                            outlineWhite
                                            rounded
                                        >
                                            Xem ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Coupon */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-coupon')}>
                    <div className={cx('module-body')}>
                        <Link to={'/product-page/' + `@outstanding`}>
                            <span className={cx('purchase-text')}>
                                Siêu ưu đãi cho <strong>đơn hàng đầu tiên.</strong>
                            </span>
                            <span className={cx('purchase-code')}>EgoKIDSU</span>
                            <span className={cx('purchase-description')}>Sử dụng mã khi thanh toán!</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Best Sale */}
            <div className={cx('row', 'section-best')}>
                <div className={cx('container-app')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3 col-12 d-md-none d-lg-block d-block')}>
                            <Link to={'/product-page/' + `@all`}>
                                <img src={imgBestSale} alt={imgBestSale} />
                            </Link>
                        </div>
                        <div className={cx('col-lg-9 col-12')}>
                            <Link to={'/product-page/' + `@outstanding`}>
                                <h2 className={cx('title-module')}>Top danh mục</h2>
                            </Link>

                            <Swiper
                                spaceBetween={20}
                                slidesPerView={4}
                                navigation={true}
                                modules={[Navigation]}
                                breakpoints={{
                                    360: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 3.5,
                                        spaceBetween: 10,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                    },
                                }}
                            >
                                {arrProduct.map(
                                    (result) =>
                                        result.sold >= 500 && (
                                            <SwiperSlide key={result.id}>
                                                <CardProduct data={result} typeDefault={true} checkData="top" />
                                            </SwiperSlide>
                                        ),
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {/* News */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-news')}>News</div>
            </div>
            {/* Services */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-services')}>Services</div>
            </div>
        </>
    );
}

export default HomePage;
