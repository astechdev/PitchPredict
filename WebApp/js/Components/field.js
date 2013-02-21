function loadField()
{
    loadFieldDropDowns();
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
    jQuery("#runneronfirstselectid").append("Runner on 1st:<br>");
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
    jQuery("#runneronsecondselectid").append("Runner on 2nd:<br>");
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
    jQuery("#runneronthirdselectid").append("Runner on 3rd:<br>");
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
    jQuery("#hitterselectid").append("Batter:<br>");
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
    jQuery("#pitcherselectid").append("Pitcher:<br>");
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
    jQuery("#catcherselectid").append("Catcher:<br>");
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
    jQuery("#hitterrightorleftselectid").append("Batter R/L:<br>");
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
//        loadOnDeckHitterImage();
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
//        loadHitterImage();
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