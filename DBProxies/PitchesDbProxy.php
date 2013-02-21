<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PitchesDbProxy
 *
 * @author jaslan
 */   
include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';

class PitchesDbProxy extends DbProxy
{  
    public function getPitches($aStateVariablesObject)
    {
	include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Team.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Player.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PitchTypesDbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/OutcomesDbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/ZonesDbProxy.php';
	
	$aStateVariablesObjectClone = new StateVariables();
        $aStateVariablesObjectClone = clone $aStateVariablesObject;
//        $aStateVariablesObjectClone->printStateVariables();
    
        $aPitchTypesDbProxyObject = new PitchTypesDbProxy('pitchpre_pbp_'.$aStateVariablesObjectClone->theYearToQuery); 
        
        $pitch_types_result = $aPitchTypesDbProxyObject->getPitchTypes($aStateVariablesObjectClone->thePitchType);
        
        $pitch_types_IN_array = array();
        
        while($pitch_types_row = $this->dbProxyFetchAssocArray($pitch_types_result))
        {
            $pitch_types_IN_array[] = "'".$pitch_types_row['abbreviation']."'";
        }
    
        $anOutcomesDbProxyObject = new OutcomesDbProxy('pitchpre_pbp_'.$aStateVariablesObjectClone->theYearToQuery); 
        
        $outcomes_result = $anOutcomesDbProxyObject->getOutcomes($aStateVariablesObjectClone->theOutcomeType);
        
        $outcomes_IN_array = array();
        
        while($outcomes_row = $this->dbProxyFetchAssocArray($outcomes_result))
        {
            $outcomes_IN_array[] = "'".$outcomes_row['event']."'";
        }
    
        $aZonesDbProxyObject = new ZonesDbProxy('pitchpre_pbp_'.$aStateVariablesObjectClone->theYearToQuery); 
        
        $zones_result = $aZonesDbProxyObject->getZones($aStateVariablesObjectClone->theHotZone);
        
        $zones_IN_array = array();
        
        while($zones_row = $this->dbProxyFetchAssocArray($zones_result))
        {
            $zones_IN_array[] = "'".$zones_row['zone']."'";
        }
    
        $anOffenseTeamObject = new Team($aStateVariablesObjectClone->theBatterTeamId, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);
        
        $aDefenseTeamObject = new Team($aStateVariablesObjectClone->thePitcherTeamId, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);	

        $pitcherPlayerObject = new Player($aStateVariablesObjectClone->thePitcherId, $aDefenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);	

        $catcherPlayerObject = new Player($aStateVariablesObjectClone->theCatcherId, $aDefenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);	

        $batterPlayerObject = new Player($aStateVariablesObjectClone->theBatterId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);	

        $batterOnDeckPlayerObject = new Player($aStateVariablesObjectClone->theBatterOnDeckId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);	

        $on1bPlayerObject = new Player($aStateVariablesObjectClone->theOn1bId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);	

        $on2bPlayerObject = new Player($aStateVariablesObjectClone->theOn2bId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);	

        $on3bPlayerObject = new Player($aStateVariablesObjectClone->theOn3bId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$aStateVariablesObjectClone->theYearToQuery);
        
        //get key from pitches table
        $pitches_query = "SELECT * FROM pitches WHERE (
                            pitch_type IN (".implode(", ",$pitch_types_IN_array).") AND
                            event IN (".implode(", ",$outcomes_IN_array).") AND
                            zone IN (".implode(", ",$zones_IN_array).") AND
                            balls = '".$aStateVariablesObjectClone->theBalls."' AND 
                            strikes = '".$aStateVariablesObjectClone->theStrikes."' AND 
                            outs = '".$aStateVariablesObjectClone->theOuts."' AND 
                            pitch_sequence = '".implode(",", $aStateVariablesObjectClone->thePitchTypeSequence)."' AND 
                            location_sequence = '".implode(",", $aStateVariablesObjectClone->thePitchLocationSequence)."' AND 
                            outcome_sequence = '".implode(",", $aStateVariablesObjectClone->thePitchOutcomeSequence)."' AND 
                            run_differential = '".abs($aStateVariablesObjectClone->theHomeTeamScore - $aStateVariablesObjectClone->theAwayTeamScore)."'";

        if ($aStateVariablesObjectClone->theAtBatNumber != "ANY")
        {
            $pitches_query .= " AND at_bat_number = '".$aStateVariablesObjectClone->theAtBatNumber."'";
        } 
        if ($aStateVariablesObjectClone->theInning != "ANY")
        {
            $pitches_query .= " AND inning = '".$aStateVariablesObjectClone->theInning."'";
        }   
        if ($aStateVariablesObjectClone->theTopOrBottomHalf != "ANY")
        {
            if ($aStateVariablesObjectClone->theTopOrBottomHalf != "TOP")
            {
                $pitches_query .= " AND half = 2";
            }
            else
            {
                $pitches_query .= " AND half = 1";
            }
        }        
        if ($aStateVariablesObjectClone->theHotZone != "ANY")
        {
            $pitches_query .= " AND zone = '".$aStateVariablesObjectClone->theHotZone."'";
        }
        if ($aStateVariablesObjectClone->theOutcomeType != "ANY")
        {
            $pitches_query .= " AND event = '".$aStateVariablesObjectClone->theOutcomeType."'";
        }
        if ($aStateVariablesObjectClone->thePitchType != "ANY")
        {
            $pitches_query .= " AND pitch_type = '".$aStateVariablesObjectClone->thePitchType."'";
        }
        if (($aStateVariablesObjectClone->thePitcherType != "SIMILAR") || ($aStateVariablesObjectClone->thePitcherType != "ANY"))
        {
            $pitches_query .= " AND pitcher_id = '".$aStateVariablesObjectClone->thePitcherId."'";
        }
        else if ($aStateVariablesObjectClone->thePitcherType == "SIMILAR")
        {
            $pitches_query .= " AND (";
            
            $query = "SELECT * FROM players WHERE pitcher_type = '".$pitcherPlayerObject->thePitcherType."'";
    //        echo $query;
            $result = $this->dbProxyQuery($query);

            $similarPitchersIdsArray = array();
            
            while($row = $this->dbProxyFetchAssocArray($result))
            {
                $similarPitchersIdsArray[] = "pitcher_id = ".$row['eliasid'];
            }
            
            $pitches_query .= implode(" OR ", $similarPitchersIdsArray);
            $pitches_query .= ")";
        }
        if (($aStateVariablesObjectClone->theCatcherType != "SIMILAR") || ($aStateVariablesObjectClone->theCatcherType != "ANY"))
        {
            $pitches_query .= " AND catcher_id = '".$aStateVariablesObjectClone->theCatcherId."'";
        }
        else if ($aStateVariablesObjectClone->theCatcherType == "SIMILAR")
        {
            $pitches_query .= " AND (";
            
            $query = "SELECT * FROM players WHERE catcher_type = '".$catcherPlayerObject->theCatcherType."'";
    //        echo $query;
            $result = $this->dbProxyQuery($query);

            $similarCatchersIdsArray = array();
            
            while($row = $this->dbProxyFetchAssocArray($result))
            {
                $similarCatchersIdsArray[] = "catcher_id = ".$row['eliasid'];
            }
            
            $pitches_query .= implode(" OR ", $similarCatchersIdsArray);
            $pitches_query .= ")";
        }
        if (($aStateVariablesObjectClone->theBatterType != "SIMILAR") || ($aStateVariablesObjectClone->theBatterType != "ANY"))
        {
            $pitches_query .= " AND batter_id = '".$aStateVariablesObjectClone->theBatterId."'";
        }
        else if ($aStateVariablesObjectClone->theBatterType == "SIMILAR")
        {
            $pitches_query .= " AND (";
            
            $query = "SELECT * FROM players WHERE batter_type = '".$batterPlayerObject->theBatterType."'";
    //        echo $query;
            $result = $this->dbProxyQuery($query);

            $similarBattersIdsArray = array();
            
            while($row = $this->dbProxyFetchAssocArray($result))
            {
                $similarBattersIdsArray[] = "batter_id = ".$row['eliasid'];
            }
            
            $pitches_query .= implode(" OR ", $similarBattersIdsArray);
            $pitches_query .= ")";
        }
        if (($aStateVariablesObjectClone->theOnDeckBatterType != "SIMILAR") || ($aStateVariablesObjectClone->theOnDeckBatterType != "ANY"))
        {
            $pitches_query .= " AND batter_on_deck_id = '".$aStateVariablesObjectClone->theBatterOnDeckId."'";
        }
        else if ($aStateVariablesObjectClone->theOnDeckBatterType == "SIMILAR")
        {
            $pitches_query .= " AND (";
            
            $query = "SELECT * FROM players WHERE batter_type = '".$batterOnDeckPlayerObject->theBatterType."'";
    //        echo $query;
            $result = $this->dbProxyQuery($query);

            $similarBattersOnDeckIdsArray = array();
            
            while($row = $this->dbProxyFetchAssocArray($result))
            {
                $similarBattersOnDeckIdsArray[] = "batter_on_deck_id = ".$row['eliasid'];
            }
            
            $pitches_query .= implode(" OR ", $similarBattersOnDeckIdsArray);
            $pitches_query .= ")";
        }
        if (($aStateVariablesObjectClone->theBaseRunnerType != "SIMILAR") || ($aStateVariablesObjectClone->theBaseRunnerType != "ANY"))
        {
            $pitches_query .= " AND on_1b = '".$aStateVariablesObjectClone->theOn1bId."'";
            $pitches_query .= " AND on_2b = '".$aStateVariablesObjectClone->theOn2bId."'";
            $pitches_query .= " AND on_3b = '".$aStateVariablesObjectClone->theOn3bId."'";
        }
        else if ($aStateVariablesObjectClone->theBaseRunnerType == "SIMILAR")
        {
            $pitches_query .= " AND (";
            
            $query = "SELECT * FROM players WHERE speed_type = '".$on1bPlayerObject->theSpeedType."'";
    //        echo $query;
            $result = $this->dbProxyQuery($query);

            $similarOn1bsIdsArray = array();
            
            while($row = $this->dbProxyFetchAssocArray($result))
            {
                $similarOn1bsIdsArray[] = "on_1b = ".$row['eliasid'];
            }
            
            $pitches_query .= implode(" OR ", $similarOn1bsIdsArray);
            $pitches_query .= ")";
            
            
            $pitches_query .= " AND (";
            
            $query = "SELECT * FROM players WHERE speed_type = '".$on2bPlayerObject->theSpeedType."'";
    //        echo $query;
            $result = $this->dbProxyQuery($query);

            $similarOn2bsIdsArray = array();
            
            while($row = $this->dbProxyFetchAssocArray($result))
            {
                $similarOn2bsIdsArray[] = "on_2b = ".$row['eliasid'];
            }
            
            $pitches_query .= implode(" OR ", $similarOn2bsIdsArray);
            $pitches_query .= ")";
            
            
            $pitches_query .= " AND (";
            
            $query = "SELECT * FROM players WHERE speed_type = '".$on3bPlayerObject->theSpeedType."'";
    //        echo $query;
            $result = $this->dbProxyQuery($query);

            $similarOn3bsIdsArray = array();
            
            while($row = $this->dbProxyFetchAssocArray($result))
            {
                $similarOn3bsIdsArray[] = "on_3b = ".$row['eliasid'];
            }
            
            $pitches_query .= implode(" OR ", $similarOn3bsIdsArray);
            $pitches_query .= ")";
        }

        $pitches_query .= ")";

        return $this->dbProxyQuery($pitches_query);
    }
}

?>
