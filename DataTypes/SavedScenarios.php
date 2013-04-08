<?php
class SavedScenarios
{ 
    public $theUserId;
    public $theScenarioNamesArray = array();
    public $theStateVariablesArray = array();
    public $theDateArray = array();

    public function __construct()
    {
    }

    public function saveScenario($scenarioName, $stateVariablesObject)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/SavedScenariosDbProxy.php';
        
        $aSavedScenariosDbProxyObject = new SavedScenariosDbProxy('pitchpre_user_db');
        
        $aSavedScenariosDbProxyObject->saveScenario($scenarioName, $stateVariablesObject);
    }

    public function getSavedScenarios($userId)
    {
        $this->theUserId = $userId;
        
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/SavedScenariosDbProxy.php';
        
        $aSavedScenariosDbProxyObject = new SavedScenariosDbProxy('pitchpre_user_db');
        
        $result = $aSavedScenariosDbProxyObject->getSavedScenarios($userId);
        
        while($row = $aSavedScenariosDbProxyObject->dbProxyFetchAssocArray($result))
        {
            $this->theScenarioNamesArray[] = $row['name'];
            $this->theDateArray[] = $row['date'];
//            $this->theStateVariablesArray[] = $row['state_variables'];
            $this->theStateVariablesArray[] = json_decode($row['state_variables']);
        }
    }
    
    public function __destruct()
    {        
    }
    
    public function printStateVariables()
    {
        echo 'User ID: '.$this->theUserId;
        print_r('theScenarioNamesArray: '.$this->theScenarioNamesArray);
        print_r('theStateVariablesArray: '.$this->theStateVariablesArray);
        print_r('theDateArray: '.$this->theDateArray);
    }
    
    public function expose()
    {
        return get_object_vars($this);
    }
}
?>
