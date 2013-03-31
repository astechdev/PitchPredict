function dialogInit()
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
    
    console.log('manually get ads');
    _inmobi.getNewAd(document.getElementById('dialog-message'));
    console.log('ads should be displayed');
   
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

function subscribeDialogInit()
{
    $( "#dialog-message" ).empty();
   
    $( "#dialog" ).dialog({
        autoOpen: true,
        modal: true,
        height: dialogheight,
        width: dialogwidth,
        resizable: false,
        draggable: false,
        title: "Subscriptions",
        closeOnEscape: false,
        buttons: {
            Premium: function() {
                $('#os0').val('Premium');
                openPayPalWindow();
                jQuery( this ).dialog( "close" );
            },
            Plus: function() {
                $('#os0').val('Premium Plus');
                openPayPalWindow();
                jQuery( this ).dialog( "close" );
            },
            Cancel: function() {
                jQuery( this ).dialog( "close" );
            }
        }
    });
   
    $( "#dialog-message" ).append('');
                                
    $('#custom').val(JSON.stringify(user));
}