// Ashish Shah

//--------  Global variables --------------
var dashLabel = "CTATrackr Dashboard";
var stopaddLabel = "Select Bus Stop";
var apikey = "ni4WHrb4BGVAEGfP3imRy49bT";
var baseUrl = 'http://www.ctabustracker.com/bustime/api/v1/';
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//--------  HTML Templates ------------
//var optionListItem = '<option value="-1">---Route Direction---</option>'

// -------  UI methods --------------------
function showDashboardView(){
	setTitle(dashLabel);
	$('#stopaddview').fadeOut().addClass('hidden');
	$('#dashboardview').fadeIn().removeClass('hidden');
}

function showStopAddView(){
	setTitle(stopaddLabel);
	$('#dashboardview').fadeOut().addClass('hidden');
	$('#stopaddview').fadeIn().removeClass('hidden');
	doCTARequest(0,0); // get time
}

// -------  CTA Related methods -----------
// 1. API methods
function doCTARequest(type, args){
	switch(type){
		case 0: // time
			$.get(baseUrl+'gettime',{key:apikey}, function(data){
				//parseCTATime(data);
				alert('done');
			});
			break;
	}
}

// 2. Response parsing methods ------------
function parseCTATime(data){
	alert('done');
	var resp = $.xmlToJSON(data);
	var strTime = 'Time Fetch Error';
	if(resp.tm){
		var tstr = resp.tm.Text;
		strTime = tstr.slice(-8) + " " + tstr.slice(6,8) + " " + months[parseInt(tstr.charAt(4) + tstr.charAt(5))] + ", " + tstr.slice(0,4);
	}
	alert(strTime);
}

// -------  Utility methods --------------
function init(){
	setTitle(dashLabel);
}

function setTitle(text){
	$('#title').html(text);
}

// 2. UI methods
function loadOptionList(listObjectId, itemTexts, itemValues){	
	$('#'+listObjectId+' option:not[value="-1"]').remove();
	for(i=0;i<items.length;i++){
		$('#'+listObjectId).html('<option value="'+ itemValues[i]+'">'+itemTexts[i]+'</option>');
	}
}

//--------  Actual scripting ------------
$(init());

// --------  Event Bindings -------------
// for Bus Stop View
$('#busroutes').change(loadDirections);
