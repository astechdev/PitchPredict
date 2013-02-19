function loadField()
{	
//    jQuery("#field").load("Components/Field/field.html", function() 
//    {
        loadFieldDropDowns();

        loadHitterImage();

        loadPitcherImage();

        loadCatcherImage();

        loadFirstBaseBaserunnerImage();

        loadSecondBaseBaserunnerImage();

        loadThirdBaseBaserunnerImage();

        loadOnDeckHitterImage();

        jQuery("#runneronfirst").tooltip({ effect: 'slide', relative: 'true', slideOffset: -100});

        jQuery("#runneronsecond").tooltip({ effect: 'slide', relative: 'true', slideOffset: -100});

        jQuery("#runneronthird").tooltip({ effect: 'slide', relative: 'true', slideOffset: -100}); 

        jQuery("#pitcher").tooltip({ effect: 'slide', relative: 'true', slideOffset: -100}); 

        jQuery("#catcher").tooltip({ effect: 'slide', relative: 'true', position: 'bottom center', slideOffset: 40});  

        jQuery("#hitter").tooltip({ effect: 'slide', relative: 'true', slideOffset: -30});
//    });
}

function loadHitterImage()
{
    jQuery('#rh_hitterimage').empty();
    jQuery('#lh_hitterimage').empty();
    
    if (stateVariablesMap['theBatterRightOrLeft'] !== 'L')
    {
        if(stateVariablesMap['theBatterId'] !== 0)
        {
            jQuery.each(offenseTeamMap, function(key, val)
            {
                if (val.theId === stateVariablesMap['theBatterId'])
                {
                    var url = 'images/Players/'+val.thePathToImage;

                    jQuery('#rh_hitterimage').prepend('<img id="hitterimage" src="'+url+'" />');
                }
            });
        }
    }
    else
    {
        if(stateVariablesMap['theBatterId'] !== 0)
        {
            jQuery.each(offenseTeamMap, function(key, val)
            {
                if (val.theId === stateVariablesMap['theBatterId'])
                {
                    var url = 'images/Players/'+val.thePathToImage;

                    jQuery('#lh_hitterimage').prepend('<img id="hitterimage" src="'+url+'" />');
                }
            });
        }
    }
}

function loadOnDeckHitterImage()
{
    jQuery("#ondeckhitterimage").remove();

    if(!(stateVariablesMap['theBatterName'].beginsWith("Select", true)))
    {		
        if (stateVariablesMap['theTopOrBottomHalf'] === "TOP")
        {
            loadAwayTeamOnDeckHitterImage();
        }
        else
        {
            loadHomeTeamOnDeckHitterImage();
        }
    }	
}

function loadAwayTeamOnDeckHitterImage()
{
    if (stateVariablesMap['theAwayTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val()))
    {
        var index = stateVariablesMap['theAwayTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val());
    
        if ((index + 1) < stateVariablesMap['theAwayTeamBattingOrderBatterIds'].length)
        {
            if((!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1].beginsWith("Select", true))) && (!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1] == stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index])))
            {
                jQuery.each(offenseTeamMap, function(key, val)
                {
                    if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1])
                    {
                        var url = 'images/Players/'+val.thePathToImage;

                        jQuery('#away_team_ondeck_hitterimage').prepend('<img id="ondeckhitterimage" src="'+url+'" />');
                    }
                });

                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1];
            }
        }
        else
        {
            if((!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0].beginsWith("Select", true))) && (!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0] == stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index])))
            {
                jQuery.each(offenseTeamMap, function(key, val)
                {
                    if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0])
                    {
                        var url = 'images/Players/'+val.thePathToImage;

                        jQuery('#away_team_ondeck_hitterimage').prepend('<img id="ondeckhitterimage" src="'+url+'" />');
                    }
                });

                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0];
            }
        }
    }
    else
    {
        hitterondeckname = '0';
    }
}

