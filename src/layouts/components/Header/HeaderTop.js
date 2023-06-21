/* eslint-disable jsx-a11y/no-distracting-elements */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Header.module.scss';
import configs from '~/configs';
import * as Icons from '~/components/Icons';

const cx = classNames.bind(styles);

function HeaderTop() {
    const [marquees, setMarquees] = useState([]);

    useEffect(() => {
        const fetchApiMarquee = () => {
            axios
                .get('/db/data-marquee.json')
                .then((res) => setMarquees(res.data.data))
                .then((error) => console.log(error));
        };
        fetchApiMarquee();
    }, []);

    return (
        <div className={cx('row py-2 border-bottom')}>
            <div className={cx('container-app')}>
                <div className={cx('row justify-content-between')}>
                    <div className={cx('col-lg-5 col-md-6 col-5 order-1 d-flex align-item-center')}>
                        <p className={cx('d-none d-md-block m-0')}>
                            Bạn cần trợ giúp:
                            <Link to="tel:0329.***.***" className={cx('m-0 text-main fw-bold ps-2 pe-4 border-end')}>
                                0329.***.***
                            </Link>
                        </p>
                        <Link to={configs.routes.favoritePage} className={cx('m-0 ps-4')}>
                            Yêu thích (0)
                        </Link>
                    </div>
                    <div className={cx('col-lg-3 col-md-12 col-7 order-lg-2 order-md-3 order-2')}>
                        <marquee>
                            {marquees.map((result) => (
                                <span className={cx('pe-4')} key={result.id}>
                                    {result.title}
                                </span>
                            ))}
                        </marquee>
                    </div>
                    <div className={cx('col-lg-4 col-md-6 order-lg-3 order-md-2 text-end d-none d-md-block')}>
                        <Link to={configs.routes.storePage} className={cx('pe-4')}>
                            <span className={cx('text-main pe-1')}>
                                <Icons.LocationDotIcon />
                            </span>{' '}
                            Cửa hàng
                        </Link>
                        <Link to={configs.routes.loginPage} className={cx('ps-4 pe-4 border-start')}>
                            Đăng nhập
                        </Link>
                        <Link to={configs.routes.signUpPage} className={cx('ps-4 border-start')}>
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderTop;
