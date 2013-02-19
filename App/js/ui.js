/*

 UI assist functions
yo
*/

//show a loading screen when launched, until we get the user's session back
//setAction("Loading PitchPredict", true);
jQuery(document).ready(function() 
    {
    jQuery("#pitchpredictbutton").click(function() { 
            openPage('App'); 
            load();
        }); 

    jQuery("#logoutbutton").click(function() { 
            logout();
        });  

    jQuery("#loginbutton").click(function() { 
            openPage('Login');
        }); 

    jQuery("#registerbutton").click(function() { 
            openPage('Register');
        }); 
    });

var options = 
    { 
            beforeSubmit:  loginRequest,  // pre-submit callback 
            success:       loginResponse,  // post-submit callback 
            type:          'post',
            dataType:      'json',
            clearForm:     'true'

            // other available options: 
            //url:       url         // override for form's 'action' attribute 
            //type:      type        // 'get' or 'post', override for form's 'method' attribute 
            //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
            //clearForm: true        // clear all form fields after successful submit 
            //resetForm: true        // reset the form after successful submit 

            // $.ajax options can be used here too, for example: 
            //timeout:   3000
    };

// bind 'loginform' and provide a simple callback function 
jQuery('#login').ajaxForm(options);

//Swaps the pages out when the user taps on a choice
function openPage(pageName, ignoreHistoryPush) {
  window.scrollTo(0,1);

  var els = document.getElementsByClassName('page');
  
  for (var i = 0 ; i < els.length ; ++i) {
    els[i].style.display = 'none';
  }
  
  var page = document.getElementById('page-' + pageName);
  
  page.style.display = "block";
  
  title = (pageName == 'root') ? 'PitchPredict' : pageName.replace(/-/g, ' ');
  document.getElementById('title').innerHTML = title;
  
  if (ignoreHistoryPush != true) {
    window.history.pushState({page: pageName}, '', document.location.origin + document.location.pathname + "#" + pageName);
  }

  document.getElementById('back').style.display = (pageName == 'root') ? 'none' : 'block';
}

//window.onpopstate = function(e) {
//  if (e.state != null) {
//    console.log(e.state);
//    openPage(e.state.page);
//  }
//  else {
//    openPage('root', true);
//  }
//}

//alert('userInfoMap.UserName: '+ userInfoMap.UserName);
if(typeof userInfoMap.UserName === "undefined")
{	
//    alert('open login page');
    jQuery("#logoutbutton").hide();
    jQuery("#pitchpredictbutton").hide();
    openPage('Login', true);
}
else
{	
//    alert('open root page');
    jQuery("#loginbutton").hide();
    jQuery('#logoutbutton').show();
    jQuery('#pitchpredictbutton').show();
    jQuery('#loggedin').show();
    jQuery('#loggedinusernameid').append(userInfoMap.UserName);
    openPage('root', true);
    load();
}

//Shows a modal dialog when fetcing data from Facebook
function setAction(msg, hideBackground) {
  document.getElementById('action').style.display = 'block';
  
  if (hideBackground) {
    document.getElementById('action').style.opacity = '100';
  }
  else {
    document.getElementById('action').style.opacity = '.9';
  }
  
  document.getElementById('msg').innerHTML = msg;
  
  window.scrollTo(0, 1);
}

//Clears the modal dialog
function clearAction() {
  document.getElementById('msg').innerHTML = '';
  
  document.getElementById('action').style.display = 'none';
}

//Automatically scroll away the address bar
addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);

function hideURLbar() {
  window.scrollTo(0,1);
}

function hideButton(button) {
  button.style.display = 'none';
}
