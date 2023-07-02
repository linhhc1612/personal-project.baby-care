import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({
    id,
    name,
    value,
    type,
    placeholder,
    rows,
    pattern,
    required = true,
    className,
    onChange,
    ...passProps
}) {
    let Comp = 'input';
    const classes = cx('', { [className]: className });
    const props = {
        id,
        name,
        value,
        type,
        placeholder,
        rows,
        pattern,
        required,
        className,
        onChange,
        ...passProps,
    };

    if (type) {
        Comp = 'input';
    } else {
        Comp = 'textarea';
    }

    return <Comp className={classes} {...props}></Comp>;
}

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.any,
    pattern: PropTypes.any,
    classNames: PropTypes.string,
    required: PropTypes.bool,
};

export default Input;
