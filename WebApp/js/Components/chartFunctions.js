//google Visualization API and the piechart package must be loaded to use these
//functions

//global functions for dynamically redrawing charts of all kinds
function redrawPieChart(chartid, data, options) {

    // Instantiate and draw our chart, passing in some options.
    chart = new google.visualization.PieChart(document.getElementById(chartid));
    chart.draw(data, options);
}

function redrawBarChart(chartid, data, options) {

    // Instantiate and draw our chart, passing in some options.
    chart = new google.visualization.BarChart(document.getElementById(chartid));
    chart.draw(data, options);
}

function redrawColumnChart(chartid, data, options) {

    // Instantiate and draw our chart, passing in some options.
    chart = new google.visualization.ColumnChart(document.getElementById(chartid));
    chart.draw(data, options);
}

function redrawScatterChart(chartid, data, options) {

    // Instantiate and draw our chart, passing in some options.
    chart = new google.visualization.ScatterChart(document.getElementById(chartid));
    chart.draw(data, options);
}

//This function must be defined to prevent errors from displaying while loading 
//the playground charts, but this function must also NOT do anything as this 
//functions functionality is only relavent in the results widget
function selectPitchTypeHandler(e) {
}

//This function must be defined to prevent errors from displaying while loading 
//the playground charts, but this function must also NOT do anything as this 
//functions functionality is only relavent in the results widget
function selectOutcomeHandler(e) {
}

function emptyChartContainers() 
{
    jQuery('#pitchtypepercentagechartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#hitchartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#pitchchartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#verticalchartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#sidepitchvirtualizationchartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#horizontalchartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#toppitchvirtualizationchartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#resultspercentagechartcontainer').hide("slide", { direction: "right" }, 1000);
    jQuery('#outcomepercentagechartcontainer').hide("slide", { direction: "right" }, 1000);
    
//    jQuery('#pitchtypepercentagechartcontainer').empty();
//    jQuery('#hitchartcontainer').empty();
//    jQuery('#pitchchartcontainer').empty();
//    jQuery('#verticalchartcontainer').empty();
//    jQuery('#sidepitchvirtualizationchartcontainer').empty();
//    jQuery('#horizontalchartcontainer').empty();
//    jQuery('#toppitchvirtualizationchartcontainer').empty();
//    jQuery('#resultspercentagechartcontainer').empty();
//    jQuery('#outcomepercentagechartcontainer').empty();
}

function updatePitchTypePercentageChart()
{
//    emptyChartContainers();
    
//    jQuery("#pitchtypepercentagechartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    
       
    jQuery("#pitchtypepercentagechartcontainer").append('<div id="pitchtypepercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PITCHPREDICT&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#pitchtypepercentagechart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#pitchtypepercentagechartcontainer').show("slide", { direction: "right" }, 1000); 
    });
}

function updateHitChart()
{
//    emptyChartContainers();
    
//    jQuery("#hitchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    
    
    jQuery("#hitchartcontainer").append('<div id="hitchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=SPRAY&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#hitchart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#hitchartcontainer').show("slide", { direction: "right" }, 1000);
    });
}

function updatePitchChart()
{
//    emptyChartContainers();
    
//    jQuery("#pitchchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    
    
    jQuery("#pitchchartcontainer").append('<div id="pitchchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PITCHLOCATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#pitchchart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#pitchchartcontainer').show("slide", { direction: "right" }, 1000);
    });
}

function updateVerticalChart()
{
//    emptyChartContainers();
    
//    jQuery("#verticalchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
//    jQuery("#sidepitchvirtualizationchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    
    
        
    
    jQuery("#verticalchartcontainer").append('<div id="vertmovementchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=VERTICALBREAK&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#vertmovementchart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#verticalchartcontainer').show("slide", { direction: "right" }, 1000);
    });
    
    jQuery("#sidepitchvirtualizationchartcontainer").append('<div id="sidepitchvirtualizationchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=SIDEVIEWVIRTUALIZATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#sidepitchvirtualizationchart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#sidepitchvirtualizationchartcontainer').show("slide", { direction: "right" }, 1000);
    }); 
}

function updateHorizontalChart()
{
//    emptyChartContainers();
    
//    jQuery("#horizontalchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
//    jQuery("#toppitchvirtualizationchartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    
    
        
    
    jQuery("#horizontalchartcontainer").append('<div id="horizmovementchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=HORIZONTALBREAK&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#horizmovementchart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#horizontalchartcontainer').show("slide", { direction: "right" }, 1000);
    });  
    
    jQuery("#toppitchvirtualizationchartcontainer").append('<div id="toppitchvirtualizationchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=BIRDSEYEVIEWVIRTUALIZATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#toppitchvirtualizationchart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#toppitchvirtualizationchartcontainer').show("slide", { direction: "right" }, 1000);
    });
}

