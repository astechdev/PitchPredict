<?php
    header("content-type: application/json");

    $data = json_decode(file_get_contents('http://pitchpredict.com/PitchPredict/Services/trackApiUseage.php?ApiKey='.$_REQUEST['ApiKey']));
//    var_dump($data);
    if($data->{'response'} == 'true')
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/TeamDbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Team.php';

        $teamsArray = array();

        $aTeamDbProxyObject = new TeamDbProxy("pitchpre_pbp_".$_REQUEST['YearToQuery']);

        if (isset($_REQUEST['TeamId']))
        {
            $result = $aTeamDbProxyObject->getTeam($_REQUEST['TeamId']);
        }
        else
        {
            $result = $aTeamDbProxyObject->getTeams();
        }

        while($row = $aTeamDbProxyObject->dbProxyFetchAssocArray($result))
        {
            $teamsArray[] = new Team($row['id'], "pitchpre_pbp_".$_REQUEST['YearToQuery']);
        }

        // Wrap and write a JSON-formatted object with a function call, using the supplied value of parm 'callback' in the URL:
        echo $_GET['callback']. '('. json_encode($teamsArray) . ')';
    }
?>
