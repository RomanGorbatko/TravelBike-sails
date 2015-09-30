/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    // Index page
    index: function (req, res) {
        sails.log.info("+ HOME.INDEX");

        return res.view();
    }
};

