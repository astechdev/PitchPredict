function subscribe() {
    FB.ui({
        method: 'pay',
        name: 'PitchPredict',
        link: 'https://www.facebook.com/PitchPredict',
        picture: 'http://www.app.pitchpredict.com/images/icons/launcher.png',
    }, function(response) {
        console.log('sendMessage UI response: ', response);
    });
}