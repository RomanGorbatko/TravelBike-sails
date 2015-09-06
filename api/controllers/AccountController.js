/**
 * AccountController
 *
 * @description :: Server-side logic for managing your account
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    accountLabel: 'U',
    picture: '/images/arrow-icon.png',

    // Account main page
    index: function (req, res) {

        console.log("+ ACCOUNT.INDEX");

        var isUserAuth = false;

        if (req.user) {
            isUserAuth = true;

            var basicUserData = UserServices.getBasicData(req.user);

            return res.view({
                accountLabel: basicUserData.accountLabel,
                accountPicture: basicUserData.picture,
                isUserAuth: isUserAuth
            });
        }
    },

    password: function(req, res) {
        console.log("+ ACCOUNT.PASSWORD");

        var _this = this;

        if (req.user) {

            if (req.user.firstname && req.user.lastname) {
                _this.accountLabel = req.user.firstname[0];
                _this.accountLabel += req.user.lastname[0];
            } else {
                if (req.user.name && req.user.name.length >= 2)
                    _this.accountLabel = req.user.name.substring(0, 2).toUpperCase();
            }
        }
        return res.view({
            accountLabel: _this.accountLabel,
            accountPicture: req.user.picture ? req.user.picture : _this.picture,
            accountPassword: req.user.password ? true : false
        });
    },

    passwordChange: function(req, res) {
        var newPassword = req.param("password"),
            oldPassword = req.param("old_password", false);

        if (!oldPassword && !req.user.password) {
            User.update({id: req.user.id},{password: User.generateHash(newPassword)}).exec(function afterwards(err, updated){

                if (err) {
                    // handle error here- e.g. `res.serverError(err);`
                    console.log('Change password error: ' + err);
                    return res.view('500');
                }

                return res.redirect('/account');
            });
        }
    }
};