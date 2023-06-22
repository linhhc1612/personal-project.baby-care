/* eslint-disable no-useless-concat */
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './HomePage.module.scss';
import CardProduct from '~/components/CardProduct';
import imgSlider from '~/assets/upload/slider_1.jpg';

const cx = classNames.bind(styles);

function HomePage() {
    const [timeLeft, setTimeLeft] = useState({});
    const [productsFlash, setProductsFlash] = useState([]);
    const timerComponents = [];

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    useEffect(() => {
        const fetchApiProductFlash = () => {
            axios
                .get('/db/data-product.json')
                .then((res) => setProductsFlash(res.data.data))
                .then((error) => console.log(error));
        };

        fetchApiProductFlash();
    }, []);

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
                            {productsFlash.map((result) => (
                                <SwiperSlide key={result.id}>
                                    <CardProduct data={result} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Product Outstanding */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-outstanding')}>Product Outstanding</div>
            </div>
            {/* Banner */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-banner')}>Banner</div>
            </div>
            {/* Top */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-top')}>Top</div>
            </div>
            {/* Deal */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-deal')}>Deal</div>
            </div>
            {/* Coupon */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-coupon')}>Coupon</div>
            </div>
            {/* Best Sale */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-best')}>Best Sale</div>
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
