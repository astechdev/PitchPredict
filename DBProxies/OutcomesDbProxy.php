<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class OutcomesDbProxy extends DbProxy
{ 
    public function getOutcomes($outcomeType)
    {    
        //get outcomes
        if ($outcomeType != "ANY")
        {
            $outcomes_query = "SELECT * FROM outcomes WHERE outcome = '".$outcomeType."' ORDER BY outcome asc";
        }
        else 
        {
             
            $outcomes_query = "SELECT * FROM outcomes ORDER BY outcome asc";
        }

        return $this->dbProxyQuery($outcomes_query);
    } 
}

?>
