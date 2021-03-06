//function googleAnalyticsInit() 
//{
//    //    console.log('gaInit');
//    if(googleAnalyticsInitialized != 'true')
//    {
//        if((typeof cordova == 'undefined') && (typeof Cordova == 'undefined'))
//        {
//            _gaq.push(['_setAccount', gaAccount]);
//            _gaq.push(['_setDomainName', gaDomianName]);
//            _gaq.push(['_trackPageview']);
//
//            (function() {
//                var ga = document.createElement('script');
//                ga.type = 'text/javascript';
//                ga.async = true;
//                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//                var s = document.getElementsByTagName('script')[0];
//                s.parentNode.insertBefore(ga, s);
//            })();
//            console.log('Google Analytics Initialized');
//        }
//        else
//        {
//            gaPlugin = window.plugins.gaPlugin;        
//            //    navigator.notification.confirm('GA_PLUGIN would like your permission to collect usage data. No personal or user identifiable data will be collected.', permissionCallback, 'Attention', 'Allow,Deny');
//            gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, gaAccount, 50);
//            
//            PageButtonClicked(gaDomianName);
//            
//            //Track device properties
//            var element = document.getElementById('deviceProperties');
//            TrackButtonClicked('Device', 'Name', device.name, 1);
//            TrackButtonClicked('Device', 'Cordova', device.cordova, 1);
//            TrackButtonClicked('Device', 'Platform', device.platform, 1);
//            TrackButtonClicked('Device', 'UUID', device.uuid, 1);
//            TrackButtonClicked('Device', 'Version', device.version, 1);
//        }
//        
//        googleAnalyticsInitialized = 'true';
//    }
//}

//function permissionCallback (button) {
//    if (button === 1)
//    {
//        gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-29743249-1", 50);
//        console.log('Google Analytics PhoneGap Plugin Initialized');
//
//        PageButtonClicked('pitchpredict.com');
//    }     
//}

function nativePluginResultHandler (result) {
    console.log('nativePluginResultHandler: '+error);
}

function nativePluginErrorHandler (error) {
    console.log('nativePluginErrorHandler: '+error);
}

function TrackButtonClicked(category, action, label, value) {
//    googleAnalyticsInit();
    if((typeof cordova == 'undefined') && (typeof Cordova == 'undefined'))
    {
        _gaq.push(['_trackEvent', category, action, label]);
    }
    else
    {
        gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, category, action, label, value);
    }
}

function googleAnalyticsDeInit() {
//    googleAnalyticsInit();
    if((typeof cordova == 'undefined') && (typeof Cordova == 'undefined'))
    {
        
    }
    else
    {
        gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
    }
}

//            function VariableButtonClicked() {
//                gaPlugin.setVariable( nativePluginResultHandler, nativePluginErrorHandler, "favoriteColor", "Purple", 1);
//                gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event with variable", 2);
//            }

function PageButtonClicked(url) {
//    googleAnalyticsInit();
    gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, url);
}


