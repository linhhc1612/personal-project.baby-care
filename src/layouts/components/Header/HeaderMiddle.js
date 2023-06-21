import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

import styles from './Header.module.scss';
import configs from '~/configs';
import images from '~/assets/images';
import * as Icons from '~/components/Icons';
import ActionHeader from '~/layouts/components/ActionHeader';
import MenuCanvas, { MenuItem } from '~/components/MenuCanvas';
import ServiceHeader from '~/layouts/components/ServiceHeader';

const cx = classNames.bind(styles);

function HeaderMiddle() {
    const [show, setShow] = useState(false);
    const [navigation, setNavigation] = useState([]);

    useEffect(() => {
        const fetchApi = () => {
            axios
                .get('/db/data-navigation.json')
                .then((res) => {
                    setNavigation(res.data.data);
                })
                .then((error) => console.log(error));
        };
        fetchApi();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
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
    );
}

export default HeaderMiddle;
