<?php
class StateVariables
{ 
//    public $thePostedVariablesDbProxyObject;
    public $theUserName;
    public $thePassword;
    public $theAwayTeamId;
    public $theAwayTeamScore;
    public $theHomeTeamId;
    public $theHomeTeamScore;
    public $theBalls;
    public $theStrikes;
    public $theOuts;
    public $thePitcherId;
    public $thePitcherTeamId;
    public $theCatcherId;
    public $theBatterId;
    public $theBatterRightOrLeft;
    public $theBatterTeamId;
    public $theBatterOnDeckId;
    public $theOn1bId;
    public $theOn2bId;
    public $theOn3bId;
    public $thePitchTypeSequence;
    public $thePitchLocationSequence;
    public $thePitchOutcomeSequence;
    public $theHomeTeamBattingOrderBatterIds;
    public $theAwayTeamBattingOrderBatterIds;
    public $theInning;
    public $theTopOrBottomHalf;
    public $thePitcherOrBatter;
    public $theBaseRunnerType;
    public $thePitcherType;
    public $theCatcherType;
    public $theBatterType;
    public $theOnDeckBatterType;
    public $theOutcomeType;
    public $thePitchType;
    public $theHotZone;
    public $theAtBatNumber;
    public $theYearToQuery;
//            public $theRunsRecorded;
//            public $theOutsRecorded;

    public function __construct()
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PostedVariablesDbProxy.php';

        if (isset($_COOKIE['UserName']))
        {
            $this->theUserName = $_COOKIE['UserName'];
        }
        else if (isset($_REQUEST['UserName']))
        {
            $this->theUserName = $_REQUEST['UserName'];
        }
        else
        {
            $this->theUserName = NULL;
        }
        
