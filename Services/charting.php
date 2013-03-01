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