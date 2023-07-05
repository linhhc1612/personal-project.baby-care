import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';

import * as Icons from '~/components/Icons';
import * as request from '~/untils/httpRequest';
import styles from './WardrobePage.module.scss';
import configs from '~/configs';
import { MenuItem } from '~/components/MenuCanvas';
import Filter from '~/components/Filter';
import CardProduct from '~/components/CardProduct';
import { BlogSmall } from '~/components/Blog';

const cx = classNames.bind(styles);
const ITEMS_PER_PAGE = 16;

function WardrobePage() {
    const [navigation, setNavigation] = useState([]);
    const [filter, setFilter] = useState([]);
    const [value, setValue] = useState([]);
    const [showResultFilter, setShowResultFilter] = useState(false);
    const [valueSort, setValueSort] = useState('');
    const [arrProduct, setArrProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [arrBlogSmall, setArrBlogSmall] = useState([]);

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

        // API Filter
        const fetchApiFilter = async () => {
            try {
                const response = await request.get('/filters');
                const newData = [];

                response.map((data) => {
                    if (data.id === 'f_2') {
                        newData.push(data);
                        return setFilter(newData);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchApiFilter();

        // API Blog
        const fetchApiBlog = async () => {
            try {
                const response = await request.get('/blogs');

                setArrBlogSmall(response.slice(0, 2));
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiBlog();
    }, []);

    useEffect(() => {
        // API Product
        const fetchApiProduct = async () => {
            try {
                const response = await request.get('/products');
                const newData = [];
                const key = param.key.slice(1);

                response.map((data) => {
                    if (data.wardrobe === key) {
                        newData.push(data);
                        setArrProduct(newData);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiProduct();
    }, [param]);

    const handleValueChange = (childValue) => {
        setValue([...value, childValue]);
        setShowResultFilter(true);
    };

    const handleRemoveKey = (index) => {
        const newArray = [...value];
        newArray.splice(index, 1);
        setValue(newArray);
    };

    const sortby = (key, value) => {
        setValueSort(value);

        switch (key) {
            case 'alpha-asc':
                const sortAlphaAsc = [...currentItems].sort((a, b) =>
                    a.name_product.toLowerCase().localeCompare(b.name_product.toLowerCase()),
                );
                setArrProduct(sortAlphaAsc);
                break;

            case 'alpha-desc':
                const sortAlphaDesc = [...currentItems].sort((a, b) =>
                    b.name_product.toLowerCase().localeCompare(a.name_product.toLowerCase()),
                );
                setArrProduct(sortAlphaDesc);
                break;

            case 'price-asc':
                const sortPriceAsc = [...currentItems].sort((a, b) => {
                    const priceA = a.price_product - (a.price_product * a.sale) / 100;
                    const priceB = b.price_product - (b.price_product * b.sale) / 100;
                    return priceA - priceB;
                });
                setArrProduct(sortPriceAsc);
                break;

            case 'price-desc':
                const sortPriceDesc = [...currentItems].sort((a, b) => {
                    const priceA = a.price_product - (a.price_product * a.sale) / 100;
                    const priceB = b.price_product - (b.price_product * b.sale) / 100;
                    return priceB - priceA;
                });
                setArrProduct(sortPriceDesc);
                break;

            case 'create-asc':
                const sortCreateAsc = [...currentItems].sort((a, b) => {
                    const dateA = new Date(a.create_at);
                    const dateB = new Date(b.create_at);
                    return dateA - dateB;
                });
                setArrProduct(sortCreateAsc);
                break;

            case 'create-desc':
                const sortCreateDesc = [...currentItems].sort((a, b) => {
                    const dateA = new Date(a.create_at);
                    const dateB = new Date(b.create_at);
                    return dateB - dateA;
                });
                setArrProduct(sortCreateDesc);
                break;

            default:
                break;
        }
    };

    return (
        <>
            <Breadcrumb className={cx('row container-app')}>
                <Breadcrumb.Item href={configs.routes.homePage}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>{param.value}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <div className={cx('col-lg-3 col-md-4 col-12 d-none d-lg-block', 'side-bar')}>
                    <div className={cx('side-menu')}>
                        <Link to={'/product-page/' + `@all` + '/' + `Tất cả sản phẩm`}>
                            <h2 className={cx('title-module')}>Danh mục</h2>
                        </Link>

                        {navigation.map((result) => (
                            <MenuItem key={result.id} data={result} />
                        ))}
                    </div>

                    <div className={cx('side-filter')}>
                        <div className={cx('module-filter')}>
                            <h2>
                                Lọc sản phẩm
                                <span>Tìm kiếm dễ dàng chính xác</span>
                            </h2>
                        </div>

                        <div className={cx(showResultFilter ? 'd-block' : 'd-none', 'filter-selected')}>
                            <div className={cx('header')}>
                                <span>
                                    <Icons.ArrowLeftIcon /> Bạn chọn
                                </span>
                                <button>
                                    Bỏ hết <Icons.NextIcon />
                                </button>
                            </div>
                            <div className={cx('content')}>
                                <ul>
                                    {value.map((result, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => {
                                                    handleRemoveKey(index);
                                                }}
                                            >
                                                <Icons.CloseIcon />
                                                {result}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={cx('content-filter')}>
                            {filter.map((result) => (
                                <Filter key={result.id} data={result} onValueChange={handleValueChange} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cx('col-lg-9 col-md-12 col-12', 'main-content')}>
                    <div className={cx('d-flex justify-content-between', 'title-wrapper')}>
                        <h1 className={cx('title-module')}>{param.value}</h1>
                        <div className={cx('sort')}>
                            <div className={cx('sort-cate')}>
                                <span>
                                    Sắp xếp: <em>{valueSort === '' ? 'Mặc định' : valueSort}</em>
                                </span>
                                <ul>
                                    <li className="btn-quick-sort">
                                        <button onClick={() => sortby('alpha-asc', 'Tên A-Z')}>Tên A-Z</button>
                                    </li>
                                    <li className="btn-quick-sort">
                                        <button onClick={() => sortby('alpha-desc', 'Tên Z-A')}>Tên Z-A</button>
                                    </li>
                                    <li className="btn-quick-sort">
                                        <button onClick={() => sortby('price-asc', 'Giá tăng dần')}>
                                            Giá tăng dần
                                        </button>
                                    </li>
                                    <li className="btn-quick-sort">
                                        <button onClick={() => sortby('price-desc', 'Giá giảm dần')}>
                                            Giá giảm dần
                                        </button>
                                    </li>
                                    <li className="btn-quick-sort">
                                        <button onClick={() => sortby('create-desc', 'Mới nhất')}>Mới nhất</button>
                                    </li>
                                    <li className="btn-quick-sort">
                                        <button onClick={() => sortby('create-asc', 'Cũ nhất')}>Cũ nhất</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx('list-products')}>
                        <div className={cx('row')}>
                            {currentItems.length <= 0 && (
                                <Alert variant={'warning'}>Sản phẩm đang được cập nhật.</Alert>
                            )}
                            {currentItems.map((result) => (
                                <div key={result.id} className={cx('col-6 col-md-3')}>
                                    <CardProduct data={result} typeDefault={true} checkData="product" />
                                </div>
                            ))}
                        </div>
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
                                    className={cx(currentPage + 1 >= currentItems.length ? 'd-none' : 'd-inline-block')}
                                >
                                    {currentPage + 1}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className={cx(currentPage + 1 >= currentItems.length ? 'd-none' : 'd-inline-block')}
                                />
                            </Pagination>
                        </div>
                    </div>

                    {arrBlogSmall.length >= 1 && (
                        <div className={cx('row')}>
                            <h1 className={cx('title-module')}>Bài viết liên quan</h1>

                            {arrBlogSmall.map((result) => (
                                <div key={result.id} className={cx('col-md-6 col-12')}>
                                    <BlogSmall data={result} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default WardrobePage;
