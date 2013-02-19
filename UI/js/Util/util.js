String.prototype.beginsWith = function(t, i) { 
	if (i==false) 
	{ 
		return (t == this.substring(0, t.length)); 
	}
	else 
	{ 
		return (t.toLowerCase()== this.substring(0, t.length).toLowerCase());
	}
}

String.prototype.endsWith = function(t, i) { 
	if (i==false) 
	{ 
		return (t== this.substring(this.length - t.length));
	}
	else
	{ 
		return (t.toLowerCase() == this.substring(this.length -t.length).toLowerCase());
	}
} 

function stateChanged()
{
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
 	{
		if (xmlHttp.readyState == 4)
		{
			if(xmlHttp.status == 200)
			{
				res = xmlHttp.responseText;  // These following lines get the response and update the page
				alert('xmlHttp.responseText' + xmlHttp.responseText);
			}
			else
			{
			     alert('There was a problem with the request.');
			}
 		}
 	}
}

function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
 	{
 		//Internet Explorer
 		try
  		{
  			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  		}
 		catch (e)
  		{
  			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  		}
 	}
	return xmlHttp;
}

function pausecomp(millis)
{
	var date = new Date();
	var curDate = null;
	
	do { curDate = new Date(); }
	while(curDate-date < millis);
} 