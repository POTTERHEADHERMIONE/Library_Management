var isAdmin = false;

document.addEventListener('DOMContentLoaded', onDocumentLoad);

async function onDocumentLoad(){
    if (cookieExists()){
        isAdmin = parseCookie()['isAdmin'];
        if (isAdmin)
            window.location.href = '/admin';
        else 
            window.location.href = '/student';
    }
}

function setAdmin () {
    isAdmin = true;
    document.getElementById("title").textContent = "Admin Login";
};

function setStudent() {
    isAdmin = false;
    document.getElementById("title").textContent = "Student Login";
};

function login(){
    id = document.getElementById('id').value;
    password = document.getElementById('password').value;    
    var data = {
        'id': id,
        'password': password,
    };
    var loginRoute;
    if (isAdmin)
        loginRoute = '/api/admin/login';
    else 
        loginRoute = '/api/user/login';
    fetch(loginRoute,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data['status'] != 'success') 
            document.getElementById("status").textContent = "Invalid Credentials";
        else {
            document.cookie = 'token='+data['token'];
            document.cookie = 'id='+id;
            document.cookie = 'isAdmin='+isAdmin;
            if (isAdmin)
                window.location.href = '/admin';
            else 
                window.location.href = '/student';
        }
    })
}