function rightSwipeEventHandler()
{
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var chartsDiv = $(chartsWrapper).find(".inner");
    var nextChartDiv = $(chartsDiv).find("div.animate-in").prevOrLast();
    var nextNavLink = $(chartsTabs).find("[data-chart='"+nextChartDiv.attr("data-chart")+"']");
    nextNavLink.click(); 
    
    var activeNavLink = $(".nav").find('a.active');

    //    activeNavLink.removeClass("active");
    //    nextNavLink.addClass("active");
    
    dashboard.loadView(activeNavLink.attr("data-view"), nextChartDiv.attr("data-chart"));
    window.location.href = "#/" + activeNavLink.attr("data-view") + "/" + nextChartDiv.attr("data-chart");
}

function leftSwipeEventHandler()
{  
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var chartsDiv = $(chartsWrapper).find(".inner");
    var nextChartDiv = $(chartsDiv).find("div.animate-in").nextOrFirst();
    var nextNavLink = $(chartsTabs).find("[data-chart='"+nextChartDiv.attr("data-chart")+"']");
    nextNavLink.click(); 
    
    var activeNavLink = $(".nav").find('a.active');

    //    activeNavLink.removeClass("active");
    //    nextNavLink.addClass("active");
    
    dashboard.loadView(activeNavLink.attr("data-view"), nextChartDiv.attr("data-chart"));
    window.location.href = "#/" + activeNavLink.attr("data-view") + "/" + nextChartDiv.attr("data-chart");
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


