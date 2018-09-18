/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* This javascript is associated to the TestPage.html */
'use strict';


var URLinput  = [];
var inputText  = document.getElementById("inputText");
var messageBox  = document.getElementById("display");


console.trace("HELLO ENTERING IN THE CODE");
/* APIurl='/api/message' */

//app.use(bodyParser.json());

function testAPI(APIurl) {
	
	messageBox.innerHTML="<br><b>CALLING REST APIs</b> <br/>";
	messageBox.innerHTML+="current URL: "+APIurl;
	
	var http = new XMLHttpRequest();
    http.open('POST', APIurl, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        Api.setResponsePayload(http.responseText);
        messageBox.innerHTML+=" <br/> Reponse provided: "+http.responseText;
        
      }
    };
    var params = JSON.stringify({"auth":{"passwordCredentials":{"username":"CMA_User", "password":"CMA_Password"}}});
 // Send request
    http.send(params);
    
/*request(app)
    .post(APIurl)
    .set('Accept', /application\/json/)
    .expect('Content-Type', /application\/json/)
    .send({"auth":{"passwordCredentials": {"username": "YOUR_USER","password": "YOUR_PASSWORD"}}})
    .expect(function(res) {
       if (!res.body) throw new Error('Body was not present in response');
       console.log(res.body);
       if (!res.body.output) throw new Error('\'Output\' was not present in response');
       if (!res.body.output.text) throw new Error('\'text\' was not present in response');
     })
     .expect(200, done);	*/
		
	
	//messageBox.innerHTML+=" <br/> Response provided:"+Api.getResponsePayload;
	//clearAndShow();

	}

function clearAndShow () {
	
	//inputText.value = "";
    //messageBox.innerHTML = "";
    messageBox.innerHTML += " <br/> Previous API calls : " + URLinput.join(", ") + "<br/>";
}
function display() {
	console.log("Calling Rest APIs");
	URLinput.push(inputText.value);
	/* Call to API*/
    testAPI(inputText.value);
    
}


//describe('Basic API tests', function testAPI() {
  //it('GET to / should load the home page', function(done) {
  //  request(app).get('/').expect(200, done);
 // });

 // it('POST to /api/message should return error message', function(done) {
 //   request(app)
	//    .post('/api/message')
	//    .set('Accept', /application\/json/)
	 //     .expect('Content-Type', /application\/json/)
	 // .send({'input': {'text': 'Hello'}})
	 //.expect(function(res) {
	 //  if (!res.body) throw new Error('Body was not present in response');
	 //   console.log(res.body);
	 //  if (!res.body.output) throw new Error('\'Output\' was not present in response');
	 // if (!res.body.output.text) throw new Error('\'text\' was not present in response');
	 //})
	 //  .expect(200, done);
	 // });
//});
