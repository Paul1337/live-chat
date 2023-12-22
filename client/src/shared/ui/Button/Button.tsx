import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';
import { ButtonProps as BtnProps } from 'react-html-props';

interface ButtonProps extends BtnProps {
    text?: string;
}

export const Button: FC<ButtonProps> = props => {
    const { text, className, children, ...otherProps } = props;
    return (
        <button
            className={'hover:bg-slate-200 p-2 rounded-md text-center m-2 border '.concat(
                className ?? ''
            )}
            {...otherProps}
        >
            {text ?? children}
        </button>
    );
};
