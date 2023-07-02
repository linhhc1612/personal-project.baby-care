import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import * as request from '~/untils/httpRequest';
import configs from '~/configs';
import styles from './NewsDetailPage.module.scss';
import { MenuItem } from '~/components/MenuCanvas';
import { BlogSmall } from '~/components/Blog';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function NewsDetailPage() {
    const [navigation, setNavigation] = useState([]);
    const [arrBlogSmall, setArrBlogSmall] = useState([]);
    const [contentBlog, setContentBlog] = useState([]);
    const [objBlog, setObjBlog] = useState([]);
    const [nextBlog, setNextBlog] = useState([]);
    const [formData, setFormData] = useState({
        author: '',
        email: '',
        body: '',
    });
    const [errors, setErrors] = useState({});

    const param = useParams();

    useEffect(() => {
        // API Navigation
        const fetchApiNav = async () => {
            try {
                const response = await request.get('db/data-navigation.json');
                return setNavigation(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApiNav();

        // API Blog
        const fetchApiBlog = async () => {
            try {
                const response = await request.get('db/data-blog.json');
                const data = response.data;
                const newData = [];

                response.data.forEach((data) => {
                    if (data.id === param.id) {
                        newData.push(data);
                        newData.forEach((data) => {
                            setContentBlog(data.content);
                        });

                        return setObjBlog(data);
                    } else {
                        newData.push(data);
                        return setNextBlog(newData);
                    }
                });

                setArrBlogSmall(data.slice(0, 4));
            } catch (error) {
                console.log(error);
            }
        };
        fetchApiBlog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param.id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.author.trim() === '') {
            validationErrors.author = 'Vui lòng nhập họ tên.';
        }

        if (formData.email.trim() === '' || !emailRegex.test(formData.email)) {
            validationErrors.email = 'Email không hợp lệ.';
        }

        if (formData.body.trim() === '') {
            validationErrors.body = 'Vui lòng nhập nội dung.';
        }

        if (Object.keys(validationErrors).length === 0) {
            console.log('Gửi form');
            setFormData({ author: '', email: '', body: '' });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <>
            <Breadcrumb className={cx('row container-app')}>
                <Breadcrumb.Item href={configs.routes.homePage}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href={'/news-page/Tin tức'}>Tin tức </Breadcrumb.Item>
                <Breadcrumb.Item active>{param.name}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <div className={cx('col-lg-3 col-12 order-2 order-lg-1 mb-4', 'side-bar')}>
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
                <div className={cx('col-lg-9 col-12 order-1 order-lg-2 mb-4', 'main-content')}>
                    <h2 className={cx('title-module')}>{param.name}</h2>
                    <div className={cx('time-post')}>
                        <span>Người đăng:</span>
                        <b className={cx('mx-2')}>{objBlog.author}</b>
                        <span>|</span>
                        <span className={cx('mx-2')}>{objBlog.create_at}</span>
                    </div>
                    <div className={cx('wrapper')}>
                        <div className={cx('rte')}>
                            <p>
                                <b>{objBlog.description}</b>
                            </p>
                            <div className={cx('content')}>
                                {contentBlog.map((data, index) => {
                                    let Comp = data.type;
                                    let CompChildren = data.transform;

                                    return (
                                        <Comp key={index} dir="ltr" className={cx('mb-3')}>
                                            <CompChildren>{data.description}</CompChildren>
                                        </Comp>
                                    );
                                })}
                            </div>
                            <div className={cx('blog-more')}>
                                <span>Bài viết liên quan:</span>
                                {nextBlog.map(
                                    (data, index) =>
                                        data.title !== param.name && (
                                            <div key={index}>
                                                <Link to={'/news-detail-page/' + `${data.id}/${data.title}`}>
                                                    <span className={cx('text')}>{data.title}</span>
                                                </Link>
                                            </div>
                                        ),
                                )}
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className={cx('form-comment')} noValidate>
                        <h5 className={cx('title-form-comment')}>Thảo luận về chủ đề này</h5>
                        <div className={cx('row')}>
                            <div className={cx('col-md-6 col-12')}>
                                <Input
                                    id={'full-name'}
                                    name={'author'}
                                    type={'text'}
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    placeholder={'Họ tên'}
                                    required
                                />
                                {errors.author && <span className={cx('text-error-message')}>{errors.author}</span>}
                            </div>
                            <div className={cx('col-md-6 col-12')}>
                                <Input
                                    id={'email'}
                                    name={'email'}
                                    type={'email'}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={'Email'}
                                    required
                                />
                                {errors.email && <span className={cx('text-error-message')}>{errors.email}</span>}
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('col-12')}>
                                <Input
                                    id={'comment'}
                                    name={'body'}
                                    value={formData.body}
                                    onChange={handleInputChange}
                                    placeholder={'Nội dung'}
                                    rows={6}
                                    required
                                />
                                {errors.body && <span className={cx('text-error-message')}>{errors.body}</span>}
                            </div>
                            <div className={cx('col-12')}>
                                <Button primary rounded>
                                    Gửi bình luận
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewsDetailPage;
