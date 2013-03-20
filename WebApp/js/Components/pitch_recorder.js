function loadPitchCounters()
{	
    //    alert('loadPitchCounters');
    jQuery("#pitchrecordertabletbody").empty();    
    
    jQuery('#pitchrecordertable').find('tbody:last').append('\
        <tr class=\"headerRow\">\n\
            <th id="pitchrecordertableheadercolumn1">#</th>\n\
            <th id="pitchrecordertableheadercolumn2">Pitch</th>\n\
            <th id="pitchrecordertableheadercolumn3">Location</th>\n\
            <th id="pitchrecordertableheadercolumn4">Outcome</th>\n\
        </tr>');

    for (var i = 0, j = stateVariablesMap['thePitchTypeSequence'].length; i < j; i++) 
    {
        jQuery('#pitchrecordertable').find('tbody:last').append('\
            <tr class=\"inactiveRow\">\n\
                <td>'+(i + 1)+':</td>\n\
                <td><input id=\"pitchtype'+i+'Id\" type=\"hidden\" name=\"Pitch'+i+'Type\" value=\"'+stateVariablesMap['thePitchTypeSequence'][i]+'\">'+stateVariablesMap['thePitchTypeSequence'][i]+'</td>\n\
                <td><input id=\"pitchlocation'+i+'Id\" type=\"hidden\" name=\"Pitch'+i+'Location\" value=\"'+stateVariablesMap['thePitchLocationSequence'][i]+'\">'+stateVariablesMap['thePitchLocationSequence'][i]+'</td>\n\
                <td><input id=\"pitchoutcome'+i+'Id\" type=\"hidden\" name=\"Pitch'+i+'Outcome\" value=\"'+stateVariablesMap['thePitchOutcomeSequence'][i]+'\">'+stateVariablesMap['thePitchOutcomeSequence'][i]+'</td>\n\
            </tr>');
    }

    jQuery('#pitchrecordertable').find('tbody:last').append('\
        <tr id=\"inputrowid\" class=\"activeRow\">\n\
            <td>'+(i + 1)+':</td>\n\
            <td id=\"pitchtypeselectidclone\"></td>\n\
            <td id=\"pitchlocationselectidclone\"></td>\n\
            <td id=\"pitchoutcomeselectidclone\"></td>\n\
        </tr>//');

    jQuery('#pitchrecordertable').find('tbody:last').append('\
        <tr id="addrowid" class="addRow">\n\
            <td></td>\n\
            <td><div>\n\
            <td></td>\n\
            <td></td>\n\
        </tr>');

    //create pitch types drop down
    jQuery("#pitchtypeselectid").empty();
    //    jQuery("#pitchtypeselectid").append("Type: <br>");
    var pitchtypeselectdd = document.createElement("select");
    pitchtypeselectdd.name = "PitchType";
    pitchtypeselectdd.id = "pitchtypeId";
    pitchtypeselectdd.options[pitchtypeselectdd.length] = new Option("Select Pitch", "Select Pitch");
    for(var key in pitchTypesMap) 
    {
        if(pitchTypesMap.hasOwnProperty(key)) 
        {
            //                    alert('add pitch type: '+pitchTypesMap[key].theAbbr);
            pitchtypeselectdd.options[pitchtypeselectdd.length] = new Option(pitchTypesMap[key].theAbbr, pitchTypesMap[key].theAbbr);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchtypeselectid").append(pitchtypeselectdd);

    //create outcome drop down
    jQuery("#pitchoutcomeselectid").empty();
    //    jQuery("#pitchoutcomeselectid").append("Outcome: <br>");
    var pitchoutcomeselectdd = document.createElement("select");
    pitchoutcomeselectdd.name = "PitchOutcome";
    pitchoutcomeselectdd.id = "pitchoutcomeId";
    pitchoutcomeselectdd.options[pitchoutcomeselectdd.length] = new Option("Select Outcome", "Select Outcome");
    for(var key in pitchOutcomesMap) 
    {
        if(pitchOutcomesMap.hasOwnProperty(key)) 
        {
            pitchoutcomeselectdd.options[pitchoutcomeselectdd.length] = new Option(pitchOutcomesMap[key].theOutcome, pitchOutcomesMap[key].theOutcome);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchoutcomeselectid").append(pitchoutcomeselectdd);

    //create location drop down
    jQuery("#pitchlocationselectid").empty();
    //    jQuery("#pitchlocationselectid").append("Location: <br>");
    var pitchlocationselectdd = document.createElement("select");
    pitchlocationselectdd.name = "PitchLocation";
    pitchlocationselectdd.id = "pitchlocationId";
    pitchlocationselectdd.options[pitchlocationselectdd.length] = new Option("Select Location", "Select Location");
    for(var key in pitchLocationsMap) 
    {
        if(pitchLocationsMap.hasOwnProperty(key)) 
        {
            pitchlocationselectdd.options[pitchlocationselectdd.length] = new Option('Zone '+pitchLocationsMap[key].theLocation, pitchLocationsMap[key].theLocation);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchlocationselectid").append(pitchlocationselectdd);  

    //create pitch types drop down
    jQuery("#pitchtypeselectidclone").empty();
    var pitchtypeselectdd = document.createElement("select");
    pitchtypeselectdd.name = "PitchType";
    pitchtypeselectdd.id = "pitchtypeIdclone";
    pitchtypeselectdd.options[pitchtypeselectdd.length] = new Option("Select Pitch", "Select Pitch");
    for(var key in pitchTypesMap) 
    {
        if(pitchTypesMap.hasOwnProperty(key)) 
        {
            //                    alert('add pitch type: '+pitchTypesMap[key].theAbbr);
            pitchtypeselectdd.options[pitchtypeselectdd.length] = new Option(pitchTypesMap[key].theAbbr, pitchTypesMap[key].theAbbr);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchtypeselectidclone").append(pitchtypeselectdd);

    //create outcome drop down
    jQuery("#pitchoutcomeselectidclone").empty();
    var pitchoutcomeselectdd = document.createElement("select");
    pitchoutcomeselectdd.name = "PitchOutcome";
    pitchoutcomeselectdd.id = "pitchoutcomeIdclone";
    pitchoutcomeselectdd.options[pitchoutcomeselectdd.length] = new Option("Select Outcome", "Select Outcome");
    for(var key in pitchOutcomesMap) 
    {
        if(pitchOutcomesMap.hasOwnProperty(key)) 
        {
            pitchoutcomeselectdd.options[pitchoutcomeselectdd.length] = new Option(pitchOutcomesMap[key].theOutcome, pitchOutcomesMap[key].theOutcome);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchoutcomeselectidclone").append(pitchoutcomeselectdd);

    //create location drop down
    jQuery("#pitchlocationselectidclone").empty();
    var pitchlocationselectdd = document.createElement("select");
    pitchlocationselectdd.name = "PitchLocation";
    pitchlocationselectdd.id = "pitchlocationIdclone";
    pitchlocationselectdd.options[pitchlocationselectdd.length] = new Option("Select Location", "Select Location");
    for(var key in pitchLocationsMap) 
    {
        if(pitchLocationsMap.hasOwnProperty(key)) 
        {
            pitchlocationselectdd.options[pitchlocationselectdd.length] = new Option('Zone '+pitchLocationsMap[key].theLocation, pitchLocationsMap[key].theLocation);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchlocationselectidclone").append(pitchlocationselectdd);  

    //    jQuery("#submitPitch").click(function() { 
    //        addToPitchSequences();
    //    });       

    //    jQuery("#undobutton").click(function() { 
    //        revertPitchSequences();
    ////        loadPitchCounters();
    //    });       

    //    jQuery("#resetpitchcounterpitchbutton").click(function() { 
    //        resetPitchSequences();
    ////        loadPitchCounters();
    //    }); 

    //    jQuery("#viewpitchsequencebutton").click(function() { 
    //        $( "#pitchcounterdialogcontainer" ).dialog("open");
    //    }); 
    
    
    
    //need to initialize the dialog div so that 
    //we can set the resize function    
    var $pitchcounterdialog = jQuery( "#pitchcounterdialogcontainer" ); // Your Dialog Div
    
    $pitchcounterdialog.dialog({
        autoOpen: false,
        modal: true,
        height: dialogheight,
        width: dialogwidth,
        resizable: false,
        draggable: false,
        title: "Pitch Sequence",
        closeOnEscape: false,
        buttons: {
            Add: function() {
                vibrateFeedback();
                addCloneToPitchSequences();
            },
            Undo: function() {
                vibrateFeedback();
                revertPitchSequences();
                saveState();
            },
            Reset: function() {
                vibrateFeedback();
                resetPitchSequences();
            },
            Ok: function() {
                vibrateFeedback();
                jQuery( this ).dialog( "close" );
            }
        }
    });//initialized
    
    //Get Dialogs Parent and find the close button. 
    //jQuery assigns .ui-dialog-titlebar-close class to the close X (a tag)
    var $pitchcounterdialogCloseBtn = $pitchcounterdialog.parent().find('.ui-dialog-titlebar-close'); 

    //hide the close button, we want our touch screen users to enjoy big buttons
    $pitchcounterdialogCloseBtn.hide();
    
    //    jQuery("#pitchcounterdialogcontainer").append('<img id=\"pitchrecorderajaxloader\" src="images/ajax-loader.gif">');

    //    hidePitchCounterInputRow();

    hideRemovePitchButton();
    jQuery("#pitchrecorderajaxloader").fadeOut(10);
    jQuery("#pitchrecordertable").fadeIn(2000);
}

function hidePitchCounterInputRow()
{	
    jQuery("#inputrowid").hide();
}

function hideRemovePitchButton()
{	
    jQuery("#removepitchbutton").hide();
}

function showPitchCounterInputRow()
{	
    //    disableResultsTab();

    jQuery("#addpitchbutton").fadeOut();

    jQuery("#inputrowid").fadeIn();

    jQuery("#removepitchbutton").fadeIn();
}

function removePitchCounterInputRow()
{
    jQuery("#pitchrecordertable").hide();
    jQuery("#pitchrecorderajaxloader").show();
    //    //enableResultsTab();

    jQuery("#inputrowid").fadeOut();

    jQuery("#removepitchbutton").fadeOut();

    jQuery("#addpitchbutton").fadeIn();
}

function revertPitchSequences()
{  
    jQuery("#pitchrecordertable").hide();
    jQuery("#pitchrecorderajaxloader").show();
    
    stateVariablesMap['thePitchTypeSequence'].pop();
    stateVariablesMap['thePitchLocationSequence'].pop();
    stateVariablesMap['thePitchOutcomeSequence'].pop();
}

function addToPitchSequences()
{   
    if(jQuery("#pitchtypeId").val() != "Select Pitch" && jQuery("#pitchlocationId").val() != "Select Location" && jQuery("#pitchoutcomeId").val() != "Select Outcome")
    {  
        jQuery("#pitchrecordertable").hide();
        jQuery("#pitchrecorderajaxloader").show();
        
        stateVariablesMap['thePitchTypeSequence'].push(jQuery("#pitchtypeId").val());
        stateVariablesMap['thePitchLocationSequence'].push(jQuery("#pitchlocationId").val());
        stateVariablesMap['thePitchOutcomeSequence'].push(jQuery("#pitchoutcomeId").val());
        
        //enableResultsTab();
        saveState();
        $( '#pitchcounterdialogcontainer' ).dialog('open');
    //        loadPitchCounters();
    }
    else
    {
        helpDialogInit("alert", "Warning!", "You must selcet a pitch type, pitch location, and a pitch outcome.");
    }
}

function addCloneToPitchSequences()
{     
    if(jQuery("#pitchtypeIdclone").val() != "Select Pitch" && jQuery("#pitchlocationIdclone").val() != "Select Location" && jQuery("#pitchoutcomeIdclone").val() != "Select Outcome")
    {  
        jQuery("#pitchrecordertable").hide();
        jQuery("#pitchrecorderajaxloader").show();
        
        stateVariablesMap['thePitchTypeSequence'].push(jQuery("#pitchtypeIdclone").val());
        stateVariablesMap['thePitchLocationSequence'].push(jQuery("#pitchlocationIdclone").val());
        stateVariablesMap['thePitchOutcomeSequence'].push(jQuery("#pitchoutcomeIdclone").val());
        
        //enableResultsTab();
        saveState();
    //        loadPitchCounters();
    }
    else
    {
        helpDialogInit("alert", "Warning!", "You must selcet a pitch type, pitch location, and a pitch outcome."); 
    }
}

function resetPitchSequences()
{
    jQuery("#pitchrecordertable").hide();
    jQuery("#pitchrecorderajaxloader").show();
    
    var len = stateVariablesMap['thePitchTypeSequence'].length
    
    while (len--) {
        revertPitchSequences();
    }
    
    saveState();
}