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

    include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Util/Database/config.php';
    $connection = mysql_connect($databaseHost, $databaseUserName, $databasePassword) or die('Error connecting to mysql: '.mysql_error());
    mysql_select_db($databaseName);    
    
    //get pitch types
    $pitch_types_query = $aPitchTypesDbProxyObject->getPitchesTypesQueryString($aStateVariablesObject->thePitchType);
    $pitch_types_result = mysql_query($pitch_types_query, $connection);
    $num_pitch_types = mysql_num_rows($pitch_types_result);

    while($pitch_types_row = mysql_fetch_array($pitch_types_result))
    {

        $pitches_query = $aPitchesDbProxyObject->getPitchesQueryString($aStateVariablesObject);

//        echo "pitches_query: $pitches_query";

        $pitches_result = mysql_query($pitches_query, $connection);
        
        $tmpPitchLocationArray = array();
        $tmpPitchLocationValueArray = array();

        //for testing purposes only
//        for ($i=0; $i<20; $i++)
//        {
//            $x = mt_rand (-3*10, 3*10) / 10;
//            $y = mt_rand (0*10, 6*10) / 10;
//            $tmpPitchLocationValueArray[1] = $x;
//            $tmpPitchLocationValueArray[2] = $y;
//            $tmpPitchLocationArray[] = $tmpPitchLocationValueArray;
//        }

        while($pitches_row = mysql_fetch_array($pitches_result))
        {
            $tmpPitchLocationValueArray[1] = $pitches_row['px'];
            $tmpPitchLocationValueArray[2] = $pitches_row['py'];
            $tmpPitchLocationArray[] = $tmpPitchLocationValueArray;
        }

        $scatterChartArray[$pitch_types_row['abbreviation']] = $tmpPitchLocationArray;
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
            title: 'Pitch Location Chart',
            colors: ['#000000', '#555555', '#2568a0', '#ea1605'],
            hAxis: {title: 'X', minValue: -3, maxValue: 3},
            vAxis: {title: 'Y', minValue: 0, maxValue: 6},
            'width':622,
            'height':432
        };

        redrawScatterChart('pitchchart', data, options);
        
        // Every time the table fires the "select" event, it should call your
        // selectPitchTypeHandler() function.
        google.visualization.events.addListener(chart, 'select', selectPitchTypeHandler);
    });
</script>	
<div id="pitchchart" class="chart"></div>