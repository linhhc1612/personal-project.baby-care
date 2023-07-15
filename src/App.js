import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
    useEffect(() => {
        document.title = 'Hệ thống cửa hàng đồ mẹ và bé	'; // Thay đổi tên title ở đây
    }, []);

    return (
        // Deloy
        <Router>
            <Fragment>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : route.layout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Fragment>
        </Router>
    );
}

export default App;
