import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../config/auth.config';
import db from '../models';
import SocketClient from './socket.controller';

const User = db.user;
const Role = db.role;

const signup = (
    req: { body: { name: any; email: any; password: any; role: any } },
    res: {
        status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: any }): void; new (): any } };
        send: (arg0: { message: string }) => void;
    }
) => {
    console.log(req.body);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err: any, user: { roleId: any; save: (arg0: { (err: any): void; (err: any): void }) => void }) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.role) {
            Role.find(
                {
                    name: { $in: req.body.role },
                },
                (err: any, role: any) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roleId = role.map((role: { _id: any }) => role._id);
                    user.save((err: any) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: 'User was registered successfully!' });
                    });
                }
            );
        } else {
            Role.findOne({ name: 'user' }, (err: any, role: { _id: any }) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roleId = role._id;
                user.save((err: any) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: 'User was registered successfully!' });
                });
            });
        }
    });
};

const signin = (
    req: { body: { email: any; password: any } },
    res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            send: {
                (arg0: {
                    message?: any;
                    accessToken?: any;
                    id?: any;
                    name?: any;
                    email?: any;
                    lang?: any;
                    role?: any;
                    userData?: any;
                    session?: any;
                }): void;
                new (): any;
            };
        };
    }
) => {
    User.findOne({
        email: req.body.email,
    })
        .populate('roleId', '-__v')
        .exec(
            (
                err: any,
                user: {
                    password: any;
                    id: any;
                    roleId: any;
                    _id: any;
                    name: any;
                    email: any;
                    lang: any;
                }
            ) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!user) {
                    return res.status(404).send({ message: 'User Not found.' });
                }

                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: 'Invalid Password!',
                    });
                }
                SocketClient.getInstance().sendInfoOnLogin(user.email, user.name);
                const token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400, // 24 hours
                });
                res.status(200).send({
                    userData: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        lang: user.lang,
                        role: `ROLE_${user.roleId.name.toUpperCase()}`,
                    },
                    session: {
                        accessToken: token,
                    },
                });
            }
        );
};

const profile = (
    req: { body: { name: any; email: any; password: any } },
    res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            send: {
                (arg0: {
                    message?: any;
                    id?: any;
                    name?: any;
                    email?: any;
                    lang?: any;
                    role?: any;
                    reload?: any;
                    userData?: any;
                }): void;
                new (): any;
            };
        };
    }
) => {
    User.findOne({
        email: req.body.email,
    })
        .populate('roleId', '-__v')
        .exec(
            (
                err: any,
                user: {
                    password: any;
                    id: any;
                    _id: any;
                    name: any;
                    email: any;
                    roleId: any;
                    lang: any;
                    save: (arg0: { (err: any): void; (err: any): void }) => void;
                }
            ) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!user) {
                    return res.status(404).send({ message: 'User Not found.' });
                }

                if (!req.body.name) {
                    return res.status(404).send({ message: 'Name must be filled out.' });
                }

                user.name = req.body.name;
                let reloadAfterSave = 'false';

                if (req.body.password) {
                    user.password = bcrypt.hashSync(req.body.password, 8);
                    reloadAfterSave = 'true';
                }

                user.save((err: any) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send({
                        userData: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            lang: user.lang,
                            role: `ROLE_${user.roleId.name.toUpperCase()}`,
                        },
                        message: 'User was updated successfully!',
                        reload: reloadAfterSave,
                    });
                });
            }
        );
};

export default {
    signin,
    signup,
    profile,
};
