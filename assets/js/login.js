var config = {
    apiKey: "AIzaSyBpY57_lRYG5Kamd4XFg5B0yBa4d0-wA_Y",
    authDomain: "space-jam-8cd60.firebaseapp.com",
    databaseURL: "https://space-jam-8cd60.firebaseio.com",
    projectId: "space-jam-8cd60",
    storageBucket: "space-jam-8cd60.appspot.com",
    messagingSenderId: "850263407084"
};
firebase.initializeApp(config);

let database = firebase.database();
let hostRef = database.ref('hostRef');
let userRef = database.ref('userRef');

let username;
let password;

let authenticate = false;

loggedinObj = [];

$(document).ready(function() {

    //log in button clicked
    $(".submitBtn").on("click", function(){
        console.log("clicked");
        //get user/pass from page
        username = $("#userName").val();
        password = $("#passWord").val();
        //check if user/pass match anything in user firebase
        userRef.once('value', function (snapshot) {
            //console.log('reached');
            snapshot.forEach(function (child) {
                //console.log('reached');
                //console.log(child.val().title);
                let tempVal = child.val();
                console.log(tempVal.title);
                if(tempVal.userName === username && tempVal.passWord === password){
                    loggedinObj.push(true);
                    loggedinObj.push("user");
                    loggedinObj.push(username);
                    localStorage.setItem("loggedInObj", JSON.stringify(loggedinObj));
                    window.location.href = "../index.html";
                }      
            });
        });

        hostRef.once('value', function (snapshot) {
            //console.log('reached');
            snapshot.forEach(function (child) {
                //console.log('reached');
                //console.log(child.val().title);
                let tempVal = child.val();
                console.log(tempVal.title);
                if(tempVal.userName === username && tempVal.passWord === password){
                    loggedinObj.push(true);
                    loggedinObj.push("host");
                    loggedinObj.push(username);
                    localStorage.setItem("loggedInObj", JSON.stringify(loggedinObj));
                    window.location.href = "../index.html";
                }      
            });
        });
        
    });


});