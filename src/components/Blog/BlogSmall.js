import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function BlogSmall({ data }) {
    return (
        <>
            <div className={cx('item-blog-small')}>
                <div className={cx('thumb-left')}>
                    <Link to={'/news-detail-page/' + `${data.id}/${data.title}`}>
                        <img src={data.image} alt={data.title} />
                    </Link>
                </div>
                <div className={cx('name-right')}>
                    <Link to={'/news-detail-page/' + `${data.id}/${data.title}`}>
                        <h3>{data.title}</h3>
                    </Link>
                </div>
            </div>
        </>
    );
}

BlogSmall.propTypes = {
    data: PropTypes.object,
};

export default BlogSmall;
