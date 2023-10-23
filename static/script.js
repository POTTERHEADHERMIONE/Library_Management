var isAdmin = 0;
var username = "";
var password = "";

document.getElementById("adminButton").addEventListener("click", function () {

    isAdmin = 1;
    document.getElementById("title").textContent = "Admin Login";
});

document.getElementById("studentButton").addEventListener("click", function () {

    isAdmin = 0;
    document.getElementById("title").textContent = "Student Login";
});



//     handleLoginRequest(username, password, admin === 1 ? "admin" : "user");


document.getElementById("login").addEventListener("click", function () {
    event.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    var data = {
        'username': username,
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
        //decide what to do..
        // document.getElementById("title").textContent = "Stuff worked";

        .then(response => response.json())
        .then(data => {
            if (data['status'] == 'Invalid Credentials') {
                document.getElementById("status").textContent = "Invalid Credentials";
            }
            else {
                var contentContainer = document.getElementById('content-container');
                contentContainer.innerHTML = "";

                var nameElement = document.createElement('label');
                nameElement.textContent = data['name'];
                contentContainer.appendChild(nameElement);
                var rollElement = document.createElement('label');
                rollElement.textContent = data['roll'];
                contentContainer.appendChild(rollElement);
                nameElement.style.textContent = "Top left corner";
                nameElement.style.position = "fixed";
                nameElement.style.top = "70px";
                nameElement.style.left = "50px";

                rollElement.style.textContent = "Top left corner";
                rollElement.style.position = "fixed";
                rollElement.style.top = "100px";
                rollElement.style.left = "50px";



                var bookTable = document.createElement("table");
                bookTable.style.borderCollapse = "collapse"; 
                bookTable.style.width = "80%";              

                var tableHeaderRow = document.createElement("tr");


                var titleHead = document.createElement("th");
                titleHead.textContent = "Title";
                titleHead.style.border = "1px solid black"; 
                titleHead.style.width = "30%"; 
                titleHead.style.padding = "10px"; 

                var authorHead = document.createElement("th");
                authorHead.textContent = "Author";
                authorHead.style.border = "1px solid black";
                authorHead.style.width = "20%";
                authorHead.style.padding = "10px";

                var takenHead = document.createElement("th");
                takenHead.textContent = "Taken";
                takenHead.style.border = "1px solid black";
                takenHead.style.width = "15%";
                takenHead.style.padding = "10px";

                var dueHead = document.createElement("th");
                dueHead.textContent = "Due";
                dueHead.style.border = "1px solid black";
                dueHead.style.width = "15%";
                dueHead.style.padding = "10px";

                tableHeaderRow.appendChild(titleHead);
                tableHeaderRow.appendChild(authorHead);
                tableHeaderRow.appendChild(takenHead);
                tableHeaderRow.appendChild(dueHead);
                bookTable.appendChild(tableHeaderRow);

                for (const bookID in data["books"]) {
                    if (data.books.hasOwnProperty(bookID)) {
                        const book = data.books[bookID];

                        var bookRow = document.createElement("tr");
                        var titleCell = document.createElement("td");
                        titleCell.textContent = book.title;
                        titleCell.style.border = "1px solid black";
                        titleCell.style.width = "30%"; 
                        titleCell.style.padding = "10px";

                        var authorCell = document.createElement("td");
                        authorCell.textContent = book.author;
                        authorCell.style.border = "1px solid black";
                        authorCell.style.width = "20%";
                        authorCell.style.padding = "10px";

                        var takenCell = document.createElement("td");
                        takenCell.textContent = book.taken;
                        takenCell.style.border = "1px solid black";
                        takenCell.style.width = "15%";
                        takenCell.style.padding = "10px";

                        var dueCell = document.createElement("td");
                        dueCell.textContent = book.due;
                        dueCell.style.border = "1px solid black";
                        dueCell.style.width = "15%";
                        dueCell.style.padding = "10px";

                        
                        bookRow.appendChild(titleCell);
                        bookRow.appendChild(authorCell);
                        bookRow.appendChild(takenCell);
                        bookRow.appendChild(dueCell);
                        bookTable.appendChild(bookRow);
                    }
                }

              bookTable.style.border = "1px solid black";
                document.body.appendChild(bookTable);


             


            }
        })
});
