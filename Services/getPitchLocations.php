<?php
    header("content-type: application/json");

    $data = json_decode(file_get_contents('http://pitchpredict.com/PitchPredict/Services/trackApiUseage.php?ApiKey='.$_REQUEST['ApiKey']));
//    var_dump($data);
    if($data->{'response'} == 'true')
    {
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DBProxies/DbProxy.php';
        include_once $_SERVER['DOCUMENT_ROOT'].'/PitchPredict/DataTypes/Locations.php';

        $locationsArray = array();

        $aDbProxyObject = new DbProxy("pitchpre_pbp_".$_REQUEST['YearToQuery']);

        $query = "SELECT * FROM zones ORDER BY zone asc";

        $result = $aDbProxyObject->dbProxyQuery($query);

        while($row = $aDbProxyObject->dbProxyFetchAssocArray($result))
        {
            $locationsArray[] = new Locations($row['id'], $row['zone']);
        }

        // Wrap and write a JSON-formatted object with a function call, using the supplied value of parm 'callback' in the URL:
        echo $_GET['callback']. '('. json_encode($locationsArray) . ')';
    }
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
