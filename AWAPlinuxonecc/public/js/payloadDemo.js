// The PayloadPanel module is designed to handle
// all display and behaviors of the conversation column of the app.
/* eslint no-unused-vars: "off" */
/* global Api: true, Common: true, PayloadPanel: true*/




  
var PayloadPanelDemo = (function() {
  var settings = {
    selectors: {
      payloadColumn: '#payload-column',
      payloadInitial: '#payload-initial-message',
      payloadRequest: '#payload-request',
      payloadResponse: '#payload-response'
    },
    payloadTypes: {
      request: 'request',
      response: 'response'
    }
  };

  // Publicly accessible methods defined
  return {
    init: init,
    togglePanelDemo: togglePanelDemo,
    
  };

  

  // Toggle panel between being:
  //    reduced width (default for large resolution apps)
  //    hidden (default for small/mobile resolution apps)
  //    full width (regardless of screen size)
  function togglePanelDemo(event, element) {
    var payloadColumn = document.querySelector(settings.selectors.payloadColumn);
    if (element.classList.contains('full')) {
      element.classList.remove('full');
      payloadColumn.classList.remove('full');
    } else {
      element.classList.add('full');
      payloadColumn.classList.add('full');
    }
  }
  
//Initialize the module
  function init() {
	  payloadUpdateSetupDemo();
  }

  // Set up callbacks on payload setters in Api module
  // This causes the displayPayload function to be called when messages are sent / received
  function payloadUpdateSetupDemo() {
    var currentRequestPayloadSetter = Api.setRequestPayload;
    Api.setRequestPayload = function(newPayloadStr) {
      //currentRequestPayloadSetter.call(Api, newPayloadStr);
      displayPayloadDemo(settings.payloadTypes.request);
      //displayPayloadDemo("DEMO IMAGE");
    };

    var currentResponsePayloadSetter = Api.setResponsePayload;
    Api.setResponsePayload = function(newPayload) {
      //currentResponsePayloadSetter.call(Api, newPayload);
      displayPayloadDemo("DEMO MODE");
    };
  }

  
  function displayPayloadDemo(typeValue) {
	    // nothing for the moment
	  var messageBox  = document.getElementById("payload-column");
	  messageBox.innerHTML="<br><b>DEMO DOCKER</b> <br/>";
	  messageBox.innerHTML="<br><b>"+typeValue+"</b> <br/>";
	  }
   
 
}());
