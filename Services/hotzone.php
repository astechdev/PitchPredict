<?php
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/HotZone.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->postStateVariables();
//    $aStateVariablesObject->printStateVariables();

    $aHotZoneObject = new HotZone($aStateVariablesObject);
?>
<style type="text/css">        
    #hotzone h6 {
        font-size: 90%;
        -webkit-margin-before: 0em;
    } 

    tr.titlerow td{
        border-bottom: .1em solid black;  
    }

    .chart {
        position: relative;
        top: 1px;
        left: 45px;
    }

    #hotzonetable{
        position: relative;
        cursor: pointer;
        width: 13em;
        height: 17em;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5em;
    }

    #hotzonetable td {
        color:white;
        font-weight:lighter;
        text-align:center;
        vertical-align: middle;
    }

    #hotzonetable td:hover {	
        background:#000000;
        cursor:pointer;
    }
    
    .tracker{
        color: #aaa;
        text-align: left;
        margin-bottom: -1em;
        cursor:pointer;
        font-size: 120%;
    }
    
    .tracker h6{
        font-size: .8em;
    }
    
    .tracker a {
        color: #2568a0;
        font-weight:bold;
    }
</style>

<!--<div id="charttrackercontainer">
    <div id="pitchtypepercentagecharttracker" class="tracker">
        <?php
            if ($aStateVariablesObject->thePitchType == "ANY")
            {
                echo "<h6>Pitch Type Overview</h6>";
            }
            else
            {
//                if ($aStateVariablesObject->theOutcomeType == "ANY")
//                {
                    echo "<h6><a onClick=resetPitchType()>Pitch Type Overview</a> > ".$aStateVariablesObject->thePitchType."</h6>";
//                }
//                else
//                {
//                    echo "<h6><a onClick=resetPitchType()>Pitch Type Overview</a> > ".$aStateVariablesObject->thePitchType." > ".$aStateVariablesObject->theOutcomeType."</h6>";
//                }
            }
        ?>
    </div>
    <div id="outcomepercentagecharttracker" class="tracker">
        <?php
            if ($aStateVariablesObject->theOutcomeType == "ANY")
            {
                echo "<h6>Outcome Overview</h6>";
            }
            else
            {
//                if ($aStateVariablesObject->thePitchType == "ANY")
//                {
                    echo "<h6><a onClick=resetOutcome()>Outcome Overview</a> > ".$aStateVariablesObject->theOutcomeType."</h6>";
//                }
//                else
//                {
//                    echo "<h6><a onClick=resetOutcome()>Outcome Overview</a> > ".$aStateVariablesObject->theOutcomeType." > ".$aStateVariablesObject->thePitchType."</h6>";
//                }
            }
        ?>
    </div>
</div>-->
<div id="hotzonezonetrackercontainer">
        <div id="hotzonezonetracker" class="tracker">
            <?php
                if ($aStateVariablesObject->theHotZone == "ANY")
                {
                    echo "<h6>Hot Zone Overview</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 1")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 1</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 2")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 2</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 3")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 3</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 4")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 4</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 5")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 5</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 6")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 6</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 7")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 7</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 8")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 8</h6>";
                }
                else if ($aStateVariablesObject->theHotZone == "ZONE 9")
                {
                    echo "<h6><a onClick=setHotzone(zoneAny)>Hot Zone Overview</a> > Hot Zone 9</h6>";
                }
            ?>
    </div>
