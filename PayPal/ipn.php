<?php
//phpinfo();
include_once $_SERVER['DOCUMENT_ROOT'] . '/PitchPredict/DataTypes/User.php';

// STEP 1: Read POST data
// reading posted data from directly from $_POST causes serialization 
// issues with array data in POST
// reading raw POST data from input stream instead. 
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = array();
foreach ($raw_post_array as $keyval) {
    $keyval = explode('=', $keyval);
    if (count($keyval) == 2)
        $myPost[$keyval[0]] = urldecode($keyval[1]);
}
// read the post from PayPal system and add 'cmd'
$req = 'cmd=_notify-validate';
if (function_exists('get_magic_quotes_gpc')) {
    $get_magic_quotes_exists = true;
}
foreach ($myPost as $key => $value) {
    if ($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) {
        $value = urlencode(stripslashes($value));
    } else {
        $value = urlencode($value);
    }
    $req .= "&$key=$value";
    
//    echo $key.": ".$value;
}

// STEP 2: Post IPN data back to paypal to validate
$ch = curl_init('https://www.paypal.com/cgi-bin/webscr');
//$ch = curl_init('https://www.sandbox.paypal.com/cgi-bin/webscr');
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, TRUE);
curl_setopt($ch, CURLOPT_CAINFO, 'cacert.pem');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));

// In wamp like environments that do not come bundled with root authority certificates,
// please download 'cacert.pem' from "http://curl.haxx.se/docs/caextract.html" and set the directory path 
// of the certificate as shown below.
// curl_setopt($ch, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
if (!($res = curl_exec($ch))) {
    //error_log("Got " . curl_error($ch) . " when processing IPN data");
    curl_close($ch);
    exit;
}
curl_close($ch);


// STEP 3: Inspect IPN validation result and act accordingly
if (strcmp($res, "VERIFIED") == 0) {
    // check whether the payment_status is Completed
    // check that txn_id has not been previously processed
    // check that receiver_email is your Primary PayPal email
    // check that payment_amount/payment_currency are correct
    // process payment
    // assign posted variables to local variables
//    $receiver_email = $_POST['receiver_email'];
    $item_name = urldecode($_POST['item_name']);
    $payment_status = urldecode($_POST['payment_status']);
//    $pending_reason = $_POST['pending_reason'];
//    $payment_date = $_POST['payment_date'];
//    $payment_gross = $_POST['payment_gross'];
//    $mc_fee = $_POST['mc_fee'];
//    $txn_type = $_POST['txn_type'];
    $txn_id = urldecode($_POST['txn_id']);
//    $address_street = $_POST['address_street'];
//    $address_city = $_POST['address_city'];
//    $address_zip = $_POST['address_zip'];
//    $address_state = $_POST['address_state'];
//    $address_country = $_POST['address_country'];
//    $address_status = $_POST['address_status'];
//    $payer_id = $_POST['payer_id'];
//    $payer_email = $_POST['payer_email'];
//    $payer_status = $_POST['payer_status'];
//    $payment_type = $_POST['payment_type'];
    $pitchpredict_user_info = json_decode(trim(stripslashes($_POST['custom']), '\''),true);

    $aUserObject = new User($pitchpredict_user_info['id'], $pitchpredict_user_info['name'], $pitchpredict_user_info['email'], 'pitchpre_user_db');
    
    if(($payment_status == "Completed") || ($payment_status == "Processed"))
    {
//        @mail("pitchpredict@gmail.com", "PAYPAL VALID.  txn_id: ".$txn_id, "Verified Response<br />data = <pre>" . $res . $pitchpredict_user_info['name']."<br> ".print_r(trim(stripslashes($_POST['custom']), '\''), true) . "</pre>");
        $aUserObject->updateSubscription($item_name, $txn_id);
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
} else if (strcmp($res, "INVALID") == 0) {
    // log for manual investigation
    // PAYMENT INVALID & INVESTIGATE MANUALY! 
    // E-mail admin or alert user
    // Used for debugging
    @mail("pitchpredict@gmail.com", "PAYPAL INVALID IPN ATTACK", "Invalid Response<br />data = <pre>" . $res . "<br> ".print_r($myPost, true) . "</pre>");
}
?>