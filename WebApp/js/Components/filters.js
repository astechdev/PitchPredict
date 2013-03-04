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


