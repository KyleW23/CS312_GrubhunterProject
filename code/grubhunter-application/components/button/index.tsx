import React from 'react';
import styles from '@/components/button/index.module.css';

interface PropsInterface {
    disabled: boolean;
    children?: React.ReactNode;
    variant?: 'blue' | 'outline';
    clickHandler?: () => void;
}

const Button = ({
    disabled,
    children,
    variant = 'blue',
    clickHandler,
}: PropsInterface) => {
    const helper = () => {
        if (!disabled) {
            return (
                <button
                    className={`${styles.root} ${styles[variant]}`}
                    onClick={clickHandler}
                >
                    {children}
                </button>
            );
        } else {
            return (
                <button
                    className={`${styles.root} ${styles.disabled} ${styles[variant]}`}
                >
                    {children}
                </button>
            );
        }
    };

    return <div>{helper()}</div>;
};

export default Button;
