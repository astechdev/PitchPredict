//////////////////////////
//
// News Feed
// See the "News Feed" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Publish a story to the user's own wall
function publishStory() {
    FB.ui({
        method: 'feed',
        name: 'I\'m using the Hackbook web app',
        caption: 'Hackbook for Mobile Web.',
        description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
        link: 'http://apps.facebook.com/mobile-start/',
        picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
        actions: [{
            name: 'Get Started', 
            link: 'http://apps.facebook.com/mobile-start/'
        }],
    }, 
    function(response) {
        console.log('publishStory UI response: ', response);
    });
}
function facebookWallPost() {
    alert("facebookWallPost");
    console.log('Debug 1');
    var params = {
        method: 'feed',
        name: 'Facebook Dialogs',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
    };
    console.log(params);
    FB.ui(params, function(obj) {
        console.log(obj);
    });
}

//Publish a story to the user's friend's wall
function publishStoryFriend() {
    randNum = Math.floor ( Math.random() * friendIDs.length ); 

    var friendID = friendIDs[randNum];
  
    console.log('Opening a dialog for friendID: ', friendID);
  
    FB.ui({
        method: 'feed',
        to: friendID,
        name: 'I\'m using the Hackbook web app',
        caption: 'Hackbook for Mobile Web.',
        description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
        link: 'http://apps.facebook.com/mobile-start/',
        picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
        actions: [{
            name: 'Get Started', 
            link: 'http://apps.facebook.com/mobile-start/'
        }],
        user_message_prompt: 'Tell your friends about building social web apps.'
    }, 
    function(response) {
        console.log('publishStoryFriend UI response: ', response);
    });
}
            
//function publishStoryFriend() {
//    alert("publishStoryFriend");
//    randNum = Math.floor ( Math.random() * friendIDs.length ); 
//
//    var friendID = friendIDs[randNum];
//    if (friendID == undefined){
//        alert('please click the me button to get a list of friends first');
//    }else{
//        console.log("friend id: " + friendID );
//        console.log('Opening a dialog for friendID: ', friendID);
//        var params = {
//            method: 'feed',
//            to: friendID.toString(),
//            name: 'Facebook Dialogs',
//            link: 'https://developers.facebook.com/docs/reference/dialogs/',
//            picture: 'http://fbrell.com/f8.jpg',
//            caption: 'Reference Documentation',
//            description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
//        };
//        FB.ui(params, function(obj) { console.log(obj);});
//    }
//}