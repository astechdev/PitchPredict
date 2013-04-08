<?php
class StateVariables
{ 
//    public $thePostedVariablesDbProxyObject;
    public $theUserId;
    public $thePassword;
    public $theAwayTeamId;
    public $theAwayTeamName;
    public $theAwayTeamAbbr;
    public $theAwayTeamScore;
    public $theHomeTeamId;
    public $theHomeTeamName;
    public $theHomeTeamAbbr;
    public $theHomeTeamScore;
    public $theBalls;
    public $theStrikes;
    public $theOuts;
    public $thePitcherId;
    public $thePitcherName;
    public $thePitcherTeamId;
    public $thePitcherTeamName;
    public $thePitcherTeamAbbr;
    public $theCatcherId;
    public $theCatcherName;
    public $theBatterId;
    public $theBatterName;
    public $theBatterRightOrLeft;
    public $theBatterTeamId;
    public $theBatterTeamName;
    public $theBatterTeamAbbr;
    public $theBatterOnDeckId;
    public $theBatterOnDeckName;
    public $theOn1bId;
    public $theOn1bName;
    public $theOn2bId;
    public $theOn2bName;
    public $theOn3bId;
    public $theOn3bName;
    public $thePitchTypeSequence;
    public $thePitchLocationSequence;
    public $thePitchOutcomeSequence;
    public $theHomeTeamBattingOrderBatterIds;
//    public $theHomeTeamBattingOrderBatterNames;
    public $theAwayTeamBattingOrderBatterIds;
//    public $theAwayTeamBattingOrderBatterNames;
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

    public function __construct($userid)
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/PostedVariablesDbProxy.php';

//        if (isset($_REQUEST['UserId']))
//        {
//            $this->theUserId = $_REQUEST['UserId'];
//        }
//        else 
//        {
            $this->theUserId = $userid;
//        }
        
//        echo $this->theUserId;
        
