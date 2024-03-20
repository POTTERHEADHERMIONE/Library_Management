var booksTableHead = document.getElementById("booksTableHead")

class Cookie{
    static id = null;
    static token = null;
}

async function onDocumentLoad(books, id){
    var cookieData = parseCookie();
    Cookie.id = cookieData['id'];
    Cookie.token = cookieData['token'];

    for (var isbn in books) {
        var row = document.createElement("tr");
        row.id = isbn;
        var dates = books[isbn];
        var bookData = await getTakenBookDetails(isbn);

        addCell(row, isbn, "BookInfo");
        addCell(row, bookData.title);
        addCell(row, bookData.author);
        addCell(row, dates.issueDate);
        addCell(row, dates.dueDate);
        addCell(row, isbn, "TakeBook",id);
        booksTableHead.appendChild(row);
    }

}

// getBook_name_author
async function getTakenBookDetails(isbn){
    var data = {'isbn':isbn, 
                'id' : Cookie.id,
                'token' : Cookie.token}
    return fetch(AdminRoutes.takenBookDetails(), {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        return data;
    });
}

function takeBook(userID, isbn){
    data = {
        'userID':userID,
        'isbn':isbn,
        'id' : Cookie.id,
        'token' : Cookie.token
    };
    fetch(AdminRoutes.takeBook(),{
        method : 'POST',            
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById(isbn).remove();
    });
}

function issueBook(userID){
    var isbnInput = document.getElementById('isbn').value;
    var data = {
        'userID' : userID,
        'isbn' : isbnInput,        
        'id' : Cookie.id,
        'token' : Cookie.token
    }
    console.log(data);
    fetch(AdminRoutes.issueBook(),{
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        if (data.status == 'success'){
            var row = document.createElement("tr");
            row.id = isbn;
            addCell(row, data.isbn, "BookInfo");
            addCell(row, data.title);
            addCell(row, data.author);
            addCell(row, data.issueDate);
            addCell(row, data.dueDate);
            addCell(row, data.isbn, "TakeBook",data.id);
            booksTableHead.appendChild(row); 
            isbnInput.value = '';
        }
        else{
            alert(data.status);
        }
    });
}