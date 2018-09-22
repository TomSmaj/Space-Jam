//Nav Bar
// Title 
//Display UserName
//Login Button (Phase2)
//Check UserLogin on PageLoad
let loggedIn=false;

//If no user is logged in, require login(Phase 2)

//If user is logged in, grab post


//FireBase
let database = firebase.database();
let postRef = database.ref('postRef');
let userRef = database.ref('userRef');
let userIdRef = database.ref('userIdRef');

//Title
//Image Name
//Info/Price/Availability
//Google Map
//Booked Status

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

$(document).ready (function(){

//Waiting for user to click login    

//$(".loginBtn").on('click', function(){
//})

/*
if (loggedIn){
    updateNavBar();
    //Display Username on Nav bar, change to log out button
    updateContent();
    //Display posts from FB (picture, google map, content, and book button)

}
*/

/*
$(document).on('click', ".bookBtn", function(event){
    let targ = event.target;
    //Target Variable is the button that has been clicked
    let postId = targ.attr('.postId');
    //Grab the content from Firebase - find which post has the ID, match with book Button, assign to renter
})*/






























})
