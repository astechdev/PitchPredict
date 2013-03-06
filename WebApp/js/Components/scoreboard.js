function loadScoreboard()
{           
    loadScoreBoardDropDowns();
//    loadScoreBoardRadioButtons();
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
//    $form = $("<form></form>");
//    $div = $("<div data-role=\"fieldcontain\"></div>");
//    $label = $("<label for=\"select-native-2\">Inning #:</label>");
//    $div.append($label);
    
    //create innings drop down
    jQuery("#inningselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var inningselectdd = document.createElement("select");
    inningselectdd.name = "Inning";
    inningselectdd.id = "inningId";
    inningselectdd.options[inningselectdd.length] = new Option("Inning: "+stateVariablesMap['theInning'], stateVariablesMap['theInning']);
    for (var i=0;i<40;i++)
    { 
        inningselectdd.options[inningselectdd.length] = new Option(i, i);
    }
    
//    $div.append(inningselectdd);
//    $form.append($div);

    //Add the dropdown to the parent node
    jQuery("#inningselectid").append(inningselectdd);
    jQuery("#inningId").change(function(e) { 
        stateVariablesMap['theInning'] = jQuery("#inningId").val();
        saveState(); 
    });

    //create outs drop down
    jQuery("#outsselectid").empty();
//    jQuery("#outsselectid").append("Outs: ");
    var outselectdd = document.createElement("select");
    outselectdd.name = "Outs";
    outselectdd.id = "outsId";
    outselectdd.options[outselectdd.length] = new Option("Outs: "+stateVariablesMap['theOuts'], stateVariablesMap['theOuts']);
    for (var i=0;i<3;i++)
    { 
        outselectdd.options[outselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#outsselectid").append(outselectdd);
    jQuery("#outsId").change(function(e) {  
        stateVariablesMap['theOuts'] = jQuery("#outsId").val();
        saveState(); 
    });

    //create strikes drop down
    jQuery("#strikesselectid").empty();
//    jQuery("#strikesselectid").append("Strikes: ");
    var strikesselectdd = document.createElement("select");
    strikesselectdd.name = "Strikes";
    strikesselectdd.id = "strikesId";
    strikesselectdd.options[strikesselectdd.length] = new Option("Strikes: "+stateVariablesMap['theStrikes'], stateVariablesMap['theStrikes']);
    for (var i=0;i<3;i++)
    { 
        strikesselectdd.options[strikesselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#strikesselectid").append(strikesselectdd);
    jQuery("#strikesId").change(function(e) {   
        stateVariablesMap['theStrikes'] = jQuery("#strikesId").val();
        saveState(); 
    });

    //create balls drop down
    jQuery("#ballsselectid").empty();
//    jQuery("#ballsselectid").append("Balls: ");
    var ballsselectdd = document.createElement("select");
    ballsselectdd.name = "Balls";
    ballsselectdd.id = "ballsId";
    ballsselectdd.options[ballsselectdd.length] = new Option("Balls: "+stateVariablesMap['theBalls'], stateVariablesMap['theBalls']);
    for (var i=0;i<4;i++)
    { 
        ballsselectdd.options[ballsselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#ballsselectid").append(ballsselectdd);
    jQuery("#ballsId").change(function(e) {    
        stateVariablesMap['theBalls'] = jQuery("#ballsId").val();
        saveState(); 
    });

    //create home team score drop down
    jQuery("#hometeamscoreselectid").empty();
//    jQuery("#hometeamscoreselectid").append("Home Team Score: ");
    var hometeamscoreselectdd = document.createElement("select");
    hometeamscoreselectdd.name = "HomeTeamScore";
    hometeamscoreselectdd.id = "hometeamscoreId";
    hometeamscoreselectdd.options[hometeamscoreselectdd.length] = new Option("Home Team Score: "+stateVariablesMap['theHomeTeamScore'], stateVariablesMap['theHomeTeamScore']);
    for (var i=0;i<40;i++)
    { 
        hometeamscoreselectdd.options[hometeamscoreselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamscoreselectid").append(hometeamscoreselectdd);
    jQuery("#hometeamscoreId").change(function(e) {    
        stateVariablesMap['theHomeTeamScore'] = jQuery("#hometeamscoreId").val();
        saveState(); 
    });

    //create away team score drop down
    jQuery("#awayteamscoreselectid").empty();
//    jQuery("#awayteamscoreselectid").append("Away Team Score: ");
    var awayteamscoreselectdd = document.createElement("select");
    awayteamscoreselectdd.name = "AwayTeamScore";
    awayteamscoreselectdd.id = "awayteamscoreId";
    awayteamscoreselectdd.options[awayteamscoreselectdd.length] = new Option("Away Team Score: "+stateVariablesMap['theAwayTeamScore'], stateVariablesMap['theAwayTeamScore']);
    for (var i=0;i<40;i++)
    { 
        awayteamscoreselectdd.options[awayteamscoreselectdd.length] = new Option(i, i);
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamscoreselectid").append(awayteamscoreselectdd);
    jQuery("#awayteamscoreId").change(function(e) {    
        stateVariablesMap['theAwayTeamScore'] = jQuery("#awayteamscoreId").val();
        saveState();
    });

    //create away teams drop down
    jQuery("#awayteamnameselectid").empty();
//    jQuery("#awayteamnameselectid").append("Away Team: ");
    var awayteamsselectdd = document.createElement("select");
    awayteamsselectdd.name = "AwayTeamName";
    awayteamsselectdd.id = "awayteamnameId";
    awayteamsselectdd.options[awayteamsselectdd.length] = new Option("Away Team: "+stateVariablesMap['theAwayTeamName'], 
                                                                stateVariablesMap['theAwayTeamId']+","+stateVariablesMap['theAwayTeamName']+","+stateVariablesMap['theAwayTeamAbbr']);
    for(var key in teamsMap) 
    {
        if(teamsMap.hasOwnProperty(key)) 
        {
            awayteamsselectdd.options[awayteamsselectdd.length] = new Option(teamsMap[key].theName, 
                                                                        teamsMap[key].theId+","+teamsMap[key].theName+","+teamsMap[key].theTeamAbbr);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#awayteamnameselectid").append(awayteamsselectdd);
    jQuery("#awayteamnameId").change(function(e) {  
        
        var awayTeamInfoArray = jQuery("#awayteamnameId").val().split(",");
        stateVariablesMap['theAwayTeamId'] = awayTeamInfoArray[0]; 
        stateVariablesMap['theAwayTeamName'] = awayTeamInfoArray[1];
        stateVariablesMap['theAwayTeamAbbr'] = awayTeamInfoArray[2];
        
        resetAwayTeamLineup();
        resetField('Home Team');
        saveState();
    });   

    //create home teams drop down
    jQuery("#hometeamnameselectid").empty();
//    jQuery("#hometeamnameselectid").append("Home Team: ");
    var hometeamsselectdd = document.createElement("select");
    hometeamsselectdd.name = "HomeTeamName";
    hometeamsselectdd.id = "hometeamnameId";
    hometeamsselectdd.options[hometeamsselectdd.length] = new Option("Home Team: "+stateVariablesMap['theHomeTeamName'], 
                                                                stateVariablesMap['theHomeTeamId']+","+stateVariablesMap['theHomeTeamName']+","+stateVariablesMap['theHomeTeamAbbr']);
    for(var key in teamsMap) 
    {
        if(teamsMap.hasOwnProperty(key)) 
        {
            hometeamsselectdd.options[hometeamsselectdd.length] = new Option(teamsMap[key].theName, 
                                                                        teamsMap[key].theId+","+teamsMap[key].theName+","+teamsMap[key].theTeamAbbr);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#hometeamnameselectid").append(hometeamsselectdd);
    jQuery("#hometeamnameId").change(function(e) { 
        
        var homeTeamInfoArray = jQuery("#hometeamnameId").val().split(",");
        stateVariablesMap['theHomeTeamId'] = homeTeamInfoArray[0]; 
        stateVariablesMap['theHomeTeamName'] = homeTeamInfoArray[1];
        stateVariablesMap['theHomeTeamAbbr'] = homeTeamInfoArray[2];
        
        resetHomeTeamLineup();
        resetField('Home Team');
        saveState();
    });   

    //create years drop down
    jQuery("#yearselectid").empty();
//    jQuery("#yearselectid").append("Year: ");
    var yearselectdd = document.createElement("select");
    yearselectdd.name = "Year";
    yearselectdd.id = "yearId";
    yearselectdd.options[yearselectdd.length] = new Option("Year: 2009", "2009");

    //Add the dropdown to the parent node
    jQuery("#yearselectid").append(yearselectdd);
    jQuery("#yearId").change(function(e) {         
        stateVariablesMap['theYearToQuery'] = jQuery("#yearId").val();
        saveState();
    });    
    
    //create toporbottomhalf type drop down
    jQuery("#toporbottomhalfselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var toporbottomhalfselectdd = document.createElement("select");
    toporbottomhalfselectdd.name = "toporbottomhalf";
    toporbottomhalfselectdd.id = "toporbottomhalfid";
    toporbottomhalfselectdd.options[toporbottomhalfselectdd.length] = new Option("Top/Bottom Half: "+stateVariablesMap['theTopOrBottomHalf'], stateVariablesMap['theTopOrBottomHalf']);

    var len = toporbottomhalf.length
    for (var i=0; i<len; ++i) 
    {
        if (i in toporbottomhalf) 
        {
            toporbottomhalfselectdd.options[toporbottomhalfselectdd.length] = new Option(toporbottomhalf[i], toporbottomhalf[i]);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#toporbottomhalfselectid").append(toporbottomhalfselectdd);
    jQuery("#toporbottomhalfid").change(function(e) {
        stateVariablesMap['theTopOrBottomHalf'] = jQuery("#toporbottomhalfid").val();
        
        var homeTeamInfoArray = jQuery("#hometeamnameId").val().split(",");
        var awayTeamInfoArray = jQuery("#awayteamnameId").val().split(",");
        
        if(stateVariablesMap['theTopOrBottomHalf']==="TOP")
        {
            stateVariablesMap['thePitcherTeamId'] = homeTeamInfoArray[0];
            stateVariablesMap['thePitcherTeamName'] = homeTeamInfoArray[1];
            stateVariablesMap['thePitcherTeamAbrr'] = homeTeamInfoArray[2];

            stateVariablesMap['theBatterTeamId'] = awayTeamInfoArray[0];
            stateVariablesMap['theBatterTeamName'] = awayTeamInfoArray[1];
            stateVariablesMap['theBatterTeamAbrr'] = awayTeamInfoArray[2];

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
        }
        else
        {
            stateVariablesMap['thePitcherTeamId'] = awayTeamInfoArray[0];
            stateVariablesMap['thePitcherTeamName'] = awayTeamInfoArray[1];
            stateVariablesMap['thePitcherTeamAbrr'] = awayTeamInfoArray[2];

            stateVariablesMap['theBatterTeamId'] = homeTeamInfoArray[0];
            stateVariablesMap['theBatterTeamName'] = homeTeamInfoArray[1];
            stateVariablesMap['theBatterTeamAbrr'] = homeTeamInfoArray[2];

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
        }
        
        saveState(); 
    }); 
}

//function loadScoreBoardRadioButtons()
//{ 
//    jQuery("#toporbottomhalfselectid").empty();
//    jQuery("#toporbottomhalfselectid").append("Top or Bottom Half: ");
//    jQuery("#toporbottomhalfselectid").append('<input id="topradiobutton" type="radio" name="toporbottomhalf" value="TOP">Top');
//    jQuery("#toporbottomhalfselectid").append('<input id="bottomradiobutton" type="radio" name="toporbottomhalf" value="BOTTOM">Bottom');
//
//    if(stateVariablesMap['theTopOrBottomHalf']==="TOP")
//    {
//        jQuery('#topradiobutton').attr('checked',true);
//    }
//    else
//    {
//        jQuery('#bottomradiobutton').attr('checked',true);
//    }
//    
//    jQuery("#topradiobutton").click(function() { 
//        stateVariablesMap['theTopOrBottomHalf'] = "TOP";
//        
//        var homeTeamInfoArray = jQuery("#hometeamnameId").val().split(",");
//        var awayTeamInfoArray = jQuery("#awayteamnameId").val().split(",");
//        
//        stateVariablesMap['thePitcherTeamId'] = homeTeamInfoArray[0];
//        stateVariablesMap['thePitcherTeamName'] = homeTeamInfoArray[1];
//        stateVariablesMap['thePitcherTeamAbrr'] = homeTeamInfoArray[2];
//        
//        stateVariablesMap['theBatterTeamId'] = awayTeamInfoArray[0];
//        stateVariablesMap['theBatterTeamName'] = awayTeamInfoArray[1];
//        stateVariablesMap['theBatterTeamAbrr'] = awayTeamInfoArray[2];
//        
//        var index = stateVariablesMap['theAwayTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val());
//        if ((index + 1) < stateVariablesMap['theAwayTeamBattingOrderBatterIds'].length)
//        {
//            if((!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1].beginsWith("Select", true))) && (!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1] == stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index])))
//            {
//                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index + 1];
//                stateVariablesMap['theBatterOnDeckName'] = awayTeamMap[stateVariablesMap['theBatterOnDeckId']];
//            }
//            else
//            {
//                stateVariablesMap['theBatterOnDeckId'] = '0';
//                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
//            }
//        }
//        else
//        {
//            if((!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0].beginsWith("Select", true))) && (!(stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0] == stateVariablesMap['theAwayTeamBattingOrderBatterIds'][index])))
//            {
//                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theAwayTeamBattingOrderBatterIds'][0];
//                stateVariablesMap['theBatterOnDeckName'] = awayTeamMap[stateVariablesMap['theBatterOnDeckId']];
//            }
//            else
//            {
//                stateVariablesMap['theBatterOnDeckId'] = '0';
//                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
//            }
//        }
//    
//        saveState();
//    });  
//    
//    jQuery("#bottomradiobutton").click(function() { 
//        stateVariablesMap['theTopOrBottomHalf'] = "BOTTOM";
//        
//        var homeTeamInfoArray = jQuery("#hometeamnameId").val().split(",");
//        var awayTeamInfoArray = jQuery("#awayteamnameId").val().split(",");
//        
//        stateVariablesMap['thePitcherTeamId'] = awayTeamInfoArray[0];
//        stateVariablesMap['thePitcherTeamName'] = awayTeamInfoArray[1];
//        stateVariablesMap['thePitcherTeamAbrr'] = awayTeamInfoArray[2];
//        
//        stateVariablesMap['theBatterTeamId'] = homeTeamInfoArray[0];
//        stateVariablesMap['theBatterTeamName'] = homeTeamInfoArray[1];
//        stateVariablesMap['theBatterTeamAbrr'] = homeTeamInfoArray[2];
//        
//        var index = stateVariablesMap['theHomeTeamBattingOrderBatterIds'].indexOf(jQuery("#hitternameId").val());
//        if ((index + 1) < stateVariablesMap['theHomeTeamBattingOrderBatterIds'].length)
//        {
//            if((!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1].beginsWith("Select", true))) && (!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1] == stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index])))
//            {
//                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index + 1];
//                stateVariablesMap['theBatterOnDeckName'] = homeTeamMap[stateVariablesMap['theBatterOnDeckId']];
//            }
//            else
//            {
//                stateVariablesMap['theBatterOnDeckId'] = '0';
//                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
//            }
//        }
//        else
//        {
//            if((!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0].beginsWith("Select", true))) && (!(stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0] == stateVariablesMap['theHomeTeamBattingOrderBatterIds'][index])))
//            {
//                stateVariablesMap['theBatterOnDeckId'] = stateVariablesMap['theHomeTeamBattingOrderBatterIds'][0];
//                stateVariablesMap['theBatterOnDeckName'] = homeTeamMap[stateVariablesMap['theBatterOnDeckId']];
//            }
//            else
//            {
//                stateVariablesMap['theBatterOnDeckId'] = '0';
//                stateVariablesMap['theBatterOnDeckName'] = 'Select Batter';
//            }
//        }
//    
//        saveState();
//    });
//}