<?php
class Team
{
    public $theId;
    public $theName;
    public $theTeamAbbr;

    public function __construct($theId, $dbName)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/TeamDbProxy.php';
        
        $aTeamDbProxyObject = new TeamDbProxy($dbName);
        
        $this->theId = $theId;
        
        try
        {
            $result = $aTeamDbProxyObject->getTeam($this->theId);

            while($row = $aTeamDbProxyObject->dbProxyFetchAssocArray($result))
            {
                $this->theName = $row['name'];
                $this->theTeamAbbr = $row['abbreviation'];
            }
        }
        catch (Exception $e)
        {
            $this->theName = "Select Team";
        }
        
        $aTeamDbProxyObject->dbProxyClose();
    }
    
    public function __destruct()
    {   
    }                  

    public function printVariable()
    {
        echo"this->theId:". $this->theId;
        echo"this->theName:". $this->theName;
    }
}
?>