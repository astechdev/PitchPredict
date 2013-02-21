<?php
class Zone 
{
    public $thePitchPredictObject;
    public $thePercentage;
    public $theBackground;
    public $theHotBackgroundRangeValue = .250;
    public $theColdBackgroundRangeValue = .150;
    public $theHotBackground = "#ea1605";//"\"http://www.pitchpredict.com/PitchPredict/Services/Results/images/fire_scaled.jpg\"";
    public $theNuetralBackground = "#555555";//"\"http://www.pitchpredict.com/PitchPredict/Services/Results/images/gray-smoke_scaled.jpg\"";
    public $theColdBackground = "#2568a0";//"\"http://www.pitchpredict.com/PitchPredict/Services/Results/images/blue-smoke_scaled.jpg\"";

    public function __construct($aStateVariablesObject)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/PitchPredict.php';
        
        $this->thePitchPredictObject = new PitchPredict($aStateVariablesObject);
//        $this->thePitchPredictObject->printStateVariables();

        //determine percentage based on state 
        if ($aStateVariablesObject->thePitcherOrBatter == "PITCHER")
        {
            if ($aStateVariablesObject->theOutcome == "GROUNDBALL")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theGroundballSuccess/$this->theTotal*1000,0,'.', ',');                    
            }
            else if ($aStateVariablesObject->theOutcome == "FLYBALL")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theFlyballSuccess/$this->theTotal*1000,0,'.', ',');   
            }
            else if ($aStateVariablesObject->theOutcome == "STRIKE")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theStrike/$this->theTotal*1000,0,'.', ',');  
            }
            else if ($aStateVariablesObject->theOutcome == "BALL")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theBall/$this->theTotal*1000,0,'.', ',');  
            }
            else
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theSuccess/$this->theTotal*1000,0,'.', ',');  
            }
        }
        else if ($aStateVariablesObject->thePitcherOrBatter == "BATTER")
        {
            if ($aStateVariablesObject->theOutcome == "GROUNDBALL")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theGroundballFailure/$this->theTotal*1000,0,'.', ',');                    
            }
            else if ($aStateVariablesObject->theOutcome == "FLYBALL")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theFlyballFailure/$this->theTotal*1000,0,'.', ',');   
            }
            else if ($aStateVariablesObject->theOutcome == "STRIKE")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theStrike/$this->theTotal*1000,0,'.', ',');  
            }
            else if ($aStateVariablesObject->theOutcome == "BALL")
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theBall/$this->theTotal*1000,0,'.', ',');  
            }
            else
            {
                $this->thePercentage = number_format($this->thePitchPredictObject->theFailure/$this->theTotal*1000,0,'.', ',');  
            }
        }
        
        //determine background
        if ($this->thePercentage >= $this->theHotBackgroundRangeValue)
        {
                $this->theBackground = $this->theHotBackground;
        }
        else if (($this->thePercentage < $this->theHotBackgroundRangeValue) && ($this->thePercentage >= $this->theColdBackgroundRangeValue))
        {
                $this->theBackground = $this->theNeutralBackground;
        }
        else if ($this->thePercentage < $this->theColdBackgroundRangeValue)
        {
                $this->theBackground = $this->theColdBackground;
        }
    }
    
    public function __destruct()
    {     
    }
}
?>
