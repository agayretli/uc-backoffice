/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/rules-of-hooks */
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from '../components/pages/login';

function renderLoginForm() {
    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const [, setLogin] = useStateMock(false);
    return render(
        <Router>
            <Login setLogin={setLogin} />
        </Router>
    );
}

describe('<Login />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should display a blank login form, with remember me checked by default', async () => {
        const { findByTestId } = renderLoginForm();

        const loginForm = await findByTestId('login-form');

        expect(loginForm).toHaveFormValues({
            email: '',
            password: '',
            checkbox: false,
        });
    });
});
