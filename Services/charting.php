<html xmlns="http://www.w3.org/1999/xhtml" lang="en_US" xml:lang="en_US">

<head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
    <style type="text/css">        
    #pitchchart {
        opacity: 1 !important;
    }       
    #hitchart {
        opacity: 1 !important;
    }       
    #pitchtypepercentagechart {
        opacity: 1 !important;
    }       
    #verticalchart {
        opacity: 1 !important;
    }       
    #horizontalchart {
        opacity: 1 !important;
    }       
    #resultspercentagechart {
        opacity: 1 !important;
    }       
    #outcomepercentagechart {
        opacity: 1 !important;
    }       
    #pitchtypepercentagechart {
        opacity: 1 !important;
    }   
</style>
        <body>
            <?php
                if(strtoupper($_REQUEST['ChartType']) != "HOTZONE")
                {
                    ?>
<!--                    !!!!Must require users have their own:
                            1)jQuery library loaded
                            2)google AJAX API loaded
                            3)load a copy of PP chartFunctions.js
                        as loading these libs everytime causes potential conflicts with other libs in users app.

                        We must also provde http://www.pitchpredict.com/PitchPredict/Services/js/chartFunctions.js!!!!

                        Full version of jQuery !!!!Must require users have their own jQuery library loaded as loading this lib everytime causes conflicts
                        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" type="text/javascript"></script>
                        
                        Load the google AJAX API
                        <script type="text/javascript" src='https://www.google.com/jsapi?autoload={"modules":[{"name":"visualization","version":"1","packages":["corechart"]}]}'></script>

                        Load the google Visualization API and the piechart package
                        <script type="text/javascript" src="http://www.pitchpredict.com/PitchPredict/Services/js/chartFunctions.js"></script>-->
                    <?php
                }
            
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
	</body>	
</html>