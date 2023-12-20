import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkRegister } from '../../services/register';
import { useAppDispatch } from '../../../app/model/store.model';
import { useNavigate } from 'react-router-dom';

interface RegFormProps {
    onLoginClick: () => void;
}

export const RegForm: FC<RegFormProps> = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const nagivate = useNavigate();

    const { onLoginClick } = props;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = { username, email, password };
            console.log('login, data', data);
            dispatch(thunkRegister(data)).then(() => {
                onLoginClick();
            });
        }
    };

    return (
        <section className='bg-gray-50 dark:bg-gray-900'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                            Create and account
                        </h1>
                        <form className='space-y-4 md:space-y-6' action='#' onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor='username'
                                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Your username
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='username'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Your email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='name@company.com'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='firstName'
                                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Your first name
                                </label>
                                <input
                                    type='text'
                                    name='firstName'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='name@company.com'
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Your last name
                                </label>
                                <input
                                    type='text'
                                    name='email'
                                    id='email'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='name@company.com'
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='confirm-password'
                                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Confirm password
                                </label>
                                <input
                                    type='confirm-password'
                                    name='confirm-password'
                                    id='confirm-password'
                                    placeholder='••••••••'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type='submit'
                                className='w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                            >
                                Create an account
                            </button>
                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Already have an account?{' '}
                                <a
                                    href='#'
                                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                    onClick={onLoginClick}
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
