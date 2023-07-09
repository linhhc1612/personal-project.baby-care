import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Pagination } from 'react-bootstrap';

import * as request from '~/untils/httpRequest';
import configs from '~/configs';
import styles from './FavoritePage.module.scss';
import { MenuItem } from '~/components/MenuCanvas';
import { BlogSmall } from '~/components/Blog';
import CardProduct from '~/components/CardProduct';

const cx = classNames.bind(styles);
const ITEMS_PER_PAGE = 16;

function FavoritePage() {
    const [navigation, setNavigation] = useState([]);
    const [arrBlogSmall, setArrBlogSmall] = useState([]);
    const [arrProduct, setArrProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const param = useParams();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = arrProduct.slice(startIndex, endIndex);

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
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiBlog();

        // API Product
        const fetchApiProduct = async () => {
            try {
                const response = await request.get('/products');
                return setArrProduct(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiProduct();
    }, [currentPage]);

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
                        {currentItems.length <= 0 && <span>Không có sản phẩm nào được yêu thích</span>}

                        {currentItems.map(
                            (result) =>
                                result.favorite && (
                                    <div key={result.id} className={cx('col-6 col-md-3')}>
                                        <CardProduct data={result} typeDefault={true} checkData="product" />
                                    </div>
                                ),
                        )}

                        <div className={cx('d-flex justify-content-end align-item-center')}>
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className={cx(currentPage - 1 === 0 ? 'd-none' : 'd-inline-block')}
                                />
                                <Pagination.Item
                                    onClick={(e) => setCurrentPage(parseInt(e.target.innerText))}
                                    className={cx(currentPage - 1 === 0 ? 'd-none' : 'd-inline-block')}
                                >
                                    {currentPage - 1}
                                </Pagination.Item>
                                <Pagination.Item active>{currentPage}</Pagination.Item>
                                <Pagination.Item
                                    onClick={(e) => setCurrentPage(parseInt(e.target.innerText))}
                                    className={cx(
                                        currentPage + 1 >= currentItems.length || currentItems.length <= 16
                                            ? 'd-none'
                                            : 'd-inline-block',
                                    )}
                                >
                                    {currentPage + 1}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className={cx(
                                        currentPage + 1 >= currentItems.length || currentItems.length <= 16
                                            ? 'd-none'
                                            : 'd-inline-block',
                                    )}
                                />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FavoritePage;
