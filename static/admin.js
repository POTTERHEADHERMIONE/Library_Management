document.addEventListener('DOMContentLoaded', onDocumentLoad);

class Elements{
    // The table that shows list of Books and Students
    static mainTable = null;

    // add Book Student Button
    static addBSButton = null;

    // add Book Student Fields div, The fields ask for 
    // isbn, name, author, count if showingBooks == True
    // else id, name
    static addBSFieldsDiv = null;

    // Used to view students and books table
    static viewBSButton = null;

    static searchBar = null;

    static searchBarImg = null;
}

class States{
    // Set to true when "Add Book" button is clicked
    static addingBook = false;

    // Set to true when "Add Book" button is clicked
    static addingStudent = false;

    // Set to true when the search icon is clicked
    static showingSearchResult = false;

    // Set to true when the table is currently showing list of books
    static showingBooks = true;

    // Set to true if "View Students" is clicked atleast once
    // When "View Students is clicked", request is made to server to retrieve list of students
    // The response is then used to construct the table
    // Once the table is constructed (studentsTableConstructed is set to true), there is no need to retrieve data from server and construct table again
    static studentsTableConstructed = false;
}

class Misc{
    // innerHTML is stored here, to retrieve it later and change the innerHTML of the mainTable
    static booksTableInnerHTML = '';
    static studentsTableInnerHTML = 
    `
    <thead>
        <tr>
            <th style="width : 10%;">ID</th>
            <th style="width : 30%;">Name</th>
        </tr>
    </thead>
    <tbody id = 'studentsTbody'>
    </tbody>    

    `;

    // Other constants..
    static token = null;
    static id = null;
}



async function onDocumentLoad(){

    Elements.mainTable = document.getElementById('mainTable');
    Elements.addBSButton = document.getElementById('addBSButton');
    Elements.addBSFieldsDiv = document.getElementById('addBSFieldsDiv');
    Elements.viewBSButton = document.getElementById('viewBSButton');
    Elements.searchBar = document.getElementById('searchBar');
    Elements.searchBarImg = document.getElementById('searchBarImg');

    Misc.token = parseCookie()['token'];
    Misc.id = parseCookie()['id'];

    data = {
        'id' : Misc.id,
        'token' : Misc.token,
        'isAdmin' : true
    };
    console.log(data);
    fetch(AdminRoutes.getBooksListRoute,{
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body    : JSON.stringify(data)           
    })
    .then(response => response.json())
    .then(data => {
        if (data['status'] == 'authFail'){
            window.location.href = '/';
            localStorage.setItem('redirected',true);
        }
        var booksTbody = document.getElementById('booksTbody');
        for (const isbn in data) {
            if (isbn !== 'status'){
                const book = data[isbn];
                booksTbody.appendChild(addBookRow(isbn, book['title'], book['author'], book['total'], book['available'], book['ebookLink']))
            }
        }
        Misc.booksTableInnerHTML = Elements.mainTable.innerHTML;
    })
}

async function viewBSButtonClicked(){

    Elements.addBSFieldsDiv.innerHTML = '';
    Elements.mainTable.style.top = '15%';
    Elements.mainTable.style.height = "780px"; 

    if (States.showingBooks){    
        Elements.searchBar.placeholder = 'Search by ID, name';
        Elements.mainTable.innerHTML = Misc.studentsTableInnerHTML;

        if (States.studentsTableConstructed == false){
            var studentsTbody = document.getElementById('studentsTbody');

            var data = {
                'id' : Misc.id,
                'token' : Misc.token,
            };
            await fetch(AdminRoutes.getStudentsListRoute,{
                method : 'POST',
                headers : { 'Content-Type': 'application/json'},
                body    : JSON.stringify(data)  
            })
            .then(response => response.json())
            .then(data => {
                for (id in data){
                    if (id !== 'status')
                        studentsTbody.appendChild(addStudentRow(id, data[id]));
                }
            })
            Misc.studentsTableInnerHTML = Elements.mainTable.innerHTML;
            States.studentsTableConstructed = true;
        }
        Elements.viewBSButton.textContent = 'View Books';
        Elements.addBSButton.textContent = 'Add Student';
        States.showingBooks = false;
    }
    else{
        Elements.searchBar.placeholder = 'Search by ID, Title, Author';
        stopScanner();
        Elements.mainTable.innerHTML = Misc.booksTableInnerHTML;
        Elements.viewBSButton.textContent = 'View Students';
        Elements.addBSButton.textContent = 'Add Book';
        States.showingBooks = true;
    }
}

//Gotta update this, can't rely on local storage, not recommended..
function logout(){

    localStorage.removeItem('isAdmin');
    localStorage.removeItem('name');
    localStorage.removeItem('password');
    window.location.href = AdminRoutes.loginPageRoute;
}

