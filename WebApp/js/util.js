//function initialize() {
//    // Wait for Cordova to connect with the device
////    document.addEventListener("deviceready", onDeviceReady, false);
//    
//    jQuery('#logoutcontainer').hide();
//    
//    dashboard.init();
//    
//    dialogInit();
//
//    load();
//    
//    // Check if phonegap, if not load web app functionality
//    jQuery.getScript("phonegap.js")
//    .done(function(script, textStatus) {        
////        alert( textStatus + " phonegap loaded");
//    })
//    .fail(function(jqxhr, settings, exception) {
//        console.log( exception + " phonegap failed....adding WebApp ONLY functionality");
//        
//        jQuery(window).unload(function() 
//        {
//            deinitialize();
//            console.log('deinitialized');
//        });
//
//        jQuery(window).resize(function() 
//        { 
//            dialogheight = $(window).height()*.75;
//            dialogwidth = $(window).width()*.80;
//
//            $( "#pitchcounterdialogcontainer" ).dialog( "option", "width", dialogwidth );
//
//            $( "#pitchcounterdialogcontainer" ).dialog( "option", "height", dialogheight );
//
//            $( "#dialog" ).dialog( "option", "width", dialogwidth );
//
//            $( "#dialog" ).dialog( "option", "height", dialogheight );
//
//            chartheight = ($(window).height()*.75);
//            chartwidth = chartheight*1.40;                          
//            setCurrentChart(currentchart);
//            dashboard.dimensions();
//        });
//        
//        //Initialize the Facebook SDK
//        //See https://developers.facebook.com/docs/reference/javascript/
//        window.fbAsyncInit = function() {
//            FB.init({ 
//                appId: gAppID,
//                status: true,
//                cookie: true,
//                xfbml: true,
//                frictionlessRequests: true,
//                useCachedDialogs: true,
//                oauth: true
//            });
//
//            FB.getLoginStatus(handleStatusChange);
//
//            authUser();
//            checkForCredits();
//            updateAuthElements();
//
////            FB.Event.subscribe('auth.login', function(response) {
////                console.log('auth.login event');
////            });
////
////            FB.Event.subscribe('auth.logout', function(response) {
////                console.log('auth.logout event');
////            });
////
////            FB.Event.subscribe('auth.sessionChange', function(response) {
////                console.log('auth.sessionChange event');
////            });
////
////            FB.Event.subscribe('auth.statusChange', function(response) {
////                console.log('auth.statusChange event');
////            });
//        };
//        
//        // Load the SDK Asynchronously
//        (function(d){
//            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
//            if (d.getElementById(id)) {
//                return;
//            }
//            js = d.createElement('script');
//            js.id = id;
//            js.async = true;
//            js.src = "//connect.facebook.net/en_US/all.js";
//            ref.parentNode.insertBefore(js, ref);
//        }(document));
//        
//        // Initialize inmobi
//        inmobi_conf = 
//            {
////                siteid : "e807ef51fb1a49379c969a777d83d035",
//                siteid : "4028cba631d63df10131e1d3191d00cb",
//                slot : "10",
//                test: true,
//                manual: true,
//                onError : function(code) {
//                    console.log(code);
////                    if(code == "nfr") {
////                        document.getElementById("dialog-message").style.display = "none";
////                        // do something else. call to other ad network or logic to display in-house ads, etc. 
////                    }
//                }
//            };
//
//        jQuery.getScript("js/libs/inmobi.js")
//        .done(function(script, textStatus) {
//            console.log( textStatus + " inmobi loaded");
//        })
//        .fail(function(jqxhr, settings, exception) {
//            console.log( exception + " inmobi failed");
//        });
//        
//        _gaq.push(['_setAccount', gaAccount]);
//        _gaq.push(['_setDomainName', gaDomianName]);
//        _gaq.push(['_trackPageview']);
//
//        (function() {
//            var ga = document.createElement('script');
//            ga.type = 'text/javascript';
//            ga.async = true;
//            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//            var s = document.getElementsByTagName('script')[0];
//            s.parentNode.insertBefore(ga, s);
//        })();
//        console.log('Google Analytics Initialized');
//    });
//}

