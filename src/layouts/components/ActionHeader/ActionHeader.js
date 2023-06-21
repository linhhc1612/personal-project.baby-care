import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ActionHeader.module.scss';
import * as Icons from '~/components/Icons';
import configs from '~/configs';

const cx = classNames.bind(styles);

function ActionHeader() {
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    return (
        <>
            <div className={cx('d-flex justify-content-end align-items-center')}>
                <div className={cx('d-flex align-items-center', 'form-search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                    <Link
                        to={searchValue ? configs.routes.searchPage : ''}
                        style={searchValue ? {} : { pointerEvents: 'none' }}
                    >
                        <Icons.SearchIcon className={cx('text-main', 'icon')} />
                    </Link>
                </div>
                <Link
                    to={configs.routes.cartPage}
                    className={cx('d-flex justify-content-center align-items-center ms-5', 'cart-wrapper')}
                >
                    <Icons.CartIcon className={cx('text-main')} />
                    <span className={cx('bage')}>0</span>
                </Link>
            </div>
        </>
    );
}

export default ActionHeader;