//Have to add ebook link option
function addBSButtonClicked(){
    if (States.showingBooks){
        States.addingStudent = false;
        Elements.addBSFieldsDiv.innerHTML = '';
        if (States.addingBook){
            stopScanner();
            Elements.mainTable.style.top = '15%';
            States.addingBook = false;
            Elements.addBSButton.textContent = 'Add Book';
            Elements.addBSFieldsDiv.innerHTML = '';
            Elements.mainTable.style.height = "780px";
        }
        else{
            Elements.mainTable.style.top = '40%';
            Elements.addBSButton.textContent = 'Cancel';
            States.addingBook = true;
            Elements.addBSFieldsDiv.innerHTML = 
            `
            <input type='text' style='position:fixed; top:140px; width:150px; height:10px; right:38%'  id='isbn' placeholder='ISBN number'>
            <input type='text' style='position:fixed; top:140px; width:400px; height:10px; right:15%' id='title' placeholder='Title'>
            <input type='text' style='position:fixed; top:210px; width:400px; height:10px; right:15%' id='author' placeholder='Author'>
            <input type='text' style='position:fixed; top:210px; width:150px; height:10px; right:38%' id='count' placeholder='Quantity'>
            <input type='text' style='position:fixed; top:270px; width:590px; height:10px; right:15%' id='ebookLink' placeholder='eBook Link'>

            <button style='position:fixed; top:320px; width: 130px; right:28.5%' onclick='addNewBook()'>Add Book</button> 
            <div style='position:fixed; top:120px; right:78%; width:100%; max-width: 50px;margin: 0 auto;' id="scanner"></div>
            `
            Elements.mainTable.style.height = "530px";
            startScanner();
        }
    }
    else{
        stopScanner();
        States.addingBook = false;
        Elements.addBSFieldsDiv.innerHTML = '';
        if (States.addingStudent){
            Elements.mainTable.style.top = '15%';
            States.addingStudent = false;
            Elements.addBSButton.textContent = 'Add Student';
            Elements.addBSFieldsDiv.innerHTML = '';
            Elements.mainTable.style.height = "780px";            
        }
        else{
            Elements.mainTable.style.top = '28%';
            Elements.addBSButton.textContent = 'Cancel';
            States.addingStudent = true;
            Elements.addBSFieldsDiv.innerHTML = 
            `
            <input type='text' style='position:fixed; top:150px; width:150px; height:10px; right:53%'  id='name' placeholder='Name'>
            <input type='text' style='position:fixed; top:150px; width:150px; height:10px; right:38%' id='id' placeholder='Student ID'>   
            <button style='position:fixed; top:200px; width: 130px; right:47%' onclick='addNewStudent()'>Add Student</button>         
            `
            Elements.mainTable.style.height = "650px";
        }
    }
}

function addNewStudent(){
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    data = {
        'studentID'   : id,
        'name' : name,
        'id'   : Misc.id, //admin id
        'token': Misc.token
    };
    fetch(AdminRoutes.addNewStudentRoute,{
        method  : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body    : JSON.stringify(data)        
    })
    .then (response => response.json())
    .then (data => {
        if (data['status'] == 'success'){

            var studentsTbody = document.getElementById('studentsTbody');
            studentsTbody.append(addStudentRow(id, name));
            Misc.studentsTableInnerHTML = Elements.mainTable.innerHTML;
            alert ('Student added successfully, default password is '+id+name);
        }
        else if (data['status'] == 'authFail')
            window.location.href = '/';
        else
            alert(data['status']);
    })    
}

function getAuthorTitle(isbn){
    stopScanner();
    document.getElementById('isbn').value = isbn;
    fetch(AdminRoutes.getAuthorTitle,{
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify({'isbn':isbn})
    })
    .then (response => response.json())
    .then (data => {States.showingBooks
        if (data['status'] == 'success'){
            document.getElementById('isbn').value = isbn;
            document.getElementById('author').value = data.author;
            document.getElementById('title').value = data.title;
        }
        else{
            alert('Could not find in the database, please enter the data manually');
        }
    });
}

