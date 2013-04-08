<?php
    header('Access-Control-Allow-Origin: *'); 
    
    include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
    include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/SavedScenarios.php';

    $aStateVariablesObject = new StateVariables();

    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();

    $aSavedScenariosObject = new SavedScenarios();
    $aSavedScenariosObject->saveScenario($_REQUEST['ScenarioName'], $aStateVariablesObject)
?>