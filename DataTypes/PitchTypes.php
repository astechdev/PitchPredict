<?php
class PitchTypes 
{
    public $theId;
    public $theAbbr;

    public function __construct($theId, $theAbbr)
    {
        $this->theId = $theId;
        $this->theAbbr = $theAbbr;
    }
    
    public function __destruct()
    {     
    }              

    public function printVariable()
    {
        echo"this->theId:". $this->theId;
        echo"this->theAbbr:". $this->theAbbr;
    }
}

?>
