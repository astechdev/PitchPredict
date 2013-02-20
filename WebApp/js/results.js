function updatePitchTypePercentageChart()
{
    jQuery('#pitchtypepercentagechartcontainer').empty();
    jQuery("#pitchtypepercentagechartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#pitchtypepercentagechartcontainer").append('<div id="pitchtypepercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PITCHPREDICT&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#pitchtypepercentagechart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });
}

function updateHitChart()
{
    jQuery('#hitchartcontainer').empty();
    jQuery("#hitchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#hitchartcontainer").append('<div id="hitchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=SPRAY&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#hitchart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });
}

function updatePitchChart()
{
    jQuery('#pitchchartcontainer').empty();
    jQuery("#pitchchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#pitchchartcontainer").append('<div id="pitchchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PITCHLOCATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#pitchchart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });
}

function updateVerticalChart()
{
    jQuery('#verticalchartcontainer').empty();
    jQuery("#verticalchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#verticalchartcontainer").append('<div id="vertmovementchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=VERTICALBREAK&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#vertmovementchart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });
    
    jQuery('#sidepitchvirtualizationchartcontainer').empty();
    jQuery("#sidepitchvirtualizationchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#sidepitchvirtualizationchartcontainer").append('<div id="sidepitchvirtualizationchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=SIDEVIEWVIRTUALIZATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#sidepitchvirtualizationchart').load(url, function() {
        jQuery('#ajaxloader').remove();
    }); 
}

function updateHorizontalChart()
{
    jQuery('#horizontalchartcontainer').empty();
    jQuery("#horizontalchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#horizontalchartcontainer").append('<div id="horizmovementchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=HORIZONTALBREAK&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#horizmovementchart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });  
    
    jQuery('#toppitchvirtualizationchartcontainer').empty();
    jQuery("#toppitchvirtualizationchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#toppitchvirtualizationchartcontainer").append('<div id="toppitchvirtualizationchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=BIRDSEYEVIEWVIRTUALIZATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#toppitchvirtualizationchart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });
}

function updateResultsChart()
{
    jQuery('#resultspercentagechartcontainer').empty();
    jQuery("#resultspercentagechartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#resultspercentagechartcontainer").append('<div id="resultspercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PROBABILITY&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#resultspercentagechart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });
}

function updateOutcomePercentageChart()
{
    jQuery('#outcomepercentagechartcontainer').empty();
    jQuery("#outcomepercentagechartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    jQuery("#outcomepercentagechartcontainer").append('<div id="outcomepercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=OUTCOMEPREDICT&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#outcomepercentagechart').load(url, function() {
        jQuery('#ajaxloader').remove();
    });
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

function pitchTypePercentageChartDrillDown(pitchType)
{
    setPitchType(pitchType);

    updateCharts('true');
}

function outcomePercentageChartDrillDown(outcomeType)
{
    setOutcome(outcomeType);

    updateCharts('true');	
}

function updateCharts(updatehotzone)
{
    getParamsString();
//    alertResultsParams();
    
    if(updatehotzone == 'true')
    {
        updateHotZone();
    }
    
    if(currentchart === 'Pitch Type')
    {
        updatePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Outcome')
    {
        updateOutcomePercentageChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeResultsChart();
    }
    else if(currentchart === 'Probability')
    {
        updateResultsChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Pitch Chart')
    {
        updatePitchChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removeVerticalChart();
        removeHorizontalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Vertical')
    {
        updateVerticalChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeHorizontalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Horizontal')
    {
        updateHorizontalChart();
        removePitchTypePercentageChart();
        removeHitChart();
        removePitchChart();
        removeVerticalChart();
        removeResultsChart();
        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Hit Chart')
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

function setCurrentChart(chart)
{       
    currentchart = chart;
    
    updateCharts('false');
}