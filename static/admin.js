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

//NEW ADDITIONS:

//New addition for the admin page

function booksDisplay() {
    if (isAdmin === 0 && booksTable.style.display === "none") {
        if (booksTable.innerHTML === "") {
            fetch('/listBooks', {
                method: 'GET'
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
            });
        }
        booksTable.style.display = "";
    }
}

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


//New addition

function listStudents(viewStudentButton) {
    
    fetch('/listStudents', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
    
        displayStudentList(data);
    })
    .catch(error => {
        console.error('Error fetching student list:', error);
    });
}





// NEW AADDITION:

function displayStudentList(studentList) {

    var contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = "";

    var studentsTable = document.createElement("table");
    studentsTable.style.position = "fixed";
    studentsTable.style.top = '200px';

    var studentsTableHead = document.createElement("thead");
    studentsTable.appendChild(studentsTableHead);

    var tableHeaderRow = document.createElement("tr");
    addColumn(tableHeaderRow, 20, "Student ID");
    addColumn(tableHeaderRow, 30, "Student Name");
    addColumn(tableHeaderRow, 25, "Actions"); 
    studentsTableHead.appendChild(tableHeaderRow);

    var studentsTableBody = document.createElement("tbody");
    studentList.forEach(student => {
        var studentRow = document.createElement("tr");
        addCell(studentRow, student.studentid);
        addCell(studentRow, student.studentname);

        var actionsCell = document.createElement("td");
        var issueButton = createButton("Issue Book", function () {
            issueBook(student.studentid);
        });
        var takeButton = createButton("Take Book", function () {
            takeBook(student.studentid);
        });

        actionsCell.appendChild(issueButton);
        actionsCell.appendChild(takeButton);
        studentRow.appendChild(actionsCell);

        studentsTableBody.appendChild(studentRow);
    });

    studentsTable.appendChild(studentsTableBody);
    contentContainer.appendChild(studentsTable);  

    document.body.appendChild(contentContainer);
}


// NEW ADDITION:

function createButton(text, clickHandler) {
    var button = document.createElement("button");
    button.textContent = text;
    button.style.marginRight = "5px";
    button.addEventListener("click", clickHandler);
    return button;
}

// NEW ADDITION:

function issueBook(studentId) {

    console.log("Issuing book for student ID:", studentId);
}

// NEW ADDITION:

function takeBook(studentId) {
  
    console.log("Taking book for student ID:", studentId);
}







// NEW ADDITION:

function viewStudentUI() {
    var viewStudentButton = document.createElement("button");
    viewStudentButton.textContent = "View Students";
    viewStudentButton.style.textContent = "Top right corner";
    viewStudentButton.style.position = "fixed";
  
    viewStudentButton.style.top = "100px";
    viewStudentButton.style.right = "200px";

    document.body.appendChild(viewStudentButton);

    viewStudentButton.addEventListener("click", function () {
    
        listStudents(viewStudentButton);
    });
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
            
            //NEW ADDITION:

            var contentContainer = document.getElementById('content-container');
            contentContainer.innerHTML = "";

            viewStudentUI();
            booksDisplay();

         

            
        }
    })
});