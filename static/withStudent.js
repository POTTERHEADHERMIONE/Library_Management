async function onDocumentLoad(withStudentsArray, bookID) {
    var studentsTable = document.getElementById("studentsTable");
    for (var a = 0 ; a < withStudentsArray.length ; a++){
        data = await getIssueDue(withStudentsArray[a],bookID);
        studentsTable.appendChild(addWithStudentRow(data['name'], withStudentsArray[a], data['dueDate'], data['issueDate']))
    }
}

async function getIssueDue(studentID, isbn){
    var data = {
        'studentID' : studentID,
        'isbn' : isbn
    };

    return fetch(AdminRoutes.get,{
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