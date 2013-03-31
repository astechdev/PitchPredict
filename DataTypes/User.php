<?php
class User
{
    public $theId;
    public $theUserName;
    public $theEmail;
    public $theRegistrationDate;
    public $theLastVisitDate;
    public $theCurrentPostedVariables;

    public function __construct($id, $username, $email, $dbName)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/UserDbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
        
        $aUserDbProxyObject = new UserDbProxy($dbName);
        
        $this->theId = $id;
        $this->theUserName = $username;
        $this->theEmail = $email;
        
        $result = $aUserDbProxyObject->getUser($id, $username, $email);
        $numRows = $aUserDbProxyObject->dbProxyNumResults($result);

        //Check to see if user exists, if not create
        if($numRows)
        {
            while($row = $aUserDbProxyObject->dbProxyFetchAssocArray($result))
            {            
                $this->theRegistrationDate = $row['registerDate'];
                $this->theLastVisitDate = $row['lastvisitDate'];
            }
        }
        else
        {
            $aUserDbProxyObject->createUser($id, $username, $email);
        }
        
        //Update last visit date
        $aUserDbProxyObject->updateUserLastVisit($id, $username, $email);
          
        //Get user info from DB and initialize User object
        $result = $aUserDbProxyObject->getUser($id, $username, $email);
        $numRows = $aUserDbProxyObject->dbProxyNumResults($result);

        if($numRows)
        {
            while($row = $aUserDbProxyObject->dbProxyFetchAssocArray($result))
            {            
                $this->theRegistrationDate = $row['registerDate'];
                $this->theLastVisitDate = $row['lastvisitDate'];
            }
        }
        
        $aUserDbProxyObject->dbProxyClose();
        
        $this->theCurrentPostedVariables = new StateVariables($username);
    }
    
    public function __destruct()
    {     
    }              

    public function printVariable()
    {
        echo"this->theUserName:". $this->theUserName;
        echo"this->theEmail:". $this->theEmail;
        echo"this->theRegistrationDate:". $this->theRegistrationDate;
        echo"this->theLastVisitDate:". $this->theLastVisitDate;
        echo"this->theCurrentPostedVariables:". $this->theCurrentPostedVariables->printStateVariables();
    }
}
?>