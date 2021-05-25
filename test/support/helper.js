'use strict';

const data = require('../data.json');

const Helpers = {
  inputText: (input, value) => {
    input.waitForDisplayed(5000);
    input.clearValue();
    input.setValue(value);
  },

  getByDataTestId: (datatestid) => {
    return $(`[data-test="${datatestid}"]`)
  },

  waitForBtnEnabledAndClick: (button) =>{
    button.waitForDisplayed()
    button.waitForEnabled()
    button.click()
  },

  login: function (user) {
    browser.url('/');
    this.getByDataTestId('login-button').waitForDisplayed()
    this.inputText($('#user-name'), data.credentials[user].username);
    this.inputText($('#password'), data.credentials[user].password);
    this.waitForBtnEnabledAndClick(this.getByDataTestId('login-button'))
  }
};

module.exports = Helpers;