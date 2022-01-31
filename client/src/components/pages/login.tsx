import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { LoginProps, UserInfoProps } from 'src/common/types';
import AuthService from 'src/services/auth.service';

import 'src/assets/style/login.scss';

const Login: FC<LoginProps> = ({ setLogin }: LoginProps) => {
    const initialValues: UserInfoProps = {
        email: '',
        password: '',
    };

    // Login controller does not work with uncontrolled inputs, hence; I used controlled inputs
    const [values, setValues] = useState<UserInfoProps>(initialValues);

    // Contains error message in case of error in login controller
    // Should change type specifier later
    const [errorMessage, setErrorMessage] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const loginController = () => {
        AuthService.login(values.email, values.password).then(
            () => {
                setLogin(true);
            },
            (error) => {
                setErrorMessage(
                    (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString()
                );
            }
        );
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleSubmit = (event: React.FormEvent) => {
        /* Prevent default behaviour before submitting the form.
        If this would not used, submitting the form results in 
        reloading the login page with email and password routed */
        event.preventDefault();
        loginController();
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Get name and value of input from target event
        const { name, value } = event.target;

        // Set state for only the changed value
        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <div className='form-signin row m-auto'>
            <div className='col-6 d-flex flex-column justify-content-center'>
                <small className='d-block fw-lighter fs-6 text-muted'>Welcome to</small>
                <h5 className='fw-light mt-0'>User Communication</h5>
            </div>
            <div className='col-6'>
                <form data-testid='login-form' onSubmit={handleSubmit}>
                    <div className='form-outline mb-2'>
                        <input
                            type='email'
                            id='email'
                            className='form-control form-control-sm rounded-pill'
                            name='email'
                            value={values.email}
                            placeholder='Email Adress'
                            // Should require at least 2 characters after '@'
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                            required
                            onChange={handleChange}
                        />
                        <label className='form-label visually-hidden' htmlFor='email'>
                            Email address
                        </label>
                    </div>

                    <div className='form-outline mb-3'>
                        <input
                            type='password'
                            id='password'
                            className='form-control form-control-sm rounded-pill'
                            name='password'
                            value={values.password}
                            placeholder='Password'
                            required
                            onChange={handleChange}
                        />
                        <label className='form-label visually-hidden' htmlFor='password'>
                            Password
                        </label>
                    </div>

                    <div className='d-flex justify-content-between align-items-center small'>
                        <div className='form-check mb-0'>
                            <input
                                type='checkbox'
                                id='checkbox'
                                className='form-check-input mr-2'
                                name='checkbox'
                                value=''
                            />
                            <label className='form-check-label' htmlFor='checkbox'>
                                Remember
                            </label>
                        </div>
                        <Link to='/forgot' className='text-secondary text-decoration-none'>
                            Forgot?
                        </Link>
                    </div>

                    <div className='text-center text-lg-start mt-0 pt-2'>
                        <input
                            type='submit'
                            name='submit'
                            id='submit'
                            value='Login'
                            className='btn btn-light btn-sm w-100 rounded-pill'
                        />
                    </div>

                    {/* Display error message in ogin window if an error occurred in login controller */}
                    {errorMessage !== '' && <p className='mb-0 mt-2 text-center'>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
