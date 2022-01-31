/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
import React, { FC, useEffect, useRef, useState } from 'react';
import { Column, Options } from '@material-table/core';

import UserService from 'src/services/user.service';
import { UserProps, UserIdProps } from 'src/common/types';

import Breadcrumb from '../elements/breadcrumb';
import Heading from '../elements/heading';
import Table from '../elements/table';

import '../../style.scss';

const Users: FC = () => {
    const users = localStorage.getItem('users');
    const parsedUsers = users && JSON.parse(users);

    const columns: Array<Column<UserProps>> = [
        {
            title: 'Name',
            field: 'name',
        },
        {
            title: 'Mail',
            field: 'email',
        },
    ];

    // Options for table
    const options: Options<UserProps> = {
        emptyRowsWhenPaging: false,
        addRowPosition: 'first',
        actionsColumnIndex: -1,
        rowStyle: (_data, index) => (index % 2 === 0 ? { background: '#f5f5f5' } : {}),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRef = useRef<any>();

    const [data, setData] = useState<Array<UserProps>>(
        parsedUsers &&
            parsedUsers.map((user: UserProps) => ({
                name: (user as UserProps).name,
                email: (user as UserProps).email,
            }))
    );

    useEffect(() => {
        UserService.getUsers();
    });

    return (
        <div className='mt-3'>
            <Breadcrumb parent='' parentLink='' current='Users' />
            <Heading title='Active Users' detail='You can view or update users from this screen.' />

            <div className='bg-white radial-bordered p-3'>
                <Table title='' columns={columns} data={data} tableRef={tableRef} options={options} />
            </div>
        </div>
    );
};

export default Users;
