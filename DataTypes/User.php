<?php
class User
{
    public $theId;
    public $theUserName;
    public $theEmail;
    public $theRegistrationDate;
    public $theLastVisitDate;
    public $theCurrentPostedVariables;
    public $theSubscriptionLevel;
    public $theSubscriptionStartDate;
    public $theUserDbProxyObject;

    public function __construct($id, $userName, $email, $dbName)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/UserDbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
        
        $this->theUserDbProxyObject = new UserDbProxy($dbName);
        
        if (($id != "") && ($userName != "") && ($email != ""))
        {
            $this->theId = $id;
            $this->theUserName = $userName;
            $this->theEmail = $email;

            $result = $this->theUserDbProxyObject->getUser($this->theId, $this->theUserName, $this->theEmail);
            $numRows = $this->theUserDbProxyObject->dbProxyNumResults($result);

            //Check to see if user exists, if not create
            if($numRows)
            {
                while($row = $this->theUserDbProxyObject->dbProxyFetchAssocArray($result))
                {            
                    $this->theRegistrationDate = $row['registerDate'];
                    $this->theLastVisitDate = $row['lastvisitDate'];
                    $this->theSubscriptionLevel = $row['subscription_level'];
                    $this->theSubscriptionStartDate = $row['subscription_start_date'];
                }
            }
            else
            {
                $this->theUserDbProxyObject->createUser($this->theId, $this->theUserName, $this->theEmail);
            }

            //Update last visit date
            $this->theUserDbProxyObject->updateUserLastVisit($this->theId, $this->theUserName, $this->theEmail);

            //Get user info from DB and initialize User object
            $result = $this->theUserDbProxyObject->getUser($id, $userId, $email);
            $numRows = $this->theUserDbProxyObject->dbProxyNumResults($result);

            if($numRows)
            {
                while($row = $this->theUserDbProxyObject->dbProxyFetchAssocArray($result))
                {            
                    $this->theRegistrationDate = $row['registerDate'];
                    $this->theLastVisitDate = $row['lastvisitDate'];
                    $this->theSubscriptionLevel = $row['subscription_level'];
                    $this->theSubscriptionStartDate = $row['subscription_start_date'];
                }
            }            
        }
        
        $this->theCurrentPostedVariables = new StateVariables($this->theUserName);
    }
    
    public function __destruct()
    {  
        $this->theUserDbProxyObject->dbProxyClose(); 
    }              

    public function printVariable()
    {
        echo"this->theId:". $this->theId;
        echo"this->theUserName:". $this->theUserName;
        echo"this->theEmail:". $this->theEmail;
        echo"this->theRegistrationDate:". $this->theRegistrationDate;
        echo"this->theLastVisitDate:". $this->theLastVisitDate;
        echo"this->theCurrentPostedVariables:". $this->theCurrentPostedVariables->printStateVariables();
        echo"this->theSubscriptionLevel:". $this->theSubscriptionLevel;
        echo"this->theSubscriptionStartDate:". $this->theSubscriptionStartDate;
    }            

    public function updateSubscription($subscriptionLevel, $txn_id)
    {
        if (($this->theId != "") && ($this->theEmail != ""))
        {
            $this->theUserDbProxyObject->updateSubscription($this->theId, $this->theEmail, $subscriptionLevel, $txn_id);
        }
    }
}
?>