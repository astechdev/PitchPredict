<?php
/*
 * COPYRIGHT    2009 AsTech Development
 *
 *
 * DESRIPTION:  This file is the login for the Pitch Predict web site.
 *
 * SOFTWARE HISTORY:
 *
 *   10FEB09    S. Aslan
 *              Initial Coding.
 */       
    
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PitchPredictUserDbProxy.php';

    $aPitchPredictUserDbProxyObject = new PitchPredictUserDbProxy('pitchpre_jml4');
	
    $userName =  $_REQUEST['UserName'];
    $password =  $_REQUEST['password'];
    
    $result = $aPitchPredictUserDbProxyObject->getUser($userName);
    
    while($row = $aPitchPredictUserDbProxyObject->dbProxyFetchAssocArray($result))
    {
        $index = strpos($row['password'], ":");
        $hash = substr($row['password'], 0, $index);
        $salt = substr($row['password'], ($index + 1), strlen ($row['password']));
//        $passwordVerification = md5($password.$salt);
    }
    
//    echo $passwordVerification;
//    echo "vrs: ".$hash;
//    echo "vrs: ".$salt;
    
    if ( md5($password.$salt) != $hash)
    {
//            echo '{ UserName: false }';
            $json = array("UserName" => "false");
    }
    else
    {
//            echo '{ UserName: ' . $userName . ' }';
            $json = array("UserName" => $userName);
    }
    
    $aPitchPredictUserDbProxyObject->dbProxyClose();
    
    echo json_encode($json);
?>