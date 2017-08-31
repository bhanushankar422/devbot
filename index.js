'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()


const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN
var userSelectionMap = new Map();
var userSelectionObj = {
    name:'',
    doctor:'',
    hospital:'',
    time:''
};

var hospitals = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'list',
            top_element_style: "compact",
            elements: [
                {
                    title: 'HealthPartners Bloomington Clinic',
                    subtitle: 'Bloomington',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'HOSPITAL2'
                        }
                    ]
                },
                {
                    title: 'HealthPartners Bloomington Dental Clinic',
                    subtitle: 'Bloomington',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'HOSPITAL1'
                        }
                    ]
                },
                {
                    title: 'HealthPartners Eden Prairie Dental Clinic',
                    subtitle: 'Eden Prairie',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'HOSPITAL3'
                        }
                    ]
                },
                {
                    title: 'Physicians Neck and Back Clinic',
                    subtitle: 'Edina',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'HOSPITAL4'
                        }
                    ]
                }
            ]
        }
    }
};


var doctors = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [
                {
                    title: 'Darrell G. Boychuk, DDS',
                    image_url: 'https://www.healthpartners.com/locator/photos/mini/boychuk_darrell_g_dds.jpg',
                    subtitle: 'TMD',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR1'
                        }
                    ]
                },
                {
                    title: 'David R. Louis, DDS',
                    image_url: 'https://www.healthpartners.com/locator/photos/mini/louis_david_r_dds.jpg',
                    subtitle: 'General Dentistry',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR2'
                        }
                    ]
                },
                {
                    title: 'Pamela J. Becker, PT',
                    image_url: 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png',
                    subtitle: 'Physical Therapy',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR3'
                        }
                    ]
                },
                {
                    title: 'Jose A. Alba Hernandez, PT',
                    image_url: 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png',
                    subtitle: 'Physical Therapy',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR4'
                        }
                    ]
                },
                {
                    title: 'Katherine Louise Anglin, MD',
                    image_url: 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png',
                    subtitle: 'Family Medicine',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR5'
                        }
                    ]
                },
                {
                    title: 'Ayman Ali, MD',
                    image_url: 'https://www.healthpartners.com/locator/photos/mini/ali_ayman_md.jpg',
                    subtitle: 'Family Medicine',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR6'
                        }
                    ]
                },
                {
                    title: 'Frank E. Banfield, MD',
                    image_url: 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png',
                    subtitle: 'Pediatrics',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR7'
                        }
                    ]
                },
                {
                    title: 'Sara M. Blackburn, MD',
                    image_url: 'https://www.healthpartners.com/locator/photos/mini/blackburn_sara_m_md.jpg',
                    subtitle: 'Pediatrics',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR8'
                        }
                    ]
                },
                {
                    title: 'Gerald A. Brost, DDS',
                    image_url: 'https://www.healthpartners.com/locator/photos/mini/brost_gerald_a_dds..jpg',
                    subtitle: 'General Dentistry',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR9'
                        }
                    ]
                },
                {
                    title: 'Stephen S. Clifford, DDS',
                    image_url: 'https://www.healthpartners.com/locator/photos/mini/clifford_stephen_s_dds.jpg',
                    subtitle: 'Orthodontics',
                    buttons: [
                        {
                            "type":"postback",
                            "title":"Select",
                            "payload":'DOCTOR10'
                        }
                    ]
                }
            ]
        }
    }
};



var appointments = {
    "text": "Select doctor or hospital",
    "quick_replies":[
        {
            "content_type":"text",
            "title":"Doctors",
            "payload":"doctors"
        },
        {
            "content_type":"text",
            "title":"Hospitals",
            "payload":"hospitals"
        }
    ]
}

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
            receivedPostback(event);
        }else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});
  
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    var caseStatement = messageText.toLowerCase()
    switch (caseStatement) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

        case 'appointment':
            sendAppointments(senderID);
            break;

      case 'doctors':
        sendDoctorsList(senderID);
        break;

      default:
        //sendTextMessage(senderID, messageText);
        handleMessage(message, senderID);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;



  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

    var selection = Object.assign({}, userSelectionObj);
    if(userSelectionMap.has(recipientID)){
        selection = userSelectionMap.get(recipientID);
    }
    if(payload.startsWith('DOCTOR')){
        selection['doctor'] = payload;
        console.log('Payload has DOCTOR');
    }
    if(payload.startsWith('HOSPITAL')){
        selection['hospital'] = payload;
        console.log('Payload has DOCTOR');
    }
    if(payload.startsWith('TIME')){
        selection['time'] = payload;
        console.log('Payload has DOCTOR');
    }
    console.log(JSON.stringify(selection));

    userSelectionMap.set(recipientID,selection);
    console.log(JSON.stringify(userSelectionMap.get(recipientID)));

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  sendTextMessage(senderID, "Postback called by Bhanu");
}

function firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

function handleMessage(message, senderID) {
  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;
    // check greeting is here and is confident
    console.log("In handlemessage ");
    console.log(JSON.stringify(message));
    const greeting = firstEntity(message.nlp, 'greetings');
    console.log(JSON.stringify(greeting));
    if (greeting && greeting.confidence > 0.8) {
        console.log("In handlemessage if " + greeting);
        sendTextMessage(senderID, 'Hi there!');
    } else {
        sendTextMessage(senderID, 'Response ' + messageText);
    }
}

function sendDoctorsList(recipientId) {
  // check greeting is here and is confident
  console.log("In sendDoctorsList ");
  var msg = doctors;
  console.log(JSON.stringify(msg));
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: msg
  };
  callSendAPI(messageData);
}

function sendAppointments(recipientId) {
    // check greeting is here and is confident
    console.log("In sendAppointments ");
    var msg = appointments;
    console.log(JSON.stringify(msg));
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: msg
    };
    callSendAPI(messageData);
}

function sendHospitals(recipientId) {
    // check greeting is here and is confident
    console.log("In sendHospitals ");
    var msg = hospitals;
    console.log(JSON.stringify(msg));
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: msg
    };
    callSendAPI(messageData);
}