function helpDialogInit(iconType, dialogTitle, message)
{
   $( "#dialog-message" ).empty();
   
   if(iconType === "alert")
   {
      $( "#dialog-message" ).append("<span class=\"ui-icon ui-icon-alert\" "+
         "style=\"float: left; margin: 0 7px 20px 0;\"></span><br><br>");      
   }
   else if(iconType === "info")
   {
      $( "#dialog-message" ).append("<span class=\"ui-icon ui-icon-info\" "+
         "style=\"float: left; margin: 0 7px 20px 0;\"></span><br><br>");     
   }
   
    $( "#dialog" ).dialog({
      autoOpen: true,
      modal: true,
      height: dialogheight,
      width: dialogwidth,
      resizable: false,
      draggable: false,
      title: dialogTitle,
      closeOnEscape: false,
      buttons: {
          Ok: function() {
            jQuery( this ).dialog( "close" );
          }
      }
    });
   
   $( "#dialog-message" ).append(message);   
}

function adsDialogInit(dialogTitle, timeInMilliseconds)
{   
    $( "#dialog" ).dialog( "option", "buttons", [  ] );
    
    $( "#dialog-message" ).empty();
   
    $( "#dialog" ).dialog({
      autoOpen: true,
      modal: true,
      height: dialogheight,
      width: dialogwidth,
      resizable: false,
      draggable: false,
      title: dialogTitle,
      closeOnEscape: false
    });
   
   $( "#dialog-message" ).append('<iframe width="'+$('#dialog').width()+'" height="'+$('#dialog').height()*.92+'" src="http://www.youtube.com/embed/videoseries?list='+youTubePlayList+'&disablekb=1&controls=0&autoplay=1&index='+youTubePlayListIndex+'" frameborder="0"></iframe>'); 
   
    var $dialog = $("#dialog"); // Your Dialog Div

    //Get Dialogs Parent and find the close button. 
    //jQuery assigns .ui-dialog-titlebar-close class to the close X (a tag)
    var $dialogCloseBtn = $dialog.parent().find('.ui-dialog-titlebar-close'); 

    //hide the close button
    $dialogCloseBtn.hide();
    
    $dialogCloseBtn.click(function(e) {
        $( "#dialog-message" ).empty(); 
    });

    //show the close button after 10 seconds
    setTimeout(function () 
    {
        $dialogCloseBtn.fadeIn(100);
        
//        $( "#dialog" ).dialog( "option", "buttons", [ { text: "Close", click: function() { $( this ).dialog( "close" ); } } ] );
        
    }, timeInMilliseconds);
   
    if(youTubePlayListIndex < youTubePlayListLength)
    {
        youTubePlayListIndex = youTubePlayListIndex + 1;
    }
    else
    {
        youTubePlayListIndex = 1;
    }
}

function loadingDialogInit()
{
   $( "#dialog-message" ).empty();
   
    $( "#dialog" ).dialog({
      autoOpen: true,
      modal: true,
      height: dialogheight,
      width: dialogwidth,
      resizable: false,
      draggable: false,
      title: 'Loading, Please Wait...',
      closeOnEscape: false
    });
   
   $( "#dialog-message" ).append("<img id=\"loadingajaxloader\" src=\"images/ajax-loader.gif\">");
   
    var $dialog = $("#dialog"); // Your Dialog Div

    //Get Dialogs Parent and find the close button. 
    //jQuery assigns .ui-dialog-titlebar-close class to the close X (a tag)
    var $dialogCloseBtn = $dialog.parent().find('.ui-dialog-titlebar-close'); 

    //hide the close button
    $dialogCloseBtn.hide(); 
}


function loadingDialogClose()
{
    $( "#dialog" ).dialog("close");
    
    var $dialog = $("#dialog"); // Your Dialog Div

    //Get Dialogs Parent and find the close button. 
    //jQuery assigns .ui-dialog-titlebar-close class to the close X (a tag)
    var $dialogCloseBtn = $dialog.parent().find('.ui-dialog-titlebar-close'); 

    //hide the close button
    $dialogCloseBtn.show(); 
}

function loginDialogInit()
{
   $( "#dialog-message" ).empty();
   
    $( "#dialog" ).dialog({
      autoOpen: true,
      modal: true,
      height: dialogheight,
      width: dialogwidth,
      resizable: false,
      draggable: false,
      title: "Login",
      closeOnEscape: false,
      buttons: {
          Login: function() {
            TrackButtonClicked('Login', 'clicked', 'Attempt to Login', 1);
            loginRequest();
          },
          Register: function() {    
            if(phonegap != "false")
            {
                navigator.app.loadUrl('http://www.pitchpredict.com/index.php?option=com_users&view=registration', {openExternal:true});
            }
            else
            {
                window.open('http://www.pitchpredict.com/index.php?option=com_users&view=registration', '_blank');
            } 
            TrackButtonClicked('Register', 'clicked', 'Attempt to Register', 1);
            jQuery( this ).dialog( "close" );
          },
          Close: function() {
            jQuery( this ).dialog( "close" );
          }
      }
    });
   
    if(userInfoMap.UserName === "" || userInfoMap.UserName === null || userInfoMap.UserName === "undefined" || userInfoMap.UserName === "false")
    {
        $( "#dialog-message" ).append("<div id=\"logincontainer\"></div>");   

        $( "#logincontainer" ).append("<label>Username:  \n"+
                                "<input type=\"text\" id=\"userName\" name=\"userName\" tabindex=\"1\" class=\"text\" />\n"+  
                                "</label>\n"+
                                "<label>Password: \n"+
                                       "<input type=\"password\" id=\"password\" name=\"password\" tabindex=\"2\" class=\"text\" />"+
                                       //"<input onclick=\"loginRequest();\" type=\"submit\" name=\"Submit\" value=\"Log In\" tabindex=\"3\" class=\"buttons\" />  "+
                                "</label>");
    }
    else
    {
        $( "#dialog" ).dialog( "option", "title", "Logout" );
        $( "#dialog" ).dialog( "option", "buttons", [ { text: "Logout", click: function() { logout();$( this ).dialog( "close" ); } }, { text: "Close", click: function() { $( this ).dialog( "close" ); } } ] );
    }           
}
