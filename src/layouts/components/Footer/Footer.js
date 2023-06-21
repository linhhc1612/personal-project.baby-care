/* eslint-disable jsx-a11y/anchor-has-content */
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import configs from '~/configs';

import Row from '~/components/Row';
import images from '~/assets/images';
import * as Icons from '~/components/Icons';
import app from '~/assets/upload/app-store.jpg';
import googlePlay from '~/assets/upload/google-play.jpg';
import payment from '~/assets/upload/payment_method.png';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Footer() {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    return (
        <>
            <div className={cx('row', 'system-store')}>
                <Row>
                    <div className={cx('col-lg-4 col-md-6 col-12 offset-lg-4 offset-md-3')}>
                        <div className={cx('text-center', 'inner')}>
                            <div className={cx('text-uppercase d-inline-block bg-white', 'bg-in')}>
                                <h2>Mời bạn ghé thăm</h2>
                                <div className={cx('fw-bold', 'description')}>
                                    Hệ thống
                                    <Link
                                        to={configs.routes.storePage}
                                        className={cx('text-main ms-1 fw-bold', 'path-to-store')}
                                    >
                                        16 cửa hàng của chúng tôi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>

            <div className={cx('row', 'footer')}>
                <Row>
                    <div className={cx('col-lg-4 col-md-6 col-12')}>
                        <Link to={configs.routes.homePage} className={cx('logo')}>
                            <img width="240" height="85" src={images.logo} alt={images.logo} />
                        </Link>
                        <h4 className={cx('first-h4')}>Liên hệ</h4>
                        <div className={cx('description-line')}>
                            <span className={cx('me-1')}>Địa chỉ:</span>
                            <p>Tầng 6 Tòa Ladeco 266 Đội Cấn,Hà Nội,</p>
                        </div>
                        <div className={cx('description-line')}>
                            <span className={cx('me-1')}>Điện thoại:</span>
                            <Link to="tel:02329.***.***">0329.***.***</Link>
                        </div>
                        <h4 className={cx('last-h4')}>Theo dõi chúng tôi</h4>
                        <div className={cx('social')}>
                            <a href="https://www.facebook.com/" className={cx('social-button')}>
                                <Icons.FacebookIcon className={cx('text-black')} />
                            </a>
                            <a href="https://www.youtube.com/" className={cx('social-button')}>
                                <Icons.YoutubeIcon className={cx('text-black')} />
                            </a>
                            <a href="https://www.instagram.com/" className={cx('social-button')}>
                                <Icons.InstagramIcon className={cx('text-black')} />
                            </a>
                        </div>
                    </div>
                    <div className={cx('col-lg-5 col-md-6 col-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col-md-6 col-12')}>
                                <h4
                                    className={cx('title-menu', show1 ? 'active' : '')}
                                    onClick={() => setShow1(!show1)}
                                >
                                    Hỏi đáp
                                </h4>
                                <ul className={cx('p-0', 'list-menu', 'content', show1 ? 'active' : '')}>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Hướng dẫn mua hàng</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Hướng dẫn khuyến mãi</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Hướng dẫn đổi hàng</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Hướng dẫn thanh toán</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Hướng dẫn khác</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('col-md-6 col-12')}>
                                <h4
                                    className={cx('title-menu', show2 ? 'active' : '')}
                                    onClick={() => setShow2(!show2)}
                                >
                                    Khách hàng
                                </h4>
                                <ul className={cx('p-0', 'list-menu', 'content', show2 ? 'active' : '')}>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Thẻ thành viên</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Đăng ký thành viên</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Mẹ và bé</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Quà cho bé</Link>
                                    </li>
                                    <li className={cx('li-menu')}>
                                        <Link to={configs.routes.newsPage}>Sản phẩm khác</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-3 col-md-6 col-12')}>
                        <h4 className={cx('title-menu', show3 ? 'active' : '')} onClick={() => setShow3(!show3)}>
                            Cài đặt ứng dụng
                        </h4>
                        <div className={cx('content', show3 ? 'active' : '')}>
                            <p className={cx('m-0')}>Từ Appstore và Google play</p>
                            <div className={cx('download-app')}>
                                <Link to={configs.routes.homePage}>
                                    <img src={app} alt="download-app" />
                                </Link>
                                <Link to={configs.routes.homePage}>
                                    <img src={googlePlay} alt="download-app" />
                                </Link>
                            </div>
                            <p className={cx('m-0')}>Chấp nhận thanh toán</p>
                            <div className={cx('payment')}>
                                <img src={payment} alt="payment" />
                            </div>
                        </div>
                    </div>
                </Row>

                <Row>
                    <div className={cx('inner')}>
                        Cover By{' '}
                        <a href="https://github.com/linhhc1612" className={cx('text-main')}>
                            Linhhc.1612
                        </a>
                    </div>
                </Row>
            </div>
        </>
    );
}

export default Footer;
