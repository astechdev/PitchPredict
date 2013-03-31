function openPayPalWindow()
{
    jQuery('#paypalForm').submit();
    
//    var authorize_url = "https://www.paypal.com/cgi-bin/webscr?";
//    authorize_url += "cmd=" + $('#cmd').val();
//    authorize_url += "&business=" + $('#business').val();
//    authorize_url += "&currency_code=" + $('#currency_code').val();
//    authorize_url += "no_shipping=" + $('#no_shipping').val();
//    authorize_url += "a3=" + $('#a3').val();
//    authorize_url += "p3=" + $('#p3').val();
//    authorize_url += "t3=" + $('#t3').val();
//    authorize_url += "src=" + $('#src').val();
//    authorize_url += "sra=" + $('#sra').val();
//    authorize_url += "custom=" + $('#custom').val();
//    authorize_url += "cmd=" + $('#cmd').val();
//
//    alert('authorize_url: '+authorize_url);
//    client_browser = window.open(authorize_url, '_blank', 'location=no');
//    client_browser.addEventListener('loadstop', facebookLocChanged);
}

function unsubscribe()
{
    var authorize_url = "https://www.paypal.com/cgi-bin/webscr?cmd=_subscr-find&alias=ELPT4VNNHBX5A";
    
    client_browser = window.open(authorize_url, '_blank', 'location=no');
}
