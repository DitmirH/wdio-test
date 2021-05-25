const Helpers = require('../support/helper');
const data = require('../data.json');

class Checkout {
    fillOutCheckutInformation() {
        Helpers.inputText($('#first-name'), data.userDetails.firstname);
        Helpers.inputText($('#last-name'), data.userDetails.lastname)
        Helpers.inputText($('#postal-code'), data.userDetails.postalCode);
    }
}

module.exports = new Checkout();




