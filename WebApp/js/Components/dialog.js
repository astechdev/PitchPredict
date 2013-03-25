function dialogInit(iconType, dialogTitle, message)
{    
    //need to initialize the dialog div so that 
    //we can set the resize function    
    var $dialog = $("#dialog"); // Your Dialog Div
    
    $dialog.dialog({
        autoOpen: false
    });//initialized
    
    //Get Dialogs Parent and find the close button. 
    //jQuery assigns .ui-dialog-titlebar-close class to the close X (a tag)
    var $dialogCloseBtn = $dialog.parent().find('.ui-dialog-titlebar-close'); 

    //hide the close button, we want our touch screen users to enjoy big buttons
    $dialogCloseBtn.hide();
    console.log('dialogCloseBtn.hide');
}

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
                vibrateFeedback();
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
    
//    console.log('manually get ads');
//    _inmobi.getNewAd(document.getElementById('dialog-message'));
//    console.log('ads should be displayed');
   
//    $( "#dialog-message" ).append('<iframe width="'+$('#dialog').width()+'" height="'+$('#dialog').height()*.92+'" src="http://www.youtube.com/embed/videoseries?list='+youTubePlayList+'&disablekb=1&controls=0&autoplay=1&index='+youTubePlayListIndex+'" frameborder="0"></iframe>'); 
   
    //    $( "#dialog-message" ).append('<script type="text/javascript"><!--'+
    //                                    'google_ad_client = "ca-pub-5820947892438978";'+
    //                                    '/* PitchPredict */'+
    //                                    'google_ad_slot = "0144094309";'+
    //                                    'google_ad_width = 250;'+
    //                                    'google_ad_height = 250;'+
    //                                    '//-->'+
    //                                    '</script>'+
    //                                    '<script type="text/javascript"'+
    //                                    'src="http://pagead2.googlesyndication.com/pagead/show_ads.js">'+
    //                                    'alert("Adsense Loaded");</script>');

    //show the close button after 10 seconds
    setTimeout(function () 
    {
        //        $dialogCloseBtn.fadeIn(100);
        
        $( "#dialog" ).dialog( "option", "buttons", [ {
            text: "Close", 
            click: function() {
                vibrateFeedback();
                $( "#dialog-message" ).empty();
                $( this ).dialog( "close" );
            }
        } ] );
        
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
    $( "#dialog" ).dialog( "option", "buttons", [  ] );
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
}


function loadingDialogClose()
{
    $( "#dialog" ).dialog("close");
}

function registerDialogInit()
{
    $( "#dialog-message" ).empty();
   
    $( "#dialog" ).dialog({
        autoOpen: true,
        modal: true,
        height: dialogheight,
        width: dialogwidth,
        resizable: false,
        draggable: false,
        title: "Register",
        closeOnEscape: false,
        buttons: {
            Register: function() {  
                vibrateFeedback();
                //            if(phonegap != "false")
                //            {
                //                navigator.app.loadUrl('http://www.pitchpredict.com/index.php?option=com_users&view=registration', {openExternal:true});
                //            }
                //            else
                //            {
                //                window.open('http://www.pitchpredict.com/index.php?option=com_users&view=registration', '_blank');
                //            } 
                TrackButtonClicked('Register', 'clicked', 'Attempt to Register', 1);
            
                //            jQuery.validator.setDefaults(
                //            {
                //                submitHandler: function() 
                //                    {
                //                        var url = "http://www.pitchpredict.com/index.php?option=com_users&amp;task=registration.register"; // the script where you handle the form input.
                //
                //                        jQuery.ajax(
                //                        {
                //                            type: "POST",
                //                            url: url,
                //                            data: jQuery("#registrationForm").serialize(), // serializes the form's elements.
                //                            success: function(data)
                //                            {
                ////                                alert(data); // show response from the php script.           
                //                 
                //                                jQuery( this ).dialog( "close" );
                //                            }
                //                        });
                //                    }
                //            });
                //            
                //            jQuery("#registrationForm").validate(
                //            {
                //                rules: {
                //                        "jform[name]": "required",
                //                        "jform[username]": {
                //                                required: true,
                //                                minlength: 2
                //                        },
                //                        "jform[password1]": {
                //                                required: true,
                //                                minlength: 5
                //                        },
                //                        "jform[password2]": {
                //                                required: true,
                //                                minlength: 5,
                //				equalTo: "#jform[password1]"
                //                        },
                //                        "jform[email1]": {
                //                                required: true,
                //                                email: true
                //                        },
                //                        "jform[email2]": {
                //                                required: true,
                //                                email: true,
                //				equalTo: "#jform[email2]"
                //                        }
                //                },
                //                messages: {
                //                        "jform[name]": "Please enter your name",
                //                        "jform[username]": {
                //                                required: "Please enter a username",
                //                                minlength: "Your username must consist of at least 2 characters"
                //                        },
                //                        "jform[password1]": {
                //                                required: "Please provide a password",
                //                                minlength: "Your password must be at least 5 characters long"
                //                        },
                //                        "jform[password2]": {
                //                                required: "Please provide a password",
                //                                minlength: "Your password must be at least 5 characters long",
                //                                equalTo: "Please enter the same password as above"
                //                        },
                //                        "jform[email1]": { 
                //                                required: "Please enter a valid email address"
                //                        },
                //                        "jform[email2]": { 
                //                                required: "Please enter a valid email address",
                //                                equalTo: "Please enter the same email as above"
                //                        }
                //                }
                //            }); 
            
                var url = "http://www.pitchpredict.com/index.php?option=com_users&amp;task=registration.register"; // the script where you handle the form input.

                jQuery.ajax(
                {
                    type: "POST",
                    url: url,
                    data: jQuery("#registrationForm").serialize(), // serializes the form's elements.
                    success: function(data)
                    {
                    //                                alert(data); // show response from the php script.
                    }
                });     

                jQuery( this ).dialog( "close" );
            },
            Close: function() {
                vibrateFeedback();
                jQuery( this ).dialog( "close" );
            }
        }
    });
   
    $( "#dialog-message" ).append('<form id="registrationForm" name="btl-formregistration" class="btl-formregistration">'+
        '<div class="btl-note"><span>Fields marked with an asterisk (*) are required.</span></div>'+
        '<div id="btl-registration-error" class="btl-error"></div>'+
        '<div class="btl-field">'+
        '<div class="btl-label">Name</div>'+
        '<div class="btl-input">'+
        '<input id="btl-input-name" type="text" name="jform[name]">'+
        '</div>'+
        '</div>'+
        '<div class="clear"></div>'+
        '<div class="btl-field">'+
        '<div class="btl-label">Username</div>'+
        '<div class="btl-input">'+
        '<input id="btl-input-username1" type="text" name="jform[username]">'+
        '</div>'+
        '</div>'+
        '<div class="clear"></div>'+
        '<div class="btl-field">'+
        '<div class="btl-label">Password</div>'+
        '<div class="btl-input">'+
        '<input id="btl-input-password1" type="password" name="jform[password1]">'+
        '</div>'+
        '</div>'+
        '<div class="clear"></div>'+
        '<div class="btl-field">'+
        '<div class="btl-label">Verify password</div>'+
        '<div class="btl-input">'+
        '<input id="btl-input-password2" type="password" name="jform[password2]">'+
        '</div>'+
        '</div>'+
        '<div class="clear"></div>'+
        '<div class="btl-field">'+
        '<div class="btl-label">Email</div>'+
        '<div class="btl-input">'+
        '<input id="btl-input-email1" type="text" name="jform[email1]">'+
        '</div>'+
        '</div>'+
        '<div class="clear"></div>'+
        '<div class="btl-field">'+
        '<div class="btl-label">Verify email</div>'+
        '<div class="btl-input">'+
        '<input id="btl-input-email2" type="text" name="jform[email2]">'+
        '</div>'+
        '</div>'+
        '<div class="clear"></div>'+
        '<div class="btl-buttonsubmit">'+
        '<input type="hidden" name="option" value="com_users"> '+
        '<input type="hidden" name="task" value="registration.register"> '+
        '<input type="hidden" name="54b829d2e82c2bfa7c1d0473595e40fb" value="1">'+
        '</div>'+
        '</form>');
//    if(userInfoMap.UserName === "" || userInfoMap.UserName === null || userInfoMap.UserName === "undefined" || userInfoMap.UserName === "false")
//    {
//        $( "#dialog-message" ).append("<div id=\"logincontainer\"></div>");   
//
//        $( "#logincontainer" ).append("<label>Username:  \n"+
//                                "<input type=\"text\" id=\"userName\" name=\"userName\" tabindex=\"1\" class=\"text\" />\n"+  
//                                "</label>\n"+
//                                "<label>Password: \n"+
//                                       "<input type=\"password\" id=\"password\" name=\"password\" tabindex=\"2\" class=\"text\" />"+
//                                       //"<input onclick=\"loginRequest();\" type=\"submit\" name=\"Submit\" value=\"Log In\" tabindex=\"3\" class=\"buttons\" />  "+
//                                "</label>");
//    }
//    else
//    {
//        $( "#dialog" ).dialog( "option", "title", "Logout" );
//        $( "#dialog" ).dialog( "option", "buttons", [ { text: "Logout", click: function() { logout();$( this ).dialog( "close" ); } }, { text: "Close", click: function() { $( this ).dialog( "close" ); } } ] );
//    }           
}
