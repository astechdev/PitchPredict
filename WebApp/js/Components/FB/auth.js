//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////



////Detect when Facebook tells us that the user's session has been returned
//function authUser() {
//    alert('authUser');
//    FB.Event.subscribe('auth.statusChange', handleStatusChange);
//}

function getLoginStatus() {
    alert("getLoginStatus");
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            alert('logged in');
            jQuery('#logoutcontainer').show();
            jQuery('#logincontainer').hide();
        } else {
            alert('not logged in');
            jQuery('#logoutcontainer').hide();
            jQuery('#logincontainer').show();
        }
    });
}

// Handle status changes
function handleStatusChange(session) {
    alert('Got the user\'s session: ', session);
    
    if (session.authResponse) {
        document.body.className = 'connected';
        
        jQuery('#logoutcontainer').show();
        jQuery('#logincontainer').hide();
        
        //Fetch user's id, name, and picture
        FB.api('/me', {
            fields: 'name, email, picture'
        },
        function(response) {
            if (!response.error) {
                user = response;
            
                alert('Got the user\'s name, email, and picture: ', response);
            
                //Update display of user name and picture
                if (document.getElementById('user-name')) {
                    document.getElementById('user-name').innerHTML = user.name;
                }
                
                jQuery('#profileInfo').append('<img id="user-picture" src=""/>');
                
                if (document.getElementById('user-picture')) {
                    document.getElementById('user-picture').src = user.picture.data.url;
                }
            }
          
        //register users so that PitchPredict can store state variables and track subscription level
        //          var url = 'http://www.pitchpredict.com/PitchPredict/Services/register.php?UserName='+user.name+'&email='+user.email;
        //          
        //          jQuery.getJSON(url, function(data) 
        //            {
        //                userInfoMap.UserName = user.name;
        //                load();
        //            }).error(function(e) { 
        //                userInfoMap.UserName = "false"; helpDialogInit("alert", "Error!", "You did not enter a valid user name and password.  "); alert(JSON.stringify(e));});
        //          clearAction();
        });
    }
    else  {
        document.body.className = 'not_connected';
        
        jQuery('#logoutcontainer').hide();
        jQuery('#logincontainer').show();
            
        //Update display of user name and picture
        if (document.getElementById('user-name')) {
            document.getElementById('user-name').innerHTML = "";
        }

        jQuery('#user-picture').remove();
    
    //      clearAction();
    }
}

//Check the current permissions to set the page elements.
//Pass back a flag to check for a specific permission, to
//handle the cancel detection flow.
function checkUserPermissions(permissionToCheck) {
    var permissionsFQLQuery = 'SELECT ' + permissions.join() + ' FROM permissions WHERE uid = me()';
    FB.api('/fql', {
        q: permissionsFQLQuery
    },
    function(response) {
        if (document.body.className != 'not_connected') {
            for (var i = 0; i < permissions.length; i++) {
                var perm = permissions[i];
            //              var enabledElementName = document.getElementById('enabled_perm_' + perm);
            //              var disabledElementName = document.getElementById('disabled_perm_' + perm);
            //              if (response.data[0][perm] == 1) {
            //                enabledElementName.style.display = 'block';
            //                disabledElementName.style.display = 'none';
            //              } else {
            //                enabledElementName.style.display = 'none';
            //                disabledElementName.style.display = 'block';
            //              }
            }
            if (permissionToCheck) {
                if (response.data[0][permissionToCheck] == 1) {
                    setAction("The '" + permissionToCheck + "' permission has been granted.", false);
                    setTimeout('clearAction();', 2000);
                    return true;
                } else {
                    setAction('You need to grant the ' + permissionToCheck + ' permission before using this functionality.', false);
                    setTimeout('clearAction();', 2000);
                }
                return false;
            }
            return true;
        }
    });
}

