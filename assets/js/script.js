
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



//Nav Bar
// Title 
//Display UserName
//Login Button (Phase2)
//Check UserLogin on PageLoad
let loggedIn = false;

//If no user is logged in, require login(Phase 2)

//If user is logged in, grab post


//FireBase
let database = firebase.database();
let hostRef = database.ref('hostRef');
let postRef = database.ref('postRef');
let userRef = database.ref('userRef');
let userIdRef = database.ref('userIdRef');

//Title
//Image Name
//Info/Price/Availability
//Google Map
//Booked Status


/* This was used to initialize FireBase Data
let testPost = {
    postId: 1000,
    host: 'testHost',
    title: 'test Post Title',
    address: '2405 Robert Dedman Dr #1 Austin, Texas 78712',
    price: 30,
    image: 'testImg.jpg',
    size: 'small',
    info: 'This is a test space. Please rent me.',
    availability: 'Every Saturday',
    status: false,
    bookedBy: ''
}

let testHost = {
    userName: 'testHost',
    topMusic: [ 'Jimi Hendrix', 'Janis Joplin', 'The Beatles'],
    posts: 1000,
    passWord: 'password',
    type: 'host'
}

let testUser = {
    userName: 'testUser',
    topMusic: [ 'Jimi Hendrix', 'Janis Joplin', 'The Beatles'],
    spacesBooked: 0,
    passWord: 'password',
    type: 'user'

}
*/

//varaibles from an object from firebase are temporairly transferred to this object
//the getHtml function us then used to write the HTML containing all the information for a post to the document
let postObject = {
    postId: 1000,
    host: 'testHost',
    title: 'test Post Title',
    address: '2405 Robert Dedman Dr #1 Austin, Texas 78712',
    price: 30,
    image: 'testImg.jpg',
    size: 'small',
    info: 'This is a test space. Please rent me.',
    availability: 'Every Saturday',
    status: false,
    phone: "",
    topMusic: "",
    gKey: "AIzaSyAF8WmkI7S-sD3r40t29wi15vs4Czp60Go",

    getHtml: function () {
        return `<div class="row postArea">
        <div class="row text-center">
            <div class="jamSpace col-sm-6">
                [space img]
            </div>
            <div class="bookingInfo col-sm-6">
                <p>address: ${this.address} </p>
                <p>phone number: ${this.phone} </p>
                <p>price: ${this.price} </p>
            </div>
        </div>

        <div class="row text-center">
            <div class="googleMaps col-sm-6">
            <iframe
                width="600"
                height="450"
                frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=${this.gKey}&q=${this.address}" allowfullscreen>
            </iframe>
          
            </div>
            <div class="bookingConfirmation col-sm-6">
                <button type="button" class="${this.postId} btn btn-block">Book</button>

            </div>
        </div>
    </div>`

    }

}

let loggedInUser = {};

function updateContent() {
    //console.log('reached');
    postRef.once('value', function (snapshot) {
        //console.log('reached');
        snapshot.forEach(function (child) {
            //console.log('reached');
            //console.log(child.val().title);
            let tempVal = child.val();
            console.log(tempVal.title);
            postObject.title = tempVal.title;
            postObject.info = tempVal.info;
            postObject.address = tempVal.address;
            postObject.phone = tempVal.phone;
            postObject.price = tempVal.price;
            postObject.size = tempVal.size;
            postObject.postId = tempVal.postId;
            postObject.topMusic = tempVal.topMusic;
            $('.appendTo').append(postObject.getHtml());
        });
    });
    console.log("logged in user: " + loggedInUser);
}

function getUserObj(name, type){
    if(type === "user"){
       userRef.once('value', function (snapshot) {
        snapshot.forEach(function (child) {
            let tempVal = child.val();
            console.log("tempVal name:" + tempVal.userName);
            console.log("name:" + name);
            if(tempVal.userName === name){
                    console.log("user found in firebsae")
                    loggedInUser = tempVal;
                    updateContent();
                }
            });
        }); 
    }
    else if(type === "host"){
        hostRef.once('value', function (snapshot) {
         snapshot.forEach(function (child) {
            let tempVal = child.val();
            if(tempVal.userName === name){
                    console.log("host found in firebsae")
                    loggedInUser = tempVal;
                    console.log("host object: " + JSON.stringify(loggedInUser));
                    updateHostPosts();
                }
            });
        }); 
    }
    
}

$(document).ready(function () {
    let loggedInObj;
    loggedInObj = JSON.parse(localStorage.getItem("loggedInObj"));
    console.log(loggedInObj);

    if (loggedInObj[0]) {
        if(loggedInObj[1] === "user"){
            console.log("user logged in");
            getUserObj(loggedInObj[2], "user");
            //program now moves to getUserObj, and from getUserObj to updateContent
        }
        else if(loggedInObj[1] === "host"){
            console.log("host logged in");
            getUserObj(loggedInObj[2], "host"); 
            //program now moves to getUserObj, and from getUserObj to updateHostPosts
        }
        else{console.log("not user or host");}
    }
    else{console.log("not logged in");}

   

    /*
    $(document).on('click', ".bookBtn", function(event){
        let targ = event.target;
        //Target Variable is the button that has been clicked
        let postId = targ.attr('.postId');
        //Grab the content from Firebase - find which post has the ID, match with book Button, assign to renter
    })*/
































})
