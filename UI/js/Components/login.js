function loginRequest()
{	
	aUserName= jQuery('#login :UserName').fieldValue()[0];
	aPassword= jQuery('#login :password').fieldValue()[0];
	
	//alert("aUserName: "+aUserName);
	//alert("aPassword: "+aPassword);
	
	if (aUserName== "" || aPassword== "")
	{
		// here we return false to prevent the form from being submitted; 
   		// returning anything other than false will allow the form submit to continue 
    		
    		return false; 
	}
	else
	{
		return true; 
	}
}

function loginResponse(data)
{ 
    
    // 'data' is the json object returned from the server 
    //alert(data.UserName);
    
    if (data.UserName != false)
    {
    	jQuery.cookie("UserName", data.UserName);
    	jQuery("#login").fadeOut("fast");
    	
    	jQuery("#loggedin").load("Components/Login/loggedIn.html", function()
	{	
		jQuery("#loggedin").fadeIn("slow");
		
//		jQuery("#addmenubutton").show();
				
//		jQuery("#updatemenubutton").show();
		
		jQuery("#situationsmenubutton").show();
		
		jQuery("#toolsmenubutton").fadeIn("slow");
		
//		jQuery("#adminmenubutton").show();
		
		jQuery("#register").hide();
	});
    }
    else
    {
    	//pop up a registration form or something???
    }
    
    
    
    //alert( "cookie: "+jQuery.cookie("UserName") );
}

function logout()
{
	//delete the UserName cookie
	jQuery.cookie("UserName", null);
	
	jQuery("#loggedin").fadeOut("slow");
	
    	jQuery("#login").fadeIn("slow");
	
	jQuery("#situationsmenubutton").hide();
			
	jQuery("#updatemenubutton").hide();
		
	jQuery("#addmenubutton").hide();
	
	jQuery("#toolsmenubutton").fadeOut("slow");
		
	jQuery("#adminmenubutton").hide();
		
	jQuery("#register").show();
    	
    	loadHome();
}