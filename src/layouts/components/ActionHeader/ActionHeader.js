import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import * as request from '~/untils/httpRequest';
import * as Icons from '~/components/Icons';
import configs from '~/configs';
import styles from './ActionHeader.module.scss';

const cx = classNames.bind(styles);

function ActionHeader() {
    const [searchValue, setSearchValue] = useState('');
    const [value, setValue] = useState(0);

    const inputRef = useRef();

    useEffect(() => {
        // API Product
        const fetchApiProduct = async () => {
            try {
                const response = await request.get('/products');
                const newArr = [];

                response.map((data) => {
                    if (data.status === 'in-cart') {
                        newArr.push(data);
                        setValue(newArr.length);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        setInterval(() => {
            fetchApiProduct();
        }, 3000);
    }, []);

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
                        className={cx('input-form-search')}
                    />
                    <Link
                        to={searchValue ? `/search-page/Tìm kiếm/${searchValue}` : ''}
                        style={searchValue ? {} : { pointerEvents: 'none' }}
                    >
                        <Icons.SearchIcon className={cx('text-main', 'icon')} />
                    </Link>
                </div>
                <Link
                    to={`/cart-page/Giỏ hàng`}
                    className={cx('d-flex justify-content-center align-items-center ms-5', 'cart-wrapper')}
                >
                    <Icons.CartIcon className={cx('text-main')} />
                    <span className={cx('bage')}>{value}</span>
                </Link>
            </div>
        </>
    );
}

export default ActionHeader;
