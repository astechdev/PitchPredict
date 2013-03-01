<?php
    if(strtoupper($_REQUEST['ChartType']) == "SPRAY")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/hitChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "PITCHLOCATION")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/pitchChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "BIRDSEYEVIEWVIRTUALIZATION")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/topPitchVirtualizationChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "SIDEVIEWVIRTUALIZATION")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/sidePitchVirtualizationChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "HORIZONTALBREAK")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/horizMovementChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "VERTICALBREAK")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/vertMovementChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "PITCHPREDICT")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/pitchTypePercentageChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "OUTCOMEPREDICT")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/outcomePercentageChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "PROBABILITY")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Charts/resultsPercentageChart.php';
    }
    else if(strtoupper($_REQUEST['ChartType']) == "HOTZONE")
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/hotzone.php';
    }
?>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29743249-1']);
  _gaq.push(['_setDomainName', 'pitchpredict.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>