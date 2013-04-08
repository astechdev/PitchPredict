<?php
class Player
{
    public $theId;
    public $theName;
    public $theBoxName;
    public $thePosition;
    public $theTeamName;
    public $theTeamAbbr;
    public $theThrows;
    public $thePathToImage;
    private $thePitcherType;
    private $theCatcherType;
    private $theBatterType;
    private $theSpeedType;

    public function __construct($theId, $teamAbbr, $dbName)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PlayerDbProxy.php';
        
        $aPlayerDbProxyObject = new PlayerDbProxy($dbName);
        
        $this->theId = $theId;
        $this->thePathToImage = "noPhoto.jpg";
        
        $result = $aPlayerDbProxyObject->getPlayer($this->theId, $teamAbbr);

        while($row = $aPlayerDbProxyObject->dbProxyFetchAssocArray($result))
        {
            $firstName = $row['first'];
            $lastName = $row['last'];
            if($row['picture_path'] != "")
            {    
                $this->thePathToImage = $row['picture_path'];
            }
            
            $this->thePitcherType = $row['pitcher_type'];
            $this->theCatcherType = $row['catcher_type'];
            $this->theBatterType = $row['batter_type'];
            $this->theSpeedType = $row['speed_type'];
            $this->thePosition = $row['position'];
            $this->theBoxName = $row['boxname'];
            $this->thePosition = $row['position'];
            $this->theTeamName = $row['team_name'];
            $this->theTeamAbbr = $row['team_abbr'];
            $this->theThrows = $row['throws'];
        }
        
        $this->theName = $lastName .", ". $firstName;
        
        $aPlayerDbProxyObject->dbProxyClose();
    }
    
    public function __destruct()
    {     
    }              

    public function printVariable()
    {
        echo"this->theId:". $this->theId;
        echo"this->theName:". $this->theName;
        echo"this->theBoxName:". $this->theBoxName;
        echo"this->thePosition:". $this->thePosition;
        echo"this->theTeamName:". $this->theTeamName;
        echo"this->theTeamAbbr:". $this->theTeamAbbr;
        echo"this->theThrows:". $this->theThrows;
        echo"this->thePathToImage:". $this->thePathToImage;
        echo"this->thePitcherType:". $this->thePitcherType;
        echo"this->theCatcherType:". $this->theCatcherType;
        echo"this->theBatterType:". $this->theBatterType;
        echo"this->theSpeedType:". $this->theSpeedType;
    }
}
?>