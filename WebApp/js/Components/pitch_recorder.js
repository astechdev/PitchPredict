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
            <th id="pitchrecordertableheadercolumn5"></th>\n\
            <th id="pitchrecordertableheadercolumn6"></th>\n\
            <th id="pitchrecordertableheadercolumn7"></th>\n\
        </tr>');

    for (var i = 0, j = stateVariablesMap['thePitchTypeSequence'].length; i < j; i++) 
    {
        var undotd;
        if(i === (j-1))
        {
            undotd = '<td><div><input type=\"Submit\" id=\"undobutton\" value=\"Undo\"></div></td>'
        }
        else
        {
            undotd = '<td></td>'
        }

        jQuery('#pitchrecordertable').find('tbody:last').append('\
            <tr class=\"inactiveRow\">\n\
                <td>'+(i + 1)+':</td>\n\
                <td><input id=\"pitchtype'+i+'Id\" type=\"hidden\" name=\"Pitch'+i+'Type\" value=\"'+stateVariablesMap['thePitchTypeSequence'][i]+'\">'+stateVariablesMap['thePitchTypeSequence'][i]+'</td>\n\
                <td><input id=\"pitchlocation'+i+'Id\" type=\"hidden\" name=\"Pitch'+i+'Location\" value=\"'+stateVariablesMap['thePitchLocationSequence'][i]+'\">'+stateVariablesMap['thePitchLocationSequence'][i]+'</td>\n\
                <td><input id=\"pitchoutcome'+i+'Id\" type=\"hidden\" name=\"Pitch'+i+'Outcome\" value=\"'+stateVariablesMap['thePitchOutcomeSequence'][i]+'\">'+stateVariablesMap['thePitchOutcomeSequence'][i]+'</td>\n\
                <td></td>\n\
                <td></td>\n\
                '+undotd+'\n\
            </tr>');
    }

////    jQuery('#pitchrecordertable').find('tbody:last').append('\
//        <tr id=\"inputrowid\" class=\"activeRow\">\n\
//            <td>//'+(i + 1)+':</td>\n\
//            <td id=\"pitchtypeselectid\"></td>\n\
//            <td id=\"pitchlocationselectid\"></td>\n\
//            <td id=\"pitchoutcomeselectid\"></td>\n\
//            <td></td>\n\
//            <td><div><input type=\"Submit\" id=\"submitPitch\" value=\"Go\" class=\"buttons\"></div></td>\n\
//            <td><div></div></td>\n\
//        </tr>//');

    var resettd;
//    if((i+1)>1)
//    {
//        resettd = '<td><div><input type=\"Submit\" id=\"resetpitchcounterpitchbutton\" value=\"Reset\" class=\"buttons\"></div></td>'
//    }
//    else
//    {
        resettd = '<td></td>'
//    }

    jQuery('#pitchrecordertable').find('tbody:last').append('\
        <tr id="addrowid" class="addRow">\n\
            <td></td>\n\
            <td><div>\n\
            <td></td>\n\
            <td></td>\n\
            <td></td>\n\
            <td></td>\n\
            '+resettd+'\n\
        </tr>');

    //create pitch types drop down
    jQuery("#pitchtypeselectid").empty();
    jQuery("#pitchtypeselectid").append("Type: <br>");
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
    jQuery("#pitchoutcomeselectid").append("Outcome: <br>");
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
    jQuery("#pitchlocationselectid").append("Location: <br>");
    var pitchlocationselectdd = document.createElement("select");
    pitchlocationselectdd.name = "PitchLocation";
    pitchlocationselectdd.id = "pitchlocationId";
    pitchlocationselectdd.options[pitchlocationselectdd.length] = new Option("Select Location", "Select Location");
    for(var key in pitchLocationsMap) 
    {
        if(pitchLocationsMap.hasOwnProperty(key)) 
        {
            pitchlocationselectdd.options[pitchlocationselectdd.length] = new Option(pitchLocationsMap[key].theLocation, pitchLocationsMap[key].theLocation);
        }
    }

    //Add the dropdown to the parent node
    jQuery("#pitchlocationselectid").append(pitchlocationselectdd);  

    jQuery("#submitPitch").click(function() { 
        addToPitchSequences();
        saveState(); 
    });       

    jQuery("#undobutton").click(function() { 
        revertPitchSequences();
        saveState();
        loadPitchCounters();
    });       

    jQuery("#resetpitchcounterpitchbutton").click(function() { 
        resetPitchSequences();
        saveState();
        loadPitchCounters();
    }); 

    jQuery("#viewpitchsequencebutton").click(function() { 
        $( "#pitchcounterdialogcontainer" ).dialog("open");
    }); 

    jQuery( "#pitchcounterdialogcontainer" ).dialog({
        autoOpen: false,
        modal: true,
        height: dialogheight,
        width: dialogwidth,
        resizable: false,
        draggable: false,
        title: "Pitch Sequence",
        closeOnEscape: false,
        buttons: {
            Ok: function() {
              jQuery( this ).dialog( "close" );
            }
        }
    });

    hidePitchCounterInputRow();

    hideRemovePitchButton();
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
//    //enableResultsTab();

    jQuery("#inputrowid").fadeOut();

    jQuery("#removepitchbutton").fadeOut();

    jQuery("#addpitchbutton").fadeIn();
}

function revertPitchSequences()
{           
    stateVariablesMap['thePitchTypeSequence'].pop();
    stateVariablesMap['thePitchLocationSequence'].pop();
    stateVariablesMap['thePitchOutcomeSequence'].pop();
}

function addToPitchSequences()
{
    if(jQuery("#pitchtypeId").val().beginsWith("Select", true) || jQuery("#pitchlocationId").val().beginsWith("Select", true) ||jQuery("#pitchoutcomeId").val().beginsWith("Select", true))
    {
        alert('You must selcet a pitch type, pitch location, and a pitch outcome');
    }
    else
    {
        stateVariablesMap['thePitchTypeSequence'].push(jQuery("#pitchtypeId").val());
        stateVariablesMap['thePitchLocationSequence'].push(jQuery("#pitchlocationId").val());
        stateVariablesMap['thePitchOutcomeSequence'].push(jQuery("#pitchoutcomeId").val());
        
        //enableResultsTab();
        loadPitchCounters();
    }
}

function resetPitchSequences()
{
    for(var pitchTypeKey in stateVariablesMap['thePitchTypeSequence']) 
    {
        if(stateVariablesMap['thePitchTypeSequence'].hasOwnProperty(pitchTypeKey)) 
        {
            delete stateVariablesMap['thePitchTypeSequence'][pitchTypeKey];
        }
    }
    
    for(var pitchLocationKey in stateVariablesMap['thePitchLocationSequence']) 
    {
        if(stateVariablesMap['thePitchLocationSequence'].hasOwnProperty(pitchLocationKey)) 
        {
            delete stateVariablesMap['thePitchLocationSequence'][pitchLocationKey];
        }
    }
    
    for(var pitchOutcomeKey in stateVariablesMap['thePitchOutcomeSequence']) 
    {
        if(stateVariablesMap['thePitchOutcomeSequence'].hasOwnProperty(pitchOutcomeKey)) 
        {
            delete stateVariablesMap['thePitchOutcomeSequence'][pitchOutcomeKey];
        }
    }
}