//Prompt the user to login and ask for the 'email' permission           
function login() {
    alert("login");
    FB.login(
    function(response) {
        if (response.session) {
            alert('logged in');
        
            jQuery('#logoutcontainer').show();
            jQuery('#logincontainer').hide();

            //Fetch user's id, name, and picture
            FB.api('/me', {
                fields: 'name, email, picture'
            },
            function(response) {
                if (!response.error) {
                    user = response;

                    alert('Got the user\'s name, email, and picture: ', response);
                    
                    //Update display of user name and picture
                    if (document.getElementById('user-name')) {
                        document.getElementById('user-name').innerHTML = user.name;
                    }

                    jQuery('#profileInfo').append('<img id="user-picture" src=""/>');

                    if (document.getElementById('user-picture')) {
                        document.getElementById('user-picture').src = user.picture.data.url;
                    }
                }

            //register users so that PitchPredict can store state variables and track subscription level
            //          var url = 'http://www.pitchpredict.com/PitchPredict/Services/register.php?UserName='+user.name+'&email='+user.email;
            //          
            //          jQuery.getJSON(url, function(data) 
            //            {
            //                userInfoMap.UserName = user.name;
            //                load();
            //            }).error(function(e) { 
            //                userInfoMap.UserName = "false"; helpDialogInit("alert", "Error!", "You did not enter a valid user name and password.  "); alert(JSON.stringify(e));});
            //          clearAction();
            });
        } else {
            alert('not logged in');
            document.body.className = 'not_connected';

            jQuery('#logoutcontainer').hide();
            jQuery('#logincontainer').show();
            jQuery('#user-picture').remove();
        }
    },
    { scope: "email" }
);
}
//function promptLogin() {
//    alert('promptLogin');
//    
//    FB.Event.subscribe('auth.login', function(response) {
//        alert('auth.login event');
//    });
//            
//    FB.Event.subscribe('auth.logout', function(response) {
//        alert('auth.logout event');
//    });
//
//    FB.Event.subscribe('auth.sessionChange', function(response) {
//        alert('auth.sessionChange event');
//    });
//
//    FB.Event.subscribe('auth.statusChange', function(response) {
//        alert('auth.statusChange event');
//    });
//    
//    if(phonegap === 'true')
//    {
//        FB.init({
//            appId: gAppID, 
//            nativeInterface: CDV.FB, 
//            useCachedDialogs: false,
//            status: true,
//            cookie: true,
//            xfbml: true
//        });
//        
//    }
//    else
//    {
//        FB.init({ 
//            appId: gAppID,
//            status: true,
//            cookie: true,
//            xfbml: true,
//            frictionlessRequests: true,
//            useCachedDialogs: true,
//            oauth: true
//        });
//    }
//        
//    FB.login(
//        function(response) {    
//            alert("login response: "+JSON.stringify(response));
//            if (response.status == 'connected') 
//            {
//                fb_token = response.authResponse.accessToken;
//                if(phonegap === 'true')
//                {
//                    //Fetch user's id, name, and picture
//                    FB.api('/me', {
//                        fields: 'name, email, picture'
//                    },
//                    function(response) {
//                        alert("Fetch user's id, name, and picture: "+JSON.stringify(response));
//                        if (!response.error) {
//                            user = response;
//
//                            alert('Got the user\'s name, email, and picture: ', response);
//
//                            //Update display of user name and picture
//                            if (document.getElementById('user-name')) {
//                                document.getElementById('user-name').innerHTML = user.name;
//                            }
//                            if (document.getElementById('user-picture')) {
//                                document.getElementById('user-picture').src = user.picture.data.url;
//                            }
//                        }
//                    });
//                }
//                authUser();
//                checkForCredits();
//                updateAuthElements();
//                load();
//    
//            } else if (response.status === 'not_authorized') {
//                alert('Error in authentication: not authorized');
//            } else {
//                alert('Unknown error in authentication');
//            }
//        },
//        {
//            scope: "email"
//        }
//        );
//            
//    jQuery('#logincontainer').hide();
//        
//    jQuery('#logoutcontainer').show();
//}

//This will prompt the user to grant you acess to a given permission
function promptPermission(permission) {
    FB.login(function(response) {
        if (response.authResponse) {
            checkUserPermissions(permission)
        }
    }, {
        scope: permission
    });
}

//See https://developers.facebook.com/docs/reference/api/user/#permissions
function uninstallApp() {
    FB.api('/me/permissions', 'DELETE',
        function(response) {
            window.location.reload();
        // For may instead call logout to clear
        // cache data, ex: using in a PhoneGap app
        //logout();
        });
}

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/            
function logout() {
    alert("logout");
    FB.logout(function(response) {
        alert('logged out');
        document.body.className = 'not_connected';
        
        jQuery('#logoutcontainer').hide();
        jQuery('#logincontainer').show();
            
        //Update display of user name and picture
        if (document.getElementById('user-name')) {
            document.getElementById('user-name').innerHTML = "";
        }

        jQuery('#user-picture').remove();
    });
}

//
//function logout() {
//    FB.logout(function(response) {
//        //window.location.reload();
//        });
//            
//    jQuery('#logincontainer').show();
//        
//    jQuery('#logoutcontainer').hide();
//            
//    //Update display of user name and picture
//    if (document.getElementById('user-name')) {
//        document.getElementById('user-name').innerHTML = "";
//    }
//    if (document.getElementById('user-picture')) {
//        document.getElementById('user-picture').src = "";
//    }
//}