//function onDeviceReady() 
//{
////    alert('Device Ready');
//    phonegap = 'true';
//    alert('set phonegap to true');
////    fbinit();
//    
//    
////    // Initialize FB plugin
////    if ((typeof cordova === 'undefined') && (typeof Cordova === 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
////    if (typeof CDV === 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
////    if (typeof FB === 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
//    
////    if ((typeof cordova != 'undefined') && (typeof Cordova != 'undefined') && (typeof CDV != 'undefined') && (typeof FB != 'undefined'))
////    {
////        window.fbAsyncInit = function() {
////            FB.init({ appId: gAppID, nativeInterface: CDV.FB, useCachedDialogs: false });
////            alert("FB initialized");
////
////            FB.getLoginStatus(handleStatusChange);
////
////            authUser();
////            checkForCredits();
////            updateAuthElements();
////        };
////    }
//                 
//    jQuery.getScript("js/libs/jquery.hammer.js")
//    .done(function(script, textStatus) {
//        alert( textStatus + " jquery.hammer.js loaded");
//
//        var hammertime = $('body').hammer();
//        console.log(hammertime);
//
//        hammertime.on("swipeleft", function(ev) 
//        {
//            if(window.console) { console.log(ev); }
//            leftSwipeEventHandler();
//        });
//
//        hammertime.on("swiperight", function(ev) 
//        {
//            if(window.console) { console.log(ev); }
//            rightSwipeEventHandler();
//        });
//
//        hammertime.on("swipeup", function(ev) 
//        {
//            if(window.console) { console.log(ev); }
//            upSwipeEventHandler();
//        });
//
//        hammertime.on("swipedown", function(ev) 
//        {
//            if(window.console) { console.log(ev); }
//            downSwipeEventHandler();
//        });
//
//        jQuery.getScript("js/touchEvents.js")
//        .done(function(script, textStatus) {
////            alert('touchEvents loaded');
//        })
//        .fail(function(jqxhr, settings, exception) {
////            alert( exception + " touchEvents loaded");
//        });
//    })
//    .fail(function(jqxhr, settings, exception) {
////        alert( exception + " jquery.hammer.js failed");
//    });
//
//    jQuery.getScript("js/libs/fastclick.js")
//    .done(function(script, textStatus) {
////        alert( textStatus + " fastclick loaded");
////        jQuery(window).load(function() 
////        {
//            FastClick.attach(document.body);
//            alert('fastclick initialized');
////        });
//    })
//    .fail(function(jqxhr, settings, exception) {
////        alert( exception + " fastclick failed");
//    });
//
//    // Hide the splashscreen after loading...
////    navigator.splashscreen.hide();
//
//    // Register some event listeners
//    document.addEventListener("online", onDeviceOnline, false);
//    document.addEventListener("offline", onDeviceOffline, false);
//    document.addEventListener("menubutton", onMenuKeyDown, false);
//    alert('Register some event listeners');
//}

function onDeviceOnline() 
{
    alert('onDeviceOnline');  
}

function onDeviceOffline() 
{
    alert('onDeviceOffline');  
}

function onMenuKeyDown() 
{
    alert('onMenuKeyDown');
    helpDialogInit(null, "Menu", "Manage your saved queries.");
    vibrateFeedback();
}

function deinitialize() {
    googleAnalyticsDeInit();
}

//function loadUserBasedFunctionality() {
//    loadLogin();
//}

