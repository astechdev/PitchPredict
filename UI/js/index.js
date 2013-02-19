function loadResults()
{
    jQuery('#resultscontainer').empty();
    getParamsString();
    
    var url = 'http://www.pitchpredict.com/PitchPredict/Services/Results/results.php?'+params;

//    var ifrm = document.createElement("IFRAME"); 
//    ifrm.setAttribute("src", url); 
////    ifrm.style.width = 640+"px"; 
////    ifrm.style.height = 480+"px"; 
//    jQuery('#resultscontainer').append(ifrm); 

    jQuery('#resultscontainer').prepend('<iframe id="results_iframe" scrolling="no" seamless="seamless" src="'+url+'"><p>Your browser does not support iframes.</p></iframe>');
}

function removeResults()
{
    jQuery("#resultscontainer").children().remove();
}

function disableResultsTab()
{
    jQuery("#resultstab").hide();
}

function enableResultsTab()
{
    jQuery("#resultstab").show();
}

function loadSituations()
{
	if (jQuery.cookie("UserName") == null)
	{
		//pop up a registration form or something
                alert("You must register to use this tool.");
                throw "";
	}
	else
	{
//		jQuery("#footer").hide();
//		
//		jQuery("#center_col").children().fadeOut("slow")
//		.children().remove();
//		
//		jQuery("#center_col").append('<div id="situationscontent"></div>')
//		.children("#situationscontent").hide();
//		
//		jQuery("#center_col").children("#situationscontent")
//		.load("situations.html", function()
//		{	
                    // setup ul.tabs to work as tabs for each div directly under div.panes                    
                    jQuery("ul.tabs").tabs("div.panes > div");

                    load();
                    
                    jQuery("#situationscontent").fadeIn("fast");

                    jQuery("#footer").fadeIn("slow");
//		});
	}
	
	jQuery("#toolsmenubutton").fadeOut("slow");
	
	jQuery("#situationsmenubutton").fadeOut("slow");
	
	jQuery("#homemenubutton").fadeIn("slow");
}

function loadHome()
{	
	jQuery("#homemenubutton").hide();
	
	jQuery("#footer").hide();
	
	jQuery("#center_col").children().fadeOut("slow")
	.children().remove();
	
	jQuery("#left_col").children().remove();
	
	jQuery("#right_col").children().remove();
	
	jQuery("#center_col").append('<div id="homecontent"></div>')
	.children("#homecontent").hide();
	
	jQuery("#center_col").children("#homecontent")
	.load("homecontent.html", function()
	{	
		jQuery("#homecontent").fadeIn();
		
		jQuery("#footer").fadeIn("slow");
	});
        
        jQuery("#toolsmenubutton").show();

        jQuery("#situationsmenubutton").show();
}

function loadRegister()
{
	jQuery("#footer").hide();
	
	jQuery("#center_col").children().fadeOut("slow")
	.children().remove();
	
	jQuery("#left_col").children().fadeOut("slow")
	.children().remove();
	
	jQuery("#right_col").children().fadeOut("slow")
	.children().remove();
	
	jQuery("#center_col").append('<div id="registercontent"></div>')
	.children("#registercontent").hide();
	
	jQuery("#center_col").children("#registercontent")
	.load("registercontent.php", function()
	{	
		jQuery("#registercontent").fadeIn();
		
		jQuery("#footer").fadeIn("slow");
	});
	
	jQuery("#homemenubutton").fadeIn("slow");
}