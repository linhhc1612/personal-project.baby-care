import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import * as request from '~/untils/httpRequest';
import * as images from '~/assets/images';
import configs from '~/configs';
import styles from './LoginPage.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formData2, setFormData2] = useState({
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [errors2, setErrors2] = useState({});
    const [showForgot, setShowForgot] = useState(false);
    const [userLogin, setUserLogin] = useState({ email: '', username: '', avt: '' });

    const param = useParams();

    useEffect(() => {
        localStorage.setItem('userLogin', JSON.stringify(userLogin));
    }, [userLogin]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleInputChange2 = (e) => {
        setFormData({
            ...formData2,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.email.trim() === '' || !emailRegex.test(formData.email)) {
            validationErrors.email = 'Email không hợp lệ.';
        }

        if (formData.password.trim() === '') {
            validationErrors.password = 'Vui lòng nhập mật khẩu.';
        }

        // Handle Login
        try {
            if (formData.email !== '') {
                const response = await request.get(`/users`);

                response.forEach((data) => {
                    if (data.email === formData.email && data.password === formData.password) {
                        let user = {
                            email: formData.email,
                            username: data.username,
                            avt: data.avt,
                        };
                        setUserLogin(user);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }

        // Show validate
        if (Object.keys(validationErrors).length === 0) {
            setFormData({ email: '', password: '' });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        const validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData2.email.trim() === '' || !emailRegex.test(formData2.email)) {
            validationErrors.email = 'Email không hợp lệ.';
        }

        if (Object.keys(validationErrors).length === 0) {
            setFormData2({ email: '' });
            setErrors2({});
        } else {
            setErrors2(validationErrors);
        }
    };

    return (
        <>
            <Breadcrumb className={cx('row container-app')}>
                <Breadcrumb.Item href={configs.routes.homePage}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>{param.value}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <div className={cx('col-lg-10 offset-lg-1')}>
                    <div className={cx('d-group')}>
                        <div className={cx('left-col')}>
                            <div className={cx('group')}>
                                {showForgot === false && (
                                    <>
                                        <h1>{param.value}</h1>
                                        <form onSubmit={handleSubmit} className={cx('form')} noValidate>
                                            <div className={cx('m-0 my-3 p-0 border-0', 'group-input')}>
                                                <label className={cx('fw-bold')}>
                                                    Email <span className={cx('text-danger')}>*</span>
                                                </label>
                                                <Input
                                                    id={'email'}
                                                    name={'email'}
                                                    type={'email'}
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder={'Email'}
                                                    required
                                                />
                                                {errors.email && (
                                                    <span className={cx('text-error-message')}>{errors.email}</span>
                                                )}
                                            </div>
                                            <div className={cx('m-0 my-3 p-0 border-0', 'group-input')}>
                                                <label className={cx('fw-bold')}>
                                                    Mật khẩu <span className={cx('text-danger')}>*</span>
                                                </label>
                                                <Input
                                                    id={'password'}
                                                    name={'password'}
                                                    type={'password'}
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    placeholder={'Mật khẩu'}
                                                    required
                                                />
                                                {errors.password && (
                                                    <span className={cx('text-error-message')}>{errors.password}</span>
                                                )}
                                            </div>
                                            <Button className={'text-uppercase fw-bold'} primary rounded>
                                                Đăng nhập
                                            </Button>
                                        </form>
                                        <div className={cx('social-login')}>
                                            <p className={cx('or-line')}>
                                                <span>Hoặc đăng nhập bằng</span>
                                            </p>
                                            <Link
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    alert('Tính năng đang phát triển');
                                                }}
                                            >
                                                <img src={images.default.imgFacebook} alt="Social" />
                                            </Link>
                                            <Link
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    alert('Tính năng đang phát triển');
                                                }}
                                            >
                                                <img src={images.default.imgGoogle} alt="Social" />
                                            </Link>

                                            <p className={cx('d-block my-3', 'link-click')}>
                                                Bạn quên mật khẩu bấm{' '}
                                                <span onClick={() => setShowForgot(true)}>vào đây</span>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                            {showForgot === true && (
                                <>
                                    <h2>Quên mật khẩu</h2>
                                    <p>Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.</p>
                                    <form onSubmit={handleSubmit2} className={cx('form')} noValidate>
                                        <div className={cx('m-0 my-3 p-0 border-0', 'group-input')}>
                                            <Input
                                                id={'email2'}
                                                name={'email2'}
                                                type={'email'}
                                                value={formData2.email}
                                                onChange={handleInputChange2}
                                                placeholder={'Email'}
                                                required
                                            />
                                            {errors2.email && (
                                                <span className={cx('text-error-message')}>{errors2.email}</span>
                                            )}
                                        </div>
                                        <Button className={'text-uppercase fw-bold mb-3'} primary rounded>
                                            Gửi yêu cấu
                                        </Button>
                                        <Button
                                            onClick={() => setShowForgot(false)}
                                            className={'text-uppercase fw-bold mb-3'}
                                            outline
                                            rounded
                                        >
                                            Hủy
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                        <div className={cx('text-white', 'right-col')}>
                            <h4>Quyền lợi với thành viên</h4>
                            <div>
                                <p>Vận chuyển siêu tốc</p>
                                <p>Sản phẩm đa dạng</p>
                                <p>Đổi trả dễ dàng</p>
                                <p>Tích điểm đổi quà</p>
                                <p>Được giảm giá cho lần mua tiếp theo lên đến 10% Đăng ký</p>
                            </div>
                            <Button
                                to={`/sign-up-page/Đăng ký tài khoản`}
                                className={'text-uppercase fw-bold border-white text-white'}
                                outline
                                rounded
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
