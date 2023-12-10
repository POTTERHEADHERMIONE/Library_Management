class AdminRoutes{
    static loginPageRoute = '/';
    static loginRoute = '/login';

    static getBooksListRoute = '/get_books_list';
    static getStudentsListRoute = '/admin/get_students_list';
    
    static addNewBookRoute = '/admin/add_new_book';
    static addNewStudentRoute = '/admin/add_new_student';

    static deleteStudentRoute = '/admin/delete_student';
    static deleteBookRoute = '/admin/delete_book';

    static displayBookInfoRoute = '/admin/display_book_info';
    static displayStudentInfoRoute = '/admin/display_student_info';

    static getAuthorTitle = '/admin/get_author_title';

    static takeBookRoute = '/admin/take_book';
    static issueBookRoute = '/admin/issue_book';

    static updateBookCountRoute = '/admin/update_book_count';
    static getIssueDueRoute = '/admin/get_issue_due';

    static getDetailsFromBarCode = '/admin/get_details_from_barcode'
}