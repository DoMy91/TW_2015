/**
 * Created by Domy on 19/03/15.
 * Mediante tale script effettuo il login/logout a FB.Una volta avvenuto il login ottengo le informazioni
 * di base dell'utente (nome completo,città di residenza,ID e link della foto del profilo).Tali informazioni vengono
 * salvate all'interno del sessionStorage e cancellate dallo stesso al momento del logout.Mediante
 * tali informazioni popolo header e right menu.
 */

var loggedIn=false,userID,userPicture,userFullname,userLocation;

if(sessionStorage.length!=0){
    console.log("SESSION STORAGE NOT EMPTY");
    $("#fbBtn").text("Logout");
    initializeFBuserData();
    initializeFBuserPhoto();
}


function initializeFBuserData(){
    userID=sessionStorage.getItem("userID");
    userFullname=sessionStorage.getItem("userFullname");
    userLocation=sessionStorage.getItem("userLocation");
    $("#userName").text(userFullname);
}

function initializeFBuserPhoto(){
    userPicture=sessionStorage.getItem("userPicture");
    $("#userPicture").attr("src",userPicture);
    $("#userPicture2").attr("src",userPicture);
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        loggedIn=true;
        //Se i dati dell'utente non si trovano nel sessionStorage ne effettuo richiesta (graph API)
        if(sessionStorage.length==0){
            testAPI();
        }
        $("#fbBtn").text("Logout").attr('onclick', '').unbind('click').click(FBdisconnect);
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.

    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '398000133697396',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        console.log(JSON.stringify(response));
        sessionStorage.setItem("userID",response.id);
        sessionStorage.setItem("userFullname",response.name);
        sessionStorage.setItem("userLocation",response.location.name);
        initializeFBuserData();

    });
    //User profile picture request
    FB.api(
        "/me/picture",
        {
            "redirect": false,
            "height": 50,
            "width": 50,
            "type": "normal"
        },
        function (response) {
            if (response && !response.error) {
                /* handle the result */
                console.log(JSON.stringify(response));
                sessionStorage.setItem("userPicture",response.data.url);
                initializeFBuserPhoto();
            }
        }
    );
}

function FBconnect(){
    FB.login(function(response){
        statusChangeCallback(response);
    },{scope: 'public_profile,email,user_location'});
}

function FBdisconnect(){
    console.log('disconnect');
    FB.logout(function(response) {
        console.log(JSON.stringify(response));
        loggedIn=false;
        $("#fbBtn").text("Login").attr('onclick','').unbind('click').click(FBconnect);
        $("#userPicture").attr("src","images/users/avatar-001.jpg");
        $("#userPicture2").attr("src","images/users/avatar-001.jpg");
        $("#userName").text("Accedi a Facebook");
        sessionStorage.clear();
    });
}