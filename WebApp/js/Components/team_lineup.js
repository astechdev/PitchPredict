function loadHomeTeamLineup()
{
//    //hideHomeTeamLineupDropDowns();
//    //appendHomeTeamBatterDisplayNames();
    appendHomeTeamName();
    loadHomeTeamLineupDropDowns();
}

function loadAwayTeamLineup()
{
//    //hideAwayTeamLineupDropDowns();
//    //appendAwayTeamBatterDisplayNames();
    appendAwayTeamName();
    loadAwayTeamLineupDropDowns();
}

function resetAwayTeamLineup()
{
    for(var key in stateVariablesMap['theAwayTeamBattingOrderBatterIds']) 
    {
        if(stateVariablesMap['theAwayTeamBattingOrderBatterIds'].hasOwnProperty(key)) 
        {
            delete stateVariablesMap['theAwayTeamBattingOrderBatterIds'][key];
        }
    }
    
    //alert("resetHomeTeamLineups: " + resetHomeTeamLineups);
    stateVariablesMap['theAwayTeamBattingOrderBatterIds'] = new Array("0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0"
                                                                    );

    
}

function resetHomeTeamLineup()
{
    for(var key in stateVariablesMap['theHomeTeamBattingOrderBatterIds']) 
    {
        if(stateVariablesMap['theHomeTeamBattingOrderBatterIds'].hasOwnProperty(key)) 
        {
            delete stateVariablesMap['theHomeTeamBattingOrderBatterIds'][key];
        }
    }
    
    //alert("resetHomeTeamLineups: " + resetHomeTeamLineups);
    stateVariablesMap['theHomeTeamBattingOrderBatterIds'] = new Array("0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0",
                                                                        "0"
                                                                    );
}

function checkHomeTeamLineupArrayForDuplicateEntries()
{
    getHomeTeamLineupArray();

    var tempHomeTeamLineupArray = homeTeamLineupArray.unique();

    if (!(tempHomeTeamLineupArray.length == homeTeamLineupArray.length))
    {
        alert ("Home Team Lineup entries are not unique.");
        alert(homeTeamLineupArray);

        return false;
    }
    else
    {
        return true;
    }
}

function checkHomeTeamLineupArrayForEmptyEntries()
{
    getHomeTeamLineupArray();

    var tempIndex = homeTeamLineupArray.indexOf("SELECT");

    if (tempIndex != -1)
    {
        alert ("Home Team Lineup entries are not complete.");
        alert(homeTeamLineupArray);

        return false;
    }
    else
    {
        return true;
    }
}

function checkAwayTeamLineupArrayForDuplicateEntries()
{
    getAwayTeamLineupArray();

    var tempAwayTeamLineupArray = awayTeamLineupArray.unique();

    if (!(tempAwayTeamLineupArray.length == awayTeamLineupArray.length))
    {
        alert ("Away Team Lineup entries are not unique.");
        alert(awayTeamLineupArray);

        return false;
    }
    else
    {
        return true;
    }
}

function checkAwayTeamLineupArrayForEmptyEntries()
{
    getAwayTeamLineupArray();

    var tempIndex = awayTeamLineupArray.indexOf("SELECT");

    if (tempIndex != -1)
    {
        alert ("Away Team Lineup entries are not complete.");
        alert(awayTeamLineupArray);

        return false;
    }
    else
    {
        return true;
    }
}