        $this->initialize();
    }
    
    public function __destruct()
    {        
    }

    public function initialize()
    {        
        $aPostedVariablesDbProxyObject = new PostedVariablesDbProxy('pitchpre_user_db');
        
        //check to see if the user has a row in the posted_variables_table db table, if not create one        
        $result = $aPostedVariablesDbProxyObject->getPostedVariables($this->theUserName);
        
        $num_rows = $aPostedVariablesDbProxyObject->dbProxyNumResults($result);
        
        if ($num_rows == 0 && $this->theUserName != NULL)
        {   
            //create the row
            $insert = "INSERT INTO posted_variables_table (user_ID_entering_data_ID) VALUES ('$this->theUserName')";
            
            $aPostedVariablesDbProxyObject->dbProxyQuery($insert);
            
            //Initialize some variables
            $this->theHomeTeamScore = 0;
            $this->theAwayTeamScore = 0;
            $this->theBalls = 0;
            $this->theStrikes = 0;
            $this->theOuts = 0;
            $this->theHomeTeamBattingOrderBatterIds = "0,0,0,0,0,0,0,0,0";
            $this->theAwayTeamBattingOrderBatterIds = "0,0,0,0,0,0,0,0,0";
            $this->thePitcherOrBatter = "PITCHER";
            $this->theBaseRunnerType = "EXACT";
            $this->thePitcherType = "EXACT";
            $this->theCatcherType = "EXACT";
            $this->theBatterType = "EXACT";
            $this->theOnDeckBatterType = "EXACT";
            $this->theOutcomeType = "ANY";
            $this->thePitchType = "ANY";
            $this->theHotZone = "ANY";
            $this->theAtBatNumber = "ANY";
            $this->theInning = 1;
            $this->theTopOrBottomHalf = "TOP";
            $this->theYearToQuery = "2009";
            
            //update the row with the initialized variables
            $this->update();
        }
        
        $aPostedVariablesDbProxyObject->dbProxyClose();
    }

    public function printStateVariables()
    {
        echo "theAwayTeamId $this->theAwayTeamId";
        echo "theAwayTeamScore $this->theAwayTeamScore";
        echo "theHomeTeamId $this->theHomeTeamId";
        echo "theHomeTeamScore $this->theHomeTeamScore";
        echo "theBalls $this->theBalls";
        echo "theStrikes $this->theStrikes";
        echo "theOuts $this->theOuts";
        echo "thePitcherId $this->thePitcherId";
        echo "thePitcherTeamId $this->thePitcherTeamId";
        echo "theCatcherId $this->theCatcherId";
        echo "theBatterId $this->theBatterId";
        echo "theBatterRightOrLeft $this->theBatterRightOrLeft";
        echo "theBatterTeamId $this->theBatterTeamId";
        echo "theBatterOnDeckId $this->theBatterOnDeckId";
        echo "theOn1bId $this->theOn1bId";
        echo "theOn2bId $this->theOn2bId";
        echo "theOn3bId $this->theOn3bId";
        echo "thePitchTypeSequence:";
        print_r($this->thePitchTypeSequence);
        echo "thePitchLocationSequence:";
        print_r($this->thePitchLocationSequence);
        echo "thePitchOutcomeSequence:";
        print_r($this->thePitchOutcomeSequence);
        echo "theHomeTeamBattingOrderBatterIds";
        print_r($this->theHomeTeamBattingOrderBatterIds);
        echo "theAwayTeamBattingOrderBatterIds";
        print_r($this->theAwayTeamBattingOrderBatterIds);
        echo "theInning $this->theInning";
        echo "theTopOrBottomHalf $this->theTopOrBottomHalf";
        echo "theUserName $this->theUserName";
        echo "thePitcherOrBatter $this->thePitcherOrBatter";
        echo "theBaseRunnerType $this->theBaseRunnerType";
        echo "thePitcherType $this->thePitcherType";
        echo "theCatcherType $this->theCatcherType";
        echo "theBatterType $this->theBatterType";
        echo "theOnDeckBatterType $this->theOnDeckBatterType";
        echo "theOutcomeType $this->theOutcomeType";
        echo "thePitchType $this->thePitchType";
        echo "theHotZone $this->theHotZone";
        echo "theAtBatNumber $this->theAtBatNumber";
        echo "theYearToQuery $this->theYearToQuery";
//            echo "theRunsRecorded $this->theRunsRecorded";
//            echo "theOutsRecorded $this->theOutsRecorded";
    }

    public function getStateVariablesAsUrlParams()
    {
        return "UserName=$this->theUserName&YearToQuery=$this->theYearToQuery&AtBatNumber=$this->theAtBatNumber&Inning=$this->theInning&TopOrBottomHalf=$this->theTopOrBottomHalf&HomeTeamBattingOrderBatterIds=$this->theHomeTeamBattingOrderBatterIds&AwayTeamBattingOrderBatterIds=$this->theAwayTeamBattingOrderBatterIds&On1BId=$this->theOn1bId&On2BId=$this->theOn2bId&On3BId=$this->theOn3bId&CatcherId=$this->theCatcherId&BatterId=$this->theBatterId&BatterTeamId=$this->theBatterTeamId&BatterRightOrLeft=$this->theBatterRightOrLeft&BatterOnDeckId=$this->theBatterOnDeckId&PitcherId=$this->thePitcherId&PitcherTeamId=$this->thePitcherTeamId&AwayTeamId=$this->theAwayTeamId&AwayTeamScore=$this->theAwayTeamScore&HomeTeamId=$this->theHomeTeamId&HomeTeamScore=$this->theHomeTeamScore&Balls=$this->theBalls&Strikes=$this->theStrikes&Outs=$this->theOuts&PitcherOrBatter=$this->thePitcherOrBatter&BaseRunnerType=$this->theBaseRunnerType&PitcherType=$this->thePitcherType&CatcherType=$this->theCatcherType&BatterType=$this->theBatterType&OnDeckBatterType=$this->theOnDeckBatterType&OutcomeType=$this->theOutcomeType&PitchType=$this->thePitchType&HotZone=$this->theHotZone&PitchTypeSequence=".implode(",", $this->thePitchTypeSequence)."&PitchLocationSequence=".implode(",", $this->thePitchLocationSequence)."&PitchOutcomeSequence=".implode(",", $this->thePitchOutcomeSequence);
    }

    public function retrieveDBStateVariables()
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Util/StringUtil.php';
        
        $aPostedVariablesDbProxyObject = new PostedVariablesDbProxy('pitchpre_user_db');
        
        $result = $aPostedVariablesDbProxyObject->getPostedVariables($this->theUserName);
        
        //should only ever be 1 row...
        while($row = $aPostedVariablesDbProxyObject->dbProxyFetchAssocArray($result))
        {
                $this->theAwayTeamId = $row['away_team_id'];
                $this->theAwayTeamScore = $row['away_team_score'];
                $this->theHomeTeamId = $row['home_team_id'];
                $this->theHomeTeamScore = $row['home_team_score'];
                $this->theBalls = $row['balls'];
                $this->theStrikes = $row['strikes'];
                $this->theOuts = $row['outs'];
                $this->theAtBatNumber = $row['at_bat_number'];
                $this->theYearToQuery = $row['year_to_query'];
                $this->thePitcherId = $row['pitcher_id'];
                $this->thePitcherTeamId = $row['pitcher_team_name'];
                $this->theCatcherId = $row['catcher_id'];
                $this->theBatterId = $row['batter_id'];
                $this->theBatterRightOrLeft = $row['batter_stand'];
                $this->theBatterOnDeckId = $row['batter_on_deck_id'];
                $this->theBatterTeamId = $row['batter_team_name'];
                $this->theOn1bId = $row['on1b'];
                $this->theOn2bId = $row['on2b'];
                $this->theOn3bId = $row['on3b'];
                $this->theHomeTeamBattingOrderBatterIds = explode(",", $row['home_team_batting_order']);
                $this->theAwayTeamBattingOrderBatterIds = explode(",", $row['away_team_batting_order']);
//                    $this->theRunsRecorded = $row['runs_recorded'];
//                    $this->theOutsRecorded = $row['outs_recorded'];
                $this->theInning = $row['inning'];
                $this->theTopOrBottomHalf = $row['top_or_bottom_half'];

                if(strlen($row['pitch_type_sequence']) > 1)
                {
                    $this->thePitchTypeSequence = explode(",", $row['pitch_type_sequence']);
                }
                else 
                {
                    $this->thePitchTypeSequence = array();
                }

                if(strlen($row['pitch_location_sequence']) > 1)
                {
                    $this->thePitchLocationSequence = explode(",", $row['pitch_location_sequence']);
                }
                else 
                {
                    $this->thePitchLocationSequence = array();
                }

                if(strlen($row['pitch_outcome_sequence']) > 1)
                {
                    $this->thePitchOutcomeSequence = explode(",", $row['pitch_outcome_sequence']);
                }
                else 
                {
                    $this->thePitchOutcomeSequence = array();
                }

                break;
        }

        if (startsWith($this->theTopOrBottomHalf, 'TOP'))
        {
                $this->thePitcherTeamId = $this->theHomeTeamId;
                $this->thePitcherTeamScore = $this->theHomeTeamScore;
                $this->theBatterTeamId = $this->theAwayTeamId;
                $this->theBatterTeamScore = $this->theAwayTeamScore;
        }
        else
        {
                $this->thePitcherTeamId = $this->theAwayTeamId;
                $this->thePitcherTeamScore = $this->theAwayTeamScore;
                $this->theBatterTeamId = $this->theHomeTeamId;
                $this->theBatterTeamScore = $this->theHomeTeamScore;
        }
        
        $aPostedVariablesDbProxyObject->dbProxyClose();
    }

    public function postStateVariables()
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Util/SQL_validation_functions.php';
        
        if (verifyString($_REQUEST['UserName']) == false)
        {
            die('Invalid user name.');
        }
        else if (verifyString($_REQUEST['UserName'])&&isset($_REQUEST['UserName']))
        {
            $this->theUserName = $_REQUEST['UserName'];
        }

        if (verifyString($_REQUEST['password']) == false)
        {
            die('Invalid password.');
        }
        else if (verifyString($_REQUEST['password'])&&isset($_REQUEST['password']))
        {
            $this->thePassword = $_REQUEST['password'];
        }

        if (verifyNumber($_REQUEST['AwayTeamId'])&&isset($_REQUEST['AwayTeamId']))
        {
            $this->theAwayTeamId = strtoupper($_REQUEST['AwayTeamId']);
        }
        else
        {
            $this->theAwayTeamId = 0;            
        }

        if (verifyNumber($_REQUEST['AwayTeamScore'])&&isset($_REQUEST['AwayTeamScore']))
        {
            $this->theAwayTeamScore = strtoupper($_REQUEST['AwayTeamScore']);
        }
        else
        {
            $this->theAwayTeamScore = 0;            
        }

        if (verifyNumber($_REQUEST['HomeTeamId'])&&isset($_REQUEST['HomeTeamId']))
        {
            $this->theHomeTeamId = strtoupper($_REQUEST['HomeTeamId']);
        }
        else
        {
            $this->theHomeTeamId = 0;            
        }

        if (verifyNumber($_REQUEST['HomeTeamScore'])&&isset($_REQUEST['HomeTeamScore']))
        {
            $this->theHomeTeamScore = strtoupper($_REQUEST['HomeTeamScore']);
        }
        else
        {
            $this->theHomeTeamScore = 0;            
        }

        if (verifyNumber($_REQUEST['Balls'])&&isset($_REQUEST['Balls']))
        {
            $this->theBalls = strtoupper($_REQUEST['Balls']);
        }
        else
        {
            $this->theBalls = 0;            
        }

        if (verifyNumber($_REQUEST['Strikes'])&&isset($_REQUEST['Strikes']))
        {
            $this->theStrikes = strtoupper($_REQUEST['Strikes']);
        }
        else
        {
            $this->theStrikes = 0;            
        }

        if (verifyNumber($_REQUEST['Outs'])&&isset($_REQUEST['Outs']))
        {
            $this->theOuts = strtoupper($_REQUEST['Outs']);
        }
        else
        {
            $this->theOuts = 0;            
        }

        if(isset($_REQUEST['AtBatNumber']) && $_REQUEST['AtBatNumber'] == "ANY")
        {
            $this->theAtBatNumber = "ANY";
        }
        else if (verifyNumber($_REQUEST['AtBatNumber'])&&isset($_REQUEST['AtBatNumber']))
        {
            $this->theAtBatNumber = strtoupper($_REQUEST['AtBatNumber']);
        }
        else
        {
            $this->theAtBatNumber = "ANY";            
        }

        if (verifyNumber($_REQUEST['PitcherId'])&&isset($_REQUEST['PitcherId']))
        {
            $this->thePitcherId = strtoupper($_REQUEST['PitcherId']);
        }
        else
        {
            $this->thePitcherId = 0;            
        }

        if (verifyNumber($_REQUEST['PitcherTeamId'])&&isset($_REQUEST['PitcherTeamId']))
        {
            $this->thePitcherTeamId = strtoupper($_REQUEST['PitcherTeamId']);
        }
        else
        {
            $this->thePitcherTeamId = 0;            
        }

        if (verifyNumber($_REQUEST['CatcherId'])&&isset($_REQUEST['CatcherId']))
        {
            $this->theCatcherId = strtoupper($_REQUEST['CatcherId']);
        }
        else
        {
            $this->theCatcherId = 0;            
        }

        if (verifyNumber($_REQUEST['BatterId'])&&isset($_REQUEST['BatterId']))
        {
            $this->theBatterId = strtoupper($_REQUEST['BatterId']);
        }
        else
        {
            $this->theBatterId = 0;            
        }

        if (verifyNumber($_REQUEST['BatterTeamId'])&&isset($_REQUEST['BatterTeamId']))
        {
            $this->theBatterTeamId = strtoupper($_REQUEST['BatterTeamId']);
        }
        else
        {
            $this->theBatterTeamId = 0;            
        }

        if (verifyString($_REQUEST['BatterRightOrLeft'])&&isset($_REQUEST['BatterRightOrLeft']))
        {
            $this->theBatterRightOrLeft = strtoupper($_REQUEST['BatterRightOrLeft']);
        }
        else
        {
            $this->theBatterRightOrLeft = "R";            
        }

        if (verifyNumber($_REQUEST['BatterOnDeckId'])&&isset($_REQUEST['BatterOnDeckId']))
        {
            $this->theBatterOnDeckId = strtoupper($_REQUEST['BatterOnDeckId']);
        }
        else
        {
            $this->theBatterOnDeckId = 0;            
        }

        if (verifyNumber($_REQUEST['On1BId'])&&isset($_REQUEST['On1BId']))
        {
            $this->theOn1bId = strtoupper($_REQUEST['On1BId']);
        }
        else
        {
            $this->theOn1bId = 0;            
        }

        if (verifyNumber($_REQUEST['On2BId'])&&isset($_REQUEST['On2BId']))
        {
            $this->theOn2bId = strtoupper($_REQUEST['On2BId']);
        }
        else
        {
            $this->theOn2bId = 0;            
        }

        if (verifyNumber($_REQUEST['On3BId'])&&isset($_REQUEST['On3BId']))
        {
            $this->theOn3bId = strtoupper($_REQUEST['On3BId']);
        }
        else
        {
            $this->theOn3bId = 0;            
        }

        if (verifyString(implode(",", $_REQUEST['PitchTypeSequence']))&&isset($_REQUEST['PitchTypeSequence']))
        {
            $this->thePitchTypeSequence = strtoupper($_REQUEST['PitchTypeSequence']);
        }
        else
        {
//            $this->thePitchTypeSequence = array();            
        }

        if (verifyString(implode(",", $_REQUEST['PitchLocationSequence']))&&isset($_REQUEST['PitchLocationSequence']))
        {
            $this->thePitchLocationSequence = strtoupper($_REQUEST['PitchLocationSequence']);
        }
        else
        {
//            $this->thePitchLocationSequence = array();           
        }

        if (verifyString(implode(",", $_REQUEST['PitchOutcomeSequence']))&&isset($_REQUEST['PitchOutcomeSequence']))
        {
            $this->thePitchOutcomeSequence = strtoupper($_REQUEST['PitchOutcomeSequence']);
        }
        else
        {
//            $this->thePitchOutcomeSequence = array();          
        }

        if (verifyString(implode(",", $_REQUEST['HomeTeamBattingOrderBatterIds']))&&isset($_REQUEST['HomeTeamBattingOrderBatterIds']))
        {
            $this->theHomeTeamBattingOrderBatterIds = strtoupper($_REQUEST['HomeTeamBattingOrderBatterIds']);
        }
        else
        {
            $this->theHomeTeamBattingOrderBatterIds = array(0, 0, 0, 0, 0, 0, 0, 0, 0);         
        }

        if (verifyString(implode(",", $_REQUEST['AwayTeamBattingOrderBatterIds']))&&isset($_REQUEST['AwayTeamBattingOrderBatterIds']))
        {
            $this->theAwayTeamBattingOrderBatterIds = strtoupper($_REQUEST['AwayTeamBattingOrderBatterIds']);
        }
        else
        {
            $this->theAwayTeamBattingOrderBatterIds = array(0, 0, 0, 0, 0, 0, 0, 0, 0);            
        }

        if (verifyString($_REQUEST['PitcherOrBatter'])&&isset($_REQUEST['PitcherOrBatter']))
        {
            $this->thePitcherOrBatter = strtoupper($_REQUEST['PitcherOrBatter']);
        }
        else
        {
            $this->thePitcherOrBatter = "PITCHER";            
        }

        if (verifyString($_REQUEST['BaseRunnerType'])&&isset($_REQUEST['BaseRunnerType']))
        {
            $this->theBaseRunnerType = strtoupper($_REQUEST['BaseRunnerType']);
        }
        else
        {
            $this->theBaseRunnerType = "EXACT";            
        }

        if (verifyString($_REQUEST['PitcherType'])&&isset($_REQUEST['PitcherType']))
        {
            $this->thePitcherType = strtoupper($_REQUEST['PitcherType']);
        }
        else
        {
            $this->thePitcherType = "EXACT";         
        }

        if (verifyString($_REQUEST['CatcherType'])&&isset($_REQUEST['CatcherType']))
        {
            $this->theCatcherType = strtoupper($_REQUEST['CatcherType']);
        }
        else
        {
            $this->theCatcherType = "EXACT";          
        }

        if (verifyString($_REQUEST['BatterType'])&&isset($_REQUEST['BatterType']))
        {
            $this->theBatterType = strtoupper($_REQUEST['BatterType']);
        }
        else
        {
            $this->theBatterType = "EXACT";         
        }

        if (verifyString($_REQUEST['BatterOnDeckType'])&&isset($_REQUEST['BatterOnDeckType']))
        {
            $this->theOnDeckBatterType = strtoupper($_REQUEST['BatterOnDeckType']);
        }
        else
        {
            $this->theOnDeckBatterType = "EXACT";         
        }

        if (verifyString($_REQUEST['OutcomeType'])&&isset($_REQUEST['OutcomeType']))
        {
            $this->theOutcomeType = strtoupper($_REQUEST['OutcomeType']);
        }
        else
        {
            $this->theOutcomeType = "ANY";        
        }

        if (verifyString($_REQUEST['PitchType'])&&isset($_REQUEST['PitchType']))
        {
            $this->thePitchType = strtoupper($_REQUEST['PitchType']);
        }
        else
        {
            $this->thePitchType = "ANY";      
        }

        if (verifyString($_REQUEST['HotZone'])&&isset($_REQUEST['HotZone']))
        {
            $this->theHotZone = strtoupper($_REQUEST['HotZone']);
        }
        else
        {
            $this->theHotZone = "ANY";       
        }

