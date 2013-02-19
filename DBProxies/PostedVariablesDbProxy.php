<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class PostedVariablesDbProxy extends DbProxy
{ 
    public function getPostedVariables($userName)
    { 
        $query = "SELECT * FROM jml_users WHERE username = '$userName'";
//        echo $query;
        return $this->dbProxyQuery($query);
    }
}

?>
