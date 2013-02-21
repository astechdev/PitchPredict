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

        //for testing purposes only
        for ($i=0; $i<20; $i++)
        {
            $start_speed_mph = 93.1;
            $start_speed_fps = $start_speed_mph * (5280/3600);

            $x0=-2.803;
            $y0=50.0;
            $z0=5.118;
            $vx0=9.033;
            $vy0=-136.258;
            $vz0=-3.104;
            $ax0=-15.271;
            $ay0=30.338; 
            $az0=-21.793;
                                        
            for ($t=0; $t<=.4; $t = $t + .025)
            {
                $tmpPitchBreakValueArray[1] = ($y0 - ($start_speed_fps*$t));
                $tmpPitchBreakValueArray[2] = ($az0*$t*$t + $vz0*$t + $z0);
                $tmpPitchBreakArray[] = $tmpPitchBreakValueArray;
            }
        }
        
//        while($pitches_row = $aPitchesDbProxyObject->dbProxyFetchAssocArray($pitches_result))
//        {
//            if($pitches_row['pitch_type'] == $pitch_types_row['abbreviation'])
//            {
//                for ($t=0; $t<=.4; $t = $t + .025)
//                {
//                    $tmpPitchBreakValueArray[1] = ($pitches_row['y0'] - ($pitches_row['start_speed']*(5280/3600)*$t));
//                    $tmpPitchBreakValueArray[2] = ($pitches_row['az']*$t*$t + $pitches_row['vz0']*$t + $pitches_row['z0']);
//                    $tmpPitchBreakArray[] = $tmpPitchBreakValueArray;
//                }
//            }
//        }

        $scatterChartArray[$pitch_types_row['abbreviation']] = $tmpPitchBreakArray;
    } 
?>		
<script type="text/javascript">
    // perform JavaScript after the document is scriptable.
    jQuery(document).ready(function() 
    {   
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
            title: 'Pitch Track Side View',
            colors: ['#000000', '#555555', '#2568a0', '#ea1605'],
            hAxis: {title: 'Distance from Home Plate (ft)', minValue: -10, maxValue: 65},
            vAxis: {title: 'Height (ft)', minValue: 0, maxValue: 7},
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

        redrawScatterChart('sidepitchvirtualizationchart', data, options);
        
        // Every time the table fires the "select" event, it should call your
        // selectPitchTypeHandler() function.
        google.visualization.events.addListener(chart, 'select', selectPitchTypeHandler);
    });
</script>
<div id="sidepitchvirtualizationchart" class="chart"></div>