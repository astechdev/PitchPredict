function load()
{
    //reinitialize some maps
    for(var stateVariablesKey in stateVariablesMap) 
    {
        if(stateVariablesMap.hasOwnProperty(stateVariablesKey)) 
        {
            delete stateVariablesMap[stateVariablesKey];
        }
    }
    
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
    
    var teamsMapAquired = 'false';
    var awayTeamMapAquired = 'false';
    var homeTeamMapAquired = 'false';
    var pitchTypesAquired = 'false';
    var pitchLocationsAquired = 'false';
    var pitchOutcomesAquired = 'false';
//    alert(JSON.stringify(stateVariablesMap));
//    alert(JSON.stringify(teamsMap));
//    alert(JSON.stringify(homeTeamMap));
//    alert(JSON.stringify(awayTeamMap));
    
    jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getUserStateVariables.php?UserName='+userInfoMap.UserName, function(data) 
    {
        jQuery.each(data, function(key, val) 
        {
            stateVariablesMap[key] = val;
//            alert("stateVariablesMap["+key+"]: "+stateVariablesMap[key]);
        }); 
    
        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getTeams.php?YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
//            jQuery.each(data, function(key, val) 
//            {
//                teamsMap[val.theId] = val;
//    //            alert("key: "+val.theId+", value: "+val);
//            });
            teamsMap = data;
            
            teamsMapAquired = 'true';
            
            loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired);
        });


        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPlayers.php?YearToQuery='+stateVariablesMap['theYearToQuery']+'&TeamAbbr='+stateVariablesMap['theAwayTeamAbbr'], function(data) 
        {             
//            jQuery.each(data, function(key, val)
//            {
//                awayTeamMap[val.theId] = val;
//            });
            awayTeamMap = data;
            
//            alert('awayTeamMap theTeamName'+awayTeamMap[stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0]].theTeamName);
//            alert('stateVariablesMap theBatterTeamName'+stateVariablesMap['theBatterTeamName']);
            if(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0] !== '0')
            {
                if(awayTeamMap[0].theTeamName == stateVariablesMap['theBatterTeamName'])
                {
//                    alert('away team on offense');
                    offenseTeamMap = awayTeamMap;
                }
                else
                {
//                    alert('away team on defense');
                    defenseTeamMap = awayTeamMap;
                }
            }
            
            awayTeamMapAquired = 'true';
            
            loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired);
        });

        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPlayers.php?YearToQuery='+stateVariablesMap['theYearToQuery']+'&TeamAbbr='+stateVariablesMap['theHomeTeamAbbr'], function(data) 
        {
//            jQuery.each(data, function(key, val)
//            {
//                homeTeamMap[val.theId] = val;
//            });
            homeTeamMap = data;
            
            if(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0] !== '0')
            {
                if(homeTeamMap[0].theTeamName == stateVariablesMap['thePitcherTeamName'])
                {
//                    alert('home team on defense');
                    defenseTeamMap = homeTeamMap;
                }
                else
                {
//                    alert('home team on offense');
                    offenseTeamMap = homeTeamMap;
                }
            }
            
            homeTeamMapAquired = 'true';
            
            loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired);
        });
        
        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPitchTypes.php?YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
//            jQuery.each(data, function(key, val)
//            {
//                pitchTypesMap[val.theId] = val;
//            });
            pitchTypesMap = data;

//            alert(JSON.stringify(pitchTypesMap));

            pitchTypesAquired = 'true';

            loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired);
        });

        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPitchOutcomes.php?YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
//            jQuery.each(data, function(key, val)
//            {
//                pitchOutcomesMap[val.theId] = val;
//            });
            pitchOutcomesMap = data;

            pitchOutcomesAquired = 'true';

            loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired);
        });

        jQuery.getJSON('http://www.pitchpredict.com/PitchPredict/Services/getPitchLocations.php?YearToQuery='+stateVariablesMap['theYearToQuery'], function(data) 
        {
//            jQuery.each(data, function(key, val)
//            {
//                pitchLocationsMap[val.theId] = val;
//            });
            pitchLocationsMap = data;

            pitchLocationsAquired = 'true';

            loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired);
        });
    });
}

