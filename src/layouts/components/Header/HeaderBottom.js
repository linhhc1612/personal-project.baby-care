import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import axios from 'axios';

import configs from '~/configs';
import styles from './Header.module.scss';
import * as Icons from '~/components/Icons';
import ItemList, { Item } from '~/components/ItemList';

const cx = classNames.bind(styles);

function HeaderBottom() {
    const [clickNav, setClickNav] = useState('');
    const [navigation, setNavigation] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    useEffect(() => {
        const fetchApi = () => {
            axios
                .get('/db/data-navigation.json')
                .then((res) => {
                    setNavigation(res.data.data);
                })
                .then((error) => console.log(error));
        };
        fetchApi();
    }, []);

    const handlePrevNav = () => {
        setClickNav('');
    };

    const handleNextNav = () => {
        setClickNav('click');
    };

    return (
        <div className={cx('row justify-content-between px-web bg-menu')}>
            <div className={cx('col-lg-8')}>
                <div className={cx('navigation')}>
                    <button className={cx('btn-prev')} onClick={handlePrevNav}>
                        <Icons.PrevIcon />
                    </button>
                    <button className={cx('btn-next')} onClick={handleNextNav}>
                        <Icons.NextIcon />
                    </button>
                    <div className={cx('nav-horizontal')}>
                        <ItemList className={clickNav}>
                            {navigation.map((result) => (
                                <Item key={result.id} data={result} />
                            ))}
                        </ItemList>
                    </div>
                </div>
            </div>

            <div className={cx('col-lg-4 text-end d-none d-lg-flex justify-content-end align-items-center')}>
                <div className={cx('d-flex align-items-center me-5', 'form-search')}>
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
                    className={cx('d-flex justify-content-center align-items-center', 'cart-wrapper')}
                >
                    <Icons.CartIcon className={cx('text-main')} />
                    <span className={cx('bage')}>0</span>
                </Link>
            </div>
        </div>
    );
}

export default HeaderBottom;
