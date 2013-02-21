<?php
/*
 * COPYRIGHT    2009 AsTech Development
 *
 *
 * DESRIPTION:  This file...
 *
 * SOFTWARE HISTORY:
 *
 * 06JAN2010    S. Aslan
 *              Initial Coding.
 */
    include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';

    $aStateVariablesObject = new StateVariables();

    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();

    $aStateVariablesObject->update();
?>