function load()
{
        loadingDialogInit();
    //    $('#filters').hide();
    //reinitialize some maps
    //    if(user.id != "" && user.id != null && user.id != "undefined")
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
    
    console.log("user: "+JSON.stringify(user));
    
    jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getUserStateVariables.php?callback=?&UserId='+user.id, function(data) 
    {
        if(user.id != "" && user.id != null && user.id != "undefined")
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
            
            jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getUserSavedScenarios.php?callback=?&UserId='+user.id, function(data) 
            {
                savedUserScenariosMap = data;
                
                for (var i = 0, j = savedUserScenariosMap['theScenarioNamesArray'].length; i < j; i++) 
                {
                    if(savedUserScenariosMap['theStateVariablesArray'][i]['thePitchTypeSequence'] === 'underfined' || savedUserScenariosMap['theStateVariablesArray'][i]['thePitchTypeSequence'] === null)
                    {
                        savedUserScenariosMap['theStateVariablesArray'][i]['thePitchTypeSequence'] = new Array();
                    }
                    if(savedUserScenariosMap['theStateVariablesArray'][i]['thePitchLocationSequence'] === 'underfined' || savedUserScenariosMap['theStateVariablesArray'][i]['thePitchLocationSequence'] === null)
                    {
                        savedUserScenariosMap['theStateVariablesArray'][i]['thePitchLocationSequence'] = new Array();
                    }
                    if(savedUserScenariosMap['theStateVariablesArray'][i]['thePitchOutcomeSequence'] === 'underfined' || savedUserScenariosMap['theStateVariablesArray'][i]['thePitchOutcomeSequence'] === null)
                    {
                        savedUserScenariosMap['theStateVariablesArray'][i]['thePitchOutcomeSequence'] = new Array();
                    }
                }
        
                console.log('savedUserScenariosMap: '+JSON.stringify(savedUserScenariosMap));
            });
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
        });
    });
}

function loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired)
{
    //    alert("loadComponents " +
    //"teamsMapAquired "+teamsMapAquired +
    //"awayTeamMapAquired "+awayTeamMapAquired +
    //"homeTeamMapAquired "+homeTeamMapAquired +
    //"pitchTypesAquired "+pitchTypesAquired +
    //"pitchLocationsAquired "+pitchLocationsAquired +
    //"pitchOutcomesAquired "+pitchOutcomesAquired);
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
        
        if(urlParameters.length > 0)
        {
            //This is an iframe widget
            console.log('This is an iframe widget');
        }
        else
        {
            
        }
        
    //        if (phonegap === "true")
    //        {
    //            getLoginStatus();
    //        }

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
        
    params = "UserId=" + encodeURIComponent(user.id)+
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
    if(user.id != "" && user.id != null && user.id != "undefined")
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
        adsDialogInit("Advertisment", 10000);
        chartClicks = 0;
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
    if ((typeof cordova != 'undefined') && (typeof Cordova != 'undefined'))
    {
        navigator.notification.vibrate(500);
    }
}

//function getURLParameter(parameter,url) {
//    url = (url) ? url : window.location.search;
//    var re = new RegExp('&amp;'+parameter+'=([^&amp;]*)','i');
//    return (url=url.replace(/^\?/,'&amp;').match(re)) ?url=url[1] :url='';
//}

