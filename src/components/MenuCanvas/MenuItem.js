import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './MenuCanvas.module.scss';
import * as Icons from '~/components/Icons';
import MenuItemSmall from './MenuItemSmall';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const [show, setShow] = useState(false);

    return (
        <>
            {data.children ? (
                <>
                    <button
                        className={cx(
                            'd-flex justify-content-between align-items-center',
                            'item',
                            show ? 'active' : '',
                        )}
                        onClick={() => setShow(!show)}
                    >
                        {data.title}
                        <Icons.DownIcon className={cx('icon', show ? 'active' : '')} />
                    </button>

                    <div className={cx('item-small', show ? 'active' : '')}>
                        <MenuItemSmall data={data.children} checkKey={data.key} />
                    </div>
                </>
            ) : (
                <>
                    <Link
                        to={`/${data.key}/${data.title}`}
                        className={cx('d-flex justify-content-between align-items-center', 'item')}
                    >
                        {data.title}
                    </Link>
                </>
            )}
        </>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MenuItem;
