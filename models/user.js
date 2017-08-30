import Doctor from '../Doctor';
import Hospital from '../Hospital';
export default class User {

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

    getSelectedDoctor() {
        return GiftStore.getByCategoryId(this.giftCategory);
    }

    setSelectedDoctor() {
        return GiftStore.getByCategoryId(this.giftCategory);
    }

    getSelectedDoctor() {
        return GiftStore.getByCategoryId(this.giftCategory);
    }

    setSelectedDoctor() {
        return GiftStore.getByCategoryId(this.giftCategory);
    }

    getSelectedDoctor() {
        return GiftStore.getByCategoryId(this.giftCategory);
    }

    setSelectedDoctor() {
        return GiftStore.getByCategoryId(this.giftCategory);
    }

  /**
   * Set the users preferedGift to the gift matching the id
   *
   * @param {String} giftId Id of the gift to set as the users prefered gift.
   * @returns {undefined}
   * @memberOf User
   */
  setPreferedGift(giftId) {
    this.preferedGift = GiftStore.get(giftId);
  }
}
