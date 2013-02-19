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

function adsDialogInit(dialogTitle, message, timeInMilliseconds)
{
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
   
   $( "#dialog-message" ).append(message); 
   
    var $dialog = $("#dialog"); // Your Dialog Div

    //Get Dialogs Parent and find the close button. 
    //jQuery assigns .ui-dialog-titlebar-close class to the close X (a tag)
    var $dialogCloseBtn = $dialog.parent().find('.ui-dialog-titlebar-close'); 

    //hide the close button
    $dialogCloseBtn.hide();

    //show the close button after 10 seconds
    setTimeout(function () 
    {
        $dialogCloseBtn.fadeIn(100);
    }, timeInMilliseconds);
   
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
          Close: function() {
            jQuery( this ).dialog( "close" );
          }
      }
    });
   
   $( "#dialog-message" ).append("<div id=\"logincontainer\"></div>");   
   
   $( "#logincontainer" ).append("<form id=\"login\">"+
                            "<label>Username:  \n"+
                            "<input type=\"text\" id=\"userName\" name=\"userName\" tabindex=\"1\" class=\"text\" />\n"+  
                            "</label>\n"+
                            "<label>Password: \n"+
                                   "<input type=\"password\" id=\"password\" name=\"password\" tabindex=\"2\" class=\"text\" />"+
                                   "<input onclick=\"loginRequest();\" type=\"submit\" name=\"Submit\" value=\"Log In\" tabindex=\"3\" class=\"buttons\" />  "+
                            "</label>"+
                            "</form>"+
                            "<a href=\"http://www.pitchpredict.com/index.php/component/users/?view=registration\" target=\"_blank\">Register</a>");
                     
}
