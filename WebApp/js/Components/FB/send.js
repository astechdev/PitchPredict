//Send an invite to friends that haven't logged into the app yet
function sendMessage() {
    
    if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined'))
    {
        FB.ui({
            method: 'send',
            name: 'PitchPredict',
            link: 'http://app.pitchpredict.com'
        }, function(response) {
            console.log('sendMessage UI response: ', response);
        });
    }
    else
    {
        //This is not allowed on android/iOS devices...
//        var authorize_url = "https://www.facebook.com/dialog/send?";
//        authorize_url += "app_id=" + gAppID;
//        authorize_url += "&redirect_uri=http://www.facebook.com/connect/login_success.html";
//        authorize_url += "&display=touch";
//        
//        client_browser = window.open(authorize_url, '_blank', 'location=no');
//        client_browser.addEventListener('loadstop', facebookLocChanged);
    }
}

function facebookLocChanged() {
 
        alert("facebookLocChanged ");
        alert("facebookLocChanged "+loc.url);
        // When the childBrowser window changes locations we check to see if that page is our success page.
        if (loc.indexOf("http://www.facebook.com/connect/login_success.html") > -1) {
            client_browser.close();
        }
}