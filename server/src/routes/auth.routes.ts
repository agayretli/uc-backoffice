import verifySignUp from '../middlewares/verifySignUp';
import authController from '../controllers/auth.controller';

export default function (app: any) {
    app.use(function (req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    app.post(
        '/api/auth/signup',
        [verifySignUp.checkDuplicateEmail, verifySignUp.checkRoleExisted],
        authController.signup
    );
    app.post('/api/auth/signin', authController.signin);
    app.post('/api/auth/profile', authController.profile);
}
