import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <>
            {/* Slider */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-slider')}>Slide</div>
            </div>
            {/* Flash Sale */}
            <div className={cx('row container-app')}>
                <div className={cx('', 'section-flash')}>Falsh Sale</div>
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
