<?php
class Locations 
{
    public $theId;
    public $theLocation;

    public function __construct($theId, $theLocation)
    {
        $this->theId = $theId;
        $this->theLocation = $theLocation;
    }
    
    public function __destruct()
    {     
    }              

    public function printVariable()
    {
        echo"this->theId:". $this->theId;
        echo"this->theLocation:". $this->theLocation;
    }
}

?>
