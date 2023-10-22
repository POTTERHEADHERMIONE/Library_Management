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
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    var data = {
        'username' : username,
        'password' : password,
        'type' : isAdmin
    };
});


function handleLoginRequest(username, password, type) {
    const url = ''; //server url

    
    const data = {
        username: username,
        password: password,
        type: type
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login request failed');
        }
    })
    .then(data => {
        
        console.log(data);
    })
    .catch(error => {
        
        console.error(error);
    });
}
