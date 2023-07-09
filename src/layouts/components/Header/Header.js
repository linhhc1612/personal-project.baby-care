import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

import * as request from '~/untils/httpRequest';
import styles from './Header.module.scss';
import configs from '~/configs';
import * as Icons from '~/components/Icons';
import images from '~/assets/images';
import ActionHeader from '~/layouts/components/ActionHeader';
import MenuCanvas, { MenuItem } from '~/components/MenuCanvas';
import ServiceHeader from '~/layouts/components/ServiceHeader';
import ItemList, { Item } from '~/components/ItemList';

const cx = classNames.bind(styles);

function Header() {
    const [marquees, setMarquees] = useState([]);
    const [show, setShow] = useState(false);
    const [navigation, setNavigation] = useState([]);
    const [clickNav, setClickNav] = useState('');
    const [userLogin, setUserLogin] = useState({ email: '', username: '', avt: '' });

    useEffect(() => {
        const fetchApiMarquee = async () => {
            try {
                const response = await request.get('/marquees');
                return setMarquees(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApiMarquee();
        const fetchApi = async () => {
            try {
                const response = await request.get('/navigates');
                return setNavigation(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();

        const storedUserData = localStorage.getItem('userLogin');
        if (storedUserData) {
            setUserLogin(JSON.parse(storedUserData));
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePrevNav = () => {
        setClickNav('');
    };

    const handleNextNav = () => {
        setClickNav('click');
    };

    return (
        <>
            {/* ----- Header Top */}
            <div className={cx('row py-2 border-bottom')}>
                <div className={cx('container-app')}>
                    <div className={cx('row justify-content-between')}>
                        <div className={cx('col-lg-5 col-md-6 col-5 order-1 d-flex align-item-center')}>
                            <p className={cx('d-none d-md-block m-0')}>
                                Bạn cần trợ giúp:
                                <Link
                                    to="tel:0329.***.***"
                                    className={cx('m-0 text-main fw-bold ps-2 pe-4 border-end')}
                                >
                                    0329.***.***
                                </Link>
                            </p>
                            <Link to={'/favorite-page' + `/Sản phẩm yêu thích`} className={cx('m-0 ps-4')}>
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
                            <Link to={'/store-page' + `/Hệ thống cửa hàng`} className={cx('pe-4')}>
                                <span className={cx('text-main pe-1')}>
                                    <Icons.LocationDotIcon />
                                </span>{' '}
                                Cửa hàng
                            </Link>
                            {userLogin.username === '' && (
                                <>
                                    <Link
                                        to={'/login-page' + `/Đăng nhập tài khoản`}
                                        className={cx('ps-4 pe-4 border-start')}
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        to={'/sign-up-page' + `/Đăng ký tài khoản`}
                                        className={cx('ps-4 border-start')}
                                    >
                                        Đăng ký
                                    </Link>
                                </>
                            )}

                            {userLogin.username !== '' && (
                                <>
                                    <span>{userLogin.username}</span>
                                    <img
                                        src={userLogin.avt !== '' ? userLogin.avt : images.defaultUser}
                                        alt={userLogin.username}
                                        className={cx('img-user')}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* ----- Header Middle */}
            <div className={cx('row', 'child-container')}>
                <div className={cx('container-app')}>
                    <div className={cx('row justify-content-between')}>
                        <div className={cx('col-lg-3 col-md-3 col-12')}>
                            <Link className={cx('d-flex align-items-center', 'logo')} to={configs.routes.homePage}>
                                <img src={images.logo} alt={images.logo} />
                            </Link>
                        </div>
                        <div className={cx('col-md-9 col-9 d-none d-lg-flex', 'communication')}>
                            <div className={cx('d-flex align-items-center', 'communication-wrapper')}>
                                <ServiceHeader
                                    icon={<Icons.CalendarIcon className={cx('text-main')} />}
                                    title="T2 - T7 8h00 - 22h00"
                                    description="Chủ nhật"
                                    descriptionActive="Nghỉ"
                                />
                            </div>
                            <div className={cx('d-flex align-items-center', 'communication-wrapper')}>
                                <ServiceHeader
                                    icon={<Icons.BoltIcon className={cx('text-main')} />}
                                    title="Tuần lễ SALE!"
                                    description="Giảm giá"
                                    descriptionActive="Up to 50%"
                                />
                            </div>
                            <div className={cx('d-flex align-items-center', 'communication-wrapper')}>
                                <ServiceHeader
                                    icon={<Icons.PhoneIcon className={cx('text-main')} />}
                                    title="Bạn cần hỗ trợ?"
                                    description="Gọi ngay"
                                    descriptionActive={
                                        <Link
                                            to={configs.routes.homePage}
                                            className={cx('fw-bold text-uppercase text-main m-0')}
                                        >
                                            0329.***.***
                                        </Link>
                                    }
                                />
                            </div>
                        </div>

                        {/* Tablet - Mobile */}
                        <div className={cx('col-md-9 col-12 d-lg-none position-relative', 'child-cart-mobile')}>
                            <button className={cx('text-main', 'btn-bars')} onClick={handleShow}>
                                <Icons.BarsIcon />
                            </button>

                            <Offcanvas show={show} onHide={handleClose} className={cx('wrapper')}>
                                <Offcanvas.Body>
                                    <MenuCanvas>
                                        {navigation.map((result) => (
                                            <MenuItem key={result.id} data={result} />
                                        ))}
                                        <div className={cx('bottom')}>
                                            <div className={cx('d-flex align-items-center', 'bottom-item')}>
                                                <ServiceHeader
                                                    icon={<Icons.BoltIcon className={cx('text-main')} />}
                                                    title="Tuần lễ SALE!"
                                                    description="Giảm giá"
                                                    descriptionActive="Up to 50%"
                                                />
                                            </div>
                                            <div className={cx('d-flex align-items-center', 'bottom-item')}>
                                                <ServiceHeader
                                                    icon={<Icons.BoltIcon className={cx('text-main')} />}
                                                    title="Tuần lễ SALE!"
                                                    description="Giảm giá"
                                                    descriptionActive="Up to 50%"
                                                />
                                            </div>
                                            <div className={cx('d-flex align-items-center', 'bottom-item')}>
                                                <ServiceHeader
                                                    icon={<Icons.PhoneIcon className={cx('text-main')} />}
                                                    title="Bạn cần hỗ trợ?"
                                                    description="Gọi ngay"
                                                    descriptionActive={
                                                        <Link
                                                            to={configs.routes.homePage}
                                                            className={cx('fw-bold text-uppercase text-main m-0')}
                                                        >
                                                            0329.***.***
                                                        </Link>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </MenuCanvas>
                                </Offcanvas.Body>
                            </Offcanvas>

                            <ActionHeader />
                        </div>
                    </div>
                </div>
            </div>
            {/* ----- Header Bottom */}
            <div className={cx('row bg-menu d-none d-lg-block')}>
                <div className={cx('container-app')}>
                    <div className={cx('row justify-content-between')}>
                        <div className={cx('col-lg-8')}>
                            <div className={cx('navigation')}>
                                <button className={cx('btn-prev')} onClick={handlePrevNav}>
                                    <Icons.PrevIcon />
                                </button>
                                <button className={cx('btn-next')} onClick={handleNextNav}>
                                    <Icons.NextIcon />
                                </button>
                                <div className={cx('nav-horizontal')}>
                                    <ItemList className={clickNav}>
                                        {navigation.map((result) => (
                                            <Item key={result.id} data={result} />
                                        ))}
                                    </ItemList>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col-lg-4 d-none d-lg-flex justify-content-end')}>
                            <ActionHeader />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
