/**
 * AccountController
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    accountLabel: '',
    picture: '/images/arrow-icon.png',

    // Account main page
    index: function (req, res) {
        sails.log.info("+ ACCOUNT.INDEX");

        return res.view();
    },

    password: function(req, res) {
        sails.log.info("+ ACCOUNT.PASSWORD");

        return res.view();
    },

    passwordChange: function(req, res) {
        var newPassword = req.param("password"),
            oldPassword = req.param("old_password", false);

        if (!oldPassword && !req.user.password) {
            User.update({id: req.user.id},{password: User.generateHash(newPassword)}).exec(function afterwards(err, updated){

                if (err) {
                    // handle error here- e.g. `res.serverError(err);`
                    sails.log.error('Change password error: ' + err);
                    return res.view('500');
                }

                return res.redirect('/account');
            });
        }
    }
};