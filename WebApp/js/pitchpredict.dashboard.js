var dashboard = dashboard || {};
(function(ui) {

  dashboard.init = function(tagName, view) {
    this.events();
    this.dimensions();
    this.loadroutes();
  }

  dashboard.events = function() {

  }

  dashboard.loadView = function(view, chart) {
      
    //set current chart in view
    if(chart == "chart1")
    {
        currentchart = 'Pitch Type';
    }
    else if(chart == 'chart2')
    {
        currentchart = 'Outcome';
    }
    else if(chart == 'chart3')
    {
        currentchart = 'Probability';
    }
    else if(chart == 'chart4')
    {
        currentchart = 'Pitch Chart';
    }
    else if(chart == 'chart5')
    {
        currentchart = 'Vertical';
    }
    else if(chart == 'chart6')
    {
        currentchart = 'Horizontal';
    }
    else if(chart == 'chart7')
    {
        currentchart = 'Hit Chart';
    }

    var dashboard = $("#dashboard");
    var active = $(dashboard).find(".view.animate-in");
    var next = $(dashboard).find(".view[data-view='" + view + "']");

    //loading the views
    $(active).removeClass("animate-in");
    $(next).addClass("animate-in");
    
    //update the main menu
    $(dashboard).find(".nav a.active").removeClass("active");
    $(dashboard).find(".nav a[data-view='" + view + "']").addClass("active");

    //set the correct chart
    var chartsWrapper = $(".charts");
    var chartsTabs = $(chartsWrapper).find(".tabs");
    var activeChartTab = $(chartsTabs).find("a.active");
    var nextChartTab = $(chartsTabs).find("a[data-chart='" + chart + "']");
    var activeChart = $(chartsWrapper).find(".chart.animate-in");
    var nextChart = $(".chart[data-chart='" + chart + "']");

    $(activeChartTab).removeClass("active");
    $(nextChartTab).addClass("active");

    $(activeChart).removeClass("animate-in");
    $(nextChart).addClass("animate-in");

    //set the urls appropriately for the chart tabs
    $(".charts .tabs a").each(function(i) {
      $(this).attr("href", "#/" + view + "/" + $(this).attr("data-chart"));
    });

    //set the urls for the nav options
    $(dashboard).find(".nav a").each(function(i) {
      $(this).attr("href", "#/" + $(this).attr("data-view") + "/" + chart);
    });

  }

  dashboard.dimensions = function() {
    var tabs = $(".tabs");

    $(tabs).each(function(i) {
      var space = $(this).width();
      var count = $(this).find("a").size();

      var width = space / count;
      $(this).find("a").width(width);
    });
  }

  dashboard.loadroutes = function() {
    var app = $.sammy('body', function() {

//emptyChartContainers();
      //disable push-states for android
      this.disable_push_state = true;
      
      //root path
      this.get('#/', function(context) {
        dashboard.loadView($("#dashboard .nav a:first").attr("data-view"), $(".charts .tabs a:first").attr("data-chart"));
      });

      this.get('#/:view/:chart', function(context) {
        dashboard.loadView(this.params['view'], this.params['chart']);
      });


    });

    $(function() {
      app.run('#/');
    });
  }


})(dashboard);

$(window).resize(function() {
  dashboard.dimensions();
});
$(document).ready(function() {
  dashboard.init();
});
