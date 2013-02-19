<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class ZonesDbProxy extends DbProxy
{ 
    public function getZones($zone)
    {    
        //get zones
        if ($zone != "ANY")
        {
            $zones_query = "SELECT * FROM zones WHERE zone = '".$zone."' ORDER BY zone asc";
        }
        else 
        {
             
            $zones_query = "SELECT * FROM zones ORDER BY zone asc";
        }

        return $this->dbProxyQuery($zones_query);
    } 
}

?>
