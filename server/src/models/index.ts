import mongoose from 'mongoose';

import user from './user.model';
import role from './role.model';

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user,
    role,
    ROLES: ['user', 'admin'],

    initial: (): void => {
        const Role = db.role;
        Role.estimatedDocumentCount((err: any, count: number) => {
            if (!err && count === 0) {
                new Role({
                    name: 'user',
                }).save((err: any) => {
                    if (err) {
                        console.log('error', err);
                    }
                    console.log("added 'user' to roles collection");
                });

                new Role({
                    name: 'admin',
                }).save((err: any) => {
                    if (err) {
                        console.log('error', err);
                    }
                    console.log("added 'admin' to roles collection");
                });
            }
        });
    },
};

export default db;
