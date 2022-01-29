import bcrypt from 'bcryptjs';

import db from '../models';

const User = db.user;

const datatablesAll = async (
    req: any,
    res: {
        status: (arg0: number) => {
            send: {
                (arg0: { message?: any; users?: any }): void;
            };
        };
    }
) => {
    try {
        const users = await User.find({});
        res.status(200).send({
            users,
            message: 'Success.',
        });
    } catch (error) {
        res.status(404).send({ message: 'User not found.' });
    }
};

const insert = (
    req: { body: { roleId: any; name: any; email: any; lang?: any } },
    res: {
        status: (arg0: number) => {
            send: {
                (arg0: { message?: any }): void;
            };
        };
    }
) => {
    const user = new User({
        roleId: req.body.roleId,
        name: req.body.name,
        email: req.body.email,
        // TODO
        password: bcrypt.hashSync('12345678', 8),
        // passwordResetToken: passwordResetToken,
        // passwordResetTokenDt: passwordResetTokenDt,
    });
    if (req.body.lang) user.lang = req.body.lang;
    user.save((err: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({
            message: 'Success.',
        });
    });
};

const remove = async (
    req: { body: { userId: any } },
    res: {
        status: (arg0: number) => {
            send: {
                (arg0: { message?: any }): void;
            };
        };
    }
) => {
    try {
        const query = { _id: req.body.userId };
        const result = await User.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send({
                message: `Successfully removed user with id: ${req.body.userId}`,
            });
        } else if (!result) {
            res.status(400).send({
                message: `Failed to remove user with id: ${req.body.userId}`,
            });
        } else if (!result.deletedCount) {
            res.status(404).send({
                message: `User with id: ${req.body.userId} does not exist`,
            });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error' });
    }
};

const update = async (
    req: { body: any; params: { id: any } },
    res: {
        status: (arg0: number) => {
            send: {
                (arg0: { message?: any }): void;
            };
        };
    }
) => {
    const id = req?.params?.id;
    try {
        const query = { _id: id };
        const result = await User.updateOne(query, { $set: req.body });
        if (result && result.modifiedCount) {
            res.status(200).send({
                message: `Successfully updated user with id ${id}`,
            });
        } else {
            res.status(304).send({
                message: `User with id: ${id} not updated`,
            });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error' });
    }
};

const changeLang = async (
    req: { body: { userId: any; lang: any } },
    res: {
        status: (arg0: number) => {
            send: {
                (arg0: { message?: any }): void;
            };
        };
    }
) => {
    try {
        const query = { _id: req.body.userId };
        const set = { lang: req.body.lang };
        const result = await User.updateOne(query, { $set: set });
        if (result && result.modifiedCount) {
            res.status(200).send({
                message: `Successfully updated user language`,
            });
        } else {
            res.status(400).send({
                message: `User language not updated`,
            });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error' });
    }
};

export default {
    datatablesAll,
    insert,
    remove,
    update,
    changeLang,
};
