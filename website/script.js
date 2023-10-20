// Initialize the Google API client
function initGoogleSignIn() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID',
        });
    });
}

// Create the Google Sign-In button
function renderGoogleSignInButton() {
    gapi.signin2.render('google-signin-button', {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
    });
}

// Callback function when a user signs in
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var name = profile.getName();
    var email = profile.getEmail();
    alert('Welcome, ' + name + ' (' + email + ')');
}

// Load the Google API client and render the button
window.onload = function() {
    initGoogleSignIn();
    renderGoogleSignInButton();
};
