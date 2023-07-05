import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import * as request from '~/untils/httpRequest';
import configs from '~/configs';
import styles from './NewsPage.module.scss';
import { MenuItem } from '~/components/MenuCanvas';
import { BlogSmall, BlogLarge } from '~/components/Blog';

const cx = classNames.bind(styles);

function NewsPage() {
    const [navigation, setNavigation] = useState([]);
    const [arrBlogAll, setArrBlogAll] = useState([]);
    const [arrBlogSmall, setArrBlogSmall] = useState([]);

    const param = useParams();

    useEffect(() => {
        // API Navigation
        const fetchApiNav = async () => {
            try {
                const response = await request.get('/navigates');
                return setNavigation(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApiNav();

        // API Blog
        const fetchApiBlog = async () => {
            try {
                const response = await request.get('/blogs');

                setArrBlogSmall(response.slice(0, 4));
                setArrBlogAll(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiBlog();
    }, []);

    return (
        <>
            <Breadcrumb className={cx('row container-app')}>
                <Breadcrumb.Item href={configs.routes.homePage}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>{param.value}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <div className={cx('col-lg-3 col-12 order-2 order-lg-1', 'side-bar')}>
                    <div className={cx('side-menu')}>
                        <Link to={'/news-page/' + `Tin tức`}>
                            <h2 className={cx('title-module')}>Danh mục</h2>
                        </Link>

                        {navigation.map((result) => (
                            <MenuItem key={result.id} data={result} />
                        ))}

                        <Link to={'/news-page/' + `Tin tức`}>
                            <h2 className={cx('mt-4', 'title-module')}>Tin nổi bật</h2>
                        </Link>

                        {arrBlogSmall.map((result) => (
                            <BlogSmall key={result.id} data={result} />
                        ))}
                    </div>
                </div>
                <div className={cx('col-lg-9 col-12 order-1 order-lg-2', 'main-content')}>
                    <h2 className={cx('title-module')}>{param.value}</h2>

                    <div className={cx('row')}>
                        {arrBlogAll.map((result) => (
                            <div key={result.id} className={cx('col-md-6 col-12')}>
                                <BlogLarge data={result} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsPage;
