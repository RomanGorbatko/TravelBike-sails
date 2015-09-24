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
                    return res.json(500, {message: err})
                }
                if (!user) {
                    return res.json(500, {message: 'Incorrect email.'});
                }
                if (!User.validPassword(user, req.param('password'))) {
                    return res.json(500, {message: 'Incorrect password.'});
                }

                res.json({user: user});
            });
        } else {
            return res.json(500, {message: 'Server error.'});
        }
    },
    signup: function(req, res) {
        console.log("+ API.SIGNUP");
        if (req.wantsJSON) {
            if (!req.param('name') || !req.param('email') || !req.param('password')) {
                return res.json(500, {message: 'empty signup data'})
            }

            User.findOne({email: req.param('email')}, function(err, user) {
                if (err) {
                    return res.json(500, {message: err})
                }

                if (user) {
                    return res.json(500, {key: 'email'});
                } else {
                    var user = {
                        uid: {local: true},
                        name: req.param('name'),
                        email: req.param('email'),
                        password: User.generateHash(req.param('password'))
                    };

                    User.create(user).exec(function (err, model) {
                        if (err) {
                            return res.json(500, {message: err})
                        }

                        res.json({user: model});
                    });
                }
            });
        }
    },

    check_email: function(req, res) {
        console.log("+ API.check_email");

        if (!req.param('email')) {
            return res.json(500, {message: 'empty signup data'});
        } else {
            User.findOne({email: req.param('email')}, function(err, user) {
                if (err) {
                    return res.json(500, {message: err})
                }

                if (user) {
                    return res.json(500, {key: 'email'});
                } else {
                    res.json(true);
                }
            });
        }
    }
};

