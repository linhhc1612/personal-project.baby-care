import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Blog.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BlogLarge({ data }) {
    return (
        <>
            <div className={cx('item-blog-large')}>
                <Link to={'/news-detail-page/' + `${data.id}/${data.title}`} className={cx('thumb')}>
                    <img src={data.image} alt={data.title} />
                </Link>

                <div className={cx('content')}>
                    <Link to={'/news-detail-page/' + `${data.id}/${data.title}`}>
                        <h3>{data.title}</h3>
                    </Link>
                    <p>{data.description}</p>
                </div>
            </div>
        </>
    );
}

BlogLarge.propTypes = {
    data: PropTypes.object,
};

export default BlogLarge;
