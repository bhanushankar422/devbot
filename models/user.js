const Doctor = require('../Doctor')
const Hospital = require('../Hospital')
module.exports = class User {

  constructor(attributes) {
    const {
      id,
      doctor,
      hospital,
      arrivalPeriod,
    } = Object.assign({}, attributes);

    this.id = id;
    this.dateOfBirth = dateOfBirth;
    this.giftCategory = giftCategory;
    this.arrivalPeriod = arrivalPeriod;
  }

  getSelectedDoctor() {
    return this.doctor;
  }

  setSelectedDoctor(id) {
      this.doctor = new Doctor(id);
  }

    getSelectedHospital() {
        return this.doctor;
    }

    setSelectedHospital(id) {
        this.hospital = new Hospital(id);
    }

    getSelectedTime() {
        return this.doctor;
    }

    setSelectedTime(arrivalPeriod) {
        this.arrivalPeriod = arrivalPeriod;
    }


}