function loadComponents(teamsMapAquired, awayTeamMapAquired, homeTeamMapAquired, pitchTypesAquired, pitchLocationsAquired, pitchOutcomesAquired)
{
//    alert("teamsMapAquired "+teamsMapAquired);
//    alert("awayTeamMapAquired "+awayTeamMapAquired);
//    alert("homeTeamMapAquired "+homeTeamMapAquired);
//    alert("pitchTypesAquired "+pitchTypesAquired);
//    alert("pitchLocationsAquired "+pitchLocationsAquired);
//    alert("pitchOutcomesAquired "+pitchOutcomesAquired);
    
    if((teamsMapAquired == 'true')&&(awayTeamMapAquired == 'true')&&(homeTeamMapAquired == 'true'))
    {
//        alert("situation.js "+JSON.stringify(stateVariablesMap));
//        alert("situation.js "+JSON.stringify(teamsMap));
//        alert("situation.js "+JSON.stringify(homeTeamMap));
//        alert("situation.js "+JSON.stringify(awayTeamMap));

        loadScoreboard();
        loadHomeTeamLineup();
        loadAwayTeamLineup();
        loadPitchCounters();  
        loadField();

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
        
        params = "UserName=" + userInfoMap.UserName+
	"&Inning=" + stateVariablesMap['theInning'] +
	"&TopOrBottomHalf=" + stateVariablesMap['theTopOrBottomHalf']+
	"&Balls=" + stateVariablesMap['theBalls']+
	"&Strikes=" + stateVariablesMap['theStrikes']+
	"&Outs=" + stateVariablesMap['theOuts']+
        "&AtBatNumber=" + stateVariablesMap['theAtBatNumber']+
        "&YearToQuery=" + stateVariablesMap['theYearToQuery']+
	"&AwayTeamId=" + stateVariablesMap['theAwayTeamId']+
	"&AwayTeamScore=" + stateVariablesMap['theAwayTeamScore']+
	"&HomeTeamId=" + stateVariablesMap['theHomeTeamId']+
	"&HomeTeamScore=" + stateVariablesMap['theHomeTeamScore']+
	"&PitcherTeamId=" + stateVariablesMap['thePitcherTeamId']+
	"&PitcherId=" + stateVariablesMap['thePitcherId']+
	"&CatcherId=" + stateVariablesMap['theCatcherId']+
	"&BatterTeamId=" + stateVariablesMap['theBatterTeamId']+
	"&BatterId=" + stateVariablesMap['theBatterId']+
	"&BatterOnDeckId=" + stateVariablesMap['theBatterOnDeckId']+
	"&BatterRightOrLeft=" + stateVariablesMap['theBatterRightOrLeft']+
	"&On1BId=" + stateVariablesMap['theOn1bId']+
	"&On2BId=" + stateVariablesMap['theOn2bId']+
	"&On3BId=" + stateVariablesMap['theOn3bId']+			
	"&HomeTeamBattingOrderBatterIds=" +  stateVariablesMap['theHomeTeamBattingOrderBatterIds'].toString()+ 	
	"&AwayTeamBattingOrderBatterIds=" +  stateVariablesMap['theAwayTeamBattingOrderBatterIds'].toString()+ 
	"&PitchType=" +  pitchtype+ 	
	"&OutcomeType=" +  outcometype+ 
	"&PitcherType=" +  pitchertype+ 	
	"&CatcherType=" +  catchertype+ 	
	"&BatterType=" +  battertype+ 	
	"&BatterOnDeckType=" +  batterondecktype+ 	
	"&BaseRunnerType=" +  baserunnertype+ 	
	"&PitcherOrBatter=" +  pitcherorbatter+ 	
	"&HotZone=" +  hotzone+	
//	"&PitchType=" +  stateVariablesMap['thePitchType']+ 	
//	"&OutcomeType=" +  stateVariablesMap['theOutcomeType']+ 
//	"&PitcherType=" +  stateVariablesMap['thePitcherType']+ 	
//	"&CatcherType=" +  stateVariablesMap['theCatcherType']+ 	
//	"&BatterType=" +  stateVariablesMap['theBatterType']+ 	
//	"&BatterOnDeckType=" +  stateVariablesMap['theOnDeckBatterType']+ 	
//	"&BaseRunnerType=" +  stateVariablesMap['theBaseRunnerType']+ 	
//	"&PitcherOrBatter=" +  stateVariablesMap['thePitcherOrBatter']+ 	
//	"&HotZone=" +  stateVariablesMap['theHotZone']+
        "&PitchTypeSequence=" + stateVariablesMap['thePitchTypeSequence'].toString()+
        "&PitchLocationSequence=" + stateVariablesMap['thePitchLocationSequence'].toString()+
        "&PitchOutcomeSequence=" + stateVariablesMap['thePitchOutcomeSequence'].toString();
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
    alertStateVariables();

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
                    //alert( "State saved: " + msg );
            }
    });
    
//    load();
}