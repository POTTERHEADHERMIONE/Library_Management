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


document.getElementById("login").addEventListener("click",function(){
    event.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    var data = {
        'username' : username,
        'password' : password,
        'isAdmin' : isAdmin
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
            if (data['status'] == 'Invalid Credentials'){
                document.getElementById("status").textContent = "Invalid Credentials";
            }
            else{
                console.log('Name:', data["name"]);
                console.log('Roll:', data["roll"]);
                
                // // Access and print information for each book
                for (const bookID in data["books"]) {
                  if (data.books.hasOwnProperty(bookID)) {
                    const book = data.books[bookID];
                    console.log('Book Title:', bookID);
                    console.log('Title : ',book['title']);
                    console.log('Author : ',book['author']);
                    console.log('Book Taken Date:', book["taken"]);
                    console.log('Book Due Date:', book["due"]);
                  }
                }

                var div = document.getElementById('content-container');
                while (div.firstChild){
                    div.removeChild(div.firstChild);
                }
                // window.location.href = '/studentPage';

                // fetch('/studentPage',{
                // })
                

            }
        })
});
