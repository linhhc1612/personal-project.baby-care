import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Service.module.scss';

const cx = classNames.bind(styles);

function Service({ data }) {
    return (
        <>
            <div className={cx('item-service')}>
                <div className={cx('image')}>
                    <img src={data.image} alt={data.title} />
                </div>
                <div className={cx('content-service')}>
                    <h4>{data.title}</h4>
                    <p>{data.description}</p>
                </div>
            </div>
        </>
    );
}

Service.propTypes = {
    data: PropTypes.object,
};

export default Service;
