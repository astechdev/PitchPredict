<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class TeamDbProxy extends DbProxy
{ 
    public function getTeam($id)
    { 
        return $this->dbProxyQuery("SELECT * FROM teams WHERE id = '".$id."' ORDER BY name asc");
    } 
    
    public function getTeams()
    { 
        return $this->dbProxyQuery("SELECT * FROM teams ORDER BY name asc");
    } 
}

?>