        $this->initialize();
//        $this->update();
    }
    
    public function __destruct()
    {        
    }

    public function initialize()
    {        
//        $aPostedVariablesDbProxyObject = new PostedVariablesDbProxy('pitchpre_user_db');
        
//        //check to see if the user has a row in the posted_variables_table db table, if not create one        
//        $result = $aPostedVariablesDbProxyObject->getPostedVariables($this->theUserId);
//        
//        $num_rows = $aPostedVariablesDbProxyObject->dbProxyNumResults($result);
//        
//        if ($num_rows == 0 && $this->theUserId != NULL)
//        {   
            //create the row
//            $insert = "INSERT INTO posted_variables_table (user_ID_entering_data_ID) VALUES ('$this->theUserId')";
//            
//            $aPostedVariablesDbProxyObject->dbProxyQuery($insert);
            
            //Initialize some variables
            $this->theHomeTeamScore = 0;
            $this->theAwayTeamScore = 0;
            $this->theHomeTeamId = 0;
            $this->theAwayTeamId = 0;
            $this->theBalls = 0;
            $this->theStrikes = 0;
            $this->theOuts = 0;
            $this->theHomeTeamBattingOrderBatterIds = "0,0,0,0,0,0,0,0,0";
            $this->theAwayTeamBattingOrderBatterIds = "0,0,0,0,0,0,0,0,0";
            $this->thePitcherOrBatter = "PITCHER";
            $this->theBaseRunnerType = "EXACT";
            $this->thePitcherType = "EXACT";
            $this->thePitcherId = 0;
            $this->thePitcherTeamId = 0;
            $this->theCatcherType = "EXACT";
            $this->theCatcherId = 0;
            $this->theBatterType = "EXACT";
            $this->theBatterRightOrLeft = "R";
            $this->theBatterId = 0;
            $this->theBatterTeamId = 0;
            $this->theOnDeckBatterType = "EXACT";
            $this->theBatterOnDeckId = 0;
            $this->theOn1bId = 0;
            $this->theOn2bId = 0;
            $this->theOn3bId = 0;
            $this->theOutcomeType = "ANY";
            $this->thePitchType = "ANY";
            $this->theHotZone = "ANY";
            $this->theAtBatNumber = "ANY";
            $this->theInning = 1;
            $this->theTopOrBottomHalf = "TOP";
            $this->theYearToQuery = "2009";
            
            //update the row with the initialized variables
//            $this->update();
//        }
        
//        $aPostedVariablesDbProxyObject->dbProxyClose();
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
        echo "theUserId $this->theUserId";
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
        return "UserId=$this->theUserId&YearToQuery=$this->theYearToQuery&AtBatNumber=$this->theAtBatNumber&Inning=$this->theInning&TopOrBottomHalf=$this->theTopOrBottomHalf&HomeTeamBattingOrderBatterIds=$this->theHomeTeamBattingOrderBatterIds&AwayTeamBattingOrderBatterIds=$this->theAwayTeamBattingOrderBatterIds&On1BId=$this->theOn1bId&On2BId=$this->theOn2bId&On3BId=$this->theOn3bId&CatcherId=$this->theCatcherId&BatterId=$this->theBatterId&BatterTeamId=$this->theBatterTeamId&BatterRightOrLeft=$this->theBatterRightOrLeft&BatterOnDeckId=$this->theBatterOnDeckId&PitcherId=$this->thePitcherId&PitcherTeamId=$this->thePitcherTeamId&AwayTeamId=$this->theAwayTeamId&AwayTeamScore=$this->theAwayTeamScore&HomeTeamId=$this->theHomeTeamId&HomeTeamScore=$this->theHomeTeamScore&Balls=$this->theBalls&Strikes=$this->theStrikes&Outs=$this->theOuts&PitcherOrBatter=$this->thePitcherOrBatter&BaseRunnerType=$this->theBaseRunnerType&PitcherType=$this->thePitcherType&CatcherType=$this->theCatcherType&BatterType=$this->theBatterType&OnDeckBatterType=$this->theOnDeckBatterType&OutcomeType=$this->theOutcomeType&PitchType=$this->thePitchType&HotZone=$this->theHotZone&PitchTypeSequence=".implode(",", $this->thePitchTypeSequence)."&PitchLocationSequence=".implode(",", $this->thePitchLocationSequence)."&PitchOutcomeSequence=".implode(",", $this->thePitchOutcomeSequence);
    }

    public function retrieveDBStateVariables()
    {
        include $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Util/StringUtil.php';
        
        $aPostedVariablesDbProxyObject = new PostedVariablesDbProxy('pitchpre_user_db');
        
        if ($this->theUserId != "null")
        { 
            $result = $aPostedVariablesDbProxyObject->getPostedVariables($this->theUserId);

            $num_rows = $aPostedVariablesDbProxyObject->dbProxyNumResults($result);
        
            //should only ever be 1 row...
            while($row = $aPostedVariablesDbProxyObject->dbProxyFetchAssocArray($result))
            {
                $object = json_decode($row['current_posted_variables']);
                
                break;
            }
                
            $this->theUserId = $object->theUserId;
            $this->thePassword = $object->thePassword;
            $this->theAwayTeamId = $object->theAwayTeamId;
            $this->theAwayTeamName = $object->theAwayTeamName;
            $this->theAwayTeamAbbr = $object->theAwayTeamAbbr;
            $this->theAwayTeamScore = $object->theAwayTeamScore;
            $this->theHomeTeamId = $object->theHomeTeamId;
            $this->theHomeTeamName = $object->theHomeTeamName;
            $this->theHomeTeamAbbr = $object->theHomeTeamAbbr;
            $this->theHomeTeamScore = $object->theHomeTeamScore;
            $this->theBalls = $object->theBalls;
            $this->theStrikes = $object->theStrikes;
            $this->theOuts = $object->theOuts;
            $this->thePitcherId = $object->thePitcherId;
            $this->thePitcherName = $object->thePitcherName;
            $this->thePitcherTeamId = $object->thePitcherTeamId;
            $this->thePitcherTeamName = $object->thePitcherTeamName;
            $this->thePitcherTeamAbbr = $object->thePitcherTeamAbbr;
            $this->theCatcherId = $object->theCatcherId;
            $this->theCatcherName = $object->theCatcherName;
            $this->theBatterId = $object->theBatterId;
            $this->theBatterName = $object->theBatterName;
            $this->theBatterRightOrLeft = $object->theBatterRightOrLeft;
            $this->theBatterTeamId = $object->theBatterTeamId;
            $this->theBatterTeamName = $object->theBatterTeamName;
            $this->theBatterTeamAbbr = $object->theBatterTeamAbbr;
            $this->theBatterOnDeckId = $object->theBatterOnDeckId;
            $this->theBatterOnDeckName = $object->theBatterOnDeckName;
            $this->theOn1bId = $object->theOn1bId;
            $this->theOn1bName = $object->theOn1bName;
            $this->theOn2bId = $object->theOn2bId;
            $this->theOn2bName = $object->theOn2bName;
            $this->theOn3bId = $object->theOn3bId;
            $this->theOn3bName = $object->theOn3bName;
            $this->thePitchTypeSequence = $object->thePitchTypeSequence;
            $this->thePitchLocationSequence = $object->thePitchLocationSequence;
            $this->thePitchOutcomeSequence = $object->thePitchOutcomeSequence;
            $this->theHomeTeamBattingOrderBatterIds = $object->theHomeTeamBattingOrderBatterIds;
            $this->theAwayTeamBattingOrderBatterIds = $object->theAwayTeamBattingOrderBatterIds;
            $this->theInning = $object->theInning;
            $this->theTopOrBottomHalf = $object->theTopOrBottomHalf;
            $this->thePitcherOrBatter = $object->thePitcherOrBatter;
            $this->theBaseRunnerType = $object->theBaseRunnerType;
            $this->thePitcherType = $object->thePitcherType;
            $this->theCatcherType = $object->theCatcherType;
            $this->theBatterType = $object->theBatterType;
            $this->theOnDeckBatterType = $object->theOnDeckBatterType;
            $this->theOutcomeType = $object->theOutcomeType;
            $this->thePitchType = $object->thePitchType;
            $this->theHotZone = $object->theHotZone;
            $this->theAtBatNumber = $object->theAtBatNumber;
            $this->theYearToQuery = $object->theYearToQuery;

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
        }
        
        $aPostedVariablesDbProxyObject->dbProxyClose();
    }

    public function postStateVariables()
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/Util/SQL_validation_functions.php';
        
        if (verifyString($_REQUEST['UserId']) == false)
        {
            die('Invalid user name.');
        }
        else if (verifyString($_REQUEST['UserId'])&&isset($_REQUEST['UserId']))
        {
            $this->theUserId = $_REQUEST['UserId'];
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
        $aPostedVariablesDbProxyObject = new PostedVariablesDbProxy('pitchpre_user_db');
        
        $aPostedVariablesDbProxyObject->updatePostedVariables($this);
        
        $aPostedVariablesDbProxyObject->dbProxyClose();
    }
    
    public function expose()
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Team.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Player.php';
//        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/BattingOrder.php';
//        
//        if (($this->theInning == NULL))
//        {
//            $this->theInning = "Select Inning";
//        }	
        
        $anOffenseTeamObject = new Team($this->theBatterTeamId, "pitchpre_pbp_".$this->theYearToQuery);
        $this->theBatterTeamName = $anOffenseTeamObject->theName;
        $this->theBatterTeamAbbr = $anOffenseTeamObject->theTeamAbbr;
        
        $aDefenseTeamObject = new Team($this->thePitcherTeamId, "pitchpre_pbp_".$this->theYearToQuery);
        $this->thePitcherTeamName = $aDefenseTeamObject->theName;
        $this->thePitcherTeamAbbr = $aDefenseTeamObject->theTeamAbbr;
        
        if (($this->thePitcherId == NULL) || ($this->thePitcherId == 0) || ($this->thePitcherId == ""))
        {
            $this->thePitcherName = "Select Pitcher";
            $this->thePitcherId = 0;
        }
        else
        {
            $pitcher = new Player($this->thePitcherId, $aDefenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
            $this->thePitcherName = $pitcher->theName;
        }

        if (($this->theCatcherId == NULL) || ($this->theCatcherId == 0) || ($this->theCatcherId == ""))
        {
            $this->theCatcherName = "Select Catcher";
            $this->theCatcherId = 0;
        }
        else
        {
            $catcher = new Player($this->theCatcherId, $aDefenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theCatcherName = $catcher->theName;
        }

        if (($this->theBatterId == NULL) || ($this->theBatterId == 0) || ($this->theBatterId == ""))
        {
            $this->theBatterName = "Select Batter";
            $this->theBatterId = 0;
        }
        else
        {
            $batter = new Player($this->theBatterId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theBatterName = $batter->theName;
        }

        if (($this->theBatterOnDeckId == NULL) || ($this->theBatterOnDeckId == 0) || ($this->theBatterOnDeckId == ""))
        {
            $this->theBatterOnDeckName = "Select Batter";
            $this->theBatterOnDeckId = 0;
        }
        else
        {
            $batterOnDeck = new Player($this->theBatterOnDeckId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theBatterOnDeckName = $batterOnDeck->theName;
        }

        if (($this->theOn1bId == NULL) || ($this->theOn1bId == 0) || ($this->theOn1bId == ""))
        {
            $this->theOn1bName = "Select Base Runner";
            $this->theOn1bId = 0;
        }
        else
        {
            $on1b = new Player($this->theOn1bId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theOn1bName = $on1b->theName;
        }

        if (($this->theOn2bId == NULL) || ($this->theOn2bId == 0) || ($this->theOn2bId == ""))
        {
            $this->theOn2bName = "Select Base Runner";
            $this->theOn2bId = 0;
        }
        else
        {
            $on2b = new Player($this->theOn2bId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theOn2bName = $on2b->theName;
        }

        if (($this->theOn3bId == NULL) || ($this->theOn3bId == 0) || ($this->theOn3bId == ""))
        {
            $this->theOn3bName = "Select Base Runner";
            $this->theOn3bId = 0;
        }
        else
        {
            $on3b = new Player($this->theOn3bId, $anOffenseTeamObject->theTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theOn3bName = $on3b->theName;
        }

        if (($this->theAwayTeamId == NULL)||($this->theAwayTeamId == '')||($this->theAwayTeamId == 0))
        {
            $this->theAwayTeamName = "Select Team";
            $this->theAwayTeamId = 0;
            $this->theAwayTeamAbbr = "";
        }
        else
        {
            $awayTeam = new Team($this->theAwayTeamId, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theAwayTeamName = $awayTeam->theName;
            $this->theAwayTeamId = $awayTeam->theId;
            $this->theAwayTeamAbbr = $awayTeam->theTeamAbbr;
        }
//        
//        $tmpBattingOrderObject = new BattingOrder($this->theAwayTeamBattingOrderBatterIds, $this->theAwayTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
//        $this->theAwayTeamBattingOrderBatterNames = $tmpBattingOrderObject->theTeamBattingOrderBatterNamesArray;
//                
        if (($this->theHomeTeamId == NULL)||($this->theHomeTeamId == '')||($this->theHomeTeamId == 0))
        {
            $this->theHomeTeamName = "Select Team";
            $this->theHomeTeamId = 0;
        }
        else
        {
            $homeTeam = new Team($this->theHomeTeamId, "pitchpre_pbp_".$this->theYearToQuery);
            $this->theHomeTeamName = $homeTeam->theName;
            $this->theHomeTeamId = $homeTeam->theId;
            $this->theHomeTeamAbbr = $homeTeam->theTeamAbbr;
        }
//        
//        $tmpBattingOrderObject = new BattingOrder($this->theHomeTeamBattingOrderBatterIds, $this->theHomeTeamAbbr, "pitchpre_pbp_".$this->theYearToQuery);
//        $this->theHomeTeamBattingOrderBatterNames = $tmpBattingOrderObject->theTeamBattingOrderBatterNamesArray;
        
        return get_object_vars($this);
    }
}
?>