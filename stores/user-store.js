const Store = require('./store')
const User = require('../models/user')

/**
 * Stores User data
 */
module.exports = class UserStore extends Store {

  /**
   * Create a user Object and store into user store.
   *
   * @param {Object} props User properties
   * @returns {Object} User model
   */
  insert(props) {
    const user = new User(props);
    console.log(`Inserting User ${JSON.stringify(user)}`);

    this.set(props.id, user);
    return user;
  }
}


