async function verifyToken(){
    var data = parseCookie();
    return await fetch(UserRoutes.verifyToken(), {
        method : 'POST',
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
    })
    .then (response => response.json())
    .then (data => {
        console.log(data)
        return data;
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