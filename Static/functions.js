// Cookie and token stuff..

function verifyToken(){
    var data = parseCookie();
    fetch(AdminRoutes.verifyToken, {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        if (data['status'] == 'success')
            return true;
        else 
            return false;
    });
}

function parseCookie() {
    // console.log(document.cookie);
    var cookiePairs = document.cookie.split(';');
    var cookieDict = {};
    for (var i = 0; i < cookiePairs.length; i++) {
        var pair = cookiePairs[i].trim().split('=');
        var key = pair[0];
        var value = pair[1];
        // console.log(key, value);
        if (value==='true' || value==='false')
            value = (value==='true');

        cookieDict[key] = value;
    }
    return cookieDict;
}

function cookieExists() {
    // console.log(document,cookie);
    if (document.cookie == '')
        return false;
    else
        return true;
}


//Bar Code stuff..

let isScannerRunning = false;

async function startScanner() {
  if (isScannerRunning) {
    console.log("Scanner is already running.");
    return;
  }

  Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.getElementById("scanner"),
        constraints: {
            width:600,
            height: 250
        }
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader", "upc_reader"],
    },
  }, function (err) {
    if (err) {
      console.error("Error initializing Quagga: ", err);
      return;
    }

    Quagga.start();
    isScannerRunning = true;
  });

  Quagga.onDetected(function (result) {
    getDetailsFromBarCode(result.codeResult.code);
    stopScanner();
  });
}

function stopScanner() {
  if (isScannerRunning) {
    Quagga.stop();
    isScannerRunning = false;
  } 
}

// Column, cell stuff

function addBookRow(isbn, title, author, total, available, ebookLink){
    var row = document.createElement("tr");
    row.id = isbn;

    var bookInfoCell = document.createElement("td");
    var bookInfoAnchor = document.createElement('a');
    bookInfoAnchor.textContent = isbn;
    bookInfoAnchor.target = '_blank';
    bookInfoAnchor.href = Pages.bookInfo+'/'+isbn;
    bookInfoCell.appendChild(bookInfoAnchor);

    var titleCell = document.createElement("td");
    titleCell.textContent = title;
    
    var authorCell = document.createElement("td");
    authorCell.textContent = author;

    var totalCell = document.createElement("td");
    totalCell.textContent = total;

    var availableCell = document.createElement("td");
    availableCell.textContent = available;

    var deleteBookCell = document.createElement("td");
    var deleteBookButton = document.createElement("Button");
    deleteBookButton.style = 'height : 20px; width : 20px; border-radius:0px; background-color:transparent;';
    var deleteBookIcon = document.createElement("img");

    deleteBookIcon.src = '/static/images/bin.png';
    deleteBookIcon.alt = 'Button Image';
    deleteBookIcon.width = 20;
    deleteBookIcon.height = 20;

    deleteBookButton.appendChild(deleteBookIcon);
    deleteBookButton.addEventListener('click',function(){deleteBook(isbn)});
    deleteBookCell.appendChild(deleteBookButton);


    var eBookCell = document.createElement('td');
    var ebookAnchor = document.createElement("a");
    ebookAnchor.href = ebookLink;
    ebookAnchor.target = '_blank';

    var ebookIcon = document.createElement("img");
    ebookIcon.src = '/static/images/ebook.png';
    ebookIcon.alt = 'Link Image';
    ebookIcon.width = 20;
    ebookIcon.height = 20;

    ebookAnchor.appendChild(ebookIcon);
    eBookCell.appendChild(ebookAnchor);

    row.appendChild(bookInfoCell);
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(totalCell);
    row.appendChild(availableCell);
    row.appendChild(deleteBookCell);
    row.appendChild(eBookCell);
    return row;
}

function addStudentRow(id, name){
    var row = document.createElement("tr");
    row.id = id;
    
    var studentInfoCell = document.createElement('td');
    var studentInfoAnchor = document.createElement('a');
    studentInfoAnchor.textContent = id;
    studentInfoAnchor.target = '_blank';
    studentInfoAnchor.href = Pages.userInfo+'/'+id;
    studentInfoCell.appendChild(studentInfoAnchor);  

    var nameCell = document.createElement('td');
    nameCell.textContent = name;

    var deleteStudentCell = document.createElement("td");
    var deleteStudentButton = document.createElement("Button");
    deleteStudentButton.style = 'height : 20px; width : 20px; border-radius:0px; background-color:transparent;';
    var deleteStudentIcon = document.createElement("img");

    deleteStudentIcon.src = '/static/images/bin.png';
    deleteStudentIcon.alt = 'Button Image';
    deleteStudentIcon.width = 20;
    deleteStudentIcon.height = 20;

    deleteStudentButton.appendChild(deleteStudentIcon);
    deleteStudentButton.addEventListener('click',function(){deleteStudent(id)});
    deleteStudentCell.appendChild(deleteStudentButton);

    row.appendChild(studentInfoCell);
    row.appendChild(nameCell);
    row.appendChild(deleteStudentCell);
    return row;
}

function addWithStudentRow(id,dueDate,issueDate){
    var row = document.createElement("tr");
    row.id = id;

    var studentInfoCell = document.createElement('td');
    var studentInfoAnchor = document.createElement('a');
    studentInfoAnchor.textContent = id;
    studentInfoAnchor.target = '_blank';
    // studentInfoAnchor.href = AdminRoutes.displayStudentInfoRoute+'/'+id;
    studentInfoAnchor.href = Pages.userInfo + '/' + id;
    studentInfoCell.appendChild(studentInfoAnchor);  


    var issueDateCell = document.createElement("td");
    issueDateCell.textContent = issueDate;

    var dueDateCell = document.createElement("td");
    dueDateCell.textContent = dueDate;

    row.appendChild(studentInfoCell);
    row.appendChild(issueDateCell);
    row.appendChild(dueDateCell);
    return row 
}

function addCell(row, content, info="", id='', isStudent=false){
    var cell = document.createElement("td");
    if (info=="BookInfo" || info == "StudentInfo"){
        var linkElement = document.createElement('a');
        linkElement.textContent = content;
        linkElement.target = "_blank"
        if (info == "BookInfo")
            linkElement.href = Pages.bookInfo+'/'+content;
        else linkElement.href = Pages.userInfo+'/'+content;
        cell.appendChild(linkElement);
    } 
    else if (info == "TakeBook"){
        var buttonElement = document.createElement('button');
        buttonElement.textContent = 'Take Book';
        buttonElement.style = 'height : 30px';
        buttonElement.addEventListener('click',function(){takeBook(id,content)});
        cell.appendChild(buttonElement);
    }
    else if (info == "deleteIcon"){
        var buttonElement = document.createElement('button');
        var imageElement = document.createElement('img');
        // imageElement.src = "{{ url_for('static', filename='bin.png') }}";
        imageElement.src = "/static/bin.png";
        imageElement.alt = 'Button Image';
        imageElement.width = 20;
        imageElement.height = 20;
        buttonElement.style = 'height : 30px; width : 30px; border-radius:0px; background-color:transparent;';
        buttonElement.appendChild(imageElement);
        buttonElement.addEventListener('click',function(){delete_book_student(id, isStudent)});
        cell.appendChild(buttonElement);
    }
    else{
        cell.textContent = content;
    }
    row.appendChild(cell);
}