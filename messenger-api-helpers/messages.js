const UserStore = require('../stores/user-store')
//const {dateString} = require('../utils/date-string-format')
const Doctor = require('../Doctor')


const doctorsCarosel = function(recipientId){
    const user = UserStore.get(recipientId) || UserStore.insert({id: recipientId});

    const carouselItems = Doctor.DOCTORS.map(doctorToCarouselItem);

    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: carouselItems,
            },
        },
    };
};
module.exports = doctorsCarosel;

const doctorToCarouselItem = function({id, name, description, images: {original}}){
    return {
        title: name,
        image_url: original,
        subtitle: description,
        buttons: [
            viewDetailsButton(id),
            chooseGiftButton(id),
        ],
    };
};
