const UserStore = require('../stores/user-store')
//const {dateString} = require('../utils/date-string-format')
const Doctor = require('../Doctor')

let resp = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: []
    }
  }
};

const doctorsCarosel = function(recipientId){
    const user = UserStore.get(recipientId) || UserStore.insert({id: recipientId});

    let carouselItems = [];
    for(var i=0; i<Doctor.DOCTORS.length; i++ ){
      let tempForm = Doctor.DOCTORS[i];
      carouselItems.push(doctorToCarouselItem(tempForm));
    }

    resp['attachment']['payload']['elements'] = carouselItems;
    return resp;
};
module.exports = doctorsCarosel;

const doctorToCarouselItem = function(doctor){
    return {
        title: doctor.Name,
        image_url: doctor.image,
        subtitle: doctor.Speciality,
        buttons: [
          {
            "type":"postback",
            "title":"Bookmark Item",
            "payload":doctor.Name
          }
        ],
    };
};
