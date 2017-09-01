'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()


const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN

var mapAttr = {
    HOSPITAL1: 'HealthPartners Bloomington Clinic',
    HOSPITAL2: 'HealthPartners Bloomington Dental Clinic',
    HOSPITAL3: 'HealthPartners Eden Prairie Dental Clinic',
    HOSPITAL4: 'Physicians Neck and Back Clinic',
    DOCTOR1: 'Darrell G. Boychuk, DDS',
    DOCTOR2: 'David R. Louis, DDS',
    DOCTOR3: 'Pamela J. Becker, PT',
    DOCTOR4: 'Jose A. Alba Hernandez, PT',
    DOCTOR5: 'Katherine Louise Anglin, MD',
    DOCTOR6: 'Ayman Ali, MD',
    DOCTOR7: 'Frank E. Banfield, MD',
    DOCTOR8: 'Sara M. Blackburn, MD',
    DOCTOR9: 'Gerald A. Brost, DDS',
    DOCTOR10: 'Stephen S. Clifford, DDS',
    TIME1: '10.40 AM',
    TIME2: '11.40 AM',
    TIME3: '12.40 PM',
    TIME4: '01.40 PM',
    TIME5: '03.00 PM',
    TIME6: '04.00 PM',
}

var persistentMenu = {"persistent_menu":[
    {
        "locale":"default",
        "call_to_actions":[
            {
                "title":"Options",
                "type":"nested",
                "call_to_actions":[
                    {
                        "title":"Appointment",
                        "type":"postback",
                        "payload":"Appointment"
                    }
                ]
            }
        ]
    }
]};

var userSelectionMap = new Map();
var userSelectionObj = {
    name:'',
    doctor:'',
    hospital:'',
    date:'',
    time:''
};