function loadHomeTeamOnDeckHitterImage()
{
    if (stateVariablesMap['theHomeTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val()))
    {	
        var index = stateVariablesMap['theHomeTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val());


        if ((index + 1) < stateVariablesMap['theHomeTeamBattingOrderBatterIds'].length)
        {
            if((!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1].beginsWith("Select", true))) && (!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1] == stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index])))
            {
                jQuery.each(offenseTeamMap, function(key, val)
                {
                    if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1])
                    {
                        var url = 'images/Players/'+val.thePathToImage;

                        jQuery('#home_team_ondeck_hitterimage').prepend('<img id="ondeckhitterimage" src="'+url+'" />');
                    }
                });

                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index - 1];
            }
        }
        else
        {
            if((!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0].beginsWith("Select", true))) && (!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0] == stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index])))
            {
                jQuery.each(offenseTeamMap, function(key, val)
                {
                    if (val.theId === stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0])
                    {
                        var url = 'images/Players/'+val.thePathToImage;

                        jQuery('#home_team_ondeck_hitterimage').prepend('<img id="ondeckhitterimage" src="'+url+'" />');
                    }
                });

                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0];
            }	
        }
    }
    else
    {
        hitterondeckname = '0';
    }
}

function loadPitcherImage()
{
    jQuery("#pitcherimage").remove();
    if(stateVariablesMap['thePitcherId'] !== 0)
    {
        jQuery.each(defenseTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['thePitcherId'])
            {
                var url = 'images/Players/'+val.thePathToImage;

                jQuery('#pitcherimagecontainer').prepend('<img id="pitcherimage" src="'+url+'" />');
            }
        });
    }
}

function loadCatcherImage()
{
    jQuery("#catcherimage").remove();
    if(stateVariablesMap['theCatcherId'] !== 0)
    {
        jQuery.each(defenseTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theCatcherId'])
            {
                var url = 'images/Players/'+val.thePathToImage;

                jQuery('#catcherimagecontainer').prepend('<img id="catcherimage" src="'+url+'" />');
            }
        });
    }
}
function loadFirstBaseBaserunnerImage()
{
    jQuery("#runneronfirstimage").remove();
    if(stateVariablesMap['theOn1bId'] !== 0)
    {
        jQuery.each(offenseTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theOn1bId'])
            {
                var url = 'images/Players/'+val.thePathToImage;

                jQuery('#runneronfirstimagecontainer').prepend('<img id="runneronfirstimage" src="'+url+'" />');
            }
        });
    }
}

function loadSecondBaseBaserunnerImage()
{
    jQuery("#runneronsecondimage").remove();
    if(stateVariablesMap['theOn2bId'] !== 0)
    {
        jQuery.each(offenseTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theOn2bId'])
            {
                var url = 'images/Players/'+val.thePathToImage;

                jQuery('#runneronsecondimagecontainer').prepend('<img id="runneronsecondimage" src="'+url+'" />');
            }
        });
    }
}

function loadThirdBaseBaserunnerImage()
{
    jQuery("#runneronthirdimage").remove();
    if(stateVariablesMap['theOn3bId'] !== 0)
    {
        jQuery.each(offenseTeamMap, function(key, val)
        {
            if (val.theId === stateVariablesMap['theOn3bId'])
            {
                var url = 'images/Players/'+val.thePathToImage;

                jQuery('#runneronthirdimagecontainer').prepend('<img id="runneronthirdimage" src="'+url+'" />');
            }
        });
    }
}

