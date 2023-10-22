

var isAdmin = 0; 


document.getElementById("adminButton").addEventListener("click", function () {
    
    isAdmin = 1;
    document.getElementById("title").textContent = "Admin Login";
});

document.getElementById("studentButton").addEventListener("click", function () {

    isAdmin = 0;
    document.getElementById("title").textContent = "Student Login";
});

// document.getElementById("userLoginForm").addEventListener("submit", function (e) {
//     e.preventDefault(); 

//     //For the user
//     const username = document.getElementById("user_username").value;
//     const password = document.getElementById("user_password").value; 
//     handleLoginRequest(username, password, admin === 1 ? "admin" : "user");
// });

// document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
//     e.preventDefault(); 
//     //For the admin
//     const username = document.getElementById("admin_username").value;
//     const password = document.getElementById("admin_password").value;


//     handleLoginRequest(username, password, admin === 1 ? "admin" : "user");
// });

document.getElementById("login").addEventListener("click",function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var data = {
        'username' : username,
        'password' : password,
        'type' : isAdmin;
    }
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
