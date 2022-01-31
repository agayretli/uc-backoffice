/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { LoginProps } from 'src/common/types';

import AuthService from 'src/services/auth.service';

const Header: FC<LoginProps> = ({ setLogin }: LoginProps) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const toggleDropdown = () => {
        setOpen(!isOpen);
    };

    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon' />
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <div
                            className='flex-shrink-0 dropdown ms-auto'
                            onClick={toggleDropdown}
                            onKeyDown={toggleDropdown}
                        >
                            <Link
                                className='d-block link-dark text-decoration-none dropdown-toggle show'
                                id='dropdownUser2'
                                data-bs-toggle='dropdown'
                                aria-expanded='true'
                                to='/'
                            >
                                Settings
                            </Link>
                            <ul
                                className={`dropdown-menu text-small shadow ${isOpen ? 'show' : ''}`}
                                aria-labelledby='dropdownUser2'
                                style={{
                                    position: 'absolute',
                                    inset: '0px auto auto 0px',
                                    margin: '0px',
                                    transform: 'translate3d(-110px, 34px, 0px)',
                                }}
                                data-popper-placement='bottom-end'
                            >
                                <li>
                                    <Link className='dropdown-item' to='/profile'>
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <hr className='dropdown-divider' />
                                </li>
                                <li>
                                    <Link
                                        className='dropdown-item'
                                        onClick={() => {
                                            AuthService.logout();
                                            setLogin(false);
                                        }}
                                        to=''
                                    >
                                        Sign out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;