//        if (verifyNumber($_REQUEST['RunsRecorded'])&&isset($_REQUEST['RunsRecorded']))
//        {
//            $this->theRunsRecorded = strtoupper($_REQUEST['RunsRecorded']);
//        }
//        else
//        {
//            $this->theRunsRecorded = 0;            
//        }
//
//        if (verifyNumber($_REQUEST['OutsRecorded'])&&isset($_REQUEST['OutsRecorded']))
//        {
//            $this->theOutsRecorded = strtoupper($_REQUEST['OutsRecorded']);
//        }
//        else
//        {
//            $this->theOutsRecorded = 0;            
//        }

        if(isset($_REQUEST['Inning']) && $_REQUEST['Inning'] == "ANY")
        {
            $this->theInning = "ANY";
        }
        else if (verifyNumber($_REQUEST['Inning'])&&isset($_REQUEST['Inning']))
        {
            $this->theInning = strtoupper($_REQUEST['Inning']);
        }
        else
        {
            $this->theInning = 1;            
        }
        
        if (verifyString($_REQUEST['TopOrBottomHalf'])&&isset($_REQUEST['TopOrBottomHalf']))
        {
            $this->theTopOrBottomHalf = strtoupper($_REQUEST['TopOrBottomHalf']);
        }
        else
        {
            $this->theTopOrBottomHalf = "TOP";            
        }

        if (verifyString($_REQUEST['YearToQuery'])&&isset($_REQUEST['YearToQuery']))
        {
            $this->theYearToQuery = strtoupper($_REQUEST['YearToQuery']);
        }
        else
        {
            $this->theYearToQuery = "2009";         
        }
    }

    public function update()
    {
        $update = "UPDATE posted_variables_table SET " .
                    "away_team_id = '$this->theAwayTeamId', " .
                    "away_team_score = '$this->theAwayTeamScore', " .
                    "home_team_id = '$this->theHomeTeamId', " .
                    "home_team_score = '$this->theHomeTeamScore', " .
                    "balls = '$this->theBalls', " .
                    "strikes = '$this->theStrikes', " .
                    "outs = '$this->theOuts', " .
                    "at_bat_number = '$this->theAtBatNumber', " .
                    "year_to_query = '$this->theYearToQuery', " .
                    "pitcher_id = '$this->thePitcherId', " .
                    "pitcher_team_id = '$this->thePitcherTeamId', " .
                    "catcher_id = '$this->theCatcherId', " .
                    "batter_id = '$this->theBatterId', " .
                    "batter_stand = '$this->theBatterRightOrLeft', " .
                    "batter_team_id = '$this->theBatterTeamId', " .
                    "batter_on_deck_id = '$this->theBatterOnDeckId', " .
                    "on1b = '$this->theOn1bId', " .
                    "on2b = '$this->theOn2bId', " .
                    "on3b = '$this->theOn3bId', " .
                    "pitch_type_sequence = '$this->thePitchTypeSequence', " .
                    "pitch_location_sequence = '$this->thePitchLocationSequence', " .
                    "pitch_outcome_sequence = '$this->thePitchOutcomeSequence', " .
                    "home_team_batting_order = '$this->theHomeTeamBattingOrderBatterIds', " .
                    "away_team_batting_order = '$this->theAwayTeamBattingOrderBatterIds', " .
                    "inning = '$this->theInning', " .
                    "top_or_bottom_half = '$this->theTopOrBottomHalf' " .
                    "WHERE user_ID_entering_data_ID = '$this->theUserName'";
        
        $aPostedVariablesDbProxyObject = new PostedVariablesDbProxy('pitchpre_user_db');
        
        $aPostedVariablesDbProxyObject->dbProxyQuery($update);
        
        $aPostedVariablesDbProxyObject->dbProxyClose();
    }
}
?>