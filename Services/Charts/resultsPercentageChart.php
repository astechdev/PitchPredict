<?php	
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/PitchPredict.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();
    
    $aPredictionsCountersObject = new PitchPredict(& $aStateVariablesObject);
?>		
<script type="text/javascript">
    // perform JavaScript after the document is scriptable.
    jQuery(document).ready(function() 
    {   
        // Create and populate the data table.
        data = new google.visualization.arrayToDataTable([

        <?php
            print "['Outcome', 'Success', 'Failure'], ";
            
            print "['Overall', ".($aPredictionsCountersObject->theSuccess/$aPredictionsCountersObject->theTotal*100).",".($aPredictionsCountersObject->theFailure/$aPredictionsCountersObject->theTotal*100)." ], ";
            
            print "['Groundball', ".($aPredictionsCountersObject->theGroundballSuccess/$aPredictionsCountersObject->theTotal*100).",".($aPredictionsCountersObject->theGroundballFailure/$aPredictionsCountersObject->theTotal*100)." ], ";
            
            print "['Flyball', ".($aPredictionsCountersObject->theFlyballSuccess/$aPredictionsCountersObject->theTotal*100).",".($aPredictionsCountersObject->theFlyballFailure/$aPredictionsCountersObject->theTotal*100)." ], ";
            
            print "['Strike/Ball', ".($aPredictionsCountersObject->theStrike/$aPredictionsCountersObject->theTotal*100).",".($aPredictionsCountersObject->theBall/$aPredictionsCountersObject->theTotal*100)." ], ";
        ?>
                    
        ]);
        
       options = {title: 'Probability Chart',
                    colors: ['#000000', '#555555', '#2568a0', '#ea1605'],
                    vAxis: {title: '%'},
                    backgroundColor: 'transparent',
                    <?php
                        if(isset($_REQUEST['ChartWidth']))
                        {
                            print "'width':".$_REQUEST['ChartWidth'].",";
                        }
                        else 
                        {
                            print "'width':400,";
                        }
                        if(isset($_REQUEST['ChartHeight']))
                        {
                            print "'height':".$_REQUEST['ChartHeight']."";
                        }
                        else 
                        {
                            print "'height':400";
                        }
                    ?>
                };
                
        redrawColumnChart('resultspercentagechart', data, options);
    });
</script>	
<div id="resultspercentagechart" class="chart"></div>