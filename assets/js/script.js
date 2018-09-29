
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
    topMusic: [],
    gKey: "AIzaSyAF8WmkI7S-sD3r40t29wi15vs4Czp60Go",


    getHtml: function () {
        return `<div class="row spacePost">
        <div class="row text-center">
            <div class="jamSpace col-sm-6">
            <img class='spacePic' src="${this.image}" />
            </div>
           <div class="favBand col-sm-6">

            <img class='favBand1 imageOne-${this.postId}' src="" />
        
            <img class='favBand2 imageTwo-${this.postId}' src='' />
            
            <img class='favBand3 imageThree-${this.postId}' src='' />

        </div>
        </div>

        <br>
        <br>

        <div class="row text-center">
            <div class="googleMaps col-sm-6">
            <div class="map">
            <iframe
                width="100%"
                height="100%"
                frameborder="0" style="border: 5px outset #000"
                src="https://www.google.com/maps/embed/v1/place?key=${this.gKey}&q=${this.address}" allowfullscreen>
            </iframe>
            </div>
              
            </div>


            <div class="bookingInfo col-sm-6">
                    <p>address: ${this.address} </p>
                    <hr>
                    <p>phone number: ${this.phone} </p>
                    <hr>
                    <p>price: ${this.price} </p>
                </div>

            </div>
            <div class="row">
            <div class="col-sm-5"></div>
            <div class="bookingConfirmation col-sm-2">
            <button type="button" btnPostId = "${this.postId}" class="${this.postId} bookBtn btn btn-block">Book</button>
            </div>

            </div>
        </div>
    </div>`

    }

}

//function used
function updateImage(selector, artist){
    queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + artist + "&api_key=5e659e2a0405afeb019f7b17483f1df8&format=json";

    $.get(queryURL).then(response => {
        $(selector).attr("src", response.results.artistmatches.artist[0].image[2]['#text'])
    })
}


let loggedInUser = {};

//populates all the postings from firebase to the screen when a user logs in
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
            postObject.status = tempVal.status;
            postObject.image = tempVal.image;
            $('.appendTo').append(postObject.getHtml());

            updateImage(".imageOne-" + postObject.postId, postObject.topMusic[0])
            updateImage(".imageTwo-" + postObject.postId, postObject.topMusic[1])
            updateImage(".imageThree-" + postObject.postId, postObject.topMusic[2])

            //if a post is already booked (status === true), then the button's text is changed to BOOKED
            if(postObject.status){
                $('.' + postObject.postId).text("BOOKED");
            }

        });
    });
    console.log("logged in user: " + loggedInUser);
}

//when a host logs in, populates the screen with posts that host has made
function updateHostPosts(){
    //first row added to appendTo will be a 'Make Post' button
    $('.appendTo').append(`
        <div class = "row postBtnRow">
            <div class = "col-12">
                <div class = "spacePost">
                    <button type="button" class="hostPost btn btn-block">Make Post</button>
                </div>
            </div>
        </div>
    `);

    //the posts a host has made is stored as a comma delineate string
    //have to read the string from firebase and break it into to array containing the postIDs
    console.log("host post ids: " + loggedInUser.posts);
    tempStr = loggedInUser.posts.toString();
    let arrID = [];
    if(tempStr.includes(",")){
        arrID = tempStr.split(",");
    }
    else {
        arrID.push(tempStr);
    }
    //query postID firebase, when there is a match, update the entry from firebase with that postID
    postRef.once('value', function (snapshot) {
        snapshot.forEach(function (child) {
            let tempVal = child.val();
            //this for loop iterates through the array of IDs abd checks each against the ID of the current girebase entry
            for(let i = 0; i < arrID.length; i++){
                if(tempVal.postId.toString() === arrID[i]){
                    console.log("host post match");
                    postObject.title = tempVal.title;
                    postObject.info = tempVal.info;
                    postObject.address = tempVal.address;
                    postObject.phone = tempVal.phone;
                    postObject.price = tempVal.price;
                    postObject.size = tempVal.size;
                    postObject.postId = tempVal.postId;
                    postObject.topMusic = tempVal.topMusic;
                    postObject.status = tempVal.status;
                    postObject.image = tempVal.image;
                    $('.appendTo').append(postObject.getHtml());

                    updateImage(".imageOne-" + postObject.postId, postObject.topMusic[0]);
                    updateImage(".imageTwo-" + postObject.postId, postObject.topMusic[1]);
                    updateImage(".imageThree-" + postObject.postId, postObject.topMusic[2]);

                    //if a post is already booked (status === true), then the button's text is changed to BOOKED
                    if(postObject.status){
                        $('.' + postObject.postId).text("BOOKED");
                    }
                }
            }
        });
    });
}

