import jwt from 'jsonwebtoken';

import config from '../config/auth.config';
import db from '../models';

const User = db.user;
const Role = db.role;

const verifyToken = (
    req: { headers: { [x: string]: any }; userId: any },
    res: {
        status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string }): any; new (): any } };
    },
    next: () => void
) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (
    req: { body: { userId: any } },
    res: { status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: any }): void; new (): any } } },
    next: () => void
) => {
    try {
        if (!req.body.userId) {
            res.status(403).send({ message: 'userId is required!' });
            return;
        }
        User.findById(req.body.userId).exec((err: any, user: { roleId: any }) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            Role.findOne(
                {
                    _id: user.roleId,
                },
                (err: any, role: any) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (role.name === 'admin') {
                        next();
                        return;
                    }

                    res.status(403).send({ message: 'Require Admin Role!' });
                }
            );
        });
    } catch (error) {
        res.status(400).send({ message: 'Error' });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
};
export default authJwt;
