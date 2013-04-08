<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class PostedVariablesDbProxy extends DbProxy
{ 
    public function getPostedVariables($userId)
    { 
        $query = "SELECT * FROM jml_users WHERE id = '$userId'";
//        echo $query;
        return $this->dbProxyQuery($query);
    }
    
    public function updatePostedVariables($stateVariablesObject)
    { 
        $update = "UPDATE jml_users SET " .
                    "current_posted_variables = '".json_encode( (array)$stateVariablesObject )."' " .
                    "WHERE id = '$stateVariablesObject->theUserId'";
                            
//        echo $update;
        return $this->dbProxyQuery($update);
    }
}

?>
