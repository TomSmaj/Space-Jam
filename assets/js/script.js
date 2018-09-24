
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

    getHtml: function () {
        return `<div class="row">
        <div class="col-sm-1"></div>

        <div class="postingArea col-sm-10">
            <h2 class="text-center"><p>${this.title}</p></h2>
            <hr>
            <div class="row">
                <div class="landingPageGreeting">
                    <h5 class="text-center"><p>Description: ${this.info}</p></h5>
                </div>
            </div>


            <div class="row text-center">
                <div class="jamSpace col-sm-6">
                    [space img]
                </div>
                <div class="bookingInfo col-sm-6">

                    <p>Address: ${this.address}</p>
                    <p>Phone: ${this.phone}</p>
                    <p>Price: ${this.price}</p>
                    <p>Size: ${this.size}</p>
                </div>
            </div>

            <div class="row text-center">
                <div class="googleMaps col-sm-6">
                    [google map api]
                </div>
                <div class="bookingConfirmation col-sm-6">
                    <button type="button" class=" ${this.postId} btn btn-block">Book</button>

                </div>
            </div>
        </div>
    </div>`

    }

}

let loggedUser = 'testUser';
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
            $('.appendTo').append(postObject.getHtml());
        });
    });
}

$(document).ready(function () {
    loggedIn = true;

    //Waiting for user to click login    

    //$(".loginBtn").on('click', function(){
    //})


    if (loggedIn) {
        //updateNavBar();
        //Display Username on Nav bar, change to log out button
        updateContent();
        //Display posts from FB (picture, google map, content, and book button)
    }

   

    /*
    $(document).on('click', ".bookBtn", function(event){
        let targ = event.target;
        //Target Variable is the button that has been clicked
        let postId = targ.attr('.postId');
        //Grab the content from Firebase - find which post has the ID, match with book Button, assign to renter
    })*/






























})