</div>
<div id="hotzone">
    <table id="hotzonetable">
            <tr>
                    <td onclick=setHotzone(zone1) bgcolor=<?php echo $aHotZoneObject->theZone1Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone1Object->thePercentage < 100 && $aHotZoneObject->theZone1Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone1Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone1Object->thePercentage < 10 && $aHotZoneObject->theZone1Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone1Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone1Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone1Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone1Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone2) bgcolor=<?php echo $aHotZoneObject->theZone2Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone2Object->thePercentage < 100 && $aHotZoneObject->theZone2Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone2Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone2Object->thePercentage < 10 && $aHotZoneObject->theZone2Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone2Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone2Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone2Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone2Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone3) bgcolor=<?php echo $aHotZoneObject->theZone3Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone3Object->thePercentage < 100 && $aHotZoneObject->theZone3Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone3Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone3Object->thePercentage < 10 && $aHotZoneObject->theZone3Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone3Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone3Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone3Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone3Object->thePercentage;
                                    }
                            ?>
                    </td>
            </tr>
            <tr>
                    <td onclick=setHotzone(zone4) bgcolor=<?php echo $aHotZoneObject->theZone4Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone4Object->thePercentage < 100 && $aHotZoneObject->theZone4Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone4Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone4Object->thePercentage < 10 && $aHotZoneObject->theZone4Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone4Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone4Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone4Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone4Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone5) bgcolor=<?php echo $aHotZoneObject->theZone5Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone5Object->thePercentage < 100 && $aHotZoneObject->theZone5Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone5Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone5Object->thePercentage < 10 && $aHotZoneObject->theZone5Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone5Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone5Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone5Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone5Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone6) bgcolor=<?php echo $aHotZoneObject->theZone6Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone6Object->thePercentage < 100 && $aHotZoneObject->theZone6Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone6Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone6Object->thePercentage < 10 && $aHotZoneObject->theZone6Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone6Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone6Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone6Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone6Object->thePercentage;
                                    }
                            ?>
                    </td>
            </tr>
            <tr>
                    <td onclick=setHotzone(zone7) bgcolor=<?php echo $aHotZoneObject->theZone7Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone7Object->thePercentage < 100 && $aHotZoneObject->theZone7Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone7Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone7Object->thePercentage < 10 && $aHotZoneObject->theZone7Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone7Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone7Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone7Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone7Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone8) bgcolor=<?php echo $aHotZoneObject->theZone8Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone8Object->thePercentage < 100 && $aHotZoneObject->theZone8Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone8Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone8Object->thePercentage < 10 && $aHotZoneObject->theZone8Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone8Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone8Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone8Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone8Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone9) bgcolor=<?php echo $aHotZoneObject->theZone9Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone9Object->thePercentage < 100 && $aHotZoneObject->theZone9Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone9Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone9Object->thePercentage < 10 && $aHotZoneObject->theZone9Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone9Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone9Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone9Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone9Object->thePercentage;
                                    }
                            ?>
                    </td>
            </tr>
<!--		<tr>
                    <td onclick=setHotzone(zone10) bgcolor=<?php echo $aHotZoneObject->theZone10Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone10Object->thePercentage < 100 && $aHotZoneObject->theZone10Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone10Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone10Object->thePercentage < 10 && $aHotZoneObject->theZone10Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone10Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone10Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone10Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone10Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone11) bgcolor=<?php echo $aHotZoneObject->theZone11Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone11Object->thePercentage < 100 && $aHotZoneObject->theZone11Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone11Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone11Object->thePercentage < 10 && $aHotZoneObject->theZone11Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone11Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone11Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone11Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone11Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone12) bgcolor=<?php echo $aHotZoneObject->theZone12Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone12Object->thePercentage < 100 && $aHotZoneObject->theZone12Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone12Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone12Object->thePercentage < 10 && $aHotZoneObject->theZone12Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone12Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone12Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone12Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone12Object->thePercentage;
                                    }
                            ?>
                    </td>
            </tr>
            <tr>
                    <td onclick=setHotzone(zone13) bgcolor=<?php echo $aHotZoneObject->theZone13Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone13Object->thePercentage < 100 && $aHotZoneObject->theZone13Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone13Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone13Object->thePercentage < 10 && $aHotZoneObject->theZone13Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone13Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone13Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone13Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone13Object->thePercentage;
                                    }
                            ?>
                    </td>
                    <td onclick=setHotzone(zone14) bgcolor=<?php echo $aHotZoneObject->theZone14Object->theBackground?> >
                            <?php 
                                    if ($aHotZoneObject->theZone14Object->thePercentage < 100 && $aHotZoneObject->theZone14Object->thePercentage >= 10)
                                    { 
                                            echo ".0".$aHotZoneObject->theZone14Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone14Object->thePercentage < 10 && $aHotZoneObject->theZone14Object->thePercentage > 0)
                                    { 
                                            echo ".00".$aHotZoneObject->theZone14Object->thePercentage;
                                    }
                                    else if ($aHotZoneObject->theZone14Object->thePercentage == 0)
                                    { 
                                            echo ".000";
                                    }
                                    else if ($aHotZoneObject->theZone14Object->thePercentage >= 100)
                                    { 
                                            echo ".".$aHotZoneObject->theZone14Object->thePercentage;
                                    }
                            ?>
                    </td>
            </tr>-->
    </table>
</div>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29743249-1']);
  _gaq.push(['_setDomainName', 'pitchpredict.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>