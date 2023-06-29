import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './CategoryList.module.scss';

const cx = classNames.bind(styles);

function CategoryList({ data, checkData }) {
    return (
        <>
            <li key={data.id} className={cx('cate-item')}>
                <Link
                    to={'/product-page/' + `@${data.id}-` + checkData + '/' + `${data.title}`}
                    className={cx('image')}
                >
                    <img
                        src={data.size === 'large' ? data.image_large : data.image_small}
                        className={cx(data.image_large !== '' ? 'image-large' : 'image-small')}
                        alt={data.title}
                    />
                </Link>
                <h4 className="title-cate">
                    <Link to={'/product-page/' + `@${data.id}-` + checkData + '/' + `${data.title}`}>{data.title}</Link>
                </h4>
            </li>
        </>
    );
}

CategoryList.propTypes = {
    data: PropTypes.object,
    checkData: PropTypes.string,
};

export default CategoryList;
