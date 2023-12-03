var isAdmin = 0;
var userid = "";
var password = "";

var booksTable = document.createElement("table");
booksTable.style.display = "none";
var takenBooks = document.createElement("table");
takenBooks.style.display = ""

document.getElementById("adminButton").addEventListener("click", function () {
    isAdmin = 1;
    document.getElementById("title").textContent = "Admin Login";
});

document.getElementById("studentButton").addEventListener("click", function () {
    isAdmin = 0;
    document.getElementById("title").textContent = "Student Login";
});

function listBooks(listBooksButton){
   
    if (booksTable.style.display === "none"){
    
        if (booksTable.innerHTML === ""){
            fetch('/listBooks',{
                methode : 'GET'
            })
            .then(response => response.json())
            .then(data => {
                booksTable.style.position = "fixed";
                booksTable.style.top = '200px';
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

function addColumn(tableHeaderRow, width, columnName){
    var column = document.createElement("th");
    column.textContent = columnName;
    column.style.width = width.toString()+"%"; 
    tableHeaderRow.appendChild(column);
};

function uiPart(contentContainer, name ,id){
    var nameElement = document.createElement('label');
    nameElement.textContent = "Name : "+name;
    nameElement.style.textContent = "Top left corner";
    nameElement.style.position = "fixed";
    nameElement.style.top = "70px";
    nameElement.style.left = "200px";
    contentContainer.appendChild(nameElement);

    var idElement = document.createElement('label');
    idElement.textContent = "ID : "+id;
    idElement.style.textContent = "Top left corner";
    idElement.style.position = "fixed";
    idElement.style.top = "100px";
    idElement.style.left = "200px";
    contentContainer.appendChild(idElement);

    var listBooksButton = document.createElement("button");
    listBooksButton.id = "listBooks"
    listBooksButton.textContent = "View Books";
    listBooksButton.style.textContent = "Top right corner";
    listBooksButton.style.position = "fixed";
    listBooksButton.style.top = "100px";
    listBooksButton.style.right = "200px";
    listBooksButton.addEventListener("click", function() {
        listBooks(listBooksButton);
    });
    
    contentContainer.appendChild(listBooksButton);
}

function addCell(row, content){
    var cell = document.createElement("td");
    cell.textContent = content;
    row.appendChild(cell);
}


document.getElementById("login").addEventListener("click", function () {
    event.preventDefault();
    userid = document.getElementById('userid').value;
    password = document.getElementById('password').value;
    var data = {
        'id': userid,
        'password': password,
        'isAdmin': isAdmin
    };
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    .then(response => response.json())
    .then(data => {
        if (data['status'] != 'success') {
            document.getElementById("status").textContent = "Invalid Credentials";
        }
        else {

            var contentContainer = document.getElementById('content-container');
            contentContainer.innerHTML = "";

            uiPart(contentContainer, data['name'],data['id']);

            takenBooks.style.position = "fixed";
            takenBooks.style.top = '200px';

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
    })
});