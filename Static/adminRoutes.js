class AdminRoutes{
    static _prefix = '/api/admin';
    static _login = '/login';

    //not required ig
    static _verifyToken = '/verifyToken';

    static _getBooksList = '/get_books_list';
    static _getUsersList = '/get_users_list';
    
    static _addNewBook = '/add_new_book';
    static _addNewUser = '/add_new_user';

    static _deleteUser = '/delete_user';
    static _deleteBook = '/delete_book';

    static _takenBookDetails = '/taken_book_details';

    static _takeBook = '/take_book';
    static _issueBook = '/issue_book';

    static _updateBookCount = '/update_book_count';
    static _withUserDetials = '/with_user_details';


    static _getDetailsFromISBN = '/get_details_from_isbn'

    static login = () => AdminRoutes._prefix + AdminRoutes._login;

    // not required ig
    static verifyToken = () => AdminRoutes._prefix + AdminRoutes._verifyToken;

    static getBooksList = () => AdminRoutes._prefix + AdminRoutes._getBooksList;
    static getUsersList = () => AdminRoutes._prefix + AdminRoutes._getUsersList;

    static addNewBook = () => AdminRoutes._prefix + AdminRoutes._addNewBook;
    static addNewUser = () => AdminRoutes._prefix + AdminRoutes._addNewUser;

    static deleteBook = () => AdminRoutes._prefix + AdminRoutes._deleteBook;
    static deleteUser = () => AdminRoutes._prefix + AdminRoutes._deleteUser;

    static takenBookDetails = () => AdminRoutes._prefix + AdminRoutes._takenBookDetails;
    
    static takeBook = () => AdminRoutes._prefix + AdminRoutes._takeBook;
    static issueBook = () => AdminRoutes._prefix + AdminRoutes._issueBook;

    static updateBookCount = () => AdminRoutes._prefix + AdminRoutes._updateBookCount;

    // static getIssueDue = () => AdminRoutes._prefix + AdminRoutes._getIssueDue;
    static withUserDetials = () => AdminRoutes._prefix + AdminRoutes._withUserDetials;
    static getDetailsFromISBN = () => AdminRoutes._prefix + AdminRoutes._getDetailsFromISBN;
}

class Pages{
    static bookInfo = '/book';
    static userInfo = '/user';
}