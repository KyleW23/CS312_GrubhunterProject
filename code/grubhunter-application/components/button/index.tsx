import React from 'react';
import styles from '@/components/button/index.module.css';

interface PropsInterface {
    state: string;
    children: string;
    variant: string;
    clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ state, children, variant, clickHandler }: PropsInterface) => {
    const helper = () => {
        if (state === 'active') {
            return (
                <button
                    className={`${styles.root} ${styles[state]} ${styles[variant]}`}
                    onClick={clickHandler}
                >
                    {children}
                </button>
            );
        } else {
            return (
                <button className={`${styles.root} ${state} ${variant}`}>
                    {children}
                </button>
            );
        }
    };

    return <div>{helper()}</div>;
};

export default Button;
