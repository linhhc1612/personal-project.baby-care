import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './CategoryList.module.scss';

const cx = classNames.bind(styles);

function CategoryList({ data, checkData }) {
    return (
        <>
            <li key={data.id} className={cx('cate-item', checkData === 'large' ? 'cate-large' : 'cate-small')}>
                <Link
                    to={'/product-page/' + `@${data.id}-` + checkData + '/' + `${data.title}`}
                    className={cx('image', checkData === 'large' ? 'image-large' : 'image-small')}
                >
                    <img src={checkData === 'large' ? data.image_large : data.image_small} alt={data.title} />
                </Link>
                <Link to={'/product-page/' + `@${data.id}-` + checkData + '/' + `${data.title}`}>
                    <h4 className={cx('title-cate', checkData === 'large' ? 'title-large' : 'title-small')}>
                        {data.title}
                    </h4>
                </Link>
            </li>
        </>
    );
}

CategoryList.propTypes = {
    data: PropTypes.object,
    checkData: PropTypes.string,
};

export default CategoryList;
