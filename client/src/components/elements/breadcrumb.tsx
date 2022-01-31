import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BreadcrumbProps } from '../../common/types';

const Breadcrumb: FC<BreadcrumbProps> = ({ parent, parentLink, current }: BreadcrumbProps) => {
    const location = useLocation();
    return (
        <div aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                {location.pathname !== '/' && (
                    /* If the current page is not equal to Dashboard route, show dashboard step of breadcrumb */
                    <li className='breadcrumb-item small'>
                        <Link to='/'>Dashboard</Link>
                    </li>
                )}
                {parent && location.pathname !== '/' && (
                    /* If the parent has defined and the current page is not equal to Dashboard route */
                    <li className='breadcrumb-item small'>
                        <Link to={parentLink}>{parent}</Link>
                    </li>
                )}

                {location.pathname !== '/' && (
                    /* If the current page is not equal to Dashboard route, show current step of breadcrumb */
                    <li className='breadcrumb-item active small' aria-current='page'>
                        {current}
                    </li>
                )}
            </ol>
        </div>
    );
};

export default Breadcrumb;
