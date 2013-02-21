<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class PlayerDbProxy extends DbProxy
{ 
    public function getPlayer($id, $teamAbbr)
    { 
        $query = "SELECT * FROM players WHERE eliasid = '".$id."' AND team_abbr = '$teamAbbr' ORDER BY last asc";
//        echo $query;
        return $this->dbProxyQuery($query);
    } 
    public function getPlayersByTeam($teamAbbr)
    { 
        $query = "SELECT * FROM players WHERE team_abbr = '$teamAbbr' ORDER BY last asc";
//        echo $query;
        return $this->dbProxyQuery($query);
    } 
    public function getPlayers()
    { 
        $query = "SELECT * FROM players LIMIT 250 ORDER BY last asc";
//        echo $query;
        return $this->dbProxyQuery($query);
    } 
}

?>
