<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class UserDbProxy extends DbProxy
{ 
//    public function getUser($userName)
//    {
//        $query = "SELECT password FROM jml_users WHERE username = '$userName'";
//        
//        return $this->dbProxyQuery($query);
//    } 
    
    public function getUser($id, $username, $email)
    { 
        $query = "SELECT * FROM jml_users WHERE id = $id AND username = '$username' AND email = '$email'";
//        echo $query;
        return $this->dbProxyQuery($query);
    }
    
    public function updateUserLastVisit($id, $username, $email)
    { 
        $query = "UPDATE jml_users SET lastvisitDate = NOW() WHERE id = '$id' AND username = '$username' AND email = '$email'";
//        echo $query;
        return $this->dbProxyQuery($query);
    } 
    
    public function updateSubscription($id, $email, $subscriptionLevel, $txn_id)
    { 
        $query = "UPDATE jml_users SET subscription_level = '$subscriptionLevel', subscription_start_date = NOW(), txn_id = '$txn_id' WHERE id = '$id' AND email = '$email'";
        echo $query;
        return $this->dbProxyQuery($query);
    } 
    
    public function createUser($id, $username, $email)
    { 
        $initialStateVariables = mysql_real_escape_string('{"theUserName":null,
            "thePassword":null,
            "theAwayTeamId":null,
            "theAwayTeamName":null,
            "theAwayTeamAbbr":null,
            "theAwayTeamScore":"0",
            "theHomeTeamId":null,
            "theHomeTeamName":null,
            "theHomeTeamAbbr":null,
            "theHomeTeamScore":"0",
            "theBalls":"0",
            "theStrikes":"0",
            "theOuts":"0",
            "thePitcherId":null,
            "thePitcherName":null,
            "thePitcherTeamId":null,
            "thePitcherTeamName":null,
            "thePitcherTeamAbbr":null,
            "theCatcherId":null,
            "theCatcherName":null,
            "theBatterId":null,
            "theBatterName":null,
            "theBatterRightOrLeft":"R",
            "theBatterTeamId":null,
            "theBatterTeamName":null,
            "theBatterTeamAbbr":null,
            "theBatterOnDeckId":null,
            "theBatterOnDeckName":null,
            "theOn1bId":"0",
            "theOn1bName":null,
            "theOn2bId":"0",
            "theOn2bName":null,
            "theOn3bId":"0",
            "theOn3bName":null,
            "thePitchTypeSequence":"",
            "thePitchLocationSequence":"",
            "thePitchOutcomeSequence":"",
            "theHomeTeamBattingOrderBatterIds":"0,0,0,0,0,0,0,0,0",
            "theAwayTeamBattingOrderBatterIds":"0,0,0,0,0,0,0,0,0",
            "theInning":"1",
            "theTopOrBottomHalf":"TOP",
            "thePitcherOrBatter":"PITCHER",
            "theBaseRunnerType":"EXACT",
            "thePitcherType":"EXACT",
            "theCatcherType":"EXACT",
            "theBatterType":"EXACT",
            "theOnDeckBatterType":"EXACT",
            "theOutcomeType":"ANY",
            "thePitchType":"ANY",
            "theHotZone":"ANY",
            "theAtBatNumber":"ANY",
            "theYearToQuery":"2009"}');
        
        $query = "INSERT INTO jml_users (id, username, email, registerDate, current_posted_variables, subscription_level, subscription_start_date) VALUES ('$id', '$username', '$email', NOW(), '$initialStateVariables', '0', NOW())";
//        echo $query;
        return $this->dbProxyQuery($query);
    } 
}

?>