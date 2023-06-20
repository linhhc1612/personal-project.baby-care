import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <Container fluid>
            <Header />
            <div className={cx('row px-5')}>{children}</div>
            <Footer />
        </Container>
    );
}

export default DefaultLayout;
