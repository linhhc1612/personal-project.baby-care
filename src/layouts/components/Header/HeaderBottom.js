import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Header.module.scss';
import * as Icons from '~/components/Icons';
import ItemList, { Item } from '~/components/ItemList';
import ActionHeader from '~/layouts/components/ActionHeader';

const cx = classNames.bind(styles);

function HeaderBottom() {
    const [clickNav, setClickNav] = useState('');
    const [navigation, setNavigation] = useState([]);

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
        <div className={cx('row bg-menu d-none d-lg-block')}>
            <div className={cx('container-app')}>
                <div className={cx('row justify-content-between')}>
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

                    <div className={cx('col-lg-4 d-none d-lg-flex justify-content-end')}>
                        <ActionHeader />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderBottom;
