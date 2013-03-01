<?php	
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PitchesDbProxy.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PitchTypesDbProxy.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();
    
    $aPitchesDbProxyObject = new PitchesDbProxy('pitchpre_pbp_'.$aStateVariablesObject->theYearToQuery); 
    
    $aPitchTypesDbProxyObject = new PitchTypesDbProxy('pitchpre_pbp_'.$aStateVariablesObject->theYearToQuery); 
    
    $scatterChartArray = array();
    $num_pitch_types = 0;
    
    //get pitch types
    $pitch_types_result = $aPitchTypesDbProxyObject->getPitchTypes($aStateVariablesObject->thePitchType);
    $num_pitch_types = $aPitchTypesDbProxyObject->dbProxyNumResults($pitch_types_result);
    
    $pitches_result = $aPitchesDbProxyObject->getPitches($aStateVariablesObject);
    
    while($pitch_types_row = $aPitchTypesDbProxyObject->dbProxyFetchAssocArray($pitch_types_result))
    {
        $tmpPitchBreakArray = array();
        $tmpPitchBreakValueArray = array();

//        //for testing purposes only
//        for ($i=0; $i<20; $i++)
//        {
//            $x = mt_rand (-20*10, 20*10) / 10;
//            $y = mt_rand (50*10, 100*10) / 10;
//            $tmpPitchBreakValueArray[1] = $y;
//            $tmpPitchBreakValueArray[2] = $x;
//            $tmpPitchBreakArray[] = $tmpPitchBreakValueArray;
//        }
        
        while($pitches_row = $aPitchesDbProxyObject->dbProxyFetchAssocArray($pitches_result))
        {
            if($pitches_row['pitch_type'] == $pitch_types_row['abbreviation'])
            {
                $tmpPitchBreakValueArray[1] = $pitches_row['start_speed'];
                $tmpPitchBreakValueArray[2] = $pitches_row['pfx_z'];
                $tmpPitchBreakArray[] = $tmpPitchBreakValueArray;
            }
        }

        $scatterChartArray[$pitch_types_row['abbreviation']] = $tmpPitchBreakArray;
    }
?>
<div id="vertmovementchart" class="chart"></div>		
<script type="text/javascript">
        // Create and populate the data table.
        data = new google.visualization.DataTable();
        data.addColumn('number', 'X');

        <?php
            foreach($scatterChartArray as $pitchType => $hitLocationArray)
            {
                print "data.addColumn('number', '".$pitchType."');";
            }
            
            $nullCounter = 0;

            foreach($scatterChartArray as $hitLocationArray)
            {                
                foreach($hitLocationArray as $value)
                {
                    print "data.addRow([".$value[1].", ";
                    
                    for($i=0; $i<$nullCounter; $i++)
                    {
                        print "null, ";
                    }
                    
                    print $value[2];
                    
                    for($i=0; $i<($num_pitch_types - $nullCounter - 1); $i++)
                    {
                        print ", null";
                    }
                    
                    print "]);";
                }
                    
                $nullCounter = $nullCounter + 1;
            }
        ?>

        options = {
            title: 'Vertical Break',
            colors: ['#000000', '#555555', '#2568a0', '#ea1605'],
            hAxis: {title: 'MPH', minValue: 50, maxValue: 110},
            vAxis: {title: 'Vertical Break (ft)', minValue: -20, maxValue: 20},
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
                    print "'height':200";
                }
            ?>
        };

        redrawScatterChart('vertmovementchart', data, options);
        
//        // Every time the table fires the "select" event, it should call your
//        // selectPitchTypeHandler() function.
//        google.visualization.events.addListener(chart, 'select', selectPitchTypeHandler);
</script>