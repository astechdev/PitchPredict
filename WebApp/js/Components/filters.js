function loadFilters()
{
    loadFiltersRadioButtons();
    loadFiltersDropDowns();
}

function loadFiltersDropDowns()
{   
    //create filters pitch types drop down
    jQuery("#filterspitchtypeselectid").empty();
//    jQuery("#filterspitchtypeselectid").append("Pitch Type:");
    var pitchtypeselectdd = document.createElement("select");
    pitchtypeselectdd.name = "FiltersPitchType";
    pitchtypeselectdd.id = "filterspitchtypeId";
    pitchtypeselectdd.options[pitchtypeselectdd.length] = new Option("Pitch Type: "+stateVariablesMap['thePitchType'], stateVariablesMap['thePitchType']);
    pitchtypeselectdd.options[pitchtypeselectdd.length] = new Option("ANY", "Any");
    for(var key in pitchTypesMap) 
    {
        if(pitchTypesMap.hasOwnProperty(key)) 
        {
            pitchtypeselectdd.options[pitchtypeselectdd.length] = new Option(pitchTypesMap[key].theAbbr, pitchTypesMap[key].theAbbr);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#filterspitchtypeselectid").append(pitchtypeselectdd);    
    
    jQuery("#filterspitchtypeId").change(function(e) {  
        stateVariablesMap['thePitchType'] = jQuery("#filterspitchtypeId").val();  
//        stateVariablesMap['theOn1bName'] = jQuery("#runneronfirstId[value="+stateVariablesMap['theOn1bId']+"]").text(); 
        saveState(); 
    });

    //create outcome drop down
    jQuery("#filterspitchoutcomeselectid").empty();
//    jQuery("#filterspitchoutcomeselectid").append("Outcome:");
    var pitchoutcomeselectdd = document.createElement("select");
    pitchoutcomeselectdd.name = "FiltersPitchOutcome";
    pitchoutcomeselectdd.id = "filterspitchoutcomeId";
    pitchoutcomeselectdd.options[pitchoutcomeselectdd.length] = new Option("Outcome: "+stateVariablesMap['theOutcomeType'], stateVariablesMap['theOutcomeType']);
    pitchoutcomeselectdd.options[pitchoutcomeselectdd.length] = new Option("ANY", "Any");
    for(var key in pitchOutcomesMap) 
    {
        if(pitchOutcomesMap.hasOwnProperty(key)) 
        {
            pitchoutcomeselectdd.options[pitchoutcomeselectdd.length] = new Option(pitchOutcomesMap[key].theOutcome, pitchOutcomesMap[key].theOutcome);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#filterspitchoutcomeselectid").append(pitchoutcomeselectdd);  
    
    jQuery("#filterspitchoutcomeId").change(function(e) {  
        stateVariablesMap['theOutcomeType'] = jQuery("#filterspitchoutcomeId").val();  
//        stateVariablesMap['theOn1bName'] = jQuery("#runneronfirstId[value="+stateVariablesMap['theOn1bId']+"]").text(); 
        saveState(); 
    });    
    
    //create pitcher or batter drop down
    jQuery("#pitcherbatterselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var pitcherbatterselectdd = document.createElement("select");
    pitcherbatterselectdd.name = "pitcherorbatter";
    pitcherbatterselectdd.id = "pitcherorbatterid";
    pitcherbatterselectdd.options[pitcherbatterselectdd.length] = new Option("Pitcher/Batter: "+stateVariablesMap['thePitcherOrBatter'], stateVariablesMap['thePitcherOrBatter']);

    var len = pitcherorbatter.length
    for (var i=0; i<len; ++i) 
    {
        if (i in pitcherorbatter) 
        {
            pitcherbatterselectdd.options[pitcherbatterselectdd.length] = new Option(pitcherorbatter[i], pitcherorbatter[i]);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitcherbatterselectid").append(pitcherbatterselectdd);
    jQuery("#pitcherorbatterid").change(function(e) {
        stateVariablesMap['thePitcherOrBatter'] = jQuery("#pitcherorbatterid").val();
        saveState(); 
    });
    
    //create pitcher type drop down
    jQuery("#pitchertypeselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var pitchertypeselectdd = document.createElement("select");
    pitchertypeselectdd.name = "pitchertype";
    pitchertypeselectdd.id = "pitchertypeid";
    pitchertypeselectdd.options[pitchertypeselectdd.length] = new Option("Pitcher Type: "+stateVariablesMap['thePitcherType'], stateVariablesMap['thePitcherType']);

    var len = pitchertype.length
    for (var i=0; i<len; ++i) 
    {
        if (i in pitchertype) 
        {
            pitchertypeselectdd.options[pitchertypeselectdd.length] = new Option(pitchertype[i], pitchertype[i]);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchertypeselectid").append(pitchertypeselectdd);
    jQuery("#pitchertypeid").change(function(e) {
        stateVariablesMap['thePitcherType'] = jQuery("#pitchertypeid").val();
        saveState(); 
    });
    
    //create catcher type drop down
    jQuery("#catchertypeselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var catchertypeselectdd = document.createElement("select");
    catchertypeselectdd.name = "catchertype";
    catchertypeselectdd.id = "catchertypeid";
    catchertypeselectdd.options[catchertypeselectdd.length] = new Option("Catcher Type: "+stateVariablesMap['theCatcherType'], stateVariablesMap['theCatcherType']);

    var len = catchertype.length
    for (var i=0; i<len; ++i) 
    {
        if (i in catchertype) 
        {
            catchertypeselectdd.options[catchertypeselectdd.length] = new Option(catchertype[i], catchertype[i]);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#catchertypeselectid").append(catchertypeselectdd);
    jQuery("#catchertypeid").change(function(e) {
        stateVariablesMap['theCatcherType'] = jQuery("#catchertypeid").val();
        saveState(); 
    });
    
    //create batter type drop down
    jQuery("#battertypeselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var battertypeselectdd = document.createElement("select");
    battertypeselectdd.name = "battertype";
    battertypeselectdd.id = "battertypeid";
    battertypeselectdd.options[battertypeselectdd.length] = new Option("Batter Type: "+stateVariablesMap['theBatterType'], stateVariablesMap['theBatterType']);

    var len = battertype.length
    for (var i=0; i<len; ++i) 
    {
        if (i in battertype) 
        {
            battertypeselectdd.options[battertypeselectdd.length] = new Option(battertype[i], battertype[i]);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#battertypeselectid").append(battertypeselectdd);
    jQuery("#battertypeid").change(function(e) {
        stateVariablesMap['theBatterType'] = jQuery("#battertypeid").val();
        saveState(); 
    });
    
    //create batter on deck type drop down
    jQuery("#batterondecktypeselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var batterondecktypeselectdd = document.createElement("select");
    batterondecktypeselectdd.name = "batterondecktype";
    batterondecktypeselectdd.id = "batterondecktypeid";
    batterondecktypeselectdd.options[batterondecktypeselectdd.length] = new Option("Batter On Deck Type: "+stateVariablesMap['theOnDeckBatterType'], stateVariablesMap['theOnDeckBatterType']);

    var len = batterondecktype.length
    for (var i=0; i<len; ++i) 
    {
        if (i in batterondecktype) 
        {
            batterondecktypeselectdd.options[batterondecktypeselectdd.length] = new Option(batterondecktype[i], batterondecktype[i]);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#batterondecktypeselectid").append(batterondecktypeselectdd);
    jQuery("#batterondecktypeid").change(function(e) {
        stateVariablesMap['theOnDeckBatterType'] = jQuery("#batterondecktypeid").val();
        saveState(); 
    });
    
    //create base runner type drop down
    jQuery("#baserunnertypeselectid").empty();
//    jQuery("#inningselectid").append("Inning #: ");
    var baserunnertypeselectdd = document.createElement("select");
    baserunnertypeselectdd.name = "baserunnertype";
    baserunnertypeselectdd.id = "baserunnertypeid";
    baserunnertypeselectdd.options[baserunnertypeselectdd.length] = new Option("Base Runner Type: "+stateVariablesMap['theBaseRunnerType'], stateVariablesMap['theBaseRunnerType']);

    var len = baserunnertype.length
    for (var i=0; i<len; ++i) 
    {
        if (i in baserunnertype) 
        {
            baserunnertypeselectdd.options[baserunnertypeselectdd.length] = new Option(baserunnertype[i], baserunnertype[i]);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#baserunnertypeselectid").append(baserunnertypeselectdd);
    jQuery("#baserunnertypeid").change(function(e) {
        stateVariablesMap['theBaseRunnerType'] = jQuery("#baserunnertypeid").val();
        saveState(); 
    });    
}

function loadFiltersRadioButtons()
{
    if(stateVariablesMap['thePitcherOrBatter'] === "PITCHER")
    {
        jQuery('#pitcherid').attr('checked',true);
    }
    else
    {
        jQuery('#batterid').attr('checked',true);
    }
    
    if(stateVariablesMap['thePitcherType'] === "ANY")
    {
        jQuery('#pitcheranytypeid').attr('checked',true);
    }
    else if(stateVariablesMap['thePitcherType'] === "EXACT")
    {
        jQuery('#pitcherexacttypeid').attr('checked',true);
    }
    else
    {
        jQuery('#pitchersimilartypeid').attr('checked',true);
    }
    
    if(stateVariablesMap['theCatcherType'] === "ANY")
    {
        jQuery('#catcheranytypeid').attr('checked',true);
    }
    else if(stateVariablesMap['theCatcherType'] === "EXACT")
    {
        jQuery('#catcherexacttypeid').attr('checked',true);
    }
    else
    {
        jQuery('#catchersimilartypeid').attr('checked',true);
    }
    
    if(stateVariablesMap['theBatterType'] === "ANY")
    {
        jQuery('#batteranytypeid').attr('checked',true);
    }
    else if(stateVariablesMap['theBatterType'] === "EXACT")
    {
        jQuery('#batterexacttypeid').attr('checked',true);
    }
    else
    {
        jQuery('#battersimilartypeid').attr('checked',true);
    }
    
    if(stateVariablesMap['theOnDeckBatterType'] === "ANY")
    {
        jQuery('#batterondeckanytypeid').attr('checked',true);
    }
    else if(stateVariablesMap['theOnDeckBatterType'] === "EXACT")
    {
        jQuery('#batterondeckexacttypeid').attr('checked',true);
    }
    else
    {
        jQuery('#batterondecksimilartypeid').attr('checked',true);
    }
    
    if(stateVariablesMap['theBaseRunnerType'] === "ANY")
    {
        jQuery('#baserunneranytypeid').attr('checked',true);
    }
    else if(stateVariablesMap['theBaseRunnerType'] === "EXACT")
    {
        jQuery('#baserunnerexacttypeid').attr('checked',true);
    }
    else
    {
        jQuery('#baserunnersimilartypeid').attr('checked',true);
    }
}

function setPitcherOrBatter(pitcherOrBatter)
{
    stateVariablesMap['thePitcherOrBatter'] = pitcherOrBatter;
    
    updateCharts('true');
}

function setPitcherType(type)
{
    stateVariablesMap['thePitcherType'] = type;
    
    updateCharts('true');
}

function setCatcherType(type)
{
    stateVariablesMap['theCatcherType'] = type;
    
    updateCharts('true');
}

function setBatterType(type)
{
    stateVariablesMap['theBatterType'] = type;
    
    updateCharts('true');
}

function setBatterOnDeckType(type)
{
    stateVariablesMap['theOnDeckBatterType'] = type;
    
    updateCharts('true');
}

function setBaseRunnerType(type)
{
    stateVariablesMap['theBaseRunnerType'] = type;
    
    updateCharts('true');
}


