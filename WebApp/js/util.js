function initialize() {
    // Wait for Cordova to connect with the device
    document.addEventListener("deviceready", onDeviceReady, false);
    
    dashboard.init();
    
//    jQuery.getScript("js/Components/chartFunctions.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " chartFunctions loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " chartFunctions failed");
//    });
//
//    jQuery.getScript("js/Components/login.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " login loaded"); 
////        jQuery( "#logoutcontainer" ).hide();
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " login failed");
//    });
//
//    jQuery.getScript("js/Components/dialog.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " dialog loaded");
//        //need to initialize the dialog div so that 
//        //we can set the resize function    
//        dialogInit();
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " dialog failed");
//    });
//
//    jQuery.getScript("js/Components/team_lineup.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " team_lineup loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " team_lineup failed");
//    });
//
//    jQuery.getScript("js/Components/scoreboard.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " scoreboard loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " scoreboard failed");
//    });
//
//    jQuery.getScript("js/Components/filters.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " filters loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " filters failed");
//    });
//
//    jQuery.getScript("js/Components/hotzone.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " hotzone loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " hotzone failed");
//    });
//
//    jQuery.getScript("js/Components/field.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " field loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " field failed");
//    });
//
//    jQuery.getScript("js/Components/pitch_recorder.js")
//    .done(function(script, textStatus) {
//        console.log( textStatus + " pitch_recorder loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " pitch_recorder failed");
//    });

    load(); 
    
    // Check if phonegap, if not load web app functionality
    jQuery.getScript("phonegap.js")
    .done(function(script, textStatus) {        
        alert( textStatus + " phonegap loaded");
        
//        jQuery.getScript("cdv-plugin-fb-connect.js")
//        .done(function(script, textStatus) {
//            console.log( textStatus + " cdv-plugin-fb-connect loaded");
//            
//            jQuery.getScript("facebook-js-sdk.js")
//            .done(function(script, textStatus) {
//                console.log( textStatus + " facebook-js-sdk loaded");
////                initDevice();
//            })
//            .fail(function(jqxhr, settings, exception) {
//                console.log( exception + " facebook-js-sdk failed");
//            });
//        })
//        .fail(function(jqxhr, settings, exception) {
//            console.log( exception + " cdv-plugin-fb-connect failed");
//        });
        
        jQuery.getScript("GAPlugin.js")
        .done(function(script, textStatus) {
            alert( textStatus + " GAPlugin loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            alert( exception + " GAPlugin failed");
        });        
    })
    .fail(function(jqxhr, settings, exception) {
        console.log( exception + " phonegap failed");

        jQuery(window).unload(function() 
        {
            deinitialize();
            console.log('deinitialized');
        });

        jQuery(window).resize(function() 
        { 
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
        
        var gAppID = '263545480387259';

        if (gAppID == 'enter_your_appid_here') {
            console.log('You need to enter your App ID in js/util.js on line 37.');
        }
    
        jQuery.getScript("js/Components/FB/auth.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " auth loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " auth failed");
        });

        jQuery.getScript("js/Components/FB/feed.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " feed loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " feed failed");
        });

        jQuery.getScript("js/Components/FB/graph_api.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " graph_api loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " graph_api failed");
        });

        jQuery.getScript("js/Components/FB/requests.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " requests loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " requests failed");
        });

        jQuery.getScript("js/Components/FB/send.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " send loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " send failed");
        });

        jQuery.getScript("js/Components/FB/credits.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " credits loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " credits failed");
        });        

        //Initialize the Facebook SDK
        //See https://developers.facebook.com/docs/reference/javascript/
        window.fbAsyncInit = function() {
            FB.init({ 
                appId: gAppID,
                status: true,
                cookie: false,
                xfbml: true,
                frictionlessRequests: true,
                useCachedDialogs: true,
                oauth: true
            });

            FB.getLoginStatus(handleStatusChange);

            authUser();
            checkForCredits();
            updateAuthElements();

//            FB.Event.subscribe('auth.login', function(response) {
//                console.log('auth.login event');
//            });
//
//            FB.Event.subscribe('auth.logout', function(response) {
//                console.log('auth.logout event');
//            });
//
//            FB.Event.subscribe('auth.sessionChange', function(response) {
//                console.log('auth.sessionChange event');
//            });
//
//            FB.Event.subscribe('auth.statusChange', function(response) {
//                console.log('auth.statusChange event');
//            });
        };

        // Load the SDK Asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    
        // Initialize inmobi
        inmobi_conf = 
            {
                siteid : "e807ef51fb1a49379c969a777d83d035",
                //siteid : "4028cba631d63df10131e1d3191d00cb",
                slot : "10",
                test: false,
                manual: true,
                onError : function(code) {
                    console.log(code);
                    if(code == "nfr") {
                        document.getElementById("dialog-message").style.display = "none";
                        // do something else. call to other ad network or logic to display in-house ads, etc. 
                    }
                }
            };

        jQuery.getScript("js/libs/inmobi.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " inmobi loaded");
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " inmobi failed");
        });
        
    });
     
    jQuery.getScript("js/googleAnalytics.js")
    .done(function(script, textStatus) {
        console.log( textStatus + " googleAnalytics loaded");
    })
    .fail(function(jqxhr, settings, exception) {
        console.log( exception + " googleAnalytics failed");
    });     
     
    jQuery.getScript("js/touchEvents.js")
    .done(function(script, textStatus) {
        console.log( textStatus + " touchEvents loaded");

        jQuery.getScript("js/libs/jquery.hammer.js")
        .done(function(script, textStatus) {
            console.log( textStatus + " jquery.hammer loaded");
            
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
            
            console.log('hammertime initialized');
        })
        .fail(function(jqxhr, settings, exception) {
            console.log( exception + " hammertime failed");
        });
    })
    .fail(function(jqxhr, settings, exception) {
        console.log( exception + " touchEvents failed");
    });

    jQuery.getScript("js/libs/fastclick.js")
    .done(function(script, textStatus) {
        console.log( textStatus + " fastclick loaded");
        jQuery(window).load(function() 
        {
            FastClick.attach(document.body);
            console.log('fastclick initialized');
        });
    })
    .fail(function(jqxhr, settings, exception) {
        console.log( exception + " fastclick failed");
    });
}

