var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Configure advanced options for the Express server inside of Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#documentation
 */
module.exports.http = {

    customMiddleware: function (app) {

        console.log('Init Express midleware');

        if (sails.config.application_auth.local.enable) {

            passport.use(new LocalStrategy(localVerifyHandler));
        }

        if (sails.config.application_auth.twitter.enable) {

            passport.use(new TwitterStrategy({
                consumerKey: sails.config.application_auth.twitter.clientID,
                consumerSecret: sails.config.application_auth.twitter.clientSecret,
                callbackURL: sails.config.application_auth.twitter.callbackURL
            }, verifyHandler));
        }

        if (sails.config.application_auth.facebook.enable) {

            passport.use(new FacebookStrategy({
                clientID: sails.config.application_auth.facebook.clientID,
                clientSecret: sails.config.application_auth.facebook.clientSecret,
                callbackURL: sails.config.application_auth.facebook.callbackURL,
                profileFields: sails.config.application_auth.facebook.profileFields
            }, verifyHandler));
        }

        app.use(passport.initialize());
        app.use(passport.session());
    }
}

passport.serializeUser(function (user, done) {

     //console.log("serializeUser", user);
    done(null, user.id);
});

passport.deserializeUser(function (uid, done) {

     //console.log("deserializeUser", uid);
    User.findOne({id: uid}, function (err, user) {
        done(err, user);
    });
});

var localVerifyHandler = function (username, password, done) {

    // console.log("=> localVerifyHandler with ", username, password);
    User.findOne({email: username}, function (err, user) {

        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (!User.validPassword(user, password)) {
            return done(null, false, {message: 'Incorrect password.'});
        }

        return done(null, user);
    });
};



var verifyHandler = function (token, tokenSecret, profile, done) {

    process.nextTick(function () {
        var providers = {};

        User.findOne({email: profile.emails[0].value}, function (err, user) {
            if (user) {
                var data = {
                    uid: user.uid
                };

                if (!data.uid[profile.provider]) {
                    data.uid[profile.provider] = profile.id;
                }

                if (!user.picture) {
                    User.processUserAvatar(user.email, function(pictureUrl) {
                        data.picture = pictureUrl;
                    });
                }

                User.update({email: user.email}, data).exec(function(err, updated) {
                    if (err) {
                        console.log('Change password error: ' + err);
                        return done(err);
                    }

                    return done(null, updated[0]);
                });
            } else {
                providers[profile.provider] = profile.id;
                var data = {
                    uid: providers,
                    name: profile.displayName
                };

                if (profile.emails && profile.emails[0] && profile.emails[0].value) {
                    data.email = profile.emails[0].value;
                }
                if (profile.name && profile.name.givenName) {
                    data.firstname = profile.name.givenName;
                }
                if (profile.name && profile.name.familyName) {
                    data.lastname = profile.name.familyName;
                }

                User.processUserAvatar(data.email, function(pictureUrl) {
                    data.picture = pictureUrl;
                });

                User.create(data, function (err, user) {
                    return done(err, user);
                });
            }
        });
    });
};
