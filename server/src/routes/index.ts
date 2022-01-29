import authRoutes from './auth.routes';
import userRoutes from './user.routes';

export default function (app: any) {
    authRoutes(app);
    userRoutes(app);
}
