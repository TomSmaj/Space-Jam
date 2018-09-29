
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
let userIdRef = database.ref('userIdRef');
let postRef = database.ref('postRef');
let hostRef = database.ref('hostRef');

//This was used to initialize FireBase Data

$(document).ready(function () {
    //Load Logged in User from Session Memory
    let loggedInObj;
    loggedInObj = JSON.parse(sessionStorage.getItem("loggedInObj"));
    console.log(loggedInObj);
    $(".displayUserName").text(loggedInObj[2]);

    //When Button is clicked, make new post
    if (loggedInObj[1] === "host"){
    $(".submitButton").on("click", function () {
        //grabbing post ID from postIDref and incrementing by 1
        console.log("clicked");

        userIdRef.once('value', function (snapshot) {
            let newPostId = parseInt(snapshot.val().postId) + 1;
            userIdRef.set({ postId: newPostId });

        let tempArray = {
            0:$("#topMusicianInput1").val(),
            1:$("#topMusicianInput2").val(),
            2:$("#topMusicianInput3").val()
        }
        let hostForm = {
            postId: newPostId,
            title: $("#titleInput").val(),
            address: $("#addressInput").val(),
            info: $("#descriptionInput").val(),
            phone: $("#phoneNumberInput").val(),
            price: $("#priceInput").val(),
            size: $("#size option:selected").val(),
            topMusic: tempArray,
            availability: $("#availabilityInput").val(),
            status: false,
            bookedBy: '',
            host: loggedInObj[2],
            image: $("#imageUploadInput").val(),
            }

            postRef.push(hostForm);

            hostRef.once('value', function (snapshot) {
                
                snapshot.forEach(function (child) {
                    console.log("child user name: ")
                    if(child.val().userName === loggedInObj[2]){
                        console.log("inside of comparison");
                        console.log("found host that matches logged in");
                        tempIdStr = child.val().posts;
                        
                        if(tempIdStr === ""){
                            console.log("tempIdStr is blank");
                            database.ref('hostRef/' + child.key).update({posts: newPostId});
                        }
                        else{
                            console.log("else");
                            tempIdStr += ","+ newPostId.toString();
                            database.ref('hostRef/' + child.key).update({posts: tempIdStr});
                        }
                    }
                });
            });

        })
        //Take data from input fields, store in object

        console.log("title input: " + $("#titleInput").val())
        
        //push object into postRef firebase
        
        setTimeout(function(){
            window.location.href = "../index.html";
            }, 1500); 
         
    //update postId and setting to postID ref 

    })

    }

})