function onDeviceReady() 
{
//    alert('Device Ready');
//    alert('set phonegap to true');
    phonegap = 'true';
    initDevice();
}

function initDevice() 
{
//    alert('initDevice');
    
    if(phonegap === 'true')
    {
//        alert('phonegap = '+phonegap);
//        jQuery(window).off('resize');
//        alert('unbind window resize events');

        //    loadUserBasedFunctionality();
        //    console.log('userbased functionaility loaded'); 

        //Remove user preferences on phonegap app since menu button will
        //contain this functionality.
//        jQuery('#preferences').remove();

        // Register some event listeners
        document.addEventListener("online", onDeviceOnline, false);
        document.addEventListener("offline", onDeviceOffline, false);
        document.addEventListener("menubutton", onMenuKeyDown, false);

//        // Initialize FB plugin
//        FB._initialized = false;
//        FB.init({ appId: "263545480387259", nativeInterface: CDV.FB, useCachedDialogs: false });
//
//        if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) console.log('Cordova variable does not exist. Check that you have included cordova.js correctly');
//        if (typeof CDV == 'undefined') console.log('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
//        if (typeof FB == 'undefined') console.log('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
//
//        FB.Event.subscribe('auth.login', function(response) {
//                                   console.log('auth.login event');
//                                   });
//
//        FB.Event.subscribe('auth.logout', function(response) {
//                           console.log('auth.logout event');
//                           });
//
//        FB.Event.subscribe('auth.sessionChange', function(response) {
//                           console.log('auth.sessionChange event');
//                           });
//
//        FB.Event.subscribe('auth.statusChange', function(response) {
//                           console.log('auth.statusChange event');
//                           });
        
//        load();
        
        // Hide the splashscreen after loading...
//        navigator.splashscreen.hide();
        
//        alert('init device complete');
    }
    else
    {
        setTimeout(initDevice(),1500);
    }
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
    vibrateFeedback();
    helpDialogInit(null, "Menu", "Manage your saved queries.");
}

function deinitialize() {
    googleAnalyticsInit();
    gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
}

//function loadUserBasedFunctionality() {
//    loadLogin();
//}

