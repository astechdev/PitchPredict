<?php	
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/PitchPredict.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PitchTypesDbProxy.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/OutcomesDbProxy.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();
    $aStateVariablesObjectClone = clone $aStateVariablesObject;
    
    $pitchTypesArray = array();
    $pitchTypesPredictionsCountersArray = array();
    $outcomesArray = array();
    $outcomesPredictionsCountersArray = array();
        
    if($aStateVariablesObject->thePitchType === "ANY")
    {
        $aPitchTypesDbProxyObject = new PitchTypesDbProxy('pitchpre_pbp_'.$aStateVariablesObject->theYearToQuery); 
        
        //get pitch types
        $pitch_types_result = $aPitchTypesDbProxyObject->getPitchTypes("ANY");

        while($pitch_types_row = $aPitchTypesDbProxyObject->dbProxyFetchAssocArray($pitch_types_result))
        {
            $pitchTypesArray[] = $pitch_types_row['abbreviation'];
        }
        
        //Set the pitch type to any to get totals
        $aStateVariablesObjectClone->thePitchType = "ANY";
        $anAnyPitchPredictionsCountersObject = new PitchPredict(& $aStateVariablesObjectClone);
        
        for($i=0; $i<count($pitchTypesArray); $i++)
        {
            //set default value to 0
            $pitchTypesPredictionsCountersArray[$pitchTypesArray[$i]] = 0;
//            //for testing purposes only
//            $pitchTypesPredictionsCountersArray[$pitchTypesArray[$i]] = 1;
            
            //Set the pitch type to specific pitch type to get totals for that pitch type
            $aStateVariablesObjectClone->thePitchType = $pitchTypesArray[$i];
            $pitchTypesPredictionsCountersArray[$pitchTypesArray[$i]] = new PitchPredict(& $aStateVariablesObjectClone);
        }
    }
    else 
    {
        $aOutcomesDbProxyObject = new OutcomesDbProxy('pitchpre_pbp_'.$aStateVariablesObject->theYearToQuery);
        
        //get outcomes
        $outcomes_result = $aOutcomesDbProxyObject->getOutcomes("ANY");

        while($outcomes_row = $aOutcomesDbProxyObject->dbProxyFetchAssocArray($outcomes_result))
        {
            $outcomesArray[] = $outcomes_row['outcome'];
        }
        
        //Set the pitch type to any to get totals
        $aStateVariablesObjectClone->theOutcomeType = "ANY";
        $anAnyOutcomePredictionsCountersObject = new PitchPredict(& $aStateVariablesObjectClone);
        
        for($i=0; $i<count($outcomesArray); $i++)
        {
            //set default value to 0
            $outcomesPredictionsCountersArray[$outcomesArray[$i]] = 0;
//            //for testing purposes only
//            $outcomesPredictionsCountersArray[$outcomesArray[$i]] = 1;
            
            //Set the pitch type to specific pitch type to get totals for that pitch type
            $aStateVariablesObjectClone->theOutcomeType = $outcomesArray[$i];
            $outcomesPredictionsCountersArray[$outcomesArray[$i]] = new PitchPredict(& $aStateVariablesObjectClone);
        }        
    } 
?>
<div id="pitchtypepercentagechart" class="chart"></div>
<script type="text/javascript">
        // Create and populate the data table.
        data = new google.visualization.arrayToDataTable([

        <?php
            if($aStateVariablesObject->thePitchType === "ANY")
            {
                print "['Pitch', '";

                print implode("', '", $pitchTypesArray);

                print "'],";

                print "['',";

                $counter = 0;
                foreach($pitchTypesPredictionsCountersArray as $key => $pitchPredictObject)
                {
                    print (($pitchPredictObject->theTotal/$anAnyPitchPredictionsCountersObject->theTotal)*100);
//                    //for testing purposes only
//                    print ((1/9)*100);

                    if($counter < (count($pitchTypesPredictionsCountersArray) - 1))
                    {
                        print ", ";
                    }

                    $counter = $counter + 1;
                }

                print "]";
            }
            else
            {
                print "['Outcome', '";

                print implode("', '", $outcomesArray);

                print "'],";

                print "['',";

                $counter = 0;
                foreach($outcomesPredictionsCountersArray as $key => $pitchPredictObject)
                {
                    print (($pitchPredictObject->theTotal/$anAnyOutcomePredictionsCountersObject->theTotal)*100);
//                    //for testing purposes only
//                    print ((1/14)*100);

                    if($counter < (count($outcomesPredictionsCountersArray) - 1))
                    {
                        print ", ";
                    }

                    $counter = $counter + 1;
                }

                print "]";
            }
        ?>
                    
        ]);
        
        <?php
            if($aStateVariablesObject->thePitchType === "ANY")
            {
                print "options = {title: 'Pitch Prediction Chart',
                                    colors: ['#000000', '#555555', '#2568a0', '#ea1605'],
                                    vAxis: {title: '%', 
                                            viewWindowMode:'explicit',
                                            viewWindow:{
                                              max:100,
                                              min:0
                                            }},
                                    backgroundColor: 'transparent',";
                                    
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
                                    
                                    print "};";
            }
            else
            {
                print "options = {title: 'Outcome Prediction Chart For Selected Pitch',
                                    colors: ['#000000', '#555555', '#2568a0', '#ea1605'],
                                    vAxis: {title: '%', 
                                            viewWindowMode:'explicit',
                                            viewWindow:{
                                              max:100,
                                              min:0
                                            }},
                                    backgroundColor: 'transparent',";
                                    
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
                                    
                                    print "};";
            }
        ?>
                
        redrawColumnChart('pitchtypepercentagechart', data, options);
        
        
        <?php
            if($aStateVariablesObject->thePitchType === "ANY")
            {
//                // Every time the table fires the "select" event, it should call your
//                // selectPitchTypeHandler() function.
//                print "google.visualization.events.addListener(chart, 'select', selectPitchTypeHandler);";
            }
            else
            {
//                // Every time the table fires the "select" event, it should call your
//                // selectOutcomeHandler() function.
//                print "google.visualization.events.addListener(chart, 'select', selectOutcomeHandler);";
            }
        ?>
</script>