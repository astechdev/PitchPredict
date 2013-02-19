<?php
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();
?>
<!DOCTYPE html>
<html>

<head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
    
	<link type="text/css" href="css/jQueryTools/demo/demo.css"rel="stylesheet" /> 
	<link type="text/css" href="css/results.css" rel="stylesheet"  />
	      
        <!-- Full version of jQuery Tools + jQuery 1.3.2.  This includes all the Tools, 
	     plugins and effects but not the Flowplayer files.  -->
	<script type="text/javascript" src="http://cdn.jquerytools.org/1.1.2/full/jquery.tools.min.js"></script>
        
	<script type="text/javascript">
              
                var resultsparams;
                var currentchart = "Pitch Type";
                var resultsusername = "<?php echo $aStateVariablesObject->theUserName; ?>";
                var resultspitchTypeSequenceArray = new Array(<?php  implode(",", $aStateVariablesObject->thePitchTypeSequence); ?>);
                var resultspitchLocationSequenceArray = new Array(<?php  implode(",", $aStateVariablesObject->thePitchLocationSequence); ?>);
                var resultspitchOutcomeSequenceArray = new Array(<?php  implode(",", $aStateVariablesObject->thePitchOutcomeSequence); ?>);
                var resultsinning = "<?php echo $aStateVariablesObject->theInning; ?>";
                //Acceptable values for the following var: "ANY", "TOP", or "BOTTOM"
                var resultstoporbottomhalf = "<?php echo $aStateVariablesObject->theTopOrBottomHalf; ?>";
                var resultsballs = <?php echo $aStateVariablesObject->theBalls; ?>;
                var resultsstrikes = <?php echo $aStateVariablesObject->theStrikes; ?>;
                var resultsouts = <?php echo $aStateVariablesObject->theOuts; ?>;
                var resultsawayteamname = <?php echo $aStateVariablesObject->theAwayTeamId; ?>;
                var resultsawayteamscore = <?php echo $aStateVariablesObject->theAwayTeamScore; ?>;
                var resultshometeamname = <?php echo $aStateVariablesObject->theHomeTeamId; ?>;
                var resultshometeamscore = <?php echo $aStateVariablesObject->theHomeTeamScore; ?>;
                var resultspitcherteamname = <?php echo $aStateVariablesObject->thePitcherTeamId; ?>;
                var resultspitchername = <?php echo $aStateVariablesObject->thePitcherId; ?>;
                var resultscatchername = <?php echo $aStateVariablesObject->theCatcherId; ?>;
                var resultshitterteamname = <?php echo $aStateVariablesObject->theBatterTeamId; ?>;
                var resultshittername = <?php echo $aStateVariablesObject->theBatterId; ?>;
                var resultshitterrightorleft = "<?php echo $aStateVariablesObject->theBatterRightOrLeft; ?>";
                var resultshitterondeckname = <?php echo $aStateVariablesObject->theBatterOnDeckId; ?>;
                var resultsatbatnumber = "<?php echo $aStateVariablesObject->theAtBatNumber; ?>";
                var resultsyeartoquery = "<?php echo $aStateVariablesObject->theYearToQuery; ?>";
                var resultsrunneronfirst = <?php echo $aStateVariablesObject->theOn1bId; ?>;
                var resultsrunneronsecond = <?php echo $aStateVariablesObject->theOn2bId; ?>;
                var resultsrunneronthird = <?php echo $aStateVariablesObject->theOn3bId; ?>;
                var resultshomeTeamLineupArray = new Array(<?php echo implode(",", $aStateVariablesObject->theHomeTeamBattingOrderBatterIds); ?>);
                var resultsawayTeamLineupArray = new Array(<?php echo implode(",", $aStateVariablesObject->theAwayTeamBattingOrderBatterIds); ?>);
                var pitchtype  = "<?php echo $aStateVariablesObject->thePitchType; ?>";
                var outcometype = "<?php echo $aStateVariablesObject->theOutcomeType; ?>";
                //Acceptable values for the following var's: "ANY", "SIMILAR", or "EXACT"
                var pitchertype  = "<?php echo $aStateVariablesObject->thePitcherType; ?>";
                var catchertype  = "<?php echo $aStateVariablesObject->theCatcherType; ?>";
                var battertype  = "<?php echo $aStateVariablesObject->theBatterType; ?>";
                var batterondecktype = "<?php echo $aStateVariablesObject->theOnDeckBatterType; ?>";
                var baserunnertype = "<?php echo $aStateVariablesObject->theBaseRunnerType; ?>";
                //Acceptable values for the following var's: "PITCHER" or "BATTER"
                var pitcherorbatter = "<?php echo $aStateVariablesObject->thePitcherOrBatter; ?>";
                //Acceptable values for the hotzone var: is any of the following zone* var's'
                var hotzone  = "<?php echo $aStateVariablesObject->theHotZone; ?>";
                var zoneAny = "ANY";
                var zone1 = "ZONE 1";
                var zone2 = "ZONE 2";
                var zone3 = "ZONE 3";
                var zone4 = "ZONE 4";
                var zone5 = "ZONE 5";
                var zone6 = "ZONE 6";
                var zone7 = "ZONE 7";
                var zone8 = "ZONE 8";
                var zone9 = "ZONE 9";
                var zone10 = "ZONE 10";
                var zone11 = "ZONE 11";
                var zone12 = "ZONE 12";
                var zone13 = "ZONE 13";
                var zone14 = "ZONE 14";

                function getResultsParams()
                {
                    resultsparams = "UserName=" + resultsusername+
                    "&Inning=" + resultsinning+
                    "&TopOrBottomHalf=" + resultstoporbottomhalf+
                    "&YearToQuery=" + resultsyeartoquery+
                    "&AtBatNumber=" + resultsatbatnumber+
                    "&Balls=" + resultsballs+
                    "&Strikes=" + resultsstrikes+
                    "&Outs=" + resultsouts+
                    "&AwayTeamId=" + resultsawayteamname+
                    "&AwayTeamScore=" + resultsawayteamscore+
                    "&HomeTeamId=" + resultshometeamname+
                    "&HomeTeamScore=" + resultshometeamscore+
                    "&PitcherTeamId=" + resultspitcherteamname+
                    "&PitcherId=" + resultspitchername+
                    "&CatcherId=" + resultscatchername+
                    "&BatterTeamId=" + resultshitterteamname+
                    "&BatterId=" + resultshittername+
                    "&BatterOnDeckId=" + resultshitterondeckname+
                    "&BatterRightOrLeft=" + resultshitterrightorleft+
                    "&On1BId=" + resultsrunneronfirst+
                    "&On2BId=" + resultsrunneronsecond+
                    "&On3BId=" + resultsrunneronthird+			
                    "&HomeTeamBattingOrderBatterIds=" +  resultshomeTeamLineupArray.toString()+ 	
                    "&AwayTeamBattingOrderBatterIds=" +  resultsawayTeamLineupArray.toString()+ 	
                    "&PitchType=" +  pitchtype+ 	
                    "&OutcomeType=" +  outcometype+ 
                    "&PitcherType=" +  pitchertype+ 	
                    "&CatcherType=" +  catchertype+ 	
                    "&BatterType=" +  battertype+ 	
                    "&BatterOnDeckType=" +  batterondecktype+ 	
                    "&BaseRunnerType=" +  baserunnertype+ 	
                    "&PitcherOrBatter=" +  pitcherorbatter+ 	
                    "&HotZone=" +  hotzone+ 
                    "&PitchTypeSequence=" + resultspitchTypeSequenceArray.toString()+
                    "&PitchLocationSequence=" + resultspitchLocationSequenceArray.toString()+
                    "&PitchOutcomeSequence=" + resultspitchOutcomeSequenceArray.toString();
                //    "&OutsRecorded=" + jQuery('#outsRecorded').val();
                //    	
                }

                function alertResultsParams()
                {
                    alert("ResultsParamsString: " + resultsparams);
                }
    
        </script>
        
	<script type="text/javascript" src="js/results.js"></script>
        
        <!--Load the google AJAX API-->
        <script type="text/javascript"
            src='https://www.google.com/jsapi?autoload={"modules":[{"name":"visualization","version":"1","packages":["corechart"]}]}'>
        </script>
        
        <!--Load the google Visualization API and the piechart package-->
        <script type="text/javascript">
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
                
                function selectPitchTypeHandler(e) {
//                    alert("chart selection: "+chart.getSelection()[0].row + ", "+chart.getSelection()[0].column);
//                    alert("data value: "+data.getColumnLabel(chart.getSelection()[0].column));
                    pitchTypePercentageChartDrillDown(data.getColumnLabel(chart.getSelection()[0].column));
                }
                
                function selectOutcomeHandler(e) {
//                    alert("chart selection: "+chart.getSelection()[0].row + ", "+chart.getSelection()[0].column);
//                    alert("data value: "+data.getColumnLabel(chart.getSelection()[0].column));
                    outcomePercentageChartDrillDown(data.getColumnLabel(chart.getSelection()[0].column));
                }
