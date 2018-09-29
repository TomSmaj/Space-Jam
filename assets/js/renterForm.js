
// Initialize Firebase
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

//This was used to initialize FireBase Data

$(document).ready(function () {


    //When Button is clicked, make new post
    $(".signUpSubmitButton").on("click", function () {
        let hostChecked = $(".hostRadio").is(":checked");
        let userChecked = $(".rentRadio").is(":checked");
        console.log(hostChecked);
        console.log(userChecked);

        if (hostChecked) {
            let hostSignUp = {
                userName: $(".rentUserName").val(),
                passWord: $(".rentPass").val(),
                posts: "",
                type: "host"             
    };
            console.log(hostSignUp);
            
            hostRef.push(hostSignUp);
            

            setTimeout(function(){
                window.location.href = "login.html";
                }, 1500);

    }   else if (userChecked) {
            let userSignUp = {
                userName: $(".rentUserName").val(),
                passWord: $(".rentPass").val(),
                spacesBooked: "",
                type: "user"
    }
            console.log(userSignUp);
            userRef.push(userSignUp);
            

            setTimeout(function(){
                window.location.href = "login.html";
                }, 1500);
            
        }
        else {
            console.log("invalid");
        }
        

    })

    

})