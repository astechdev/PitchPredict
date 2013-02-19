function loginRequest()
{	
//    aUserName= jQuery('#login :userName').fieldValue()[0];
//    aPassword= jQuery('#login :password').fieldValue()[0];
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/login.php?UserName='+jQuery('#login :userName').fieldValue()[0]+'&password='+jQuery('#login :password').fieldValue()[0];
//    alert('url: '+url);
    jQuery.getJSON(url, function(data) 
    {
        userInfoMap = data;
        if (userInfoMap.UserName != 'false')
        {
            load();
        }
//        alert('username'+userInfoMap.UserName);
    });
        
        
        
	
//	alert("aUserName: "+aUserName);
//	alert("aPassword: "+aPassword);
	
//	if (aUserName== "" || aPassword== "")
//	{
		// here we return false to prevent the form from being submitted; 
   		// returning anything other than false will allow the form submit to continue 
    		
//    		return false; 
//	}
//	else
//	{
//    		return true; 
		loginResponse();
//	}
}

function loginResponse()
{ 
//    alert("loginResponse: ");
    if (userInfoMap.UserName != 'false')
    {
//            jQuery.cookie("UserName", userInfoMap.UserName);
        jQuery("#loginbutton").hide();
        jQuery("#registerbutton").hide();
        jQuery('#logoutbutton').show();
        jQuery('#pitchpredictbutton').show();
        jQuery('#loggedin').show();
        jQuery('#loggedinusernameid').append(userInfoMap.UserName);
        openPage('root', true);
    }
    else
    {
        openPage('Register', true);
    }
}

function logout()
{
	openPage('Login'); 
        userInfoMap.UserName === 'false'; 
        jQuery('#loginbutton').show(); 
        jQuery('#loggedin').hide();
        jQuery('#pitchpredictbutton').hide();
        jQuery('#logoutbutton').hide();
}