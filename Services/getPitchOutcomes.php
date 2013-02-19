<?php

    $data = json_decode(file_get_contents('http://pitchpredict.com/PitchPredict/Services/trackApiUseage.php?ApiKey='.$_REQUEST['ApiKey']));
//    var_dump($data);
    if($data->{'response'} == 'true')
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Outcomes.php';

        $outcomesArray = array();

        $aDbProxyObject = new DbProxy("pitchpre_pbp_".$_REQUEST['YearToQuery']);

        $query = "SELECT * FROM outcomes ORDER BY outcome asc";

        $result = $aDbProxyObject->dbProxyQuery($query);

        while($row = $aDbProxyObject->dbProxyFetchAssocArray($result))
        {
            $outcomesArray[] = new Outcomes($row['id'], $row['outcome']);
        }

        echo json_encode($outcomesArray);
    }
?>
