<?php
    header("content-type: application/json");

    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->retrieveDBStateVariables();
//    $aStateVariablesObject->printStateVariables();
    
    // Wrap and write a JSON-formatted object with a function call, using the supplied value of parm 'callback' in the URL:
    echo $_GET['callback']. '('. json_encode($aStateVariablesObject->expose()) . ')';
?>