<?php
    header("content-type: application/json");

    include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/StateVariables.php';

    $aStateVariablesObject = new StateVariables();
    $aStateVariablesObject->retrieveDBStateVariables();
//    $aStateVariablesObject->printStateVariables();
    
    // Wrap and write a JSON-formatted object with a function call, using the supplied value of parm 'callback' in the URL:
    echo $_GET['callback']. '('. json_encode($aStateVariablesObject->expose()) . ')';
?>
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