<?php
    header("content-type: application/json");

    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/SavedScenarios.php';

    $aSavedScenariosObject = new SavedScenarios();
    $aSavedScenariosObject->getSavedScenarios($_REQUEST['UserId']);
//    $aSavedScenariosObject->printStateVariables();
    
    // Wrap and write a JSON-formatted object with a function call, using the supplied value of parm 'callback' in the URL:
    echo $_GET['callback']. '('. json_encode($aSavedScenariosObject->expose()) . ')';
?>