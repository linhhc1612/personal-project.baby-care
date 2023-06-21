import config from '~/configs';

// Layouts
import { DefaultLayout } from '~/layouts';

import HomePage from '~/pages/HomePage';
import ProductPage from '~/pages/ProductPage';
import NewsPage from '~/pages/NewsPage';
import FavoritePage from '~/pages/FavoritePage';
import ContactPage from '~/pages/ContactPage';
import StorePage from '~/pages/StorePage';
import WardrobePage from '~/pages/WardrobePage';
import CartPage from '~/pages/CartPage';
import LoginPage from '~/pages/LoginPage';
import SignUpPage from '~/pages/SignUpPage';
import ForgotPage from '~/pages/ForgotPage';
import ProductDetailPage from '~/pages/ProductDetailPage';
import NewsDetailPage from '~/pages/NewsDetailPage';
import SearchPage from '~/pages/SearchPage';

// Public routes
const publicRoutes = [
    { path: config.routes.homePage, component: HomePage, layout: DefaultLayout },
    { path: config.routes.productPage, component: ProductPage, layout: DefaultLayout },
    { path: config.routes.newsPage, component: NewsPage, layout: DefaultLayout },
    { path: config.routes.favoritePage, component: FavoritePage, layout: DefaultLayout },
    { path: config.routes.contactPage, component: ContactPage, layout: DefaultLayout },
    { path: config.routes.storePage, component: StorePage, layout: DefaultLayout },
    { path: config.routes.wardrobePage, component: WardrobePage, layout: DefaultLayout },
    { path: config.routes.cartPage, component: CartPage, layout: DefaultLayout },
    { path: config.routes.loginPage, component: LoginPage, layout: DefaultLayout },
    { path: config.routes.signUpPage, component: SignUpPage, layout: DefaultLayout },
    { path: config.routes.forgotPage, component: ForgotPage, layout: DefaultLayout },
    { path: config.routes.productDetailPage, component: ProductDetailPage, layout: DefaultLayout },
    { path: config.routes.newsDetailPage, component: NewsDetailPage, layout: DefaultLayout },
    { path: config.routes.searchPage, component: SearchPage, layout: DefaultLayout },
];

// Privite routes
const priviteRoutes = [];

export { publicRoutes, priviteRoutes };
