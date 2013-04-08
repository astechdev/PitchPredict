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
//    jQuery('#pitchtypepercentagechartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#hitchartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#pitchchartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#verticalchartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#sidepitchvirtualizationchartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#horizontalchartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#toppitchvirtualizationchartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#resultspercentagechartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    jQuery('#outcomepercentagechartcontainer').hide("slide", {
//        direction: "right"
//    }, 1000);
//    
    jQuery('#pitchtypepercentagechartcontainer').empty();
    jQuery('#hitchartcontainer').empty();
    jQuery('#pitchchartcontainer').empty();
    jQuery('#verticalchartcontainer').empty();
    jQuery('#sidepitchvirtualizationchartcontainer').empty();
    jQuery('#horizontalchartcontainer').empty();
    jQuery('#toppitchvirtualizationchartcontainer').empty();
    jQuery('#resultspercentagechartcontainer').empty();
    jQuery('#outcomepercentagechartcontainer').empty();
}

function updatePitchTypePercentageChart()
{
    jQuery("#pitchtypepercentagechartcontainer").append('<div id="pitchtypepercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PITCHPREDICT&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#pitchtypepercentagechart').load(url, function() {
        jQuery('#pitchtypepercentagechartcontainer').show("slide", {
            direction: "right"
        }, 1000); 
    });
}

function updateHitChart()
{
    jQuery("#hitchartcontainer").append('<div id="hitchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=SPRAY&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#hitchart').load(url, function() {
        jQuery('#hitchartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    });
}

function updatePitchChart()
{
    jQuery("#pitchchartcontainer").append('<div id="pitchchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PITCHLOCATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#pitchchart').load(url, function() {
        jQuery('#pitchchartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    });
}

function updateVerticalChart()
{
    jQuery("#verticalchartcontainer").append('<div id="vertmovementchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=VERTICALBREAK&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#vertmovementchart').load(url, function() {
        jQuery('#verticalchartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    });
    
    jQuery("#sidepitchvirtualizationchartcontainer").append('<div id="sidepitchvirtualizationchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=SIDEVIEWVIRTUALIZATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#sidepitchvirtualizationchart').load(url, function() {
        jQuery('#sidepitchvirtualizationchartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    }); 
}

function updateHorizontalChart()
{
    jQuery("#horizontalchartcontainer").append('<div id="horizmovementchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=HORIZONTALBREAK&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#horizmovementchart').load(url, function() {
        jQuery('#horizontalchartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    });  
    
    jQuery("#toppitchvirtualizationchartcontainer").append('<div id="toppitchvirtualizationchart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=BIRDSEYEVIEWVIRTUALIZATION&ChartWidth='+chartwidth+'&ChartHeight='+chartheight/2+'&'+params; 

    jQuery('#toppitchvirtualizationchart').load(url, function() {
        jQuery('#toppitchvirtualizationchartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    });
}

function updateResultsChart()
{
    jQuery("#resultspercentagechartcontainer").append('<div id="resultspercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=PROBABILITY&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#resultspercentagechart').load(url, function() {
        jQuery('#resultspercentagechartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    });
}

function updateOutcomePercentageChart()
{
    jQuery("#outcomepercentagechartcontainer").append('<div id="outcomepercentagechart"></div>');
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/charting.php?ChartType=OUTCOMEPREDICT&ChartWidth='+chartwidth+'&ChartHeight='+chartheight+'&'+params; 

    jQuery('#outcomepercentagechart').load(url, function() {
        jQuery('#outcomepercentagechartcontainer').show("slide", {
            direction: "right"
        }, 1000);
    });
}

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
    }
    else if(currentchart === 'Outcome')
    {
        updateOutcomePercentageChart();
    }
    else if(currentchart === 'Probability')
    {
        updateResultsChart();
    }
    else if(currentchart === 'Pitch Chart')
    {
        updatePitchChart();
    }
    else if(currentchart === 'Vertical')
    {
        updateVerticalChart();
    }
    else if(currentchart === 'Horizontal')
    {
        updateHorizontalChart();
    }
    else if(currentchart === 'Hit Chart')
    {
        updateHitChart();
    }	
}

function setCurrentChart(chart)
{       
    vibrateFeedback();
    
    currentchart = chart;
    
    updateCharts('false');
    
    if((typeof cordova == 'undefined') && (typeof Cordova == 'undefined'))
    {
        if(user.subscription > 0)
        {
            showAds();
        }
    }
}

