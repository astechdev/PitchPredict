<?php	
//    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
//    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/HotZone.php';

//    $aStateVariablesObject = new StateVariables();
//    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();
    
    if (($aStateVariablesObject->theAtBatNumber != "ANY"))
    {
        $atBatNumber = $aStateVariablesObject->theAtBatNumber;
    }
    else
    {
        $atBatNumber = "ANY";
    }
    
    if (($aStateVariablesObject->theInning != "ANY"))
    {
        $inning = $aStateVariablesObject->theInning;
    }
    else
    {
        $inning = "ANY";
    }
    
    if (($aStateVariablesObject->theTopOrBottomHalf == "TOP") || ($aStateVariablesObject->theTopOrBottomHalf == "BOTTOM"))
    {
        $topOrBottomHalf = $aStateVariablesObject->theTopOrBottomHalf;
    }
    else
    {
        $topOrBottomHalf = "ANY";
    }
?>

	<table id="filters">
            <tr>
                <td>
                    Year:
                </td>
                <td> 
                    <select id="yeartoqueryId" name="YearToQuery">
                    <option value = "<?php echo $aStateVariablesObject->theYearToQuery;?>"><?php echo $aStateVariablesObject->theYearToQuery;?></option>
                    <?php 
                        for($i = 2009; $i<2010; $i++)
                        {
                            print '<option onclick="setYearToQuery(\''.$i.'\')" value=\"'.$i.'\">'.$i.'</option>';
                        }
                    ?>
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
            </tr>
