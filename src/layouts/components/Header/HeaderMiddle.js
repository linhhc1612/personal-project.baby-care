import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import configs from '~/configs';
import images from '~/assets/images';
import * as Icons from '~/components/Icons';

const cx = classNames.bind(styles);

function HeaderMiddle() {
    return (
        <div className={cx('row justify-content-between px-web')}>
            <div className={cx('col-lg-3 col-md-3')}>
                <Link className={cx('d-flex align-items-center', 'logo')} to={configs.routes.homePage}>
                    <img src={images.logo} alt={images.logo} />
                </Link>
            </div>
            <div className={cx('col-md-9 col-9 d-none d-lg-flex', 'communication')}>
                <div className={cx('d-flex align-items-center', 'communication-wrapper')}>
                    <span className={cx('icon')}>
                        <Icons.CalendarIcon className={cx('text-main')} />
                    </span>
                    <div className={cx('info')}>
                        <p className={cx('m-0')}>T2 - T7 8h00 - 22h00</p>
                        <p className={cx('m-0')}>
                            Chủ nhật <label className={cx('text-uppercase text-main m-0')}> Nghỉ</label>
                        </p>
                    </div>
                </div>
                <div className={cx('d-flex align-items-center', 'communication-wrapper')}>
                    <span className={cx('icon')}>
                        <Icons.BoltIcon className={cx('text-main')} />
                    </span>
                    <div className={cx('info')}>
                        <p className={cx('m-0')}>Tuần lễ SALE!</p>
                        <p className={cx('m-0')}>
                            Giảm giá <label className={cx('text-uppercase text-main m-0')}> Up to 50%</label>
                        </p>
                    </div>
                </div>
                <div className={cx('d-flex align-items-center', 'communication-wrapper')}>
                    <span className={cx('icon')}>
                        <Icons.PhoneIcon className={cx('text-main')} />
                    </span>
                    <div className={cx('info')}>
                        <p className={cx('m-0')}>Bạn cần hỗ trợ?</p>
                        <p className={cx('m-0')}>
                            Gọi ngay{' '}
                            <Link to={configs.routes.homePage} className={cx('fw-bold text-uppercase text-main m-0')}>
                                0329.***.***
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderMiddle;
