<?php

    $responseArray = array();
    //write some traking code here.  Each user will have an Api Key and a set number of api calls they can make in a day.
    //This info should be stored as separate fields in the pitch_predict_user_table.  
    //The default/free number of api calls a day should be 50 or so, then we could offer up to 500 api calls a day with the purchase of our app or as an upgrade
    //then we could charge a commercial fee...
    //
    //Take in $_REQUEST['ApiKey'] and insert a row in api_traking table (3 fields, user_id, api_key, date)
    //clear out all entries for particular $_REQUEST['ApiKey'] each day and only allow up to the number of  entries a day
    //this will allow us to limit the number of api calls a "free" user can make per day and allow to charge for more
    
    $responseArray['response'] = 'true';

    echo json_encode($responseArray);
?>