//            });
	</script>
        <script type="text/javascript">
            // perform JavaScript after the document is scriptable.
            jQuery(document).ready(function() 
            {                
                //load the Pitch Type chart initially
                setCurrentChart('Pitch Type');
            });
        </script>
	
</head>
	<body>
            <div id="hotzonecontainer">
                <?php 
                        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Services/Results/hotZone.php';
                ?>
            </div>

            <div id="toolscell">
                    <!-- root element for everything -->
                    <div id="scroll">

                            <!-- scrollable items -->
                            <div id="tools">
                                    <div class="tool">
                                        <div>				
                                                <div id="pitchtypepercentagechartcontainer">
                                                </div>
                                        </div>	
                                    </div>
                                    <div class="tool">
                                        <div>				
                                                <div id="outcomepercentagechartcontainer">
                                                </div>		
                                        </div>				
                                    </div>
                                    <div class="tool">
                                        <div>				
                                                <div id="resultspercentagechartcontainer">
                                                </div>		
                                        </div>				
                                    </div>
                                    <div class="tool">
                                        <div>				
                                                <div id="pitchchartcontainer">
                                                </div>
                                        </div>	
                                    </div>
                                    <div class="tool">
                                        <div>					
                                                <div id="verticalchartcontainer">
                                                </div>
                                        </div>	
                                    </div>
                                    <div class="tool">
                                        <div>					
                                                <div id="horizontalchartcontainer">
                                                </div>
                                        </div>	
                                    </div>
                                    <div class="tool">
                                        <div>					
                                                <div id="chartcontainer">
                                                </div>
                                        </div>	
                                    </div>
                                    <div class="tool">
                                        <div>					
                                                <div id="hitchartcontainer">
                                                </div>
                                        </div>	
                                    </div>

                            </div>

                            <!-- required for IE6/IE7 -->

                            <br clear="all" />

                            <!-- thumbnails -->
                            <div id="indexthumbs" class="indext">

                                    <!-- scrollable navigator root element -->
                                    <div class="navi">

                                            <a onclick="setCurrentChart('Pitch Type');" class="active" title="Pitch Type %'s for given situation">Pitch Type</a>
                                            <a onclick="setCurrentChart('Outcome');"  title="Outcome %'s for given situation">Outcome</a>
                                            <a onclick="setCurrentChart('Probability');"  title="Outcome Probabilities for given situation">Probability</a>
                                            <a onclick="setCurrentChart('Pitch Chart');"  title="Pitch Locations by Pitch Type">Pitch Chart</a>
                                            <a onclick="setCurrentChart('Vertical');"  title="Vertical Pitch Break and Virtualization">Vertical</a>
                                            <a onclick="setCurrentChart('Horizontal');"  title="Horizontal Pitch Break and Virtualization">Horizontal</a>
                                            <a onclick="setCurrentChart('Pitch Velocity');"  title="Pitch Velocities by Pitch Type">Pitch Velocity</a>
                                            <a onclick="setCurrentChart('Hit Chart');"  title="Hit Locations by Pitch Type">Hit Chart</a>

                                    </div>
                            </div>
                    </div>
            </div>

            <!-- activate demo with JavaScript -->
            <script>
                // initialize scrollable and return the programming API
                var api = jQuery("#scroll").scrollable({
                        items: '#tools',
                        size: 1,
                        clickable: false

                // use the navigator plugin
                }).navigator({api: true});
            </script>
	</body>	
</html>