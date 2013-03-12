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

function upSwipeEventHandler()
{       
    alert('upSwipeEventHandler');
    var activeNavLink = $(".nav").find('a.active');
    var nextNavLink = activeNavLink.parent().nextOrFirst().find('a');
    
    nextNavLink.click();
}

function downSwipeEventHandler()
{       
    alert('downSwipeEventHandler');
    var activeNavLink = $(".nav").find('a.active');
    var prevNavLink = activeNavLink.parent().prevOrLast().find('a');
    
    prevNavLink.click();    
}


