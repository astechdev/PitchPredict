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
        name: 'I\'m using the Pitch Predict app',
        caption: 'Pitch Predict.',
        description: 'Check out Pitch Predict to start analyzing MLB\'s gameday pitch f/x data.',
        link: 'http://pitchpredict.com/',
        picture: 'http://www.app.pitchpredict.com/images/icons/launcher.png',
        actions: [{
            name: 'Get Started', 
            link: 'http://pitchpredict.com/'
        }],
    }, 
    function(response) {
        console.log('publishStory UI response: ', response);
    });
}
//function facebookWallPost() {
//    alert("facebookWallPost");
//    console.log('Debug 1');
//    var params = {
//        method: 'feed',
//        name: 'Facebook Dialogs',
//        link: 'https://developers.facebook.com/docs/reference/dialogs/',
//        picture: 'http://fbrell.com/f8.jpg',
//        caption: 'Reference Documentation',
//        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
//    };
//    console.log(params);
//    FB.ui(params, function(obj) {
//        console.log(obj);
//    });
//}

//Publish a story to the pitchpredict's wall
function publishStoryFriend() {
//    randNum = Math.floor ( Math.random() * friendIDs.length ); 

    var friendID = "100002173347658";//friendIDs[randNum];
  
    console.log('Opening a dialog for friendID: ', friendID);
  
    FB.ui({
        method: 'feed',
        to: friendID,
        name: 'I\'m using the Pitch Predict app',
        caption: 'Pitch Predict.',
        description: 'Check out Pitch Predict to start analyzing MLB\'s gameday pitch f/x data.',
        link: 'http://pitchpredict.com/',
        picture: 'http://www.app.pitchpredict.com/images/icons/launcher.png',
        actions: [{
            name: 'Get Started', 
            link: 'http://pitchpredict.com/'
        }],
        user_message_prompt: 'Tell your friends about Pitch Predict.'
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