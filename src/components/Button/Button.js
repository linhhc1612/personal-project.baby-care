import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outlinePrimary = false,
    outline = false,
    rounded = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    leftIcon,
    rightIcon,
    className,
    onClick,
    children,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // Delete event when disabled btn
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary: primary,
        outlinePrimary: outlinePrimary,
        outline: outline,
        rounded: rounded,
        text: text,
        disabled: disabled,
        small: small,
        large: large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outlinePrimary: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Button;
