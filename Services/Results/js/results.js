function updateHotZone()
{
    jQuery("#hotzone").fadeOut("slow");

    jQuery("#hotzone").remove();

    jQuery("#hotzonecontainer").load("http://www.pitchpredict.com/PitchPredict/Services/Results/hotZone.php", resultsparams, function()
    {
            jQuery("#hotzone").fadeIn("slow");
    });
}

function updatePitchTypePercentageChart()
{
    jQuery("#pitchtypepercentagechart").remove();

    jQuery("#pitchtypepercentagechartcontainer")
    .load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/pitchTypePercentageChart.php", resultsparams);
}

function updateHitChart()
{
    jQuery("#hitchart").remove();

    jQuery("#hitchartcontainer")
    .load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/hitChart.php", resultsparams);
}

function updatePitchChart()
{
    jQuery("#pitchchart").remove();

    jQuery("#pitchchartcontainer").append('<div id="pitchchart"></div>')
    .load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/pitchChart.php", resultsparams);
}

function updateVerticalChart()
{
    jQuery("#vertmovementchart").remove();
    jQuery("#sidepitchvirtualizationchart").remove();

    jQuery("#verticalchartcontainer").append('<div id="vertmovementchart"></div>');
    jQuery("#verticalchartcontainer").append('<div id="sidepitchvirtualizationchart"></div>');
    
    jQuery("#vertmovementchart").load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/vertMovementChart.php", resultsparams);
    jQuery("#sidepitchvirtualizationchart").load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/sidePitchVirtualizationChart.php", resultsparams);
    
}

function updateHorizontalChart()
{
    jQuery("#horizmovementchart").remove();
    jQuery("#toppitchvirtualizationchart").remove();

    jQuery("#horizontalchartcontainer").append('<div id="horizmovementchart"></div>');
    jQuery("#horizontalchartcontainer").append('<div id="toppitchvirtualizationchart"></div>');
    
    jQuery("#horizmovementchart").load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/horizMovementChart.php", resultsparams);
    jQuery("#toppitchvirtualizationchart").load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/topPitchVirtualizationChart.php", resultsparams);
}

function updateResultsChart()
{
    jQuery("#resultspercentagechart").remove();

    jQuery("#resultspercentagechartcontainer")
    .load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/resultsPercentageChart.php", resultsparams);
}

function updateOutcomePercentageChart()
{
    jQuery("#outcomepercentagechart").remove();

    jQuery("#outcomepercentagechartcontainer").append('<div id="outcomepercentagechart"></div>')
    .load("http://www.pitchpredict.com/PitchPredict/Services/Results/Charts/outcomePercentageChart.php", resultsparams);
}

function removePitchTypePercentageChart()
{
    jQuery("#pitchtypepercentagechart").fadeOut("slow").remove();
}

function removeHitChart()
{
    jQuery("#hitchart").fadeOut("slow").remove();
}

function removePitchChart()
{
    jQuery("#pitchchart").fadeOut("slow").remove();
}

function removeVerticalChart()
{
    jQuery("#vertmovementchart").fadeOut("slow").remove();
    jQuery("#sidepitchvirtualizationchart").fadeOut("slow").remove();
}

function removeHorizontalChart()
{
    jQuery("#toppitchvirtualizationchart").fadeOut("slow").remove();
    jQuery("#horizmovementchart").fadeOut("slow").remove();
}

function removeResultsChart()
{
    jQuery("#resultspercentagechart").fadeOut("slow").remove();
}

function removeOutcomePercentageChart()
{
    jQuery("#outcomepercentagechart").fadeOut("slow").remove();
}

function resetPitchType()
{
    pitchtype = "ANY";

    updateCharts('true');
}

function resetOutcome()
{
    outcometype = "ANY";

    updateCharts('true');	
}

function setHotzone(hotZone)
{
    hotzone = hotZone;
    
    updateCharts('true');
}

function setPitcherOrBatter(pitcherOrBatter)
{
    pitcherorbatter = pitcherOrBatter;
    
    updateCharts('true');
}

function setInning(inning)
{
    resultsinning = inning;
    
    updateCharts('true');
}

function setAtBatNumber(atbanumber)
{
    resultsatbatnumber = atbanumber;
    
    updateCharts('true');
}

function setTopOrBottomHalf(topOrBottmHalf)
{
    resultstoporbottomhalf = topOrBottmHalf;
    
    updateCharts('true');
}

function setYearToQuery(year)
{
    resultsyeartoquery = year;
    
    updateCharts('true');
}

function setPitcherType(type)
{
    pitchertype = type;
    
    updateCharts('true');
}

function setCatcherType(type)
{
    catchertype = type;
    
    updateCharts('true');
}

function setBatterType(type)
{
    battertype = type;
    
    updateCharts('true');
}

function setBatterOnDeckType(type)
{
    batterondecktype = type;
    
    updateCharts('true');
}

function setBaseRunnerType(type)
{
    baserunnertype = type;
    
    updateCharts('true');
}

function pitchTypePercentageChartDrillDown(pitchType)
{
    pitchtype = pitchType;

    updateCharts('true');
}

function outcomePercentageChartDrillDown(outcomeType)
{
    outcometype = outcomeType;

    updateCharts('true');	
}

function updateCharts(updatehotzone)
{
//    getStateVariables();
    getResultsParams();
//    alertResultsParams();
    
    if(updatehotzone == 'true')
    {
        updateHotZone();
    }
    
    if(currentchart == 'Pitch Type')
    {
        updatePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart == 'Outcome')
    {
        updateOutcomePercentageChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeResultsChart();
    }
    else if(currentchart == 'Probability')
    {
        updateResultsChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart == 'Pitch Chart')
    {
        updatePitchChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart == 'Vertical')
    {
        updateVerticalChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeHorizontalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart == 'Horizontal')
    {
        updateHorizontalChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart == 'Pitch Velocity')
    {
    }
    else if(currentchart == 'Hit Chart')
    {
        updateHitChart();
        removePitchTypePercentageChart();
        removePitchChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }	
}

function setCurrentChart(chartname)
{
    currentchart = chartname;
    
    updateCharts('false');
}

