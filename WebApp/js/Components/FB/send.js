//Send an invite to friends that haven't logged into the app yet
function sendMessage() {
  FB.ui({
    method: 'send',
    name: 'PitchPredict',
    link: 'http://app.pitchpredict.com'
  }, function(response) {
    console.log('sendMessage UI response: ', response);
  });
}