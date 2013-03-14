function initialize() {
    // Wait for Cordova to connect with the device
    document.addEventListener("deviceready", onDeviceReady, false);
           
    jQuery(window).load(function() 
    {
        FastClick.attach(document.body);
        console.log('fastclick initialized');
    });

    jQuery(window).unload(function() 
    {
        deinitialize();
        console.log('deinitialized');
    });
    
    jQuery(window).resize(function() 
    { 
        console.log('window resize events set');
        dialogheight = $(window).height()*.75;
        dialogwidth = $(window).width()*.80;

        $( "#pitchcounterdialogcontainer" ).dialog( "option", "width", dialogwidth );

        $( "#pitchcounterdialogcontainer" ).dialog( "option", "height", dialogheight );

        $( "#dialog" ).dialog( "option", "width", dialogwidth );

        $( "#dialog" ).dialog( "option", "height", dialogheight );
        
        chartheight = ($(window).height()*.75);
        chartwidth = chartheight*1.40;                          
        setCurrentChart(currentchart);
        dashboard.dimensions();
    });
    
    dashboard.init();
    
    //Remove the user based funvtionality if not phonegap app.  This way users can use the "Web App" for free, but have to 
    //pay for app to get additional traking functionality plus no ads
//    loadUserBasedFunctionality();    

    jQuery( "#logoutcontainer" ).hide();

    var hammertime = $('body').hammer();
    console.log(hammertime);

    hammertime.on("swipeleft", function(ev) 
    {
        if(window.console) { console.log(ev); }
        leftSwipeEventHandler();
    });

    hammertime.on("swiperight", function(ev) 
    {
        if(window.console) { console.log(ev); }
        rightSwipeEventHandler();
    });

    hammertime.on("swipeup", function(ev) 
    {
        if(window.console) { console.log(ev); }
        upSwipeEventHandler();
    });

    hammertime.on("swipedown", function(ev) 
    {
        if(window.console) { console.log(ev); }
        downSwipeEventHandler();
    });

    load();

    //need to initialize the dialog div so that 
    //we can set the resize function
    $( "#dialog" ).dialog({
      autoOpen: false
    });
}

function onDeviceReady() 
{
    console.log('Device Ready');
    jQuery(window).off('resize');
    console.log('unbind window resize events');
    phonegap = 'true';
    console.log('set phonegap to true');
    loadUserBasedFunctionality();
    console.log('userbased functionaility loaded');    
    
    // Register some event listeners
    document.addEventListener("online", onDeviceOnline, false);
    document.addEventListener("offline", onDeviceOffline, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
}

function onDeviceOnline() 
{
    console.log('onDeviceOnline');  
}

function onDeviceOffline() 
{
    console.log('onDeviceOffline');  
}

function onMenuKeyDown() 
{
    console.log('onMenuKeyDown');
    helpDialogInit(null, "Menu", "Manage your saved queries.");
}

function deinitialize() {
    googleAnalyticsInit();
    gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
}

function loadUserBasedFunctionality() {
    loadLogin();
}

jQuery.fn.nextOrFirst = function(selector)
{
    var next = this.next(selector);

    return (next.length) ? next : this.prevAll(selector).last();
}

jQuery.fn.prevOrLast = function(selector)
{
    var prev = this.prev(selector);

    return (prev.length) ? prev : this.nextAll(selector).last();
}

String.prototype.beginsWith = function(t, i) { 
	if (i==false) 
	{ 
		return (t == this.substring(0, t.length)); 
	}
	else 
	{ 
		return (t.toLowerCase()== this.substring(0, t.length).toLowerCase());
	}
}

String.prototype.endsWith = function(t, i) { 
	if (i==false) 
	{ 
		return (t== this.substring(this.length - t.length));
	}
	else
	{ 
		return (t.toLowerCase() == this.substring(this.length -t.length).toLowerCase());
	}
} 

function stateChanged()
{
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
 	{
		if (xmlHttp.readyState == 4)
		{
			if(xmlHttp.status == 200)
			{
				res = xmlHttp.responseText;  // These following lines get the response and update the page
				alert('xmlHttp.responseText' + xmlHttp.responseText);
			}
			else
			{
			     alert('There was a problem with the request.');
			}
 		}
 	}
}

function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
 	{
 		//Internet Explorer
 		try
  		{
  			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  		}
 		catch (e)
  		{
  			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  		}
 	}
	return xmlHttp;
}

function pausecomp(millis)
{
	var date = new Date();
	var curDate = null;
	
	do { curDate = new Date(); }
	while(curDate-date < millis);
}

function isEmpty(map) {
   for(var key in map) {
      if (map.hasOwnProperty(key)) {
         return false;
      }
   }
   return true;
}