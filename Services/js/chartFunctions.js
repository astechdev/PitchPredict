//Load the google Visualization API and the piechart package

//global chart variable for dynamically loading charts of all kinds
//each chart defines its own var data and var options
var chart;

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

