// The Take Action API module is designed to handle all interactions with the server

var TakeAction = (function() {
	var requestAction;
	var responseAction;
	

	// Publicly accessible methods defined
	return {
		runAction : runAction,

		// The request/response getters/setters are defined here to prevent
		// internal methods
		// from calling the methods without any of the callbacks that are added
		// elsewhere.
		getRequestAction : function() {
			return requestAction;
		},
		setRequestAction : function(newActionStr) {
			requestAction = JSON.parse(newActionStr);
		},
		getResponseAction : function() {
			return responseAction;
		},
		setResponseAction : function(newActionStr) {
			responseAction = JSON.parse(newActionStr);
		}
	};


	function runAction(jsonaction) {
		var context;
		var responsefromAWAP;
		var json;
	    var latestResponse = Api.getResponsePayload();
	    if (latestResponse) {
	       context = latestResponse.context;
	    }
		console.log("Executing action: " + jsonaction.output.action);
		
		
		
		if (jsonaction.output.action === "executeProvisioningcall") {
			console.log("Detecting action Call Provisionig: " + jsonaction.output.action);
			// Built http request
			var http = new XMLHttpRequest();
			http.open('POST', "/api/cloud/callProvisioningSystem", true);
			http.setRequestHeader('Content-type', 'application/json');
			var params = JSON.stringify(jsonaction);
			http.send(params);
			http.onreadystatechange = function() {
				console.log("***** HTTP STATUS in takeaction= "+http.status);
				if (http.readyState === 4 && (http.status === 200 || http.status === 201 || http.status === 202))
					console.log(http.responseText); 				
			}
		}
		
		
		if (jsonaction.output.action === "offline") {
			console.log("Offline mode detected: " + jsonaction.output.action);
			
			// Built http request
			/*var http = new XMLHttpRequest();
			http.open('POST', "/api/cloud/createserver", true);
			http.setRequestHeader('Content-type', 'application/json');
			var params = JSON.stringify(jsonaction);
			http.send(params);
			http.onreadystatechange = function() {
				console.log("***** HTTP STATUS in takeaction= "+http.status);
				if (http.readyState === 4 && (http.status === 200 || http.status === 201 || http.status === 202))
					console.log(http.responseText); 				
			} */
		}		

		console.log("No action to execute for now");
	}	
}());
