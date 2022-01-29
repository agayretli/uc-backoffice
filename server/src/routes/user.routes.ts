import userController from '../controllers/user.controller';

export default function (app: any) {
    app.post('/api/users', userController.datatablesAll);
    app.post('/api/user/insert', userController.insert);
    app.post('/api/user/remove', userController.remove);
    app.post('/api/user/update/:id', userController.update);
    app.post('/api/user/changelang', userController.changeLang);
}
