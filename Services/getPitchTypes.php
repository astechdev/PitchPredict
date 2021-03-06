<?php
    header("content-type: application/json");

    $data = json_decode(file_get_contents('http://pitchpredict.com/PitchPredict/Services/trackApiUseage.php?ApiKey='.$_REQUEST['ApiKey']));
//    var_dump($data);
    if($data->{'response'} == 'true')
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/PitchTypes.php';

        $pitchesArray = array();

        $aDbProxyObject = new DbProxy("pitchpre_pbp_".$_REQUEST['YearToQuery']);

        $query = "SELECT * FROM pitch_types ORDER BY abbreviation asc";

        $result = $aDbProxyObject->dbProxyQuery($query);

        while($row = $aDbProxyObject->dbProxyFetchAssocArray($result))
        {
            $pitchesArray[] = new PitchTypes($row['id'], $row['abbreviation']);
        }

        // Wrap and write a JSON-formatted object with a function call, using the supplied value of parm 'callback' in the URL:
        echo $_GET['callback']. '('. json_encode($pitchesArray) . ')';
    }
?>