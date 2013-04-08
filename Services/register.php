<?php
    header('Access-Control-Allow-Origin: *'); 
    header("content-type: application/json");
//    
//    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/UserDbProxy.php';
//
//    $aPitchPredictUserDbProxyObject = new UserDbProxy('pitchpre_jml4');
//	
//    $userName =  $_REQUEST['UserId'];
//    $password =  $_REQUEST['password'];
//    
//    $result = $aPitchPredictUserDbProxyObject->getUser($userName);
//    
//    while($row = $aPitchPredictUserDbProxyObject->dbProxyFetchAssocArray($result))
//    {
//        $index = strpos($row['password'], ":");
//        $hash = substr($row['password'], 0, $index);
//        $salt = substr($row['password'], ($index + 1), strlen ($row['password']));
////        $passwordVerification = md5($password.$salt);
//    }
//    
////    echo $passwordVerification;
////    echo "vrs: ".$hash;
////    echo "vrs: ".$salt;
//    
//    if ( md5($password.$salt) != $hash)
//    {
////            echo '{ UserId: false }';
//            $json = array("UserId" => "false");
//    }
//    else
//    {
////            echo '{ UserId: ' . $userName . ' }';
//            $json = array("UserId" => $userName);
//    }
//    
//    $aPitchPredictUserDbProxyObject->dbProxyClose();
//    
//    echo json_encode($json);


    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/User.php';

    $aUserObject = new User($_REQUEST['id'], $_REQUEST['UserName'], $_REQUEST['email'], 'pitchpre_user_db');
//    $aUserObject->printVariable();
    $json = array("name" => $aUserObject->theUserName, "email" => $aUserObject->theEmail, "id" => $aUserObject->theId);
    
    echo json_encode($json);
?>