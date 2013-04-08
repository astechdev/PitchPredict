<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class SavedScenariosDbProxy extends DbProxy
{ 
    public function getSavedScenarios($userId)
    { 
        $query = "SELECT * FROM saved_scenarios WHERE id = '$userId'";
//        echo $query;
        return $this->dbProxyQuery($query);
    }
    
    public function saveScenario($scenarioName, $stateVariablesObject)
    { 
        $insert = "INSERT INTO saved_scenarios " .
                    "(id, name, state_variables, date) " .
                    "VALUES ('$stateVariablesObject->theUserId', '$scenarioName', " .
                    "'".json_encode( (array)$stateVariablesObject )."', NOW())";                   
//        echo $insert;
        return $this->dbProxyQuery($insert);
    }
}
?>
