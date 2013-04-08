<?php
if(isset($_REQUEST['tx']))
{
    $tx = $_REQUEST['tx'];
    // Further processing

    // Init cURL
    $request = curl_init();

    // Set request options
    curl_setopt_array($request, array
    (
//        CURLOPT_URL => 'https://www.sandbox.paypal.com/cgi-bin/webscr',
        CURLOPT_URL => 'https://www.paypal.com/cgi-bin/webscr',
        CURLOPT_POST => TRUE,
        CURLOPT_SSL_VERIFYPEER => TRUE,
        CURLOPT_CAINFO => 'cacert.pem',
        CURLOPT_POSTFIELDS => http_build_query(array
        (
            'cmd' => '_notify-synch',
            'tx' => $tx,
            'at' => 'I07cfEkBydgXwSkj7mGi-_da7iBcqRSAT84iPOnsYlQ6yUD7M3IPIjPUmCO',
        )),
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HEADER => FALSE,
        CURLOPT_SSL_VERIFYPEER => TRUE,
        CURLOPT_CAINFO => 'cacert.pem',
    ));

    // Execute request and get response and status code
    $response = curl_exec($request);
    $status   = curl_getinfo($request, CURLINFO_HTTP_CODE);

    // Close connection
    curl_close($request);

    // Validate response
    if($status == 200 AND strpos($response, 'SUCCESS') === 0)
    {
        // Remove SUCCESS part (7 characters long)
        $response = substr($response, 7);

        // Urldecode it
        $response = urldecode($response);

        // Turn it into associative array
        preg_match_all('/^([^=\r\n]++)=(.*+)/m', $response, $m, PREG_PATTERN_ORDER);
        $response = array_combine($m[1], $m[2]);

        // Fix character encoding if needed
        if(isset($response['charset']) AND strtoupper($response['charset']) !== 'UTF-8')
        {
            foreach($response as $key => &$value)
            {
                $value = mb_convert_encoding($value, 'UTF-8', $response['charset']);
            }

            $response['charset_original'] = $response['charset'];
            $response['charset'] = 'UTF-8';
        }

        // Sort on keys
        ksort($response);
        
        $pitchpredict_user_info = json_decode($response['custom']);
        
        $aUserObject = new User($pitchpredict_user_info['id'], $pitchpredict_user_info['name'], $pitchpredict_user_info['email'], 'pitchpre_user_db');

        if(($response['payment_status'] == "Completed") || ($response['payment_status'] == "Processed"))
        {
            $aUserObject->updateSubscription($response['item_name'], $response['txn_id']);
        }
        else
        {
            $aUserObject->updateSubscription(0, $txn_id);

            @mail("pitchpredict@gmail.com", "PAYPAL payment denied", print_r($myPost, true));

            $to = $pitchpredict_user_info['email'];
            $subject = "Error with your Pitch Predict Subscription";
            $message = "Dear ".$pitchpredict_user_info['name'].",<br /><br />" .
                       "This e-mail was sent to you to because there was an error with your payment for Pitch Predict's subscription.<br /><br />" .
                       "Your upgraded subscriptjon status has been suspended until this error has been resolved." .
                       "Please visit PayPal to resolve these issues or contacts us if you have any issues.<br /><br />".
                       "Thank You.<br /><br />";
            $headers = "From: pitchpredict@gmail.com" ;
            $headers .= "To: ".$pitchpredict_user_info['email']." <".$pitchpredict_user_info['email']."><br />" ;
            $headers .= "Reply-To: pitchpredict@gmail.com<br />" ;
            $headers .= "Content-type: text/html; charset=iso-8859-1<br />";
            $headers .= "MIME-Version: 1.0<br />";
            $headers .= "X-Mailer: PHP/" . phpversion() . "<br />";
            @mail($to, $subject, $message, $headers);

            $to = $_POST['payer_email'];
            @mail($to, $subject, $message, $headers);
        }
    }
    else 
    {
        @mail("pitchpredict@gmail.com", "PAYPAL INVALID IPN ATTACK", "Invalid Response<br />data = <pre>" . $res . "<br> ".print_r($myPost, true) . "</pre>"); 
    }
}
?>