function addNewBook(){
    var isbn = document.getElementById('isbn').value;
    var author = document.getElementById('author').value;
    var title = document.getElementById('title').value;
    var count = document.getElementById('count').value;
    var ebookLink = document.getElementById('ebookLink').value;
    if (Number.isInteger(parseInt(count))){
        if (parseInt(count) < 1){
            alert ("Count has to be greater than 1");
            return;
        }
    }
    else{
        alert("Count has to be an integer");
        return;
    }

    data = {
        'isbn'  : isbn,
        'author': author,
        'title' : title,
        'count' : count,
        'ebookLink' : ebookLink,
        'id'    : Misc.id,
        'token' : Misc.token
    }
    fetch(AdminRoutes.addNewBookRoute,{
        method  : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body    : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        if (data['status']=='success'){
            var booksTbody = document.getElementById('booksTbody');
            booksTbody.appendChild(addBookRow(isbn,title,author,count,count,ebookLink));
            Misc.booksTableInnerHTML = Elements.mainTable.innerHTML;
            alert('Book added successfully');
        }
        else if (data['status'] == 'authFail')
            window.location.href = '/';
        else
            alert(data['status']);
    });
}

function deleteStudent (id){
    var response = confirm("Are you sure ? This action cannot be undone (yes/no)");
    data = {
        'studentID':id,
        'id' : Misc.id,
        'token' : Misc.token
    }
    if (response){
        fetch (AdminRoutes.deleteStudentRoute , {
            method : 'POST',
            headers : { 'Content-Type': 'application/json'},
            body : JSON.stringify(data)
        })
        .then(response => response.json())
        .then (data => {
            if (data['status'] == 'success'){
                document.getElementById(id).remove();
                Misc.studentsTableInnerHTML = Elements.mainTable.innerHTML;
                alert('Student with id '+id+' deleted successfully');
            }
            else{
                alert(data['status']);
            }
        })
    }
}

function deleteBook (isbn){
    var response = confirm("Are you sure ? This action cannot be undone (yes/no)");    
    data = {
        'isbn':isbn,
        'id' : Misc.id,
        'token' : Misc.token
    }
    if (response){
        fetch (AdminRoutes.deleteBookRoute , {
            method : 'POST',
            headers : { 'Content-Type': 'application/json'},
            body : JSON.stringify(data)
        })
        .then(response => response.json())
        .then (data => {
            if (data['status'] == 'success'){
                document.getElementById(isbn).remove();
                alert('Book with isbn '+isbn+' deleted successfully');
            }
            else{
                alert(data['status']);
            }
        })
    }
}

function search(){
    if (States.showingSearchResults){
        document.getElementById('searchBarImg').src='/static/images/search.png';
        if (States.showingBooks)
            Elements.mainTable.innerHTML = Misc.booksTableInnerHTML;
        else
            Elements.mainTable.innerHTML = Misc.studentsTableInnerHTML;
        States.showingSearchResults = false;
    }
    else{
        States.showingSearchResults = true;
        var resultRows = []
        var searchFor = Elements.searchBar.value.toLowerCase();
        var rows = Elements.mainTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        if (Number.isInteger(parseInt(searchFor))){
            for (var i = 0 ; i < rows.length ; i++){
                var row = rows[i];
                var cells  = row.cells;
                if (parseInt(searchFor) == parseInt(cells[0].textContent))
                    resultRows.push(row);
            }
        }
        else{
            for (var j = 0 ; j < rows.length; j++){
                var row = rows[j];
                var cells = row.cells;
                var rowText = '';
                var n = 1;
                if (States.showingBooks)
                    n = 3;
                for (var i = 1 ; i < cells.length - n; i++)
                    rowText += cells[i].textContent.toLowerCase() + " ";
                if (rowText.includes(searchFor))
                    resultRows.push(row)
            }
        }

        var tbody;
        if (States.showingBooks){
            Elements.mainTable.innerHTML = 
            `
            <thead>
                <tr>
                    <th style="width: 10%;">BookID</th>
                    <th style="width: 25%;">Title</th>
                    <th style="width: 25%;">Author</th>
                    <th style="width: 10%;">Total</th>
                    <th style="width: 10%;">Available</th>
                </tr>
            </thead>
            <tbody id="booksTbody">

            </tbody>
            `;
            tbody = document.getElementById('booksTbody');
        }
        else{
            Elements.mainTable.innerHTML = 
            `
            <thead>
                <tr>
                    <th style="width : 10%;">ID</th>
                    <th style="width : 30%;">Name</th>
                </tr>
            </thead>
            <tbody id = 'studentsTbody'>
            </tbody>
            `;
            tbody = document.getElementById('studentsTbody');
        }

        for (var i = 0 ; i < resultRows.length ; i++)
            tbody.appendChild(resultRows[i]);

        Elements.searchBarImg.src='/static/images/cross.png';
    }
}

function getDetailsFromBarCode(isbn){
    data = {
        'isbn':isbn
    }
    fetch (AdminRoutes.getDetailsFromBarCode , {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then (data => {
        if (data['status'] == 'success'){
            document.getElementById('isbn').value = '9788126509621';
            document.getElementById('author').value = data['author'];
            document.getElementById('title').value = data['title'];
        }
        else{
            alert(data['status']);
        }
    })
    
}