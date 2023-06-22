import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from '~/pages/HomePage/HomePage.module.scss';

const cx = classNames.bind(styles);

function CategorySmall({ data }) {
    return (
        <>
            <ul className={cx('tab-list')}>
                {data.map((result) => (
                    <li key={result.id} className={cx('cate-item')}>
                        <Link to={'/product-page/' + `@${result.title}`} className={cx('image')}>
                            <img src={result.image} alt={result.title} />
                        </Link>
                        <h4 className="title-cate">
                            <Link to={'/product-page/' + `@${result.title}`}>{result.title}</Link>
                        </h4>
                    </li>
                ))}
            </ul>
        </>
    );
}

CategorySmall.propTypes = {
    data: PropTypes.array.isRequired,
};

export default CategorySmall;
