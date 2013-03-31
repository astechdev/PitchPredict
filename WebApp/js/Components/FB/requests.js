//////////////////////////
//
// Requests
// See the "Requests" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Send a request to friends have have logged into the app in the past, as well as friends that haven't
function sendRequestBoth() {
    FB.ui({
        method: 'apprequests',
        message: 'Learn how to make your mobile web app social',
    }, 
    function(response) {
        console.log('sendRequestBoth response: ', response);
    });
}

//Send an invite to friends that haven't logged into the app yet
function sendRequestInvite() {
    FB.ui({
        method: 'apprequests',
        suggestions: nonAppFriendIDs,
        picture: 'http://www.app.pitchpredict.com/images/icons/launcher.png',
        link: 'https://www.facebook.com/PitchPredict',
        message: 'Check out Pitch Predict!  It\'s a baseball analytics tool that mines MLB\'s gameday XML and builds an interface that enables users to analyze the data.',
    }, function(response) {
        console.log('sendRequestInvite UI response: ', response);
    });
}

//Send a request to friends that are already using the app
function sendRequest() {
    FB.ui({
        method: 'apprequests',
        suggestions: appFriendIDs,
        message: 'Learn how to make your mobile web app social',
    }, function(response) {
        console.log('sendRequest UI response: ', response);
    });
}

//Send a request to a single friend that is using the app
function sendRequestSingle() {
    randNum = Math.floor ( Math.random() * friendIDs.length ); 

    var friendID = friendIDs[randNum];

    FB.ui({
        method: 'apprequests',
        //Use the first friend returned
        to: friendID,
        message: 'Learn how to make your mobile web app social',
    }, function(response) {
        console.log('sendRequestSingle UI response: ', response);
    });
}