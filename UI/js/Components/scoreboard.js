function loadScoreboard()
{
//    jQuery("#scoreboard").load("Components/ScoreBoard/scoreboard.html", function() 
//    {
        hideScoreBoardDropDowns();            
        loadScoreBoardDropDowns();
        loadScoreBoardRadioButtons();
        appendScoreBoardDisplayNames();
//    });

    //jQuery("#inningselectid").hide();
    //jQuery("#awayteamnameselectid").hide();
}

//***
// reveals inning selection drop down.
//***
function showInningSelectionDropDown()
{	
    jQuery("#inningdisplayid").hide();
    jQuery("#inningselectid").show();
}

//***
// reveals balls selection drop down.
//***
function showBallsSelectionDropDown()
{	
    jQuery("#ballsdisplayid").hide();
    jQuery("#ballsselectid").show();
}

//***
// reveals strikes selection drop down.
//***
function showStrikesSelectionDropDown()
{	
    jQuery("#strikesdisplayid").hide();
    jQuery("#strikesselectid").show();
}

//***
// reveals outs selection drop down.
//***
function showOutsSelectionDropDown()
{	
    jQuery("#outsdisplayid").hide();
    jQuery("#outsselectid").show();
}

//***
// reveals Away Team Name selection drop down.
//***
function showAwayTeamNameSelectionDropDown()
{	
    jQuery("#awayteamnamedisplayid").hide();
    jQuery("#awayteamnameselectid").show();
}

//***
// reveals Away Team Score selection drop down.
//***
function showAwayTeamScoreSelectionDropDown()
{	
    jQuery("#awayteamscoredisplayid").hide();
    jQuery("#awayteamscoreselectid").show();
}

//***
// reveals Home Team Name selection drop down.
//***
function showHomeTeamNameSelectionDropDown()
{	
    jQuery("#hometeamnamedisplayid").hide();
    jQuery("#hometeamnameselectid").show();
}

//***
// reveals Away Team Score selection drop down.
//***
function showHomeTeamScoreSelectionDropDown()
{	
    jQuery("#hometeamscoredisplayid").hide();
    jQuery("#hometeamscoreselectid").show();
}
    
function resetScoreBoard()
{
    stateVariablesMap['theHomeTeamId'] = '0'; 
    stateVariablesMap['theHomeTeamName'] = 'Select Team';
    stateVariablesMap['theAwayTeamId'] = '0'; 
    stateVariablesMap['theAwayTeamName'] = 'Select Team';
    resetHomeTeamLineup();
    resetAwayTeamLineup();
    stateVariablesMap['theHomeTeamScore'] = "0";
    stateVariablesMap['theAwayTeamScore'] = "0";
    stateVariablesMap['theBalls'] = "0";
    stateVariablesMap['theStrikes'] = "0";
    stateVariablesMap['theOuts'] = "0";
    stateVariablesMap['theTopOrBottomHalf'] === "TOP";
}
    
