function updateHotZone()
{
    jQuery("#hotzonecontainer").fadeOut("slow");

    jQuery("#hotzonecontainer").empty();
    jQuery("#hotzonecontainer").append('<img id=\"hotzoneajaxloader\" src="images/ajax-loader.gif">');

    jQuery("#hotzonecontainer").load("http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=HOTZONE&", params, function()
    {
        jQuery('#hotzoneajaxloader').fadeOut("slow").remove();
        jQuery("#hotzonecontainer").fadeIn("slow");
    });
}

function loadHotzone()
{
    jQuery('#hotzonecontainer').empty();
    getParamsString();
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=HOTZONE&'+params; 

    jQuery('#hotzonecontainer').load(url);
}

function setHotzone(hotZone)
{
    stateVariablesMap['theHotZone'] = hotZone;
    
    updateCharts('true');
}

function setPitchType(pitchType)
{
    stateVariablesMap['thePitchType'] = pitchType;

    updateCharts('true');
}

function setOutcome(outcomeType)
{
    stateVariablesMap['theOutcomeType'] = outcomeType;

    updateCharts('true');	
}

function resetPitchType()
{
    stateVariablesMap['thePitchType'] = "ANY";

    updateCharts('true');
}

function resetOutcome()
{
    stateVariablesMap['theOutcomeType'] = "ANY";

    updateCharts('true');	
}