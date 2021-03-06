<?php
    header("content-type: application/json");

    $data = json_decode(file_get_contents('http://pitchpredict.com/PitchPredict/Services/trackApiUseage.php?ApiKey='.$_REQUEST['ApiKey']));
//    var_dump($data);
    if($data->{'response'} == 'true')
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PlayerDbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Player.php';

        $playersArray = array();

        $aPlayerDbProxyObject = new PlayerDbProxy("pitchpre_pbp_".$_REQUEST['YearToQuery']);

        if (isset($_REQUEST['TeamAbbr']) && isset($_REQUEST['PlayerId']))
        {
            $result = $aPlayerDbProxyObject->getPlayer($_REQUEST['PlayerId'], $_REQUEST['TeamAbbr']);
        }
        else if (isset($_REQUEST['TeamAbbr']))
        {
            $result = $aPlayerDbProxyObject->getPlayersByTeam($_REQUEST['TeamAbbr']);
        }
        else
        {
            $result = $aPlayerDbProxyObject->getPlayers();
        }

        while($row = $aPlayerDbProxyObject->dbProxyFetchAssocArray($result))
        {
            $playersArray[] = new Player($row['eliasid'], $row['team_abbr'], "pitchpre_pbp_".$_REQUEST['YearToQuery']);
        }

        // Wrap and write a JSON-formatted object with a function call, using the supplied value of parm 'callback' in the URL:
        echo $_GET['callback']. '('. json_encode($playersArray) . ')';
    }
?>