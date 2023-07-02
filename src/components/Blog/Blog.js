import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Blog.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Blog({ data }) {
    return (
        <>
            <div className={cx('item-blog')}>
                <Link to={'/news-detail-page/' + `${data.id}/${data.title}`} className={cx('thumb')}>
                    <img src={data.image} alt={data.title} />
                </Link>

                <div className={cx('content-blog')}>
                    <Link to={'/news-detail-page/' + `${data.id}/${data.title}`} className={cx('title')}>
                        <h3>{data.title}</h3>
                    </Link>
                    <div className={cx('date-form')}>
                        <span>{data.create_at}</span>
                        <Link to={'/news-page/' + `@${data.id}`} className={cx('w-50 text-end')}>
                            Xem thêm
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

Blog.propTypes = {
    data: PropTypes.object,
};

export default Blog;
