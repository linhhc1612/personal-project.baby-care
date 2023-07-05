/* eslint-disable jsx-a11y/iframe-has-title */
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import styles from './StorePage.module.scss';
import configs from '~/configs';

const cx = classNames.bind(styles);

function StorePage() {
    const param = useParams();

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
            </div>
        </>
    );
}

export default StorePage;
