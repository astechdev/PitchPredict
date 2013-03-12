function loginRequest()
{
    TrackButtonClicked('Login', 'clicked', 'Attempt to Login', 1);
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/login.php?UserName='+jQuery('#userName').val()+'&password='+jQuery('#password').val();

    jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/login.php?UserName='+jQuery('#userName').val()+'&password='+jQuery('#password').val(), function(data) 
    {
        userInfoMap = data;
        console.log(userInfoMap.UserName);
        console.log(JSON.stringify(userInfoMap));
        if(userInfoMap.UserName != "" && userInfoMap.UserName != null && userInfoMap.UserName != "undefined")
        {
            if(userInfoMap.UserName != "false")
            {
                console.log('load');
                jQuery( "#logincontainer" ).fadeOut();
                jQuery( "#logoutcontainer" ).fadeIn();
                load();
            }
            else
            {
                helpDialogInit("alert", "Error!", "You did not enter a valid user name and password.  "); 
            }
        }
    }).error(function(e) { 
        helpDialogInit("alert", "Error!", "You did not enter a valid user name and password.  "); console.log(JSON.stringify(e));});
}

function logout()
{
    userInfoMap.UserName = null; 

    jQuery( "#logincontainer" ).fadeIn();
    jQuery( "#logoutcontainer" ).fadeOut();
}

function register()
{
    TrackButtonClicked('Register', 'clicked', 'Attempt to Register', 1);
    
    if(phonegap != "false")
    {
        navigator.app.loadUrl('http://www.pitchpredict.com/index.php?option=com_users&view=registration', {openExternal:true});
    }
    else
    {
        window.open('http://www.pitchpredict.com/index.php?option=com_users&view=registration', '_blank');
    } 
}