function loadFieldDropDowns()
{
    //make sure 1st base runner drop down doesn't exist
    jQuery("#runneronfirstselectid").empty();
    
    //create 1st base runner drop down
    var firstbaserunnerselectdd = document.createElement("select");
    firstbaserunnerselectdd.name = "RunnerOnFirst";
    firstbaserunnerselectdd.id = "runneronfirstId";
    firstbaserunnerselectdd.options[firstbaserunnerselectdd.length] = new Option(stateVariablesMap['theOn1bName'], stateVariablesMap['theOn1bId']);
    
    for(var key in offenseTeamMap) 
    {
        if(offenseTeamMap.hasOwnProperty(key)) 
        {
            firstbaserunnerselectdd.options[firstbaserunnerselectdd.length] = new Option(offenseTeamMap[key].theName, offenseTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#runneronfirstselectid").append("Base Runner:");
    jQuery("#runneronfirstselectid").append(firstbaserunnerselectdd);    

    //make sure 2nd base runner drop down doesn't exist
    jQuery("#runneronsecondselectid").empty();
    
    //create 2nd base runner drop down
    var secondbaserunnerselectdd = document.createElement("select");
    secondbaserunnerselectdd.name = "RunnerOnSecond";
    secondbaserunnerselectdd.id = "runneronsecondId";
    secondbaserunnerselectdd.options[secondbaserunnerselectdd.length] = new Option(stateVariablesMap['theOn2bName'], stateVariablesMap['theOn2bId']);
    
    for(var key in offenseTeamMap) 
    {
        if(offenseTeamMap.hasOwnProperty(key)) 
        {
            secondbaserunnerselectdd.options[secondbaserunnerselectdd.length] = new Option(offenseTeamMap[key].theName, offenseTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#runneronsecondselectid").append("Base Runner:");
    jQuery("#runneronsecondselectid").append(secondbaserunnerselectdd);    

    //make sure 3rd base runner drop down doesn't exist
    jQuery("#runneronthirdselectid").empty();

    //create 3rd base runner drop down
    var thirdbaserunnerselectdd = document.createElement("select");
    thirdbaserunnerselectdd.name = "RunnerOnThird";
    thirdbaserunnerselectdd.id = "runneronthirdId";
    thirdbaserunnerselectdd.options[thirdbaserunnerselectdd.length] = new Option(stateVariablesMap['theOn3bName'], stateVariablesMap['theOn3bId']);
    
    for(var key in offenseTeamMap) 
    {
        if(offenseTeamMap.hasOwnProperty(key)) 
        {
            thirdbaserunnerselectdd.options[thirdbaserunnerselectdd.length] = new Option(offenseTeamMap[key].theName, offenseTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#runneronthirdselectid").append("Base Runner:");
    jQuery("#runneronthirdselectid").append(thirdbaserunnerselectdd);   

    //make sure hitter drop down doesn't exist
    jQuery("#hitterselectid").empty();

    //create hitter drop down
    var hitterselectdd = document.createElement("select");
    hitterselectdd.name = "HitterName";
    hitterselectdd.id = "hitternameId";
    hitterselectdd.options[hitterselectdd.length] = new Option(stateVariablesMap['theBatterName'], stateVariablesMap['theBatterId']);
    
    for(var key in offenseTeamMap) 
    {
        if(offenseTeamMap.hasOwnProperty(key)) 
        {
            hitterselectdd.options[hitterselectdd.length] = new Option(offenseTeamMap[key].theName, offenseTeamMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hitterselectid").append("Batter:");
    jQuery("#hitterselectid").append(hitterselectdd);  

    //make sure pitcher drop down doesn't exist
    jQuery("#pitcherselectid").empty();

    //create pitcher drop down
    var pitcherselectdd = document.createElement("select");
    pitcherselectdd.name = "PitcherName";
    pitcherselectdd.id = "pitchernameId";
    pitcherselectdd.options[pitcherselectdd.length] = new Option(stateVariablesMap['thePitcherName'], stateVariablesMap['thePitcherId']);
    
    for(var key in defenseTeamMap) 
    {
        if(defenseTeamMap.hasOwnProperty(key)) 
        {
            if(defenseTeamMap[key].thePosition === 'P')
            {
                pitcherselectdd.options[pitcherselectdd.length] = new Option(defenseTeamMap[key].theName, defenseTeamMap[key].theId);
            }
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitcherselectid").append("Pitcher:");
    jQuery("#pitcherselectid").append(pitcherselectdd); 

    //make sure catcher drop down doesn't exist
    jQuery("#catcherselectid").empty();

    //create catcher drop down
    var catcherselectdd = document.createElement("select");
    catcherselectdd.name = "CatcherName";
    catcherselectdd.id = "catchernameId";
    catcherselectdd.options[catcherselectdd.length] = new Option(stateVariablesMap['theCatcherName'], stateVariablesMap['theCatcherId']);
    
    for(var key in defenseTeamMap) 
    {
        if(defenseTeamMap.hasOwnProperty(key)) 
        {
            if(defenseTeamMap[key].thePosition === 'C')
            {
                catcherselectdd.options[catcherselectdd.length] = new Option(defenseTeamMap[key].theName, defenseTeamMap[key].theId);
            }
        }
    }

    //Add the dropdown to the parent node
    jQuery("#catcherselectid").append("Catcher:");
    jQuery("#catcherselectid").append(catcherselectdd);

    //make sure batter right or left drop down doesn't exist
    jQuery("#hitterrightorleftselectid").empty();

    //create batter right or left drop down
    var batterrightorleftselectdd = document.createElement("select");
    batterrightorleftselectdd.name = "HitterRightOrLeft";
    batterrightorleftselectdd.id = "hitterrightorleftId";
    batterrightorleftselectdd.options[batterrightorleftselectdd.length] = new Option(stateVariablesMap['theBatterRightOrLeft'], stateVariablesMap['theBatterRightOrLeft']);
    batterrightorleftselectdd.options[batterrightorleftselectdd.length] = new Option('L', 'L');
    batterrightorleftselectdd.options[batterrightorleftselectdd.length] = new Option('R', 'R');

    //Add the dropdown to the parent node
    jQuery("#hitterrightorleftselectid").append("R/L:");
    jQuery("#hitterrightorleftselectid").append(batterrightorleftselectdd);

//    //make sure atbat drop down doesn't exist
//    jQuery("#atbatnumberselectid").empty();
//
//    //create atbat drop down
//    var atbatselectdd = document.createElement("select");
//    atbatselectdd.name = "AtBatNumber";
//    atbatselectdd.id = "atbatnumberId";
//    atbatselectdd.options[atbatselectdd.length] = new Option(stateVariablesMap['theAtBatNumber'], stateVariablesMap['theAtBatNumber']);
//    
//    for (var i=0;i<9;i++)
//    {
//        atbatselectdd.options[atbatselectdd.length] = new Option(i, i);
//    }
//
//    //Add the dropdown to the parent node
//    jQuery("#atbatnumberselectid").append("At Bat #:");
//    jQuery("#atbatnumberselectid").append(atbatselectdd);

    loadFieldDropDownsOnChangeFunctions();    
}
    
function loadFieldDropDownsOnChangeFunctions()
{
    jQuery("#runneronfirstId").change(function(e) {  
        stateVariablesMap['theOn1bId'] = jQuery("#runneronfirstId").val();  
        stateVariablesMap['theOn1bName'] = jQuery("#runneronfirstId[value="+stateVariablesMap['theOn1bId']+"]").text(); 
        saveState();        
//        loadFieldDropDowns();
    });
    
    jQuery("#runneronsecondId").change(function(e) {  
        stateVariablesMap['theOn2bId'] = jQuery("#runneronsecondId").val();  
        stateVariablesMap['theOn2bName'] = jQuery("#runneronsecondId[value="+stateVariablesMap['theOn2bId']+"]").text(); 
        saveState();        
//        loadFieldDropDowns();
    });
    
    jQuery("#runneronthirdId").change(function(e) {  
        stateVariablesMap['theOn3bId'] = jQuery("#runneronthirdId").val();  
        stateVariablesMap['theOn3bName'] = jQuery("#runneronthirdId[value="+stateVariablesMap['theOn3bId']+"]").text(); 
        saveState();        
//        loadFieldDropDowns();
    });    
    
    jQuery("#hitternameId").change(function(e) {  
        stateVariablesMap['theBatterId'] = jQuery("#hitternameId").val();  
        stateVariablesMap['theBatterName'] = jQuery("#hitternameId[value="+stateVariablesMap['theBatterId']+"]").text(); 
        loadOnDeckHitterImage();
        saveState(); 
//        loadFieldDropDowns();
    });    
    
    jQuery("#pitchernameId").change(function(e) { 
        stateVariablesMap['thePitcherId'] = jQuery("#pitchernameId").val();  
        stateVariablesMap['thePitcherName'] = jQuery("#pitchernameId[value="+stateVariablesMap['thePitcherId']+"]").text(); 
        saveState();        
//        loadFieldDropDowns();
    });        
    
    jQuery("#catchernameId").change(function(e) {  
        stateVariablesMap['theCatcherId'] = jQuery("#catchernameId").val();  
        stateVariablesMap['theCatcherName'] = jQuery("#catchernameId[value="+stateVariablesMap['theCatcherId']+"]").text(); 
        saveState();        
//        loadFieldDropDowns();
    });    

    jQuery("#hitterrightorleftId").change(function(e) {  
        stateVariablesMap['theBatterRightOrLeft'] = jQuery("#hitterrightorleftId").val();  
        loadHitterImage();
        saveState(); 
//        loadFieldDropDowns();
    });    
   
//    jQuery("#atbatnumberId").change(function(e) {   
//        stateVariablesMap['theAtBatNumber'] = jQuery("#atbatnumberId").val();  
//        saveState();        
////        loadFieldDropDowns();
//    });    
}
    
function resetField(teamToReset)
{
    if(teamToReset === 'Home Team')
    {
        if (stateVariablesMap['theTopOrBottomHalf'] === 'TOP')
        {
            stateVariablesMap['thePitcherId'] = "0";
            stateVariablesMap['thePitcherName'] = "Select Pitcher";
            stateVariablesMap['theCatcherId'] = "0";
            stateVariablesMap['theCatcherName'] = "Select Catcher";
        }
        else
        {
            stateVariablesMap['theAtBatNumber'] = "0";
            stateVariablesMap['theBatterId'] = "0";
            stateVariablesMap['theBatterName'] = "Select Batter";
            stateVariablesMap['theBatterRightOrLeft'] = "Select R/L";
            stateVariablesMap['theBatterTeamId'] = "0";
            stateVariablesMap['theBatterTeamName'] = "Select Team";
            stateVariablesMap['theBatterOnDeckId'] = "0";
            stateVariablesMap['theBatterOnDeckName'] = "Select Batter";
            stateVariablesMap['theOn1bId'] = "0";
            stateVariablesMap['theOn1bName'] = "Select Baserunner";
            stateVariablesMap['theOn2bId'] = "0";
            stateVariablesMap['theOn2bName'] = "Select Baserunner";
            stateVariablesMap['theOn3bId'] = "0";
            stateVariablesMap['theOn3bName'] = "Select Baserunner";
        }
    }
    else
    {
        if (stateVariablesMap['theTopOrBottomHalf'] === 'TOP')
        {
            stateVariablesMap['theAtBatNumber'] = "0";
            stateVariablesMap['theBatterId'] = "0";
            stateVariablesMap['theBatterName'] = "Select Batter";
            stateVariablesMap['theBatterRightOrLeft'] = "Select R/L";
            stateVariablesMap['theBatterTeamId'] = "0";
            stateVariablesMap['theBatterTeamName'] = "Select Team";
            stateVariablesMap['theBatterOnDeckId'] = "0";
            stateVariablesMap['theBatterOnDeckName'] = "Select Batter";
            stateVariablesMap['theOn1bId'] = "0";
            stateVariablesMap['theOn1bName'] = "Select Baserunner";
            stateVariablesMap['theOn2bId'] = "0";
            stateVariablesMap['theOn2bName'] = "Select Baserunner";
            stateVariablesMap['theOn3bId'] = "0";
            stateVariablesMap['theOn3bName'] = "Select Baserunner";
        }
        else
        {
            stateVariablesMap['thePitcherId'] = "0";
            stateVariablesMap['thePitcherName'] = "Select Pitcher";
            stateVariablesMap['theCatcherId'] = "0";
            stateVariablesMap['theCatcherName'] = "Select Catcher";
        }        
    }
}