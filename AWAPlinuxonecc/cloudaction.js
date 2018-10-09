/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
// testing new application
var router = require('express').Router();
var http = require('http'); // for CMA Auth
var https = require('https'); // for VRA Auth
var btoa = require('btoa'); // Used for Base64 encoding for OpenStack user data
var exec = require('child_process').exec;

var oauthToken = ""; // for CMA Auth
var tenants = [];
var responsefromAWAP;
var httpresponse;
var vserverID="CMA_VirtualServerID";
var tenantID="CMA_TenantID";

function sleep(time) {

	var stop = new Date().getTime();
	while (new Date().getTime() < stop + time) {
	}
}


function executeProvisioningFromDialog(req, res) {

	var reqbody = JSON.stringify(req.body);
	var provisionProjectselected;
	
	for (var i = 0; i < req.body.entities.length; i++) {
		if (req.body.entities[i].entity === "LinuxImage") {
			provisionProjectselected = req.body.entities[i].value;
		}
	}
	console.log("Deploy a virtual server image based on user interaction: "
			+ provisionProjectselected);
	// MAP Project names to internal provisioning system name. 
	// This may also be exported in the Watson Assistant service if required.
	if (provisionProjectselected === "ClefOS") {
		provisionProjectselected = "CLEFOS74";
	}
	if (provisionProjectselected === "Redhat") {
		provisionProjectselected = "RHEL7U5";
	}
	if (provisionProjectselected === "SLES") {
		provisionProjectselected = "SLS12SP4";
	}
	if (provisionProjectselected === "Ubuntu") {
		provisionProjectselected = "UBUNTU1804";
	}
	// ssh -p YOUR_PORT_NUMBER YOUR_USER@YOUR_PUBLIC_IP_ADDRESS YOUR_PROVISIONING_COMMAND 
	var child = exec('ssh -p 22 sebll@localhost echo "From here you can code any deployment from a dialog !" > /tmp/'
			+ provisionProjectselected + '.txt', function(error, stdout, stderr) { // one
																					// easy
																					// function
																					// to
																					// capture
																					// data/errors
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
	res.sendStatus(200);
	
}


// SECTION HERE UNDER TO INTERCEPT ALL CALLS FROM TakeAction.js


// Demo LinuxONE Calls
router.post('/api/cloud/callProvisioningSystem', executeProvisioningFromDialog);

module.exports = exports = router;
