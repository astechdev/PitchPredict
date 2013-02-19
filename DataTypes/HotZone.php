<?php
class HotZone
{
    public $theZone1Object;
    public $theZone2Object;
    public $theZone3Object;
    public $theZone4Object;
    public $theZone5Object;
    public $theZone6Object;
    public $theZone7Object;
    public $theZone8Object;
    public $theZone9Object;
    public $theZone10Object;
    public $theZone11Object;
    public $theZone12Object;
    public $theZone13Object;
    public $theZone14Object;

    public function __construct($aStateVariablesObject)
    {
	include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Zone.php';
        
        $this->theZone1Object = new Zone($aStateVariablesObject);
        $this->theZone2Object = new Zone($aStateVariablesObject);
        $this->theZone3Object = new Zone($aStateVariablesObject);
        $this->theZone4Object = new Zone($aStateVariablesObject);
        $this->theZone5Object = new Zone($aStateVariablesObject);
        $this->theZone6Object = new Zone($aStateVariablesObject);
        $this->theZone7Object = new Zone($aStateVariablesObject);
        $this->theZone8Object = new Zone($aStateVariablesObject);
        $this->theZone9Object = new Zone($aStateVariablesObject);
        $this->theZone10Object = new Zone($aStateVariablesObject);
        $this->theZone11Object = new Zone($aStateVariablesObject);
        $this->theZone12Object = new Zone($aStateVariablesObject);
        $this->theZone13Object = new Zone($aStateVariablesObject);
        $this->theZone14Object = new Zone($aStateVariablesObject);
    }

    public function __destruct(){}
}
?>