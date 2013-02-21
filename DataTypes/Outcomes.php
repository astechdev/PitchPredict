<?php
class Outcomes 
{
    public $theId;
    public $theOutcome;

    public function __construct($theId, $theOutcome)
    {
        $this->theId = $theId;
        $this->theOutcome = $theOutcome;
    }
    
    public function __destruct()
    {     
    }              

    public function printVariable()
    {
        echo"this->theId:". $this->theId;
        echo"this->theOutcome:". $this->theOutcome;
    }
}

?>
