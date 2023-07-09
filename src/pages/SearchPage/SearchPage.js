import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

import * as request from '~/untils/httpRequest';
import styles from './SearchPage.module.scss';
import configs from '~/configs';
import EmptyMessage from './components/EmptyMessage';
import CardProduct from '~/components/CardProduct';

const cx = classNames.bind(styles);
const ITEMS_PER_PAGE = 12;

function SearchPage() {
    const [arrResult, setArrResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const param = useParams();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = arrResult.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchResultSearch = async () => {
            const response = await request.get(`/products`);

            const results = response.filter((product) =>
                product.name_product.toLowerCase().includes(param.key.toLowerCase()),
            );

            setArrResult(results);
        };

        fetchResultSearch();
    }, [param.key]);

    return (
        <>
            <Breadcrumb className={cx('row container-app')}>
                <Breadcrumb.Item href={configs.routes.homePage}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>{param.value}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <h2 className={cx('title-module')}>{param.value}</h2>
                <div className={cx('col-12 mb-5')}>
                    {arrResult.length === 0 && <EmptyMessage />}

                    {arrResult.length > 0 && (
                        <div className={cx('row')}>
                            {currentItems.map((data) => (
                                <div key={data.id} className={cx('col-lg-2 col-md-4 col-6')}>
                                    <CardProduct data={data} />
                                </div>
                            ))}
                        </div>
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
                                    currentPage + 1 >= currentItems.length || arrResult.length <= ITEMS_PER_PAGE
                                        ? 'd-none'
                                        : 'd-inline-block',
                                )}
                            >
                                {currentPage + 1}
                            </Pagination.Item>
                            <Pagination.Next
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={cx(
                                    currentPage + 1 >= currentItems.length || arrResult.length <= ITEMS_PER_PAGE
                                        ? 'd-none'
                                        : 'd-inline-block',
                                )}
                            />
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchPage;
