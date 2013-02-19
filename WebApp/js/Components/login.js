function loginRequest()
{	
//    aUserName= jQuery('#login :userName').fieldValue()[0];
//    aPassword= jQuery('#login :password').fieldValue()[0];
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/login.php?UserName='+jQuery('#userName').val()+'&password='+jQuery('#password').val();
//    alert('url: '+url);
    jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/login.php?UserName='+jQuery('#userName').val()+'&password='+jQuery('#password').val(), function(data) 
    {
        userInfoMap = data;
//        alert('username'+userInfoMap.UserName);
        if (userInfoMap.UserName != 'false')
        {
            load();
        }
        
        jQuery( "#dialog" ).dialog( "close" );
//        alert('username'+userInfoMap.UserName);
    }).error(function(e) { alert(JSON.stringify(e)); });
        
        
        
	
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
//		loginResponse();
//	}
}

function loginResponse()
{ 
//    alert("loginResponse: ");
    if (userInfoMap.UserName != 'false')
    {
//            jQuery.cookie("UserName", userInfoMap.UserName);
//        jQuery("#loginbutton").hide();
//        jQuery("#registerbutton").hide();
//        jQuery('#logoutbutton').show();
//        jQuery('#pitchpredictbutton').show();
//        jQuery('#loggedin').show();
//        jQuery('#loggedinusernameid').append(userInfoMap.UserName);
//        openPage('root', true);
    }
    else
    {
        //openPage('Register', true);
    }
}

function logout()
{
	//openPage('Login'); 
        userInfoMap.UserName === 'false'; 
//        jQuery('#loginbutton').show(); 
//        jQuery('#loggedin').hide();
//        jQuery('#pitchpredictbutton').hide();
//        jQuery('#logoutbutton').hide();
}