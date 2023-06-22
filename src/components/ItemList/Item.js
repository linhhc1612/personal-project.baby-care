import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ItemList.module.scss';
import * as Icons from '~/components/Icons';
import ItemSmall from './ItemSmall';

const cx = classNames.bind(styles);

function Item({ data }) {
    return (
        <>
            {!!data.children ? (
                <>
                    <button className={cx('nav-item')}>
                        <span className={cx('nav-link')}>{data.title}</span>
                        <Icons.DownIcon className={cx('ms-1 text-white')} />
                        <div className={cx('item-small')}>
                            {data.children.map((result) => (
                                <ItemSmall key={result.id} data={result} checkKey={data.key} />
                            ))}
                        </div>
                    </button>
                </>
            ) : (
                <>
                    <NavLink
                        to={data.key === '' ? '/' : '/' + data.key}
                        className={(nav) => cx('nav-item', { active: nav.isActive })}
                    >
                        <span className={cx('nav-link')}>{data.title}</span>{' '}
                    </NavLink>
                </>
            )}
        </>
    );
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Item;
