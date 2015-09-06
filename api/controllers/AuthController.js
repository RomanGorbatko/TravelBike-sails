/**
 * AuthController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

    // Index page
    index: function (req, res) {
        return res.redirect("/auth/login");
    },

    // Login screen
    login: function (req, res) {

        var formUsername = req.param("username");
        var formPassword = req.param("password");
        var enableLocalAuth = sails.config.application_auth.local.enable;
        var enableTwitterAuth = sails.config.application_auth.twitter.enable;
        var enableFacebookAuth = sails.config.application_auth.facebook.enable;

        if (formUsername && formPassword) {

            console.log("+ AUTH.LOGIN username=", formUsername, "password=", formPassword);

            passport.authenticate('local', {
                successRedirect: '/account',
                failureRedirect: '/',
                failureFlash: false
            }, function (err, user) {

                console.log("AUTH Local Response error=", err, "user=", user);

                if (user) {
                    req.logIn(user, function (err) {

                        if (err) {
                            console.log("AUTH Error", err);
                            return res.view('500');
                        }

                        return res.redirect('/account');

                    });
                } else {
                    return res.redirect('/');
                }

            })(req, res);
        }
        else {

            console.log("+ AUTH.LOGIN (empty credentials)");
            return res.view({
                enableLocalAuth: enableLocalAuth,
                enableTwitterAuth: enableTwitterAuth,
                enableFacebookAuth: enableFacebookAuth
            });
        }
    },

    // Sign up screen
    signup: function (req, res) {

        var fFullName = req.param("fullName");
        var fEmail = req.param("email");
        var fPassword = req.param("password");

        if (fFullName && fEmail && fPassword) {
            console.log("+ AUTH.SIGNUP", fFullName, fEmail, fPassword);

            var user = {
                uid: {local: true},
                name: fFullName,
                email: fEmail,
                password: User.generateHash(fPassword)
            };

            User.create(user).exec(function (err, model) {
                console.log("USER updated");
            });

            return res.redirect("/auth/login");
        } else {

            console.log("+ AUTH.SIGNUP (new user)");
            return res.view();
        }
    },

    // Logout screen
    logout: function (req, res) {

        console.log("+ AUTH.LOGOUT");

        req.logout();
        return res.redirect('/');
    },

    // Twitter login screen
    twitter: function (req, res) {

        console.log("+ AUTH.TWITTER");
        passport.authenticate('twitter', {failureRedirect: '/login'}, function (err, user) {

            console.log("Twitter Auth Response error=", err, "user=", user);

            if (user) {
                req.logIn(user, function (err) {

                    if (err) {
                        console.log("Auth Error", err);
                        return res.view('500');
                    }

                    return res.redirect('/account');

                });
            } else {
                return res.redirect('/');
            }

        })(req, res);
    },

    // Facebook login screen
    facebook: function (req, res) {

        passport.authenticate('facebook', {
            failureRedirect: '/login',
            scope: sails.config.application_auth.facebook.scope
        }, function (err, user) {

            console.log("Facebook Auth Response error=", err, "user=", user);

            if (user) {
                req.logIn(user, function (err) {

                    if (err) {
                        console.log("Auth Error", err);
                        return res.view('500');
                    }

                    if (!user.password) {
                        return res.redirect('/account/password');
                    } else {
                        return res.redirect('/account');
                    }

                });
            } else {
                return res.redirect('/');
            }

        })(req, res);
    }
};
