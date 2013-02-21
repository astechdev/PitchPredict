<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class PitchTypesDbProxy extends DbProxy
{  
    public function getPitchTypes($pitchType)
    {   
        //get pitch types
        if ($pitchType != "ANY")
        {
            $pitch_types_query = "SELECT * FROM pitch_types WHERE abbreviation = '".$pitchType."' ORDER BY abbreviation asc";
        }
        else 
        {
            $pitch_types_query = "SELECT * FROM pitch_types ORDER BY abbreviation asc";
        }
        
        return $this->dbProxyQuery($pitch_types_query);
    } 
}

?>