function load()
{
//    alert('load');
    //    loadingDialogInit();
    //    $('#filters').hide();
    //reinitialize some maps
    //    if(userInfoMap.UserName != "" && userInfoMap.UserName != null && userInfoMap.UserName != "undefined")
    //    {
    //        for(var stateVariablesKey in stateVariablesMap) 
    //        {
    //            if(stateVariablesMap.hasOwnProperty(stateVariablesKey)) 
    //            {
    //                delete stateVariablesMap[stateVariablesKey];
    //            }
    //        }
    //    }
    
    for(var teamsKey in teamsMap) 
    {
        if(teamsMap.hasOwnProperty(teamsKey)) 
        {
            delete teamsMap[teamsKey];
        }
    }
    
    for(var homeTeamKey in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(homeTeamKey)) 
        {
            delete homeTeamMap[homeTeamKey];
        }
    }
    
    for(var awayTeamKey in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(awayTeamKey)) 
        {
            delete awayTeamMap[awayTeamKey];
        }
    }
    
    for(var offenseTeamKey in offenseTeamMap) 
    {
        if(offenseTeamMap.hasOwnProperty(offenseTeamKey)) 
        {
            delete offenseTeamMap[offenseTeamKey];
        }
    }
    
    for(var defenseTeamKey in defenseTeamMap) 
    {
        if(defenseTeamMap.hasOwnProperty(defenseTeamKey)) 
        {
            delete defenseTeamMap[defenseTeamKey];
        }
    }
    
    for(var pitchTypesKey in pitchTypesMap) 
    {
        if(pitchTypesMap.hasOwnProperty(pitchTypesKey)) 
        {
            delete pitchTypesMap[pitchTypesKey];
        }
    }
    
    for(var pitchOutcomesKey in pitchOutcomesMap) 
    {
        if(pitchOutcomesMap.hasOwnProperty(pitchOutcomesKey)) 
        {
            delete pitchOutcomesMap[pitchOutcomesKey];
        }
    }
    
    for(var pitchLocationsKey in pitchLocationsMap) 
    {
        if(pitchLocationsMap.hasOwnProperty(pitchLocationsKey)) 
        {
            delete pitchLocationsMap[pitchLocationsKey];
        }
    }
    
    
    //    alert(JSON.stringify(stateVariablesMap));
    //    alert(JSON.stringify(teamsMap));
    //    alert(JSON.stringify(homeTeamMap));
    //    alert(JSON.stringify(awayTeamMap));
    
    jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getUserStateVariables.php?callback=?&UserName='+userInfoMap.UserName, function(data) 
    {
        if(userInfoMap.UserName != "" && userInfoMap.UserName != null && userInfoMap.UserName != "undefined")
        {
            stateVariablesMap = data;
            //            jQuery.each(data, function(key, val) 
            //            {
            //                stateVariablesMap[key] = val;
            //            //            alert("stateVariablesMap["+key+"]: "+stateVariablesMap[key]);
            //            }); 

            if(stateVariablesMap['thePitchTypeSequence'] === 'underfined' || stateVariablesMap['thePitchTypeSequence'] === null)
            {
                stateVariablesMap['thePitchTypeSequence'] = new Array();
            }
            if(stateVariablesMap['thePitchLocationSequence'] === 'underfined' || stateVariablesMap['thePitchLocationSequence'] === null)
            {
                stateVariablesMap['thePitchLocationSequence'] = new Array();
            }
            if(stateVariablesMap['thePitchOutcomeSequence'] === 'underfined' || stateVariablesMap['thePitchOutcomeSequence'] === null)
            {
                stateVariablesMap['thePitchOutcomeSequence'] = new Array();
            }

            stateVariablesMap['theHomeTeamBattingOrderBatterIds'] = stateVariablesMap['theHomeTeamBattingOrderBatterIds'].split(",");
            stateVariablesMap['theAwayTeamBattingOrderBatterIds'] = stateVariablesMap['theAwayTeamBattingOrderBatterIds'].split(",");
        }
        else
        {
            if(stateVariablesMap['theTopOrBottomHalf'] === "TOP")
            {
                stateVariablesMap['thePitcherTeamId'] = stateVariablesMap['theHomeTeamId'];
                stateVariablesMap['thePitcherTeamName'] = stateVariablesMap['theHomeTeamName'];
                stateVariablesMap['thePitcherTeamAbbr'] = stateVariablesMap['theHomeTeamAbbr'];
                stateVariablesMap['thePitcherTeamScore'] = stateVariablesMap['theHomeTeamScore'];
                stateVariablesMap['theBatterTeamId'] = stateVariablesMap['theAwayTeamId'];
                stateVariablesMap['theBatterTeamName'] = stateVariablesMap['theAwayTeamName'];
                stateVariablesMap['theBatterTeamAbbr'] = stateVariablesMap['theAwayTeamAbbr'];
                stateVariablesMap['theBatterTeamScore'] = stateVariablesMap['theAwayTeamScore'];
            }
            else
            {
                stateVariablesMap['thePitcherTeamId'] = stateVariablesMap['theAwayTeamId'];
                stateVariablesMap['thePitcherTeamName'] = stateVariablesMap['theAwayTeamName'];
                stateVariablesMap['thePitcherTeamAbbr'] = stateVariablesMap['theAwayTeamAbbr'];
                stateVariablesMap['thePitcherTeamScore'] = stateVariablesMap['theAwayTeamScore'];
                stateVariablesMap['theBatterTeamId'] = stateVariablesMap['theHomeTeamId'];
                stateVariablesMap['theBatterTeamName'] = stateVariablesMap['theHomeTeamName'];
                stateVariablesMap['theBatterTeamAbbr'] = stateVariablesMap['theHomeTeamAbbr'];
                stateVariablesMap['theBatterTeamScore'] = stateVariablesMap['theHomeTeamScore'];
            }
        }
        
        console.log(JSON.stringify(stateVariablesMap));
        
        var teamsMapAquired = 'false';
        var awayTeamMapAquired = 'false';
        var homeTeamMapAquired = 'false';
        var pitchTypesAquired = 'false';
        var pitchLocationsAquired = 'false';
        var pitchOutcomesAquired = 'false';
    
        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getTeams.php?callback=?&YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
            //            jQuery.each(data, function(key, val) 
            //            {
            //                teamsMap[val.theId] = val;
            //    //            alert("key: "+val.theId+", value: "+val);
            //            });
            teamsMap = data;
            
            teamsMapAquired = 'true';
            
            loadComponents(teamsMapAquired, 
                awayTeamMapAquired, 
                homeTeamMapAquired, 
                pitchTypesAquired, 
                pitchLocationsAquired, 
                pitchOutcomesAquired);
        }).fail(function(jqxhr, textStatus, exception) {
                alert( exception + " getTeams failed");
        });


        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPlayers.php?callback=?&YearToQuery='+stateVariablesMap['theYearToQuery']+'&TeamAbbr='+stateVariablesMap['theAwayTeamAbbr'], function(data) 
        {             
            //            jQuery.each(data, function(key, val)
            //            {
            //                awayTeamMap[val.theId] = val;
            //            });
            awayTeamMap = data;
            
            //            console.log('awayTeamMap theTeamName'+awayTeamMap[stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0]].theTeamName);
            //            console.log('stateVariablesMap theBatterTeamName'+stateVariablesMap['theBatterTeamName']);
            //            if(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0] != '0')
            //            {
            //                if(stateVariablesMap['theTopOrBottomHalf'] === "TOP")
            //                {
            //                    defenseTeamMap = homeTeamMap;
            //                    offenseTeamMap = awayTeamMap;
            //                }
            //                else
            //                {
            //                    offenseTeamMap = homeTeamMap;
            //                    defenseTeamMap = awayTeamMap;
            //                }
            //            }
            
            //            console.log('awayTeamMap: '+JSON.stringify(awayTeamMap));
            //            console.log('offenseTeamMap: '+JSON.stringify(offenseTeamMap));
            //            console.log('defenseTeamMap: '+JSON.stringify(defenseTeamMap));
            
            awayTeamMapAquired = 'true';
            
            loadComponents(teamsMapAquired, 
                awayTeamMapAquired, 
                homeTeamMapAquired, 
                pitchTypesAquired, 
                pitchLocationsAquired, 
                pitchOutcomesAquired);
        }).fail(function(jqxhr, textStatus, exception) {
                alert( exception + " awateam getPlayers failed");
        });

        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPlayers.php?callback=?&YearToQuery='+stateVariablesMap['theYearToQuery']+'&TeamAbbr='+stateVariablesMap['theHomeTeamAbbr'], function(data) 
        {
            //            jQuery.each(data, function(key, val)
            //            {
            //                homeTeamMap[val.theId] = val;
            //            });
            homeTeamMap = data;
            
            //            console.log('homeTeamMap theTeamName'+homeTeamMap[stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0]].theTeamName);
            //            console.log('stateVariablesMap theBatterTeamName'+stateVariablesMap['theBatterTeamName']);
            //            if(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0] != '0')
            //            {
            //                if(stateVariablesMap['theTopOrBottomHalf'] === "BOTTOM")
            //                {
            //                    defenseTeamMap = homeTeamMap;
            //                    offenseTeamMap = awayTeamMap;
            //                }
            //                else
            //                {
            //                    offenseTeamMap = homeTeamMap;
            //                    defenseTeamMap = awayTeamMap;
            //                }
            //            }
            
            //            console.log('homeTeamMap: '+JSON.stringify(homeTeamMap));
            //            console.log('offenseTeamMap: '+JSON.stringify(offenseTeamMap));
            //            console.log('defenseTeamMap: '+JSON.stringify(defenseTeamMap));
            
            homeTeamMapAquired = 'true';
            
            loadComponents(teamsMapAquired, 
                awayTeamMapAquired, 
                homeTeamMapAquired, 
                pitchTypesAquired, 
                pitchLocationsAquired, 
                pitchOutcomesAquired);
        }).fail(function(jqxhr, textStatus, exception) {
                alert( exception + " hometeam getPlayers failed");
        });
        
        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPitchTypes.php?callback=?&YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
            //            jQuery.each(data, function(key, val)
            //            {
            //                pitchTypesMap[val.theId] = val;
            //            });
            pitchTypesMap = data;

            //            alert(JSON.stringify(pitchTypesMap));

            pitchTypesAquired = 'true';

            loadComponents(teamsMapAquired, 
                awayTeamMapAquired, 
                homeTeamMapAquired, 
                pitchTypesAquired, 
                pitchLocationsAquired, 
                pitchOutcomesAquired);
        }).fail(function(jqxhr, textStatus, exception) {
                alert( exception + " getPitchTypes failed");
        });

        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPitchOutcomes.php?callback=?&YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
            //            jQuery.each(data, function(key, val)
            //            {
            //                pitchOutcomesMap[val.theId] = val;
            //            });
            pitchOutcomesMap = data;

            pitchOutcomesAquired = 'true';

            loadComponents(teamsMapAquired, 
                awayTeamMapAquired, 
                homeTeamMapAquired, 
                pitchTypesAquired, 
                pitchLocationsAquired, 
                pitchOutcomesAquired);
        }).fail(function(jqxhr, textStatus, exception) {
                alert( exception + " getPitchOutcomes failed");
        });

        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPitchLocations.php?callback=?&YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
            //            jQuery.each(data, function(key, val)
            //            {
            //                pitchLocationsMap[val.theId] = val;
            //            });
            pitchLocationsMap = data;

            pitchLocationsAquired = 'true';

            loadComponents(teamsMapAquired, 
                awayTeamMapAquired, 
                homeTeamMapAquired, 
                pitchTypesAquired, 
                pitchLocationsAquired, 
                pitchOutcomesAquired);
        }).fail(function(jqxhr, textStatus, exception) {
                alert( exception + " getPitchLocations failed");
        });
    }).fail(function(jqxhr, textStatus, exception) {
            alert( exception + " getUserStateVariables failed");
    });
}

function loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired)
{
//    alert("loadComponents " +
//    "teamsMapAquired "+teamsMapAquired +
//    "awayTeamMapAquired "+awayTeamMapAquired +
//    "homeTeamMapAquired "+homeTeamMapAquired +
//    "pitchTypesAquired "+pitchTypesAquired +
//    "pitchLocationsAquired "+pitchLocationsAquired +
//    "pitchOutcomesAquired "+pitchOutcomesAquired);

    if(stateVariablesMap['theTopOrBottomHalf'] === "TOP")
    {
        defenseTeamMap = homeTeamMap;
        offenseTeamMap = awayTeamMap;
    }
    else
    {
        offenseTeamMap = homeTeamMap;
        defenseTeamMap = awayTeamMap;
    }
    
    if((teamsMapAquired == 'true')&&
        (awayTeamMapAquired == 'true')&&
        (homeTeamMapAquired == 'true')&&
        (pitchTypesAquired == 'true')&&
        (pitchLocationsAquired == 'true')&&
        (pitchOutcomesAquired == 'true'))
        {
        //        alert("THIS SHOULD ONLY BE CALLED IF EVERYONE IS TRUE");
        //        alert("situation.js "+JSON.stringify(stateVariablesMap));
        //        alert("situation.js "+JSON.stringify(teamsMap));
        //        alert("situation.js "+JSON.stringify(homeTeamMap));
        //        alert("situation.js "+JSON.stringify(awayTeamMap));

        loadScoreboard();
        loadHomeTeamLineup();
        loadAwayTeamLineup();
        loadPitchCounters();
        loadFilters();
        //loadHotzone();
        loadField();
        updateCharts('true');

    //        if (jQuery('#resultscontainer').length > 0)
    //        {
    //            loadResults();
    //        }

    //        if (awayteamname == hometeamname)
    //        {
    //                jQuery("#pitchernameId").remove();
    //                jQuery("#hitternameId").remove();
    //                jQuery("#catchernameId").remove();
    //        }
    }
    
    //    $('#filters').show();
    loadingDialogClose();
}
function getParamsString()
//function getStateVariables(revertPitchSequences, getPitchSequences, pitchTypeSequenceArray, pitchLocationSequenceArray, pitchOutcomeSequenceArray, resetAwayTeamLineups, resetHomeTeamLineups)
{
    //	inning = jQuery("#inningId").val();
    //        toporbottomhalf = jQuery('input:radio[name=toporbottomhalf]:checked').val();
    //	balls = jQuery("#ballsId").val();
    //	strikes = jQuery("#strikesId").val();
    //	outs = jQuery("#outsId").val();
    //	awayteamname = jQuery("#awayteamnameId").val();
    //	awayteamscore = jQuery("#awayteamscoreId").val();
    //	hometeamname = jQuery("#hometeamnameId").val();
    //	hometeamscore = jQuery("#hometeamscoreId").val();
    //	pitcherteamname = jQuery("#pitcherteamnameId").val();
    //	pitchername = jQuery("#pitchernameId").val();
    //	catchername = jQuery("#catchernameId").val();
    //	hitterteamname = jQuery("#hitterteamnameId").val();
    //	hittername = jQuery("#hitternameId").val();
    //	hitterrightorleft = jQuery("#hitterrightorleftId").val();
    //	atbatnumber = jQuery("#atbatnumberId").val();
    //	yeartoquery = jQuery('input:radio[name=yeartoquery]:checked').val();
    //	runneronfirst = jQuery("#runneronfirstId").val();
    //	runneronsecond = jQuery("#runneronsecondId").val();
    //	runneronthird = jQuery("#runneronthirdId").val();
        
    //        homeTeamLineupArray = new Array(jQuery("#firsthometeambatterId").val(),
    //                                        jQuery("#secondhometeambatterId").val(),
    //                                        jQuery("#thirdhometeambatterId").val(),
    //                                        jQuery("#fourthhometeambatterId").val(),
    //                                        jQuery("#fifthhometeambatterId").val(),
    //                                        jQuery("#sixthhometeambatterId").val(),
    //                                        jQuery("#seventhhometeambatterId").val(),
    //                                        jQuery("#eighthhometeambatterId").val(),
    //                                        jQuery("#ninthhometeambatterId").val()
    //                                        );
    //                                        
    //        awayTeamLineupArray = new Array(jQuery("#firstawayteambatterId").val(),
    //                                        jQuery("#secondawayteambatterId").val(),
    //                                        jQuery("#thirdawayteambatterId").val(),
    //                                        jQuery("#fourthawayteambatterId").val(),
    //                                        jQuery("#fifthawayteambatterId").val(),
    //                                        jQuery("#sixthawayteambatterId").val(),
    //                                        jQuery("#seventhawayteambatterId").val(),
    //                                        jQuery("#eighthawayteambatterId").val(),
    //                                        jQuery("#ninthawayteambatterId").val()
    //                                        );
    //        
    //        if(resetAwayTeamLineups == 'true')
    //        {
    //            //alert("resetAwayTeamLineups: " + resetAwayTeamLineups);
    //            awayTeamLineupArray = new Array("0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0"
    //                                        );
    //                                        
    //            awayTeamScore = 0;
    //            
    //            if (toporbottomhalf.indexOf('TOP') >= 0)
    //            {
    //                atbatnumber = 0;
    //                hittername = 0;
    //                hitterrightorleft = 0;
    //                hitterteamname = 0;
    //                hitterondeckname = 0;
    //                runneronfirst = 0;
    //                runneronsecond = 0;
    //                runneronthird = 0;
    //            }
    //            else
    //            {
    //                pitchername = 0;
    //                catchername = 0;
    //            }
    //        }
    //        
    //        if(resetHomeTeamLineups == 'true')
    //        {
    //            //alert("resetHomeTeamLineups: " + resetHomeTeamLineups);
    //            homeTeamLineupArray = new Array("0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0",
    //                                            "0"
    //                                        );
    //                                        
    //            homeTeamScore = 0;
    //            
    //            if (toporbottomhalf.indexOf('TOP') >= 0)
    //            {
    //                pitchername = 0;
    //                catchername = 0;
    //            }
    //            else
    //            {
    //                atbatnumber = 0;
    //                hittername = 0;
    //                hitterrightorleft = 0;
    //                hitterteamname = 0;
    //                hitterondeckname = 0;
    //                runneronfirst = 0;
    //                runneronsecond = 0;
    //                runneronthird = 0;
    //            }
    //        }        
        
    //alert("homeTeamScore: " + homeTeamScore);
    //alert("awayTeamScore: " + awayTeamScore);
    //alert("homeTeamLineupArray: " + homeTeamLineupArray.join('\n'));
    //alert("awayTeamLineupArray: " + awayTeamLineupArray.join('\n'));
                                            
    //        if (toporbottomhalf.indexOf('TOP') >= 0)
    ////        if(stateVariablesMap['theTopOrBottomHalf'] === '1')
    //        {
    //            pitcherteamname = jQuery('#hometeamnameId').val();
    ////                pitcherTeamScore = jQuery('#hometeamscoreId').val();
    //            hitterteamname = jQuery('#awayteamnameId').val();
    ////                batterTeamScore = jQuery('#awayteamscoreId').val();
    //
    //            var index = awayTeamLineupArray.indexOf(jQuery("#hitternameId").val());
    //            if ((index + 1) < awayTeamLineupArray.length)
    //            {
    //                if((!(awayTeamLineupArray[index + 1].beginsWith("SELECT", true))) && (!(awayTeamLineupArray[index + 1] == awayTeamLineupArray[index])))
    //                {
    //                    hitterondeckname = awayTeamLineupArray[index + 1];
    //                }
    //            }
    //            else
    //            {
    //                if((!(awayTeamLineupArray[0].beginsWith("SELECT", true))) && (!(awayTeamLineupArray[0] == awayTeamLineupArray[index])))
    //                {
    //                    hitterondeckname = awayTeamLineupArray[0];
    //                }
    //            }	
    //        }
    //        else
    //        {
    //            pitcherteamname = jQuery('#awayteamnameId').val();
    ////                pitcherTeamScore = jQuery('#awayteamscoreId').val();
    //            hitterteamname = jQuery('#hometeamnameId').val();
    ////                batterTeamScore = jQuery('#hometeamscoreId').val();
    //
    //            var index = homeTeamLineupArray.indexOf(jQuery("#hitternameId").val());
    //
    //            if ((index + 1) < homeTeamLineupArray.length)
    //            {
    //                if((!(homeTeamLineupArray[index + 1].beginsWith("SELECT", true))) && (!(homeTeamLineupArray[index + 1] == homeTeamLineupArray[index])))
    //                {
    //                    hitterondeckname = homeTeamLineupArray[index - 1];
    //                }
    //            }
    //            else
    //            {
    //                if((!(homeTeamLineupArray[0].beginsWith("SELECT", true))) && (!(homeTeamLineupArray[0] == homeTeamLineupArray[index])))
    //                {
    //                    hitterondeckname = homeTeamLineupArray[0];
    //                }	
    //            }
    //        }
        
    params = "UserName=" + encodeURIComponent(userInfoMap.UserName)+
    "&Inning=" + encodeURIComponent(stateVariablesMap['theInning']) +
    "&TopOrBottomHalf=" + encodeURIComponent(stateVariablesMap['theTopOrBottomHalf'])+
    "&Balls=" + encodeURIComponent(stateVariablesMap['theBalls'])+
    "&Strikes=" + encodeURIComponent(stateVariablesMap['theStrikes'])+
    "&Outs=" + encodeURIComponent(stateVariablesMap['theOuts'])+
    "&AtBatNumber=" + encodeURIComponent(stateVariablesMap['theAtBatNumber'])+
    "&YearToQuery=" + encodeURIComponent(stateVariablesMap['theYearToQuery'])+
    "&AwayTeamId=" + encodeURIComponent(stateVariablesMap['theAwayTeamId'])+
    "&AwayTeamScore=" + encodeURIComponent(stateVariablesMap['theAwayTeamScore'])+
    "&HomeTeamId=" + encodeURIComponent(stateVariablesMap['theHomeTeamId'])+
    "&HomeTeamScore=" + encodeURIComponent(stateVariablesMap['theHomeTeamScore'])+
    "&PitcherTeamId=" + encodeURIComponent(stateVariablesMap['thePitcherTeamId'])+
    "&PitcherId=" + encodeURIComponent(stateVariablesMap['thePitcherId'])+
    "&CatcherId=" + encodeURIComponent(stateVariablesMap['theCatcherId'])+
    "&BatterTeamId=" + encodeURIComponent(stateVariablesMap['theBatterTeamId'])+
    "&BatterId=" + encodeURIComponent(stateVariablesMap['theBatterId'])+
    "&BatterOnDeckId=" + encodeURIComponent(stateVariablesMap['theBatterOnDeckId'])+
    "&BatterRightOrLeft=" + encodeURIComponent(stateVariablesMap['theBatterRightOrLeft'])+
    "&On1BId=" + encodeURIComponent(stateVariablesMap['theOn1bId'])+
    "&On2BId=" + encodeURIComponent(stateVariablesMap['theOn2bId'])+
    "&On3BId=" + encodeURIComponent(stateVariablesMap['theOn3bId'])+			
    "&HomeTeamBattingOrderBatterIds=" +  encodeURIComponent(stateVariablesMap['theHomeTeamBattingOrderBatterIds'].toString())+ 	
    "&AwayTeamBattingOrderBatterIds=" +  encodeURIComponent(stateVariablesMap['theAwayTeamBattingOrderBatterIds'].toString())+ 
    //	"&PitchType=" +  pitchtype+ 	
    //	"&OutcomeType=" +  outcometype+ 
    //	"&PitcherType=" +  pitchertype+ 	
    //	"&CatcherType=" +  catchertype+ 	
    //	"&BatterType=" +  battertype+ 	
    //	"&BatterOnDeckType=" +  batterondecktype+ 	
    //	"&BaseRunnerType=" +  baserunnertype+ 	
    //	"&PitcherOrBatter=" +  pitcherorbatter+ 	
    //	"&HotZone=" +  hotzone+	
    "&PitchType=" +  encodeURIComponent(stateVariablesMap['thePitchType'])+ 	
    "&OutcomeType=" +  encodeURIComponent(stateVariablesMap['theOutcomeType'])+ 
    "&PitcherType=" +  encodeURIComponent(stateVariablesMap['thePitcherType'])+ 	
    "&CatcherType=" +  encodeURIComponent(stateVariablesMap['theCatcherType'])+ 	
    "&BatterType=" +  encodeURIComponent(stateVariablesMap['theBatterType'])+ 	
    "&BatterOnDeckType=" +  encodeURIComponent(stateVariablesMap['theOnDeckBatterType'])+ 	
    "&BaseRunnerType=" +  encodeURIComponent(stateVariablesMap['theBaseRunnerType'])+ 	
    "&PitcherOrBatter=" +  encodeURIComponent(stateVariablesMap['thePitcherOrBatter'])+ 	
    "&HotZone=" +  encodeURIComponent(stateVariablesMap['theHotZone'])+
    "&PitchTypeSequence=" + encodeURIComponent(stateVariablesMap['thePitchTypeSequence'].toString())+
    "&PitchLocationSequence=" + encodeURIComponent(stateVariablesMap['thePitchLocationSequence'].toString())+
    "&PitchOutcomeSequence=" + encodeURIComponent(stateVariablesMap['thePitchOutcomeSequence'].toString());
//	"&OutsRecorded=" + jQuery('#outsRecorded').val();
        
//        if(getPitchSequences == 'true')
//        {   
////            alert("getPitchSequences");             
//            pitchTypeSequenceArray.push(jQuery("#pitchtypeId").val());
//            pitchLocationSequenceArray.push(jQuery("#pitchlocationId").val());
//            pitchOutcomeSequenceArray.push(jQuery("#pitchoutcomeId").val());
//            //alert("jQuery(pitchtypeId).val(): " + jQuery("#pitchtypeId").val());
//            //alert("jQuery(pitchlocationId).val(): " + jQuery("#pitchlocationId").val());
//            //alert("jQuery(pitchoutcomeId).val(): " + jQuery("#pitchoutcomeId").val());
//            //alert("pitchTypeSequenceArray: " + pitchTypeSequenceArray.join('\n'));
//            //alert("pitchLocationSequenceArray: " + pitchLocationSequenceArray.join('\n'));
//            //alert("pitchOutcomeSequenceArray: " + pitchOutcomeSequenceArray.join('\n'));
//            
//            params = params+"&PitchTypeSequence=" + pitchTypeSequenceArray.toString()+
//                        "&PitchLocationSequence=" + pitchLocationSequenceArray.toString()+
//                        "&PitchOutcomeSequence=" + pitchOutcomeSequenceArray.toString();
//        }
//        
//        if(revertPitchSequences == 'true')
//        {                
////            alert("revertPitchSequences");  
//            pitchTypeSequenceArray.pop();
//            pitchLocationSequenceArray.pop();
//            pitchOutcomeSequenceArray.pop();
//            
//            params = params+"&PitchTypeSequence=" + pitchTypeSequenceArray.toString()+
//                        "&PitchLocationSequence=" + pitchLocationSequenceArray.toString()+
//                        "&PitchOutcomeSequence=" + pitchOutcomeSequenceArray.toString();
//        }
}

