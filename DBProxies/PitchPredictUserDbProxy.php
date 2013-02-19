<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class PitchPredictUserDbProxy extends DbProxy
{ 
    public function getUser($userName)
    {
        $query = "SELECT password FROM jml_users WHERE username = '$userName'";
        
        return $this->dbProxyQuery($query);
    } 
}

?>
