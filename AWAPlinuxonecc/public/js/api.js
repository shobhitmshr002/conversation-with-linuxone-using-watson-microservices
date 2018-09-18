// The Api module is designed to handle all interactions with the server

var Api = (function() {
  var requestPayload;
  var responsePayload;
  var messageEndpoint = '/api/message';

  // Publicly accessible methods defined
  return {
    sendRequest: sendRequest,

    // The request/response getters/setters are defined here to prevent internal methods
    // from calling the methods without any of the callbacks that are added elsewhere.
    getRequestPayload: function() {
      return requestPayload;
    },
    setRequestPayload: function(newPayloadStr,fromAWAP) {
      requestPayload = JSON.parse(newPayloadStr);
    },
    getResponsePayload: function() {
      return responsePayload;
    },
    setResponsePayload: function(newPayloadStr) {
      responsePayload = JSON.parse(newPayloadStr);
    }
  };

  // Send a message request to the server
  function sendRequest(text, context,fromAWAP) {
	  console.log("fromAWAP 2: "+fromAWAP);
	  if (!fromAWAP) {fromAWAP=false;}
    // Build request payload
	  console.log("My LOG:" +text);
	  if (text==="OFFLINE") { console.log("OFFLINE MODE"); 
	  var messageBox  = document.getElementById("display");
	  messageBox.innerHTML = "<div align=\"center\"> <b> OFFLINE Mode Detected, AWAP has been stopped. Here under are links to continue your work ! </b></div>";
	  messageBox.innerHTML += "<div align=\"center\"> <b> RESTART AWAP </b> when your internet connection is back ! </b></div>";
	  messageBox.innerHTML += "<br/><div align=\"center\"> + <a href=\"http://localhost:1880/\"><strong class=\"payload-column\">Node-RED environment</strong></a>";
	  messageBox.innerHTML += "<br/><div align=\"center\"> + <a href=\"http://localhost:1880/dbCustRef\"><strong class=\"payload-column\">Public Customer References Informations</strong></a>";
	  messageBox.innerHTML += "<br/><div align=\"center\"> + <a href=\"file:///home/sebll/Documents/llaurency/Documents/NTC/Innovate/DemoSite/SebllCognitiveDemoCenter/site/index.html\"><strong class=\"payload-column\">Cognitive Lab</strong></a>";
	  messageBox.innerHTML += "<br/><div align=\"center\"> + <a href=\"https://10.3.57.129/dashboard/auth/login/?next=/dashboard/\"><strong class=\"payload-column\">Cloud Manager Appliance</strong></a>";
	  //messageBox.innerHTML += "Titles: " + titles.join(", ") + "<br/>";
	  
	  } else {
    var payloadToWatson = {};
    if (text) {
      payloadToWatson.input = {
        text: text
      };
    }
    if (context) {
    	 console.log("TEST INFO");
      payloadToWatson.context = context;
    }

    // Built http request
    var http = new XMLHttpRequest();
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        Api.setResponsePayload(http.responseText);
        console.log("Reponse LOG:" + http.responseText);
        var json = JSON.parse(http.responseText);   
        console.log("Action only LOG: "+ JSON.stringify(json.output.action));
        if (json.entities != "") {
        console.log("Intents only LOG: "+ JSON.stringify(json.entities[0].value));}
	    TakeAction.runAction(json);       
        
      }
    };

    var params = JSON.stringify(payloadToWatson);
    // Stored in variable (publicly visible through Api.getRequestPayload)
    // to be used throughout the application
    console.log("Reponse LOG PARAMS:" + params);
    if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
    	console.log("fromAWAP 3: "+fromAWAP);
      Api.setRequestPayload(params,fromAWAP);
    }

    // Send request
    http.send(params);
  }
}}());
