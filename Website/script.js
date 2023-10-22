

var admin = 0; 

function loadUserLogin() {
    
    document.getElementById("userButton").click();
}

document.getElementById("adminButton").addEventListener("click", function () {
    
    admin = 1;
    document.getElementById("userLogin").style.display = "none";
    document.getElementById("adminLogin").style.display = "block";
});

document.getElementById("userButton").addEventListener("click", function () {

    admin = 0;
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("userLogin").style.display = "block";
});

document.getElementById("userLoginForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    //For the user
    const username = document.getElementById("user_username").value;
    const password = document.getElementById("user_password").value; 
    handleLoginRequest(username, password, admin === 1 ? "admin" : "user");
});

document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault(); 
    //For the admin
    const username = document.getElementById("admin_username").value;
    const password = document.getElementById("admin_password").value;


    handleLoginRequest(username, password, admin === 1 ? "admin" : "user");
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
