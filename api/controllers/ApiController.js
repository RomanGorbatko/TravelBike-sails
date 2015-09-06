/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
        console.log("+ API.INDEX", req.wantsJSON);

        if (req.wantsJSON) {
            res.json(req.params.all());
        }
    },
    login: function (req, res) {
        console.log("+ API.LOGIN");

        if (req.wantsJSON) {
            if (!req.param('email') || !req.param('password')) {
                return res.json(500, {message: 'empty login data'})
            }

            User.findOne({email: req.param('email')}, function (err, user) {

                if (err) {
                    console.log({message: err});
                    return res.json(500, {message: err})
                }
                if (!user) {
                    return res.json(500, {message: 'Incorrect email.'});
                }
                if (!User.validPassword(user, req.param('password'))) {
                    return res.json(500, {message: 'Incorrect password.'});
                }

                res.json({result: 'Ok'});
            });
        }
    }
};

