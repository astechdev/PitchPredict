function manageDialogInit()
{	
    //    alert('loadPitchCounters');
    jQuery("#managetabletbody").empty();    
    
    jQuery('#managetable').find('tbody:last').append('\
        <tr class=\"headerRow\">\n\
            <th id="managetableheadercolumn0">#</th>\n\
            <th id="managetableheadercolumn1">Scenario</th>\n\
            <th id="managetableheadercolumn2">Share</th>\n\
            <th id="managetableheadercolumn3">Load</th>\n\
            <th id="managetableheadercolumn4">Delete</th>\n\
        </tr>');

        
    console.log('savedUserScenariosMap: '+JSON.stringify(savedUserScenariosMap));
    console.log('savedUserScenariosMap[theScenarioNamesArray]: '+JSON.stringify(savedUserScenariosMap['theScenarioNamesArray']));
    for (var i = 0, j = savedUserScenariosMap['theScenarioNamesArray'].length; i < j; i++) 
    {
        jQuery('#managetable').find('tbody:last').append('\
            <tr class=\"inactiveRow\">\n\
                <td>'+(i+1)+':</td>\n\
                <td>'+savedUserScenariosMap['theScenarioNamesArray'][i]+':</td>\n\
                <td><input type="Button" onclick="share('+i+');" value="Share"></td>\n\
                <td><input type="Button" onclick="loadScenario('+i+');" value="Load"></td>\n\
                <td></td>\n\
            </tr>');
    }

    jQuery('#managetable').find('tbody:last').append('\
        <tr id=\"inputrowid\" class=\"activeRow\">\n\
            <td>'+(i + 1)+':</td>\n\
            <td id=\"pitchtypeselectidclone\"></td>\n\
            <td id=\"pitchlocationselectidclone\"></td>\n\
            <td id=\"pitchoutcomeselectidclone\"></td>\n\
            <td></td>\n\
        </tr>//');

    jQuery('#managetable').find('tbody:last').append('\
        <tr id="addrowid" class="addRow">\n\
            <td></td>\n\
            <td><div>\n\
            <td></td>\n\
            <td></td>\n\
            <td></td>\n\
        </tr>');
//    $( "#dialog-message" ).empty();
   
    $( "#managedialogcontainer" ).dialog({
        autoOpen: true,
        modal: true,
        height: dialogheight,
        width: dialogwidth,
        resizable: false,
        draggable: false,
        title: "Save Curent State",
        closeOnEscape: false,
        buttons: {
            test: function() {
                helpDialogInit('info', 'Hot Zone', hotzoneHelp);TrackButtonClicked('Help', 'viewed', 'Hot Zone', 1);
            },
            Close: function() {
                jQuery( this ).dialog( "close" );
            }
        }
    });
}

function loadScenario(index)
{
    console.log('stateVariablesMap: '+JSON.stringify(stateVariablesMap));
    console.log('savedUserScenariosMap[theStateVariablesArray][index]: '+JSON.stringify(savedUserScenariosMap['theStateVariablesArray'][index]));
    stateVariablesMap = savedUserScenariosMap['theStateVariablesArray'][index];
    console.log('stateVariablesMap: '+JSON.stringify(stateVariablesMap));
    $( "#managedialogcontainer" ).dialog( "close" );
    saveState();
}

function share(index)
{
    helpDialogInit('info', 'Share', "<pre><code>"+JSON.stringify(savedUserScenariosMap['theStateVariablesArray'][index], null, 4)+"</code></pre>");TrackButtonClicked('Manage Saved Scenarios', 'shared', 'Share', 1);
}

function deleteDialogInit()
{
    $( "#dialog-message" ).empty();
   
    $( "#dialog" ).dialog({
        autoOpen: true,
        modal: true,
        height: dialogheight,
        width: dialogwidth,
        resizable: false,
        draggable: false,
        title: "Delete Saved States",
        closeOnEscape: false,
        buttons: {
            Delete: function() {
                jQuery( this ).dialog( "close" );
            },
            Close: function() {
                jQuery( this ).dialog( "close" );
            }
        }
    });
   
    $( "#dialog-message" ).append('');
}