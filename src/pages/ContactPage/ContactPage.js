/* eslint-disable jsx-a11y/iframe-has-title */
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import * as Icons from '~/components/Icons';
import configs from '~/configs';
import styles from './ContactPage.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ContactPage() {
    const [formData, setFormData] = useState({
        author: '',
        email: '',
        body: '',
    });
    const [errors, setErrors] = useState({});

    const param = useParams();

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
                <Breadcrumb.Item active>{param.value}</Breadcrumb.Item>
            </Breadcrumb>

            <div className={cx('row', 'container-app')}>
                <h2 className={cx('title-module')}>{param.value}</h2>
                <div className={cx('col-12 mb-5')}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.41824098113!2d105.75559055!3d10.035323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883fbc944b83%3A0x77fc34233e5e1320!2zTmluaCBLaeG7gXUsIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1688550717022!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div className={cx('col-md-4 col-12')}>
                    <div className={cx('item-contact')}>
                        <div className={cx('img')}>
                            <Icons.LocationDotIcon />
                        </div>
                        <div className={cx('content')}>
                            Địa chỉ:
                            <p>Tầng 6 Tòa Ladeco 266 Đội Cấn, Hà Nội</p>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-4 col-12')}>
                    <div className={cx('item-contact')}>
                        <div className={cx('img')}>
                            <Icons.QuestionIcon />
                        </div>
                        <div className={cx('content')}>
                            Gửi thắc mắc:
                            <p>linhhc.1612@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-4 col-12')}>
                    <div className={cx('item-contact')}>
                        <div className={cx('img')}>
                            <Icons.PhoneIcon />
                        </div>
                        <div className={cx('content')}>
                            Điện thoại:
                            <p>0329.***.***</p>
                        </div>
                    </div>
                </div>

                <div className={cx('col-12')}>
                    <form onSubmit={handleSubmit} className={cx('form-comment')} noValidate>
                        <h2 className={cx('title-module')}>Gửi liên hệ</h2>
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

export default ContactPage;
