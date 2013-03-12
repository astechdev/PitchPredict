function rightSwipeEventHandler()
{
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var clickNextChart = $(chartsTabs).find("a.active").prevOrLast();
    clickNextChart.trigger('click'); 
    var activeChartTab = $(chartsTabs).find("a.active");
    var nextChartTab = activeChartTab.prevOrLast();
    
    var activeNavLink = $(".nav").find('a.active');
    
    dashboard.loadView(activeNavLink.attr("data-view"), nextChartTab.attr("data-chart"));
    window.location.href = "#/" + activeNavLink.attr("data-view") + "/" + nextChartTab.attr("data-chart");
}

function leftSwipeEventHandler()
{  
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var clickNextChart = $(chartsTabs).find("a.active").nextOrFirst();
    clickNextChart.trigger('click'); 
    var activeChartTab = $(chartsTabs).find("a.active");
    var nextChartTab = activeChartTab.nextOrFirst();
    
    var activeNavLink = $(".nav").find('a.active');
    
    dashboard.loadView(activeNavLink.attr("data-view"), nextChartTab.attr("data-chart"));
    window.location.href = "#/" + activeNavLink.attr("data-view") + "/" + nextChartTab.attr("data-chart");
}

function upSwipeEventHandler()
{
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var activeChartTab = $(chartsTabs).find("a.active");
    var activeNavLink = $(".nav").find('a.active');
    var nextNavLink = activeNavLink.parent().nextOrFirst().find('a');
    
    dashboard.loadView(nextNavLink.attr("data-view"), activeChartTab.attr("data-chart"));
    window.location.href = "#/" + nextNavLink.attr("data-view") + "/" + activeChartTab.attr("data-chart");
}

function downSwipeEventHandler()
{     
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var activeChartTab = $(chartsTabs).find("a.active");
    var activeNavLink = $(".nav").find('a.active');
    var nextNavLink = activeNavLink.parent().prevOrLast().find('a');
    
    dashboard.loadView(nextNavLink.attr("data-view"), activeChartTab.attr("data-chart"));
    window.location.href = "#/" + nextNavLink.attr("data-view") + "/" + activeChartTab.attr("data-chart");
}


