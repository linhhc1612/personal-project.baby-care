import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
                        <MenuItemSmall data={data.children} />
                    </div>
                </>
            ) : (
                <>
                    <Link to={data.path} className={cx('d-flex justify-content-between align-items-center', 'item')}>
                        {data.title}
                    </Link>
                </>
            )}
        </>
    );
}

export default MenuItem;
