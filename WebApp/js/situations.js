function load()
{
    $('#filters').hide();
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
            jQuery.each(data, function(key, val) 
            {
                stateVariablesMap[key] = val;
    //            alert("stateVariablesMap["+key+"]: "+stateVariablesMap[key]);
            }); 

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
    
    $('#filters').show();
    
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