$.extend({
  getUrlVars: function(){
    urlParameters = [];
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1, window.location.href.indexOf('#')).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      urlParameters.push(hash[0]);
      urlParameters[hash[0]] = hash[1];
    }
    
    if (urlParameters["Inning"] != null)
    {
        stateVariablesMap['theInning'] = urlParameters["Inning"];
    }            
    if (urlParameters["TopOrBottomHalf"] != null)
    {
        stateVariablesMap['theTopOrBottomHalf'] = urlParameters["TopOrBottomHalf"];
    }  
    if (urlParameters["Balls"] != null)
    {
        stateVariablesMap['theBalls'] = urlParameters["Balls"];
    }            
    if (urlParameters["Strikes"] != null)
    {
        stateVariablesMap['theStrikes'] = urlParameters["Strikes"];
    }            
    if (urlParameters["Outs"] != null)
    {
        stateVariablesMap['theOuts'] = urlParameters["Outs"];
    }            
    if (urlParameters["AtBatNumber"] != null)
    {
        stateVariablesMap['theAtBatNumber'] = urlParameters["AtBatNumber"];
    }            
    if (urlParameters["YearToQuery"] != null)
    {
        stateVariablesMap['theYearToQuery'] = urlParameters["YearToQuery"];
    }            
    if (urlParameters["AwayTeamId"] != null)
    {
        stateVariablesMap['theAwayTeamId'] = urlParameters["AwayTeamId"];
    }            
    if (urlParameters["AwayTeamScore"] != null)
    {
        stateVariablesMap['theAwayTeamScore'] = urlParameters["AwayTeamScore"];
    }            
    if (urlParameters["HomeTeamId"] != null)
    {
        stateVariablesMap['theHomeTeamId'] = urlParameters["HomeTeamId"];
    }            
    if (urlParameters["HomeTeamScore"] != null)
    {
        stateVariablesMap['theHomeTeamScore'] = urlParameters["HomeTeamScore"];
    }            
    if (urlParameters["PitcherId"] != null)
    {
        stateVariablesMap['thePitcherId'] = urlParameters["PitcherId"];
    }            
    if (urlParameters["CatcherId"] != null)
    {
        stateVariablesMap['theCatcherId'] = urlParameters["CatcherId"];
    }            
    if (urlParameters["BatterId"] != null)
    {
        stateVariablesMap['theBatterId'] = urlParameters["BatterId"];
    }            
    if (urlParameters["BatterOnDeckId"] != null)
    {
        stateVariablesMap['theBatterOnDeckId'] = urlParameters["BatterOnDeckId"];
    }            
    if (urlParameters["BatterRightOrLeft"] != null)
    {
        stateVariablesMap['theBatterRightOrLeft'] = urlParameters["BatterRightOrLeft"];
    }            
    if (urlParameters["On1bId"] != null)
    {
        stateVariablesMap['theOn1bId'] = urlParameters["On1bId"];
    }            
    if (urlParameters["On2bId"] != null)
    {
        stateVariablesMap['theOn2bId'] = urlParameters["On2bId"];
    }            
    if (urlParameters["On3bId"] != null)
    {
        stateVariablesMap['theOn3bId'] = urlParameters["On3bId"];
    }            
    if (urlParameters["HomeTeamBattingOrderBatterIds"] != null)
    {
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'] = urlParameters["HomeTeamBattingOrderBatterIds"];
    }            
    if (urlParameters["AwayTeamBattingOrderBatterIds"] != null)
    {
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'] = urlParameters["AwayTeamBattingOrderBatterIds"];
    }            
    if (urlParameters["PitchType"] != null)
    {
        stateVariablesMap['thePitchType'] = urlParameters["PitchType"];
    }            
    if (urlParameters["OutcomeType"] != null)
    {
        stateVariablesMap['theOutcomeType'] = urlParameters["OutcomeType"];
    }            
    if (urlParameters["PitcherType"] != null)
    {
        stateVariablesMap['thePitcherType'] = urlParameters["PitcherType"];
    }            
    if (urlParameters["CatcherType"] != null)
    {
        stateVariablesMap['theCatcherType'] = urlParameters["CatcherType"];
    }            
    if (urlParameters["BatterType"] != null)
    {
        stateVariablesMap['theBatterType'] = urlParameters["BatterType"];
    }            
    if (urlParameters["OnDeckBatterType"] != null)
    {
        stateVariablesMap['theOnDeckBatterType'] = urlParameters["OnDeckBatterType"];
    }            
    if (urlParameters["BaseRunnerType"] != null)
    {
        stateVariablesMap['theBaseRunnerType'] = urlParameters["BaseRunnerType"];
    }            
    if (urlParameters["PitcherOrBatter"] != null)
    {
        stateVariablesMap['thePitcherOrBatter'] = urlParameters["PitcherOrBatter"];
    }            
    if (urlParameters["HotZone"] != null)
    {
        stateVariablesMap['theHotZone'] = urlParameters["HotZone"];
    }            
    if (urlParameters["PitchTypeSequence"] != null)
    {
        stateVariablesMap['thePitchTypeSequence'] = urlParameters["PitchTypeSequence"];
    }            
    if (urlParameters["PitchLocationSequence"] != null)
    {
        stateVariablesMap['thePitchLocationSequence'] = urlParameters["PitchLocationSequence"];
    }            
    if (urlParameters["PitchOutcomeSequence"] != null)
    {
        stateVariablesMap['thePitchOutcomeSequence'] = urlParameters["PitchOutcomeSequence"];
    }
//    return urlParameters;
  }//,
//  getUrlVar: function(name){
//    return urlParameters[name];
//  }
});