function loadAwayTeamLineupDropDowns()
{    
    //create 1st batter drop down
    jQuery("#awayteamfirstbatterselectid").empty();
//    jQuery("#awayteamfirstbatterselectid").append("1: ");
    var firstbatterselectdd = document.createElement("select");
    firstbatterselectdd.name = "FirstAwayTeamBatter";
    firstbatterselectdd.id = "firstawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0])
            {
                firstbatterselectdd.options[firstbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }        
    else
    {
        firstbatterselectdd.options[firstbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            firstbatterselectdd.options[firstbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamfirstbatterselectid").append(firstbatterselectdd);
    jQuery("#firstawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0] = jQuery("#firstawayteambatterId").val(); 
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 2nd batter drop down
    jQuery("#awayteamsecondbatterselectid").empty();
//    jQuery("#awayteamsecondbatterselectid").append("2: ");
    var secondbatterselectdd = document.createElement("select");
    secondbatterselectdd.name = "SecondAwayTeamBatter";
    secondbatterselectdd.id = "secondawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][1] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][1])
            {
                secondbatterselectdd.options[secondbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }       
    else
    {
        secondbatterselectdd.options[secondbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            secondbatterselectdd.options[secondbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamsecondbatterselectid").append(secondbatterselectdd);
    jQuery("#secondawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][1] = jQuery("#secondawayteambatterId").val(); 
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 3rd batter drop down
    jQuery("#awayteamthirdbatterselectid").empty();
//    jQuery("#awayteamthirdbatterselectid").append("3: ");
    var thirdbatterselectdd = document.createElement("select");
    thirdbatterselectdd.name = "ThirdAwayTeamBatter";
    thirdbatterselectdd.id = "thirdawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][2] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][2])
            {
                thirdbatterselectdd.options[thirdbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }      
    else
    {
        thirdbatterselectdd.options[thirdbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            thirdbatterselectdd.options[thirdbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamthirdbatterselectid").append(thirdbatterselectdd);
    jQuery("#thirdawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][2] = jQuery("#thirdawayteambatterId").val();  
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 4th batter drop down
    jQuery("#awayteamfourthbatterselectid").empty();
//    jQuery("#awayteamfourthbatterselectid").append("4: ");
    var fourthbatterselectdd = document.createElement("select");
    fourthbatterselectdd.name = "FourthAwayTeamBatter";
    fourthbatterselectdd.id = "fourthawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][3] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][3])
            {
                fourthbatterselectdd.options[fourthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }    
    else
    {
        fourthbatterselectdd.options[fourthbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            fourthbatterselectdd.options[fourthbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamfourthbatterselectid").append(fourthbatterselectdd);
    jQuery("#fourthawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][3] = jQuery("#fourthawayteambatterId").val();  
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 5th batter drop down
    jQuery("#awayteamfifthbatterselectid").empty();
//    jQuery("#awayteamfifthbatterselectid").append("5: ");
    var fifthbatterselectdd = document.createElement("select");
    fifthbatterselectdd.name = "FifthAwayTeamBatter";
    fifthbatterselectdd.id = "fifthawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][4] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][4])
            {
                fifthbatterselectdd.options[fifthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }    
    else
    {
        fifthbatterselectdd.options[fifthbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            fifthbatterselectdd.options[fifthbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamfifthbatterselectid").append(fifthbatterselectdd);
    jQuery("#fifthawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][4] = jQuery("#fifthawayteambatterId").val();  
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 6th batter drop down
    jQuery("#awayteamsixthbatterselectid").empty();
//    jQuery("#awayteamsixthbatterselectid").append("6: ");
    var sixthbatterselectdd = document.createElement("select");
    sixthbatterselectdd.name = "SixthAwayTeamBatter";
    sixthbatterselectdd.id = "sixthawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][5] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][5])
            {
                sixthbatterselectdd.options[sixthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }    
    else
    {
        sixthbatterselectdd.options[sixthbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            sixthbatterselectdd.options[sixthbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamsixthbatterselectid").append(sixthbatterselectdd);
    jQuery("#sixthawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][5] = jQuery("#sixthawayteambatterId").val();  
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 7th batter drop down
    jQuery("#awayteamseventhbatterselectid").empty();
//    jQuery("#awayteamseventhbatterselectid").append("7: ");
    var seventhbatterselectdd = document.createElement("select");
    seventhbatterselectdd.name = "SeventhAwayTeamBatter";
    seventhbatterselectdd.id = "seventhawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][6] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][6])
            {
                seventhbatterselectdd.options[seventhbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }   
    else
    {
        seventhbatterselectdd.options[seventhbatterselectdd.length] = new Option("Select Batter", '0');
    }     
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            seventhbatterselectdd.options[seventhbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamseventhbatterselectid").append(seventhbatterselectdd);
    jQuery("#seventhawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][6] = jQuery("#seventhawayteambatterId").val();  
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 8th batter drop down
    jQuery("#awayteameighthbatterselectid").empty();
//    jQuery("#awayteameighthbatterselectid").append("8: ");
    var eighthbatterselectdd = document.createElement("select");
    eighthbatterselectdd.name = "EighthAwayTeamBatter";
    eighthbatterselectdd.id = "eighthawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][7] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][7])
            {
                eighthbatterselectdd.options[eighthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }   
    else
    {
        eighthbatterselectdd.options[eighthbatterselectdd.length] = new Option("Select Batter", '0');
    }     
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            eighthbatterselectdd.options[eighthbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteameighthbatterselectid").append(eighthbatterselectdd);
    jQuery("#eighthawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][7] = jQuery("#eighthawayteambatterId").val();  
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });

    //create 9th batter drop down
    jQuery("#awayteamninthbatterselectid").empty();
//    jQuery("#awayteamninthbatterselectid").append("9: ");
    var ninthbatterselectdd = document.createElement("select");
    ninthbatterselectdd.name = "NinthAwayTeamBatter";
    ninthbatterselectdd.id = "ninthawayteambatterId";
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'][8] !== '0')
    {
        jQuery.each(awayTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][8])
            {
                ninthbatterselectdd.options[ninthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }
    else
    {
        ninthbatterselectdd.options[ninthbatterselectdd.length] = new Option("Select Batter", '0');
    }  
    for(var key in awayTeamMap) 
    {
        if(awayTeamMap.hasOwnProperty(key)) 
        {
            ninthbatterselectdd.options[ninthbatterselectdd.length] = new Option(awayTeamMap[key].theName, awayTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamninthbatterselectid").append(ninthbatterselectdd);
    jQuery("#ninthawayteambatterId").change(function(e) { 
        stateVariablesMap['theAwayTeamBattingOrderBatterIds'][8] = jQuery("#ninthawayteambatterId").val();  
        saveState();
        //hideAwayTeamLineupDropDowns();        
        //appendAwayTeamBatterDisplayNames();
    });
}  

function loadHomeTeamLineupDropDowns()
{    
    //create 1st batter drop down
    jQuery("#hometeamfirstbatterselectid").empty();
//    jQuery("#hometeamfirstbatterselectid").append("1: ");
    var firstbatterselectdd = document.createElement("select");
    firstbatterselectdd.name = "FirstHomeTeamBatter";
    firstbatterselectdd.id = "firsthometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0])
            {
                firstbatterselectdd.options[firstbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }        
    else
    {
        firstbatterselectdd.options[firstbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            firstbatterselectdd.options[firstbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamfirstbatterselectid").append(firstbatterselectdd);
    jQuery("#firsthometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0] = jQuery("#firsthometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 2nd batter drop down
    jQuery("#hometeamsecondbatterselectid").empty();
//    jQuery("#hometeamsecondbatterselectid").append("2: ");
    var secondbatterselectdd = document.createElement("select");
    secondbatterselectdd.name = "SecondHomeTeamBatter";
    secondbatterselectdd.id = "secondhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][1] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][1])
            {
                secondbatterselectdd.options[secondbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }       
    else
    {
        secondbatterselectdd.options[secondbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            secondbatterselectdd.options[secondbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamsecondbatterselectid").append(secondbatterselectdd);
    jQuery("#secondhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][1] = jQuery("#secondhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 3rd batter drop down
    jQuery("#hometeamthirdbatterselectid").empty();
//    jQuery("#hometeamthirdbatterselectid").append("3: ");
    var thirdbatterselectdd = document.createElement("select");
    thirdbatterselectdd.name = "ThirdHomeTeamBatter";
    thirdbatterselectdd.id = "thirdhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][2] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][2])
            {
                thirdbatterselectdd.options[thirdbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }      
    else
    {
        thirdbatterselectdd.options[thirdbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            thirdbatterselectdd.options[thirdbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamthirdbatterselectid").append(thirdbatterselectdd);
    jQuery("#thirdhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][2] = jQuery("#thirdhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 4th batter drop down
    jQuery("#hometeamfourthbatterselectid").empty();
//    jQuery("#hometeamfourthbatterselectid").append("4: ");
    var fourthbatterselectdd = document.createElement("select");
    fourthbatterselectdd.name = "FourthHomeTeamBatter";
    fourthbatterselectdd.id = "fourthhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][3] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][3])
            {
                fourthbatterselectdd.options[fourthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }    
    else
    {
        fourthbatterselectdd.options[fourthbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            fourthbatterselectdd.options[fourthbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamfourthbatterselectid").append(fourthbatterselectdd);
    jQuery("#fourthhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][3] = jQuery("#fourthhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 5th batter drop down
    jQuery("#hometeamfifthbatterselectid").empty();
//    jQuery("#hometeamfifthbatterselectid").append("5: ");
    var fifthbatterselectdd = document.createElement("select");
    fifthbatterselectdd.name = "FifthHomeTeamBatter";
    fifthbatterselectdd.id = "fifthhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][4] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][4])
            {
                fifthbatterselectdd.options[fifthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }    
    else
    {
        fifthbatterselectdd.options[fifthbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            fifthbatterselectdd.options[fifthbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamfifthbatterselectid").append(fifthbatterselectdd);
    jQuery("#fifthhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][4] = jQuery("#fifthhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 6th batter drop down
    jQuery("#hometeamsixthbatterselectid").empty();
//    jQuery("#hometeamsixthbatterselectid").append("6: ");
    var sixthbatterselectdd = document.createElement("select");
    sixthbatterselectdd.name = "SixthHomeTeamBatter";
    sixthbatterselectdd.id = "sixthhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][5] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][5])
            {
                sixthbatterselectdd.options[sixthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }    
    else
    {
        sixthbatterselectdd.options[sixthbatterselectdd.length] = new Option("Select Batter", '0');
    }
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            sixthbatterselectdd.options[sixthbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamsixthbatterselectid").append(sixthbatterselectdd);
    jQuery("#sixthhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][5] = jQuery("#sixthhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 7th batter drop down
    jQuery("#hometeamseventhbatterselectid").empty();
//    jQuery("#hometeamseventhbatterselectid").append("7: ");
    var seventhbatterselectdd = document.createElement("select");
    seventhbatterselectdd.name = "SeventhHomeTeamBatter";
    seventhbatterselectdd.id = "seventhhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][6] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][6])
            {
                seventhbatterselectdd.options[seventhbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }   
    else
    {
        seventhbatterselectdd.options[seventhbatterselectdd.length] = new Option("Select Batter", '0');
    }     
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            seventhbatterselectdd.options[seventhbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamseventhbatterselectid").append(seventhbatterselectdd);
    jQuery("#seventhhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][6] = jQuery("#seventhhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 8th batter drop down
    jQuery("#hometeameighthbatterselectid").empty();
//    jQuery("#hometeameighthbatterselectid").append("8: ");
    var eighthbatterselectdd = document.createElement("select");
    eighthbatterselectdd.name = "EighthHomeTeamBatter";
    eighthbatterselectdd.id = "eighthhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][7] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][7])
            {
                eighthbatterselectdd.options[eighthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }   
    else
    {
        eighthbatterselectdd.options[eighthbatterselectdd.length] = new Option("Select Batter", '0');
    }     
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            eighthbatterselectdd.options[eighthbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeameighthbatterselectid").append(eighthbatterselectdd);
    jQuery("#eighthhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][7] = jQuery("#eighthhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });

    //create 9th batter drop down
    jQuery("#hometeamninthbatterselectid").empty();
//    jQuery("#hometeamninthbatterselectid").append("9: ");
    var ninthbatterselectdd = document.createElement("select");
    ninthbatterselectdd.name = "NinthHomeTeamBatter";
    ninthbatterselectdd.id = "ninthhometeambatterId";
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'][8] !== '0')
    {
        jQuery.each(homeTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theHomeTeamBattingOrderBatterIds'][8])
            {
                ninthbatterselectdd.options[ninthbatterselectdd.length] = new Option(val.theName, val.theId);
            }
        });
    }
    else
    {
        ninthbatterselectdd.options[ninthbatterselectdd.length] = new Option("Select Batter", '0');
    }  
    for(var key in homeTeamMap) 
    {
        if(homeTeamMap.hasOwnProperty(key)) 
        {
            ninthbatterselectdd.options[ninthbatterselectdd.length] = new Option(homeTeamMap[key].theName, homeTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamninthbatterselectid").append(ninthbatterselectdd);
    jQuery("#ninthhometeambatterId").change(function(e) { 
        stateVariablesMap['theHomeTeamBattingOrderBatterIds'][8] = jQuery("#ninthhometeambatterId").val();  
        saveState();
        //hideHomeTeamLineupDropDowns();        
        //appendHomeTeamBatterDisplayNames();
    });
} 

function appendHomeTeamName()
{ 
    jQuery('#hometeamlineupheadercolumn').empty();
    jQuery('#hometeamlineupheadercolumn').append(stateVariablesMap['theHomeTeamName']);
}

function appendAwayTeamName()
{ 
    jQuery('#awayteamlineupheadercolumn').empty();
    jQuery('#awayteamlineupheadercolumn').append(stateVariablesMap['theAwayTeamName']);
}