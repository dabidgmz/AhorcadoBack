import Route from '@ioc:Adonis/Core/Route';

export default () => {
    Route.group(() => {
        // User routes
        Route.get('/me', 'UsersController.me')
        Route.put('/UserUpdate', 'UsersController.update')

        // Auth routes
        Route.post('login', 'AuthController.login');
        Route.post('register', 'AuthController.register');
        Route.post('logout', 'AuthController.logout');
        Route.post('ConfirmAddress', 'AuthController.confirmEmail');
    }).prefix('users/')
}