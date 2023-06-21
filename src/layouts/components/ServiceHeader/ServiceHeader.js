import classNames from 'classnames/bind';

import styles from '~/layouts/components/Header/Header.module.scss';

const cx = classNames.bind(styles);

function ServiceHeader({ icon, title, description, descriptionActive }) {
    return (
        <>
            <span className={cx('icon')}>{icon}</span>
            <div className={cx('info')}>
                <p className={cx('m-0')}>{title}</p>
                <p className={cx('m-0')}>
                    {description} <label className={cx('text-uppercase text-main m-0')}>{descriptionActive}</label>
                </p>
            </div>
        </>
    );
}

export default ServiceHeader;
