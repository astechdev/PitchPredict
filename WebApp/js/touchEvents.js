function rightSwipeEventHandler()
{       
    alert('rightSwipeEventHandler');
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var previousChartTab = $(chartsTabs).find("a.active").prevOrLast();
    
    previousChartTab.click();
}

function leftSwipeEventHandler()
{      
    alert('leftSwipeEventHandler');
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var nextChartTab = $(chartsTabs).find("a.active").nextOrFirst();
    
    nextChartTab.click(); 
}


