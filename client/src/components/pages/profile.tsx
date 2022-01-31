import React, { FC, useState } from 'react';

import { ProfileProps } from 'src/common/types';
import AuthService from 'src/services/auth.service';

import Breadcrumb from '../elements/breadcrumb';
import Heading from '../elements/heading';

const Profile: FC = () => {
    const currentUser = AuthService.getCurrentUser();

    const initialValues: ProfileProps = {
        name: currentUser.name,
        password: '',
    };

    // Profile controller does not work with uncontrolled inputs, hence; I used controlled inputs
    const [values, setValues] = useState<ProfileProps>(initialValues);

    // Contains error message in case of error in profile controller
    // Should change type specifier later
    const [errorMessage, setErrorMessage] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const profileController = () => {
        if (values.name === currentUser.name) {
            setErrorMessage('Name is same');
            return;
        }

        AuthService.setProfile(values.name, currentUser.email, values.password).then(
            (response) => {
                setErrorMessage(response.data.message.toString());
                AuthService.setCurrentUser(response.data.userData);
                if (response.data.reload.toString() === 'true') AuthService.logout();
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
        event.preventDefault();
        profileController();
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
        <div className='mt-3'>
            <Breadcrumb parent='' parentLink='' current='Profile' />
            <Heading title='Profile' detail='Here you can update your profile informations.' />
            <div className='row'>
                <form className='col-12 col-sm-4' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Fullname</label>
                        <input
                            type='text'
                            className='form-control form-control-sm'
                            id='name'
                            name='name'
                            defaultValue={currentUser.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className='form-control form-control-sm'
                            id='password'
                            name='password'
                            aria-describedby='passwordHelp'
                            onChange={handleChange}
                        />
                        <small id='passwordHelp' className='form-text text-muted'>
                            If you do not want to change your password, leave this field blank.
                        </small>
                    </div>
                    <button type='submit' className='btn btn-success btn-sm mt-3'>
                        Save
                    </button>
                    {/* Display error message in ogin window if an error occurred in login controller */}
                    {errorMessage !== '' && <p className='mb-0 mt-2 text-center'>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Profile;
