<?php
class BattingOrder
{
    public $theTeamBattingOrderBatterIdsArray;
    public $theTeamBattingOrderBatterNamesArray;

    public function __construct($theTeamBattingOrderBatterIds, $teamAbbr, $dbName)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PlayerDbProxy.php';
        
        $aPlayerDbProxyObject = new PlayerDbProxy($dbName);
        
        $this->theTeamBattingOrderBatterIdsArray = $theTeamBattingOrderBatterIds;
        
        $this->theTeamBattingOrderBatterNamesArray = array();
        
        if($teamAbbr != NULL)
        {
            for ($i=0; $i<count($this->theTeamBattingOrderBatterIdsArray); $i++)
            {
    //            echo "<br>this->theTeamBattingOrderBatterIdsArray[$i]:".$this->theTeamBattingOrderBatterIdsArray[$i];
                try
                {        
                    $result = $aPlayerDbProxyObject->getPlayer($this->theTeamBattingOrderBatterIdsArray[$i], $teamAbbr);

                    $firstName = "Select";
                    $lastName = "Batter";

                    while($row = $aPlayerDbProxyObject->dbProxyFetchAssocArray($result))
                    {
                        $firstName = $row['first'];
                        $lastName = $row['last'];
                    }
                }
                catch (Exception $e)
                {
                    $firstName = "Select";
                    $lastName = "Batter";
                }
                $this->theTeamBattingOrderBatterNamesArray[$i] = $firstName." ".$lastName;
            }
        }
        else
        {
            for ($i=0; $i<9; $i++)
            {
                $this->theTeamBattingOrderBatterNamesArray[$i] = "Select Batter";
            }
        }
        
        $aPlayerDbProxyObject->dbProxyClose();
    }
    
    public function __destruct()
    {
    }             

    public function printVariable()
    {
        for ($i=0; $i<9; $i++)
        {
            echo"id: ". $this->theTeamBattingOrderBatterIdsArray[$i];
            echo"name: ". $this->theTeamBattingOrderBatterNamesArray[$i];
        }
    }
}
?>
