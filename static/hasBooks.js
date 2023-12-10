var booksTableHead = document.getElementById("booksTableHead")

async function onDocumentLoad(books, id){
    for (var bookID in books) {
        var row = document.createElement("tr");
        row.id = bookID;
        var dates = books[bookID];
        var bookData = await getBook_name_author(bookID);

        addCell(row, bookID, "BookInfo");
        addCell(row, bookData.name);
        addCell(row, bookData.author);
        addCell(row, dates.issueDate);
        addCell(row, dates.dueDate);
        addCell(row, bookID, "TakeBook",id);
        booksTableHead.appendChild(row);
    }

}

// getBook_name_author
async function getBook_name_author(bookID){
    var data = {'id':bookID}
    return fetch('/getBook_name_author', {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        return data;
    });
}

function takeBook(studentID, bookID){
    data = {
        'studentID':studentID,
        'bookID':bookID
    };
    fetch('/takeBook',{
        method : 'POST',            
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById(bookID).remove();
    });
}

function issueBook(studentID){
    var bookIDInput = document.getElementById('bookID').value;
    var data = {
        'studentID' : studentID,
        'bookID' : bookIDInput
    }
    console.log(data);
    fetch('/issueBook',{
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        if (data.status == 'success'){
            var row = document.createElement("tr");
            row.id = bookID;
            addCell(row, data.id, "BookInfo");
            addCell(row, data.name);
            addCell(row, data.author);
            addCell(row, data.issueDate);
            addCell(row, data.dueDate);
            addCell(row, data.id, "TakeBook",data.id);
            booksTableHead.appendChild(row); 
            bookIDInput.value = '';
        }
        else{
            alert(data.status);
        }
    });
}