import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

function Filter({ data, onValueChange, isChecked }) {
    const handleChange = (e) => {
        const value = e.target.id;
        // eslint-disable-next-line no-self-compare
        onValueChange(value === value ? value : 'Invalid');
    };

    return (
        <>
            <div className={cx('filter-item')}>
                <div className={cx('title')}>
                    <h2>
                        <span>{data.name_filter}</span>
                    </h2>
                </div>
                <div className={cx('content')}>
                    <ul>
                        {data.children.map((result) => (
                            <li key={result.id}>
                                <span>
                                    <label>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id={result.children_name}
                                                label={result.children_name}
                                                onChange={handleChange}
                                            />
                                        </Form>
                                    </label>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

Filter.propTypes = {
    data: PropTypes.object,
};

export default Filter;
