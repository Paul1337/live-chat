import React, { FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../app/model/store.model';
import { thunkLogIn } from '../../services/login';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../../shared/ui/FormInput/FormInput';
import { AuthFormWrapper } from '../AuthFormWrapper/AuthFormWrapper';

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = props => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nagivate = useNavigate();

    const onRegClick = () => {
        nagivate('/auth/reg');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const data = { username, password };
        console.log('login, data', data);
        dispatch(thunkLogIn(data)).then(() => {
            nagivate('/chat');
        });
    };

    return (
        <AuthFormWrapper>
            <section className='bg-gray-50 dark:bg-gray-900'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                                Sign in to your account
                            </h1>
                            <form className='space-y-4 md:space-y-6' action='#' onSubmit={handleSubmit}>
                                <FormInput label='username' value={username} onChange={setUsername} />
                                <FormInput label='password' value={password} onChange={setPassword} />

                                <button
                                    type='submit'
                                    className='w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                >
                                    Sign in
                                </button>
                                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                    Don’t have an account yet?{' '}
                                    <a
                                        href='#'
                                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                                        onClick={onRegClick}
                                    >
                                        Sign up
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AuthFormWrapper>
    );
};
