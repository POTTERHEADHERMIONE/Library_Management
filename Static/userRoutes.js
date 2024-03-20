class UserRoutes{
    static _prefix = '/api/user';

    static _login = '/login'
    static _verifyToken = '/verify_token';

    static login = () => UserRoutes._prefix + UserRoutes._login;
    static verifyToken = () => UserRoutes._prefix + UserRoutes._verifyToken;

}