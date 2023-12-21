import React, { FC } from 'react';

interface FormInputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    name?: string;
}

export const FormInput: FC<FormInputProps> = props => {
    const { onChange, value, name, label, placeholder = props.label } = props;

    return (
        <div>
            <label
                htmlFor={name}
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
                {label}
            </label>
            <input
                type='text'
                name={name}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};