var hospitals = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [
                {
                    title: 'HealthPartners Bloomington Clinic',
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
                    title: 'HealthPartners Bloomington Dental Clinic',
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
                    image_url: 'https://www.healthpartners.com/locator/photos/boychuk_darrell_g_dds.jpg',
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
                    image_url: 'https://www.healthpartners.com/locator/photos/louis_david_r_dds.jpg',
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
                    image_url: 'https://www.healthpartners.com/locator/photos/ali_ayman_md.jpg',
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
                    image_url: 'https://www.healthpartners.com/locator/photos/blackburn_sara_m_md.jpg',
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
                    image_url: 'https://www.healthpartners.com/locator/photos/brost_gerald_a_dds..jpg',
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
                    image_url: 'https://www.healthpartners.com/locator/photos/clifford_stephen_s_dds.jpg',
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

var timings = {

    "text": "Select timings",
    "quick_replies":[
        {
            "content_type":"text",
            "title":"10.40 AM",
            "payload":"TIME1"
        },
        {
            "content_type":"text",
            "title":"11.40 AM",
            "payload":"TIME2"
        },
        {
            "content_type":"text",
            "title":"12.40 PM",
            "payload":"TIME3"
        },
        {
            "content_type":"text",
            "title":"01.40 PM",
            "payload":"TIME4"
        },
        {
            "content_type":"text",
            "title":"03.00 PM",
            "payload":"TIME5"
        },
        {
            "content_type":"text",
            "title":"04.00 PM",
            "payload":"TIME6"
        }
    ]
}



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
  var quick_reply = '';
  if(message && message.quick_reply){
      quick_reply = message['quick_reply']['payload'];
  }
  console.log('Quick reply %s', quick_reply);

    if(quick_reply && quick_reply!=''){
        var selection = Object.assign({}, userSelectionObj);
        if(userSelectionMap.has(recipientID)){
            selection = userSelectionMap.get(recipientID);
        }
        if(quick_reply.startsWith('TIME')){
            selection['time'] = quick_reply;
            console.log('Payload has TIME');
            var confirmation = 'Your appointment with ' + mapAttr[selection['doctor']] + ' in ' + mapAttr[selection['hospital']] + ' on ' + mapAttr[selection['date']] + ' at ' + mapAttr[selection['time']] + ' is confirmed';
            sendConfirmation(senderID, confirmation);
        }
        console.log(JSON.stringify(selection));

        userSelectionMap.set(recipientID,selection);
    }

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
            var selectionInit = Object.assign({}, userSelectionObj);
            userSelectionMap.set(recipientID,selectionInit);
            sendAppointments(senderID);
            break;

      case 'doctors':
        sendDoctorsList(senderID);
        break;

        case 'hospitals':
            sendHospitals(senderID);
            break;
        case 'timings':
            sendTimings(senderID);
            break;

      default:
            handleDateMessage(message, senderID, recipientID);
        //sendTextMessage(senderID, messageText);
        //handleMessage(message, senderID);
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
        userSelectionMap.set(recipientID,selection);
        if(!selection['hospital'] || selection['hospital']==''){
            sendHospitals(senderID);
        }else if(!selection['date'] || selection['date']==''){
            askDate(senderID);
        }else if(!selection['time'] || selection['time']==''){
            sendTimings(senderID);
        }else{
            var confirmation = 'Your appointment with ' + mapAttr[selection['doctor']] + ' in ' + mapAttr[selection['hospital']] + ' on ' + mapAttr[selection['date']] + ' at ' + mapAttr[selection['time']] + ' is confirmed';
            sendConfirmation(senderID, confirmation);
        }
        console.log('Payload has DOCTOR');
    }
    if(payload.startsWith('HOSPITAL')){
        selection['hospital'] = payload;
        userSelectionMap.set(recipientID,selection);
        if(!selection['doctor'] || selection['doctor']==''){
            sendDoctorsList(senderID);
        }else if(!selection['date'] || selection['date']==''){
            askDate(senderID);
        }else if(!selection['time'] || selection['time']==''){
            sendTimings(senderID);
        }else{
            var confirmation = 'Your appointment with ' + mapAttr[selection['doctor']] + ' in ' + mapAttr[selection['hospital']] + ' on ' + mapAttr[selection['date']] + ' at ' + mapAttr[selection['time']] + ' is confirmed';
            sendConfirmation(senderID, confirmation);
        }
        console.log('Payload has HOSPITAL');
    }
    if(payload.startsWith('TIME')){
        selection['time'] = payload;
        userSelectionMap.set(recipientID,selection);
        if(!selection['doctor'] || selection['doctor']==''){
            sendDoctorsList(senderID);
        }else if(!selection['hospital'] || selection['hospital']==''){
            sendHospitals(senderID);
        }else{
            var confirmation = 'Your appointment with ' + mapAttr[selection['doctor']] + ' in ' + mapAttr[selection['hospital']] + ' on ' + mapAttr[selection['date']] + ' at ' + mapAttr[selection['time']] + ' is confirmed';
            sendConfirmation(senderID, confirmation);
        }
        console.log('Payload has TIME');
    }
    console.log(JSON.stringify(selection));


    console.log(JSON.stringify(userSelectionMap.get(recipientID)));

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  //sendTextMessage(senderID, "Postback called by Bhanu");
}

function firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

function handleDateMessage(message, senderID, recipientID) {
    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;
    // check greeting is here and is confident
    console.log("In handleDateMessage ");
    console.log(JSON.stringify(message));
    const datetime = firstEntity(message.nlp, 'datetime');
    console.log(JSON.stringify(datetime));
    if (datetime && datetime.confidence > 0.8) {
        console.log("In handleDateMessage if " + datetime['values'][0].value);
        var selection = Object.assign({}, userSelectionObj);
        if(userSelectionMap.has(recipientID)){
            selection = userSelectionMap.get(recipientID);
            var tempDate = new Date(datetime['values'][0].value);
            console.log("In handleDateMessage dateString " + tempDate.toDateString());
            selection['date'] = tempDate.toDateString();
        }
        sendTimings(senderID);
    }
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

function askDate(recipientId) {
    // check greeting is here and is confident
    console.log("In askDate ");
    sendTextMessage(recipientId, 'Provide the date');
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

function sendTimings(recipientId) {
    // check greeting is here and is confident
    console.log("In sendTimings ");
    var msg = timings;
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

function sendConfirmation(senderId, confirmation) {
    // check greeting is here and is confident
    console.log("In sendConfirmation ");
    sendTextMessage(senderId, confirmation);
}