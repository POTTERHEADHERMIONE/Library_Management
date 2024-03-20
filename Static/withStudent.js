class cookie{
    static token = null;
    static id = null;
}

async function onDocumentLoad(withStudentsArray, bookID) {
    var cookieData = parseCookie();
    cookie.token = cookieData['token'];
    cookie.id = cookieData['id'];
    var studentsTable = document.getElementById("studentsTable");
    for (var a = 0 ; a < withStudentsArray.length ; a++){
        data = await withUserDetials(withStudentsArray[a],bookID, cookie.id, cookie.token);
        studentsTable.appendChild(addWithStudentRow(withStudentsArray[a], data['dueDate'], data['issueDate']))
    }
}

async function withUserDetials(userID, isbn, id, token){
    var data = {
        'token' : token,
        'id'    : id,
        'userID' : userID,
        'isbn' : isbn
    };

    return fetch(AdminRoutes.withUserDetials(),{
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        return data;
    });
}

async function updateBookCount(isbn){
    var updatedCount_input = document.getElementById("updatedCount");
    var data = {
        'isbn' : isbn,
        'updatedCount' : updatedCount_input.value
    }
    await fetch(AdminRoutes.updateBookCountRoute,{
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })    
    .then (response => response.json())
    .then (data => {
        if (data['status'] == 'success'){
            document.getElementById('total').textContent = 'Total \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0: '+data['total'];
            document.getElementById('available').textContent = 'Available \u00A0\u00A0\u00A0 : '+data['available'];
        }else{
            alert(data['status']);
        }
    });    
}