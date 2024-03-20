var id;
var password;
var isAdmin;

var booksTable = document.createElement("table");
booksTable.style.display = "none";
var takenBooks = document.createElement("table");
takenBooks.style.display = ""

document.addEventListener('DOMContentLoaded', onDocumentLoad);

async function onDocumentLoad(){
    data = await verifyToken();
    if (data['status'] != 'success'){
        // if (data['isAdmin'] == false){
            localStorage.setItem('redirected',true);
            window.location.href = '/';
        // }
    // }
    // else{
        // localStorage.setItem('redirected',true);
        // window.location.href = '/';
    }
    

    var contentContainer = document.getElementById('content-container');
    document.getElementById('labelName').textContent ='Name : '+ data['name']
    document.getElementById('labelID').textContent = 'ID : '+data['id'] 
    takenBooks.style.position = "fixed";
    takenBooks.style.top = '15%';

    var tableHeaderRow = document.createElement("tr");
    addColumn(tableHeaderRow, 10,"BookID");
    addColumn(tableHeaderRow, 25,"Title");
    addColumn(tableHeaderRow, 25, "Author");
    addColumn(tableHeaderRow, 10, "Issue");
    addColumn(tableHeaderRow, 10, "Due");

    takenBooks.appendChild(tableHeaderRow);

    for (const bookID in data["books"]) {
        if (data.books.hasOwnProperty(bookID)) {
            const book = data.books[bookID];

            var bookRow = document.createElement("tr");
            addCell(bookRow, bookID);
            addCell(bookRow, book.name);
            addCell(bookRow, book.author);
            addCell(bookRow, book.issueDate);
            addCell(bookRow, book.dueDate);
            takenBooks.appendChild(bookRow);
        }
    }

    document.body.appendChild(takenBooks);
}

function listBooks(){
    var listBooksButton = document.getElementById("listBooks");
    if (booksTable.style.display === "none"){
    
        if (booksTable.innerHTML === ""){
            fetch('/listBooks',{
                method : 'GET'
            })
            .then(response => response.json())
            .then(data => {
                booksTable.style.position = "fixed";
                booksTable.style.top = '15%';
                var booksTablethead = document.createElement("thead"); 
                booksTable.appendChild(booksTablethead);

                var tableHeaderRow = document.createElement("tr");
                addColumn(tableHeaderRow, 10, "BookID");
                addColumn(tableHeaderRow, 25, "Title");
                addColumn(tableHeaderRow, 25, "Author");
                addColumn(tableHeaderRow, 10, "Total");
                addColumn(tableHeaderRow, 10, "Available");
                booksTablethead.appendChild(tableHeaderRow);


                var booksTabletbody = document.createElement("tbody");
                for (const bookID in data) {
                    const book = data[bookID];
                    var bookRow = document.createElement("tr");
                    addCell(bookRow, bookID);
                    addCell(bookRow, book.name);
                    addCell(bookRow, book.author);
                    addCell(bookRow, book.total);
                    addCell(bookRow, book.available);
                    booksTabletbody.appendChild(bookRow);
                    
                }
                booksTable.appendChild(booksTablethead);
                booksTable.appendChild(booksTabletbody);
                document.body.appendChild(booksTable);
            })
        }
        listBooksButton.textContent = "Back";
        takenBooks.style.display = "none";
        booksTable.style.display = "";
    }
    else{
        listBooksButton.textContent = "View Books";
        takenBooks.style.display = "";
        booksTable.style.display = "none"; 
    }

};

function logout(){
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('name');
    localStorage.removeItem('password');
    window.location.href = '/';
}