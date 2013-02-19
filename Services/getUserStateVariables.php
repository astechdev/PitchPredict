<?php
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->retrieveDBStateVariables();
//    $aStateVariablesObject->printStateVariables();
    
    echo json_encode($aStateVariablesObject->expose());
?>