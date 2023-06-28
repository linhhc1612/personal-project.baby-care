import { Container } from 'react-bootstrap';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

function DefaultLayout({ children }) {
    return (
        <Container fluid>
            <Header />
            {children}
            <Footer />
        </Container>
    );
}

export default DefaultLayout;
