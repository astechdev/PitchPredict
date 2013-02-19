<?php
class PitchPredict
{
    public $theTotal = 0;
    public $theSuccess = 0;
    public $theFailure = 0;
    public $theGroundballSuccess = 0;
    public $theGroundballFailure = 0;
    public $theFlyballSuccess = 0;
    public $theFlyballFailure = 0;
    public $theStrike = 0;
    public $theBall = 0;

    public function __construct($aStateVariablesObject)
    {
	include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
	
	$aStateVariablesObjectClone = new StateVariables();
        $aStateVariablesObjectClone = clone $aStateVariablesObject;
//        $aStateVariablesObjectClone->printStateVariables();
        
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PitchesDbProxy.php';
        
        $aPitchesDbProxyObject = new PitchesDbProxy('pitchpre_pbp_'.$aStateVariablesObject->theYearToQuery);
        
        $pitches_result = $aPitchesDbProxyObject->getPitches(& $aStateVariablesObjectClone);
        if($aPitchesDbProxyObject->dbProxyNumResults($pitches_result))
        {
            while($pitches_row = $aPitchesDbProxyObject->dbProxyFetchAssocArray($pitches_result))
            {
                $this->theTotal = $this->theTotal + 1;

                if(($pitches_row['outcome'] == "S"))
                {
                    $this->theStrike = $this->theStrike + 1;
                }
                else if(($pitches_row['outcome'] == "B"))
                {
                    $this->theBall = $this->theBall + 1;
                }
                else
                {
                    //finish updating counters
                    if($pitches_row["event"] == "Groundout")
                    {
                        $this->theSuccess = $this->theSuccess + 1;
                        $this->theGroudballSuccess = $this->theGroudballSuccess + 1;
                    }
                    else if($pitches_row["event"] == "Flyout")
                    {
                        $this->theSuccess = $this->theSuccess + 1;
                        $this->theFlyballSuccess = $this->theFlyballSuccess + 1;
                    }
                    else if($pitches_row["event"] == "Walk")
                    { 
                        $this->theBall = $this->theBall + 1;
                        $this->theFailure = $this->theFailure + 1;
                    }
                    else if($pitches_row["event"] == "Strikeout")
                    {
                        $this->theSuccess = $this->theSuccess + 1;
                        $this->theStrike = $this->theStrike + 1;
                    }
                    else if($pitches_row["event"] == "Bunt Groundout")
                    { 
                        $this->theSuccess = $this->theSuccess + 1;
                        $this->theGroudballSuccess = $this->theGroudballSuccess + 1;

                    }
                    else if($pitches_row["event"] == "Bunt Pop Out")
                    { 
                        $this->theSuccess = $this->theSuccess + 1;
                        $this->theFlyballSuccess = $this->theFlyballSuccess + 1;

                    }
                    else if($pitches_row["event"] == "Lineout")
                    { 
                        $this->theSuccess = $this->theSuccess + 1;
                        $this->theFlyballSuccess = $this->theFlyballSuccess + 1;

                    }
                    else if($pitches_row["event"] == "Pop Out")
                    { 
                        $this->theSuccess = $this->theSuccess + 1;
                        $this->theFlyballSuccess = $this->theFlyballSuccess + 1;

                    }
                    else if($pitches_row["event"] == "Forceout")
                    { 
                        $this->theSuccess = $this->theSuccess + 1;

                        if(strpo(strtolower($pitches_row["des"]),'ground ball') !== false)
                        {
                            $this->theGroundballSuccess = $this->theGroundballSuccess + 1;                               
                        }
                        else
                        {
                            $this->theFlyballSuccess = $this->theFlyballSuccess + 1;                                
                        }

                    }
                    else if($pitches_row["event"] == "Single")
                    { 
                        $this->theFailure = $this->theFailure + 1;

                        if(strpo(strtolower($pitches_row["des"]),'ground ball') !== false)
                        {
                            $this->theGroundballFailure = $this->theGroundballFailure + 1;                               
                        }
                        else
                        {
                            $this->theFlyballFailure = $this->theFlyballFailure + 1;                                
                        }

                    }
                    else if($pitches_row["event"] == "Double")
                    { 
                        $this->theFailure = $this->theFailure + 1;

                        if(strpo(strtolower($pitches_row["des"]),'ground ball') !== false)
                        {
                            $this->theGroundballFailure = $this->theGroundballFailure + 1;                               
                        }
                        else
                        {
                            $this->theFlyballFailure = $this->theFlyballFailure + 1;                                
                        }

                    }
                    else if($pitches_row["event"] == "Triple")
                    { 
                        $this->theFailure = $this->theFailure + 1;

                        if(strpo(strtolower($pitches_row["des"]),'ground ball') !== false)
                        {
                            $this->theGroundballFailure = $this->theGroundballFailure + 1;                               
                        }
                        else
                        {
                            $this->theFlyballFailure = $this->theFlyballFailure + 1;                                
                        }

                    }
                    else if($pitches_row["event"] == "Home Run")
                    { 
                        $this->theFailure = $this->theFailure + 1;
                        $this->theFlyballFailure = $this->theFlyballFailure + 1;                                
                    }                 
                }
            }
        }
        
        $aPitchesDbProxyObject->dbProxyClose();
    }

    public function __destruct()
    {
    }

    public function printStateVariables()
    {
        echo "this->theTotal:". $this->theTotal;
        echo "this->theSuccess:". $this->theSuccess;
        echo "this->theFailure:". $this->theFailure;
        echo "this->theGroundballSuccess:". $this->theGroundballSuccess;
        echo "this->theGroundballFailure:". $this->theGroundballFailure;
        echo "this->theFlyballSuccess:". $this->theFlyballSuccess;
        echo "this->theFlyballFailure:". $this->theFlyballFailure;
        echo "this->theStrike:". $this->theStrike;
        echo "this->theBall:". $this->theBall;
    }
}
?>