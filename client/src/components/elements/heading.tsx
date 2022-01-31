import React, { FC } from 'react';

import { HeadingProps } from '../../common/types';

const Heading: FC<HeadingProps> = ({ title, detail }: HeadingProps) => (
    <>
        <h3 className='fw-light'>{title}</h3>
        <p className='text-secondary small'>{detail}</p>
    </>
);

export default Heading;
