import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkRegister } from '../../services/register';
import { useAppDispatch } from '../../../app/model/store.model';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../../shared/ui/FormInput/FormInput';
import { AuthFormWrapper } from '../AuthFormWrapper/AuthFormWrapper';
import { Button } from '../../../shared/ui/Button/Button';

interface RegFormProps {}

export const RegForm: FC<RegFormProps> = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLoginClick = () => {
        navigate('/auth/login');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = { username, email, password, firstName, lastName };
            dispatch(thunkRegister(data))
                .then(() => {
                    navigate('/auth/login');
                })
                .catch(e => {
                    console.log(e.response.data.message);
                    setError(e.response?.data?.message?.join('; '));
                });
        } else {
            setError('Passwords do not match');
        }
    };

    return (
        <AuthFormWrapper>
            <section className='bg-gray-50 dark:bg-gray-900'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                                Create and account
                            </h1>
                            <form className='space-y-4 md:space-y-6' action='#' onSubmit={handleSubmit}>
                                <FormInput
                                    label={'Your username'}
                                    value={username}
                                    onChange={setUsername}
                                />
                                <FormInput label={'Your email'} value={email} onChange={setEmail} />
                                <FormInput
                                    label={'Your first name'}
                                    value={firstName}
                                    onChange={setFirstName}
                                />
                                <FormInput
                                    label={'Your last name'}
                                    value={lastName}
                                    onChange={setLastName}
                                />
                                <FormInput label={'Password'} value={password} onChange={setPassword} />
                                <FormInput
                                    label={'Confirm password'}
                                    placeholder={''}
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                />

                                <Button
                                    text='Create an account'
                                    type='submit'
                                    className='w-full mx-0 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                />
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
                                <p className='text-red-500 font-md m-2 text-center whitespace-pre-wrap'>
                                    {error ? 'Error: ' + error : ''}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AuthFormWrapper>
    );
};
