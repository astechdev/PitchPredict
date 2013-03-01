function initialize() {
    // Wait for Cordova to connect with the device
    document.addEventListener("deviceready", onDeviceReady, true);
    
    setTimeout(gaInit(),1000);
}

function gaInit() {
//    console.log('gaInit');
    if(phonegap === 'false')
    {
        _gaq.push(['_setAccount', 'UA-29743249-1']);
        _gaq.push(['_setDomainName', 'pitchpredict.com']);
        _gaq.push(['_trackPageview']);

        (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
        console.log('Google Analytics Initialized');
    }
}

function onDeviceReady() {
    debug.log('Device Ready');
    phonegap = 'true';
    gaPlugin = window.plugins.gaPlugin;        

    navigator.notification.confirm('GA_PLUGIN would like your permission to collect usage data. No personal or user identifiable data will be collected.', permissionCallback, 'Attention', 'Allow,Deny');
}

function permissionCallback (button) {
    if (button === 1)
    {
        gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-29743249-1", 50);

        PageButtonClicked('pitchpredict.com');
    }     
}

function nativePluginResultHandler (result) {
    //alert('nativePluginResultHandler - '+result);
    debug.log('nativePluginResultHandler: '+result);

}

function nativePluginErrorHandler (error) {
    //alert('nativePluginErrorHandler - '+error);
    debug.log('nativePluginErrorHandler: '+error);
}

function TrackButtonClicked(category, action, label, value) {
    if(phonegap === "false")
    {
        _gaq.push(['_trackEvent', category, action, label]);
    }
    else
    {
        gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, category, action, label, value);
    }
}

//            function VariableButtonClicked() {
//                gaPlugin.setVariable( nativePluginResultHandler, nativePluginErrorHandler, "favoriteColor", "Purple", 1);
//                gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event with variable", 2);
//            }

function PageButtonClicked(url) {
    gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, url);
}

function goingAway() {
    gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
}


//            // Wait for Cordova to connect with the device
//            //
//            document.addEventListener("deviceready",onDeviceReady,false);
//
//            // Cordova is ready to be used!
//            //
//            function onDeviceReady() {
//                //externalLink($this);
//                debug.log('Device Ready');
//                phonegap = 'true';
//                
//                gaPlugin = window.plugins.gaPlugin;
//                gaPlugin.init(successHandler, errorHandler, "UA-12345678-1", 10);
//            }