<!--            <tr>
                <td>
                    At Bat #:
                </td>
                <td> 
                    <select id="atbatnumberId" name="AtBatNumber">
                    <option value = "<?php echo $atBatNumber;?>"><?php echo $atBatNumber;?></option>
                    <?php                    
                        if($atBatNumber != "ANY")
                        {
                            print '<option onclick="setAtBatNumber(\'ANY\')" value=\"ANY\">ANY</option>';
                        }
                        for($i = 1; $i<8; $i++)
                        {
//                            print '<option onclick="setAtBatNumber(\''.$i.'\')" value=\"'.$i.'\">'.$i.'</option>';
                        }
                    ?>
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
            </tr>-->
            <tr>
                <td>
                    Inning #:
                </td>
                <td> 
                    <select id="inningId" name="Inning">
                    <option value = "<?php echo $inning;?>"><?php echo $inning;?></option>
                    <?php
                        if($inning != "ANY")
                        {
                            print '<option onclick="setInning(\'ANY\')" value=\"ANY\">ANY</option>';
                        }
                        for($i = 1; $i<25; $i++)
                        {
                            print '<option onclick="setInning(\''.$i.'\')" value=\"'.$i.'\">'.$i.'</option>';
                        }
                    ?>
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
            </tr>
            <tr class="titlerow">
                <td>
                </td>
                <td>
                    Top
                </td>
                <td>
                     &nbsp;&nbsp;Bottom
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;Either
                </td>
            </tr>
            <tr>
                <td>
                    Inning:
                </td>
                <td>
                    <input type="radio" name="toporbottomhalf" onclick=setTopOrBottomHalf('TOP') <?php if($topOrBottomHalf == "TOP") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp;<input type="radio" name="toporbottomhalf" onclick=setTopOrBottomHalf('BOTTOM') <?php if($topOrBottomHalf == "BOTTOM") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp; &nbsp;&nbsp;<input type="radio" name="toporbottomhalf" onclick=setTopOrBottomHalf('ANY') <?php if($topOrBottomHalf == "ANY") echo "checked"; ?>>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
            </tr>
            <tr class="titlerow">
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    Pitcher
                </td>
                <td>
                    &nbsp;&nbsp;Batter
                </td>
                <td>
                    &nbsp;&nbsp;
                </td>
            </tr>
            <tr>
                <td>
                    Pitcher/Batter:
                    
                </td>
                <td>
                    <input type="radio" name="pitcherorbatter" onclick=setPitcherOrBatter('PITCHER') <?php if($aStateVariablesObject->thePitcherOrBatter == "PITCHER") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp;<input type="radio" name="pitcherorbatter" onclick=setPitcherOrBatter('BATTER') <?php if($aStateVariablesObject->thePitcherOrBatter == "BATTER") echo "checked"; ?>>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;
                </td>
                <td>
                    &nbsp;&nbsp;&nbsp;
                </td>
            </tr>
            <tr class="titlerow">
                <td>
                    &nbsp;&nbsp;&nbsp;Type
                </td>
                <td>
                    Exact
                </td>
                <td>
                    &nbsp;&nbsp;Similar
                </td>
                <td>
                    &nbsp;&nbsp; &nbsp;&nbsp;Any
                </td>
            </tr>
            <tr>
                <td>
                    Pitcher:
                </td>
                <td>
                    <input type="radio" name="pitchertype" onclick=setPitcherType('EXACT') <?php if($aStateVariablesObject->thePitcherType == "EXACT") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp;<input type="radio" name="pitchertype" onclick=setPitcherType('SIMILAR') <?php if($aStateVariablesObject->thePitcherType == "SIMILAR") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp; &nbsp;&nbsp;<input type="radio" name="pitchertype" onclick=setPitcherType('ANY') <?php if($aStateVariablesObject->thePitcherType == "ANY") echo "checked"; ?>>
                </td>
            </tr>
            <tr>
                <td>
                    Catcher:
                </td>
                <td>
                    <input type="radio" name="catchertype" onclick=setCatcherType('EXACT') <?php if($aStateVariablesObject->theCatcherType == "EXACT") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp;<input type="radio" name="catchertype" onclick=setCatcherType('SIMILAR') <?php if($aStateVariablesObject->theCatcherType == "SIMILAR") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp; &nbsp;&nbsp;<input type="radio" name="catchertype" onclick=setCatcherType('ANY') <?php if($aStateVariablesObject->theCatcherType == "ANY") echo "checked"; ?>>
                </td>
            </tr>
            <tr>
                <td>
                    Batter:
                </td>
                <td>
                    <input type="radio" name="battertype" onclick=setBatterType('EXACT') <?php if($aStateVariablesObject->theBatterType == "EXACT") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp;<input type="radio" name="battertype" onclick=setBatterType('SIMILAR') <?php if($aStateVariablesObject->theBatterType == "SIMILAR") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp; &nbsp;&nbsp;<input type="radio" name="battertype" onclick=setBatterType('ANY') <?php if($aStateVariablesObject->theBatterType == "ANY") echo "checked"; ?>>
                </td>
            </tr>
            <tr>
                <td>
                    On Deck:
                </td>
                <td>
                    <input type="radio" name="batterondecktype" onclick=setBatterOnDeckType('EXACT') <?php if($aStateVariablesObject->theOnDeckBatterType == "EXACT") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp;<input type="radio" name="batterondecktype" onclick=setBatterOnDeckType('SIMILAR') <?php if($aStateVariablesObject->theOnDeckBatterType == "SIMILAR") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp; &nbsp;&nbsp;<input type="radio" name="batterondecktype" onclick=setBatterOnDeckType('ANY') <?php if($aStateVariablesObject->theOnDeckBatterType == "ANY") echo "checked"; ?>>
                </td>
            </tr>
            <tr>
                <td>
                    Base Runners:
                </td>
                <td>
                    <input type="radio" name="baserunnertype" onclick=setBaseRunnerType('EXACT') <?php if($aStateVariablesObject->theBaseRunnerType == "EXACT") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp;<input type="radio" name="baserunnertype" onclick=setBaseRunnerType('SIMILAR') <?php if($aStateVariablesObject->theBaseRunnerType == "SIMILAR") echo "checked"; ?>>
                </td>
                <td>
                    &nbsp;&nbsp; &nbsp;&nbsp;<input type="radio" name="baserunnertype" onclick=setBaseRunnerType('ANY') <?php if($aStateVariablesObject->theBaseRunnerType == "ANY") echo "checked"; ?>>
                </td>
            </tr>
	</table>