function loadScoreBoardDropDowns()
{
//    alert("scoreboard.js "+JSON.stringify(stateVariablesMap));
//    alert("scoreboard.js "+JSON.stringify(teamsMap));
//    alert("scoreboard.js "+JSON.stringify(homeTeamMap));
//    alert("scoreboard.js "+JSON.stringify(awayTeamMap));
        
    //create innings drop down
    jQuery("#inningselectid").empty();
    var inningselectdd = document.createElement("select");
    inningselectdd.name = "Inning";
    inningselectdd.id = "inningId";
    inningselectdd.options[inningselectdd.length] = new Option(stateVariablesMap['theInning'], stateVariablesMap['theInning']);
    for (var i=0;i<40;i++)
    { 
        inningselectdd.options[inningselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#inningselectid").append(inningselectdd);
    jQuery("#inningId").change(function(e) { 
        stateVariablesMap['theInning'] = jQuery("#inningId").val();
        saveState(); 
        hideScoreBoardDropDowns();
        appendScoreBoardDisplayNames();
    });

    //create outs drop down
    jQuery("#outsselectid").empty();
    jQuery("#outsselectid").append("Outs: ");
    var outselectdd = document.createElement("select");
    outselectdd.name = "Outs";
    outselectdd.id = "outsId";
    outselectdd.options[outselectdd.length] = new Option(stateVariablesMap['theOuts'], stateVariablesMap['theOuts']);
    for (var i=0;i<3;i++)
    { 
        outselectdd.options[outselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#outsselectid").append(outselectdd);
    jQuery("#outsId").change(function(e) {  
        stateVariablesMap['theOuts'] = jQuery("#outsId").val();
        saveState(); 
        hideScoreBoardDropDowns();
        appendScoreBoardDisplayNames();
    });

    //create strikes drop down
    jQuery("#strikesselectid").empty();
    jQuery("#strikesselectid").append("Strikes: ");
    var strikesselectdd = document.createElement("select");
    strikesselectdd.name = "Strikes";
    strikesselectdd.id = "strikesId";
    strikesselectdd.options[strikesselectdd.length] = new Option(stateVariablesMap['theStrikes'], stateVariablesMap['theStrikes']);
    for (var i=0;i<3;i++)
    { 
        strikesselectdd.options[strikesselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#strikesselectid").append(strikesselectdd);
    jQuery("#strikesId").change(function(e) {   
        stateVariablesMap['theStrikes'] = jQuery("#strikesId").val();
        saveState(); 
        hideScoreBoardDropDowns();
        appendScoreBoardDisplayNames();
    });

    //create balls drop down
    jQuery("#ballsselectid").empty();
    jQuery("#ballsselectid").append("Balls: ");
    var ballsselectdd = document.createElement("select");
    ballsselectdd.name = "Balls";
    ballsselectdd.id = "ballsId";
    ballsselectdd.options[ballsselectdd.length] = new Option(stateVariablesMap['theBalls'], stateVariablesMap['theBalls']);
    for (var i=0;i<4;i++)
    { 
        ballsselectdd.options[ballsselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#ballsselectid").append(ballsselectdd);
    jQuery("#ballsId").change(function(e) {    
        stateVariablesMap['theBalls'] = jQuery("#ballsId").val();
        saveState(); 
        hideScoreBoardDropDowns();
        appendScoreBoardDisplayNames();
    });

    //create home team score drop down
    jQuery("#hometeamscoreselectid").empty();
    var hometeamscoreselectdd = document.createElement("select");
    hometeamscoreselectdd.name = "HomeTeamScore";
    hometeamscoreselectdd.id = "hometeamscoreId";
    hometeamscoreselectdd.options[hometeamscoreselectdd.length] = new Option(stateVariablesMap['theHomeTeamScore'], stateVariablesMap['theHomeTeamScore']);
    for (var i=0;i<40;i++)
    { 
        hometeamscoreselectdd.options[hometeamscoreselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamscoreselectid").append(hometeamscoreselectdd);
    jQuery("#hometeamscoreId").change(function(e) {    
        stateVariablesMap['theHomeTeamScore'] = jQuery("#hometeamscoreId").val();
        saveState(); 
        hideScoreBoardDropDowns();
        appendScoreBoardDisplayNames();
    });

    //create away team score drop down
    jQuery("#awayteamscoreselectid").empty();
    var awayteamscoreselectdd = document.createElement("select");
    awayteamscoreselectdd.name = "AwayTeamScore";
    awayteamscoreselectdd.id = "awayteamscoreId";
    awayteamscoreselectdd.options[awayteamscoreselectdd.length] = new Option(stateVariablesMap['theAwayTeamScore'], stateVariablesMap['theAwayTeamScore']);
    for (var i=0;i<40;i++)
    { 
        awayteamscoreselectdd.options[awayteamscoreselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamscoreselectid").append(awayteamscoreselectdd);
    jQuery("#awayteamscoreId").change(function(e) {    
        stateVariablesMap['theAwayTeamScore'] = jQuery("#awayteamscoreId").val();
        saveState(); 
        hideScoreBoardDropDowns();
        appendScoreBoardDisplayNames();
    });

    //create away teams drop down
    jQuery("#awayteamnameselectid").empty();
    var awayteamsselectdd = document.createElement("select");
    awayteamsselectdd.name = "AwayTeamName";
    awayteamsselectdd.id = "awayteamnameId";
    awayteamsselectdd.options[awayteamsselectdd.length] = new Option(stateVariablesMap['theAwayTeamName'], stateVariablesMap['theAwayTeamId']);
    for(var key in teamsMap) 
    {
        if(teamsMap.hasOwnProperty(key)) 
        {
            awayteamsselectdd.options[awayteamsselectdd.length] = new Option(teamsMap[key].theName, teamsMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamnameselectid").append(awayteamsselectdd);
    jQuery("#awayteamnameId").change(function(e) {  
        stateVariablesMap['theAwayTeamId'] = jQuery("#awayteamnameId").val(); 
        stateVariablesMap['theAwayTeamName'] = jQuery("#awayteamnameId[value="+stateVariablesMap['theAwayTeamId']+"]").text();
        resetAwayTeamLineup();
//        resetScoreBoard();
        resetField('Home Team');
//        resetPitchSequences();
        saveState();
        load();
    });   

    //create home teams drop down
    jQuery("#hometeamnameselectid").empty();
    var hometeamsselectdd = document.createElement("select");
    hometeamsselectdd.name = "HomeTeamName";
    hometeamsselectdd.id = "hometeamnameId";
    hometeamsselectdd.options[hometeamsselectdd.length] = new Option(stateVariablesMap['theHomeTeamName'], stateVariablesMap['theHomeTeamId']);
    for(var key in teamsMap) 
    {
        if(teamsMap.hasOwnProperty(key)) 
        {
            hometeamsselectdd.options[hometeamsselectdd.length] = new Option(teamsMap[key].theName, teamsMap[key].theId);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamnameselectid").append(hometeamsselectdd);
    jQuery("#hometeamnameId").change(function(e) { 
        stateVariablesMap['theHomeTeamId'] = jQuery("#hometeamnameId").val(); 
        stateVariablesMap['theHomeTeamName'] = jQuery("#hometeamnameId[value="+stateVariablesMap['theHomeTeamId']+"]").text();
        resetHomeTeamLineup();
//        resetScoreBoard();
        resetField('Home Team');
//        resetPitchSequences();
        saveState();
        load();
    });    
}

function loadScoreBoardRadioButtons()
{ 
    jQuery("#inningselectid").append('<input id="topradiobutton" type="radio" name="toporbottomhalf" value="TOP">Top');
    jQuery("#inningselectid").append('<input id="bottomradiobutton" type="radio" name="toporbottomhalf" value="BOTTOM">Bottom of the');
    
    jQuery("#topradiobutton").click(function() { 
        stateVariablesMap['theTopOrBottomHalf'] = "TOP";
        
//        resetField('Home Team');
//        resetField('Away Team');

        stateVariablesMap['thePitcherTeamId'] = jQuery('#hometeamnameId').val();
        stateVariablesMap['thePitcherTeamName'] = jQuery("#hometeamnameId[value="+stateVariablesMap['thePitcherTeamId']+"]").text();
        
        stateVariablesMap['theBatterTeamId'] = jQuery('#awayteamnameId').val();
        stateVariablesMap['theBatterTeamName'] = jQuery("#awayteamnameId[value="+stateVariablesMap['theBatterTeamId']+"]").text();
        
        var index = stateVariablesMap['theAwayTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val());
        if ((index + 1) < stateVariablesMap['theAwayTeamBattingOrderBatterIds'].length)
        {
            if((!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1].beginsWith("Select", true))) && (!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1] == stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index])))
            {
                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1];
                stateVariablesMap['theBatterOnDeckName'] = awayTeamMap[stateVariablesMap['theBatterOnDeckId']];
            }
            else
            {
                stateVariablesMap['theBatterOnDeckId'] = '0';
                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
            }
        }
        else
        {
            if((!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0].beginsWith("Select", true))) && (!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0] == stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index])))
            {
                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0];
                stateVariablesMap['theBatterOnDeckName'] = awayTeamMap[stateVariablesMap['theBatterOnDeckId']];
            }
            else
            {
                stateVariablesMap['theBatterOnDeckId'] = '0';
                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
            }
        }
    
        saveState();
        load();
    });  
    
    jQuery("#bottomradiobutton").click(function() { 
        stateVariablesMap['theTopOrBottomHalf'] = "BOTTOM";
        
//        resetField('Home Team');
//        resetField('Away Team');

        stateVariablesMap['thePitcherTeamId'] = jQuery('#awayteamnameId').val();
        stateVariablesMap['thePitcherTeamName'] = jQuery("#awayteamnameId[value="+stateVariablesMap['thePitcherTeamId']+"]").text();
        
        stateVariablesMap['theBatterTeamId'] = jQuery('#hometeamnameId').val();
        stateVariablesMap['theBatterTeamName'] = jQuery("#hometeamnameId[value="+stateVariablesMap['theBatterTeamId']+"]").text();
        
        var index = stateVariablesMap['theHomeTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val());
        if ((index + 1) < stateVariablesMap['theHomeTeamBattingOrderBatterIds'].length)
        {
            if((!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1].beginsWith("Select", true))) && (!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1] == stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index])))
            {
                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1];
                stateVariablesMap['theBatterOnDeckName'] = homeTeamMap[stateVariablesMap['theBatterOnDeckId']];
            }
            else
            {
                stateVariablesMap['theBatterOnDeckId'] = '0';
                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
            }
        }
        else
        {
            if((!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0].beginsWith("Select", true))) && (!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0] == stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index])))
            {
                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0];
                stateVariablesMap['theBatterOnDeckName'] = homeTeamMap[stateVariablesMap['theBatterOnDeckId']];
            }
            else
            {
                stateVariablesMap['theBatterOnDeckId'] = '0';
                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
            }
        }
    
        saveState();
        load();
    });  
    
    
    jQuery("#years").empty();
    jQuery("#years").append('<input id="2009radiobutton" type="radio" name="yeartoquery" value="2009" >2009');
