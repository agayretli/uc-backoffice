import React, { FC, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Breadcrumb from '../elements/breadcrumb';
import Heading from '../elements/heading';

const Dashboard: FC = () => {
    return (
        <div className='mt-3'>
            <Breadcrumb parent='' parentLink='' current='Dashboard' />
            <Heading
                title='Dashboard'
                detail='Welcome to Arçelik Guest Management panel. Here you can controll all broadcast streams
                    installed in your hotel and manage television and set-top boxes.'
            />
            <ul className='nav nav-pills flex-column mb-auto small mt-3 p-3 d-none d-md-flex'>
                <li className='nav-item'>
                    {/* Adding exact fixes the navigation bug */}
                    <NavLink exact to='/users' activeClassName='active' className='nav-link text-black'>
                        Users
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Dashboard;