//functions that moves to hostMaking form when clicked
$(document).on("click", ".hostPost", function(){
    console.log("Make Post clicked");
    window.location.href = "html/hostForm.html";
});

//functions that books a post when post button is clicked by a user
$(document).on("click", ".bookBtn", function(event){
    if(loggedInUser.type === "user"){
        let clickedId  = $(this).attr("btnPostId");
        let tempBtn = $(this);
        console.log("bookBtn clicked");
        console.log("post associated with clicked button id: " + clickedId);

        //iterate through post firebase and see which entry the clicked button matches
        postRef.once('value', function (snapshot) {
            snapshot.forEach(function (child) {
                let tempVal = child.val();
                if(!tempVal.status){
                    if((tempVal.postId).toString() === clickedId){
                        console.log("booking, Id matches firebase Id");
                        database.ref('postRef/' + child.key).update({status: true});
                        database.ref('postRef/' + child.key).update({bookedBy: loggedInUser.userName});
                        updateUserBookedPosts(clickedId, true);
                        tempBtn.text("BOOKED");
                    }
                }
                //if post being clicked is currently rented and the bookedByName for the post matches th logged in user 
                else if(tempVal.status && tempVal.bookedBy === loggedInUser.userName){
                    //and if postId in the firebase matches the clicked buttons Id
                    //then the post is unbooked
                    if((tempVal.postId).toString() === clickedId){
                        console.log("unbooking, Id matches firebase Id");
                        database.ref('postRef/' + child.key).update({status: false});
                        database.ref('postRef/' + child.key).update({bookedBy: ""});
                        updateUserBookedPosts(clickedId, false);
                        tempBtn.text("Book");
                    }
                }
            });
        });
    }
});

//when a user books a post, this function is called and the booked posts
//field within firebase is filled with the id of the post booked
//if book is true, a post is being added to the spacesBooked field
//if book is false, a post if being unbooked, and the spacesBook field is cleared
function updateUserBookedPosts(id, book){
    userRef.once('value', function (snapshot) {
        snapshot.forEach(function (child) {
            let tempVal = child.val();
            if(tempVal.userName = loggedInUser.userName){
                if(book){
                    database.ref('userRef/' + child.key).update({spacesBooked: id});
                }
                else{database.ref('userRef/' + child.key).update({spacesBooked: ""});;}
            }
        })
    })
}

//when user logs in, the respective object (host or user) is grabbed from firebase and stored in
//local variable loggedInUser
function getUserObj(name, type){
    //access uer firebase
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
    //access host firebase
    else if(type === "host"){
        hostRef.once('value', function (snapshot) {
            snapshot.forEach(function (child) {
                let tempVal = child.val();
                if (tempVal.userName === name) {
                    console.log("host found in firebsae")
                    loggedInUser = tempVal;
                    console.log("host object: " + JSON.stringify(loggedInUser));
                    updateHostPosts();
                }
            });
        });
    }

}

//funs when document loads
$(document).ready(function () {

    //grabs loggedInObj from session storage. This tells if someone is logged,
    //whether they're a user or a host, and then what their usernam is
    let loggedInObj;
    loggedInObj = JSON.parse(sessionStorage.getItem("loggedInObj"));
    console.log(loggedInObj);

    //index 0 is a boolean representing whther or not they are logged in
    if (loggedInObj[0]) {
        //index 1 contains whether they are a user or a host
        if(loggedInObj[1] === "user"){
            console.log("user logged in");
            getUserObj(loggedInObj[2], "user");
            //program now moves to getUserObj, and from getUserObj to updateContent
        }
        else if (loggedInObj[1] === "host") {
            console.log("host logged in");
            getUserObj(loggedInObj[2], "host");
            //program now moves to getUserObj, and from getUserObj to updateHostPosts
        }
        else { console.log("not user or host"); }
    }
    else { console.log("not logged in"); }

































})
