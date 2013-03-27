// FACEBOOK
var Facebook = {
    init:function(){
 
        alert('Facebook.init');
        // Begin Authorization
        var authorize_url = "https://www.facebook.com/dialog/oauth/?";
        authorize_url += "client_id=" + gAppID;
        authorize_url += "&redirect_uri=http://www.app.pitchpredict.com/login_success.html";
        authorize_url += "&display=touch";
        authorize_url += "&state=not_connected";
        authorize_url += "&response_type=token";
        authorize_url += "&scope=publish_stream,offline_access";
    
        // Open InAppBrowser and ask for permissions
        client_browser = window.open(authorize_url, '_blank', 'location=yes');
        client_browser.addEventListener('loadstop', this.facebookLocChanged(loc));

    },
    facebookLocChanged:function(loc){
 
        alert("facebookLocChanged ");
        alert("facebookLocChanged "+loc.url);
        // When the childBrowser window changes locations we check to see if that page is our success page.
        if (loc.url.indexOf("http://www.facebook.com/connect/login_success.html") > -1) {
            //            var fbCode = loc.match(/code=(.*)$/)[1]
            //            $.ajax({
            //                url:'https://graph.facebook.com/oauth/access_token?client_id='+my_client_id+'&client_secret='+my_secret+'&code='+fbCode+'&redirect_uri=http://www.facebook.com/connect/login_success.html',
            //                data: {},
            //                dataType: 'text',
            //                type: 'POST',
            //                success: function(data, status){
            // 
            //                    // We store our token in a localStorage Item called facebook_token
            //                    localStorage.setItem(facebook_token, data.split("=")[1]);
            // 
            ////                    window.plugins.childBrowser.close();
            //                    client_browser.close();
            // 
            ////                    app.init();
            //                    load();
            //                },
            //                error: function(error) {
            ////                    window.plugins.childBrowser.close();
            //                    client_browser.close();
            //                }
            //            });
            localStorage.setItem(fb_token, getURLParameter("access_token"));
            localStorage.setItem(fb_state, getURLParameter("state"));
            alert("fb_token "+localStorage.getItem(fb_token));
            alert("fb_state "+localStorage.getItem(fb_state));
            client_browser.removeEventListener('loadstop', Facebook.facebookLocChanged);
            client_browser.close();
//            load();
        }
    },
    share:function(url){
 
        // Create our request and open the connection
        var req = new XMLHttpRequest(); 
        req.open("POST", url, true);
 
 
        req.send(null); 
        return req;
    },
    post:function(_fbType,params){
 
        // Our Base URL which is composed of our request type and our localStorage facebook_token
        var url = 'https://graph.facebook.com/me/'+_fbType+'?access_token='+localStorage.getItem(facebook_token);
 
        // Build our URL
        for(var key in params){
            if(key == "message"){
 
                // We will want to escape any special characters here vs encodeURI
                url = url+"&"+key+"="+escape(params[key]);
            }
            else {
                url = url+"&"+key+"="+encodeURIComponent(params[key]);
            }
        }
 
        var req = Facebook.share(url);
 
        // Our success callback
        req.onload = Facebook.success();
    },
    success:function(){
        $("#statusTXT").show();
        $("#statusBTN").show();
 
        // hide our info
        $("#info").hide();
 
        // reset our field
        $("#statusTXT").val('');
 
        console.log("DONE!"); 
    }
};