//    jQuery("#years").append('<input id="2010radiobutton" type="radio" name="yeartoquery" value="2010" >2010');
//    jQuery("#years").append('<input id="2011radiobutton" type="radio" name="yeartoquery" value="2011" >2011');
//    jQuery("#years").append('<input id="2012radiobutton" type="radio" name="yeartoquery" value="2012" >2012');
    
    jQuery("#2009radiobutton").click(function() { 
        stateVariablesMap['theYearToQuery'] = "2009";
        saveState();
    });  
    
//    jQuery("#2010radiobutton").click(function() { 
//        stateVariablesMap['theYearToQuery'] = "2010";
//        saveState();
//    });  
//    
//    jQuery("#2011radiobutton").click(function() { 
//        stateVariablesMap['theYearToQuery'] = "2011";
//        saveState();
//    });  
//    
//    jQuery("#2012radiobutton").click(function() { 
//        stateVariablesMap['theYearToQuery'] = "2012";
//        saveState();
//    });  
}

function appendScoreBoardDisplayNames()
{  
    jQuery('#awayteamnamedisplayid').empty();
    jQuery('#hometeamnamedisplayid').empty();
    jQuery('#awayteamscoredisplayid').empty();
    jQuery('#hometeamscoredisplayid').empty();
    
    jQuery('#awayteamnamedisplayid').append(stateVariablesMap['theAwayTeamName']);
    jQuery('#hometeamnamedisplayid').append(stateVariablesMap['theHomeTeamName']);
    jQuery('#awayteamscoredisplayid').append(stateVariablesMap['theAwayTeamScore']);
    jQuery('#hometeamscoredisplayid').append(stateVariablesMap['theHomeTeamScore']);
    
    jQuery('#awayteamnamedisplayid').show();
    jQuery('#hometeamnamedisplayid').show();
    jQuery('#awayteamscoredisplayid').show();
    jQuery('#hometeamscoredisplayid').show();
    
    if(stateVariablesMap['theTopOrBottomHalf']==="TOP")
    {
        jQuery('#bottomradiobutton').attr('checked',false);
        jQuery('#topradiobutton').attr('checked',true);
    }
    else
    {
        jQuery('#topradiobutton').attr('checked',false);
        jQuery('#bottomradiobutton').attr('checked',true);
    }

    if(stateVariablesMap['theYearToQuery']==="2009")
    {
        jQuery('#2012radiobutton').attr('checked',false);
        jQuery('#2011radiobutton').attr('checked',false);
        jQuery('#2010radiobutton').attr('checked',false);
        jQuery('#2009radiobutton').attr('checked',true);
    }
    else if(stateVariablesMap['theYearToQuery']==="2010")
    {
        jQuery('#2012radiobutton').attr('checked',false);
        jQuery('#2011radiobutton').attr('checked',false);
        jQuery('#2009radiobutton').attr('checked',false);
        jQuery('#2010radiobutton').attr('checked',true);
    }
    else if(stateVariablesMap['theYearToQuery']==="2011")
    {
        jQuery('#2012radiobutton').attr('checked',false);
        jQuery('#2010radiobutton').attr('checked',false);
        jQuery('#2009radiobutton').attr('checked',false);
        jQuery('#2011radiobutton').attr('checked',true);
    }
    else if(stateVariablesMap['theYearToQuery']==="2012")
    {
        jQuery('#2011radiobutton').attr('checked',false);
        jQuery('#2010radiobutton').attr('checked',false);
        jQuery('#2009radiobutton').attr('checked',false);
        jQuery('#2012radiobutton').attr('checked',true);
    }

    jQuery('#inningdisplayid').empty();
    jQuery('#inningdisplayid').show();
    if(stateVariablesMap['theTopOrBottomHalf']==="TOP")
    {
        jQuery('#inningdisplayid').append("Top of the "+stateVariablesMap['theInning']);
    }
    else
    {
        jQuery('#inningdisplayid').append("Bottom of the "+stateVariablesMap['theInning']);
    }

    jQuery('#outsdisplayid').empty();
    jQuery('#strikesdisplayid').empty();
    jQuery('#ballsdisplayid').empty();

    jQuery('#outsdisplayid').append("Outs: "+stateVariablesMap['theOuts']);
    jQuery('#strikesdisplayid').append("Strikes: "+stateVariablesMap['theStrikes']);
    jQuery('#ballsdisplayid').append("Balls: "+stateVariablesMap['theBalls']);
    
    jQuery('#outsdisplayid').show();
    jQuery('#strikesdisplayid').show();
    jQuery('#ballsdisplayid').show();
}
    
function hideScoreBoardDropDowns()
{
    jQuery("#inningselectid").hide();
    jQuery("#awayteamnameselectid").hide();
    jQuery("#awayteamscoreselectid").hide();
    jQuery("#hometeamnameselectid").hide();
    jQuery("#hometeamscoreselectid").hide();
    jQuery("#ballsselectid").hide();
    jQuery("#strikesselectid").hide();
    jQuery("#outsselectid").hide();
}