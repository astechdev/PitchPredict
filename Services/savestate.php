<?php
    header('Access-Control-Allow-Origin: *'); 
    
    include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';

    $aStateVariablesObject = new StateVariables();

    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();

    $aStateVariablesObject->update();
?>