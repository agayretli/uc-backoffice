import db from '../models';

const { ROLES } = db;
const User = db.user;

const checkDuplicateEmail = (
    req: { body: { email: any } },
    res: { status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: any }): void; new (): any } } },
    next: () => void
) => {
    // Email
    User.findOne({
        email: req.body.email,
    }).exec((err: any, user: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: 'Failed! Email is already in use!' });
            return;
        }
        next();
    });
};

const checkRoleExisted = (
    req: { body: { role: string } },
    res: {
        status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string }): void; new (): any } };
    },
    next: () => void
) => {
    if (req.body.role) {
        if (!ROLES.includes(req.body.role)) {
            res.status(400).send({
                message: `Failed! Role ${req.body.role} does not exist!`,
            });
            return;
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkRoleExisted,
};

export default verifySignUp;