function alertStateVariables()
{
    alert("ParamsString: " + params);
}

function checkSituationsStateVariables()
{
//checkHomeTeamLineupArrayForDuplicateEntries();
//checkAwayTeamLineupArrayForDuplicateEntries();
//checkHomeTeamLineupArrayForEmptyEntries();
//checkAwayTeamLineupArrayForEmptyEntries();
    
//getStateVariables();

//if(params.indexOf("SELECT")>=0)
//{
//alert("All fields must all be completed.");
//}
}

//***
// Updates the posted variables table with the current state.
//***
function saveState()
{	
    loadingDialogInit();
    
    getParamsString();
    console.log(JSON.stringify(stateVariablesMap));
    //    alertStateVariables();

    //dont save state if not logged in/registered 
    if(userInfoMap.UserName != "" && userInfoMap.UserName != null && userInfoMap.UserName != "undefined")
    {
        jQuery.ajax(
        {
            type: "POST",
            url: "http://www.pitchpredict.com/PitchPredict/Services/savestate.php",
            data: params,
            cache: false,
            async: false,
            timeout: 45000,    
            success: function(msg)
            {
                //                    alert( "State saved: " + msg );
                load();
            }
        });  
    }
    else
    {
        load();
    }
}

function showAds()
{   
    vibrateFeedback();
    
    chartClicks = chartClicks + 1;
    
    if (chartClicks > numberOfChartClicksBeforeShowAds)
    {
        if(phonegap != "true")
        {
            adsDialogInit("Advertisment", 10000);
            chartClicks = 0;
        }
    }
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
	
    do {
        curDate = new Date();
    }
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

function vibrateFeedback()
{
    if (phonegap === "true")
    {
        navigator.notification.vibrate(100);
    }
}