function updateResultsChart()
{
//    emptyChartContainers();
    
//    jQuery("#resultspercentagechartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    
    jQuery("#resultspercentagechartcontainer").append('<div id="resultspercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PROBABILITY&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#resultspercentagechart').load(url, function() {
//        jQuery('#ajaxloader').remove();
jQuery('#resultspercentagechartcontainer').show("slide", { direction: "right" }, 1000);
    });
}

function updateOutcomePercentageChart()
{
//    emptyChartContainers();
    
//    jQuery("#outcomepercentagechartcontainer").append('<img id=\"ajaxloader\" src="images/ajax-loader.gif">');
    
    jQuery("#outcomepercentagechartcontainer").append('<div id="outcomepercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=OUTCOMEPREDICT&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#outcomepercentagechart').load(url, function() {
//        jQuery('#ajaxloader').remove();
        jQuery('#outcomepercentagechartcontainer').show("slide", { direction: "right" }, 1000);
    });
}

//function removePitchTypePercentageChart()
//{
//    jQuery("#pitchtypepercentagechart").fadeOut("slow").remove();
//}
//
//function removeHitChart()
//{
//    jQuery("#hitchart").fadeOut("slow").remove();
//}
//
//function removePitchChart()
//{
//    jQuery("#pitchchart").fadeOut("slow").remove();
//}
//
//function removeVerticalChart()
//{
//    jQuery("#vertmovementchart").fadeOut("slow").remove();
//    jQuery("#sidepitchvirtualizationchart").fadeOut("slow").remove();
//}
//
//function removeHorizontalChart()
//{
//    jQuery("#toppitchvirtualizationchart").fadeOut("slow").remove();
//    jQuery("#horizmovementchart").fadeOut("slow").remove();
//}
//
//function removeResultsChart()
//{
//    jQuery("#resultspercentagechart").fadeOut("slow").remove();
//}
//
//function removeOutcomePercentageChart()
//{
//    jQuery("#outcomepercentagechart").fadeOut("slow").remove();
//}
//
//function pitchTypePercentageChartDrillDown(pitchType)
//{
//    setPitchType(pitchType);
//
//    updateCharts('true');
//}
//
//function outcomePercentageChartDrillDown(outcomeType)
//{
//    setOutcome(outcomeType);
//
//    updateCharts('true');	
//}

function updateCharts(updatehotzone)
{
    getParamsString();
//    alertResultsParams();
    
    if(updatehotzone == 'true')
    {
        updateHotZone();
    }
    emptyChartContainers();
    if(currentchart === 'Pitch Type')
    {
        updatePitchTypePercentageChart();
//        removeHitChart();
//        removePitchChart();
//        removeVerticalChart();
//        removeHorizontalChart();
//        removeResultsChart();
//        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Outcome')
    {
        updateOutcomePercentageChart();
//        removePitchTypePercentageChart();
//        removeHitChart();
//        removePitchChart();
//        removeVerticalChart();
//        removeHorizontalChart();
//        removeResultsChart();
    }
    else if(currentchart === 'Probability')
    {
        updateResultsChart();
//        removePitchTypePercentageChart();
//        removeHitChart();
//        removePitchChart();
//        removeVerticalChart();
//        removeHorizontalChart();
//        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Pitch Chart')
    {
        updatePitchChart();
//        removePitchTypePercentageChart();
//        removeHitChart();
//        removeVerticalChart();
//        removeHorizontalChart();
//        removeResultsChart();
//        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Vertical')
    {
        updateVerticalChart();
//        removePitchTypePercentageChart();
//        removeHitChart();
//        removePitchChart();
//        removeHorizontalChart();
//        removeResultsChart();
//        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Horizontal')
    {
        updateHorizontalChart();
//        removePitchTypePercentageChart();
//        removeHitChart();
//        removePitchChart();
//        removeVerticalChart();
//        removeResultsChart();
//        removeOutcomePercentageChart();
    }
    else if(currentchart === 'Hit Chart')
    {
        updateHitChart();
//        removePitchTypePercentageChart();
//        removePitchChart();
//        removeVerticalChart();
//        removeHorizontalChart();
//        removeResultsChart();
//        removeOutcomePercentageChart();
    }	
}

function setCurrentChart(chart)
{       
    currentchart = chart;
    
    updateCharts('false');
    
    showAds();
}

