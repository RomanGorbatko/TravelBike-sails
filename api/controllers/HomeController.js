/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    // Index page
    index: function (req, res) {

        console.log("+ HOME.INDEX");

        var enableLocalAuth = sails.config.application_auth.local.enable;
        var enableTwitterAuth = sails.config.application_auth.twitter.enable;
        var enableFacebookAuth = sails.config.application_auth.facebook.enable;
        var isUserAuth = false;

        var localAuthMsg, twitterAuthMsg, facebookAuthMsg;

        if (enableLocalAuth) localAuthMsg = "Configuration Ok";
        else localAuthMsg = "Disabled";

        if (enableTwitterAuth) twitterAuthMsg = "Configuration Ok";
        else twitterAuthMsg = "Disabled";

        if (enableFacebookAuth) facebookAuthMsg = "Configuration Ok";
        else facebookAuthMsg = "Disabled";

        if (req.user) {
            isUserAuth = true;
            var basicUserData = UserServices.getBasicData(req.user);

        }

        return res.view({
            enableLocalAuth: enableLocalAuth,
            enableTwitterAuth: enableTwitterAuth,
            enableFacebookAuth: enableFacebookAuth,
            localAuthMsg: localAuthMsg,
            twitterAuthMsg: twitterAuthMsg,
            facebookAuthMsg: facebookAuthMsg,
            isUserAuth: isUserAuth,
            accountLabel: (basicUserData) ? basicUserData.accountLabel : false,
            accountPicture: (basicUserData) ? basicUserData.picture : false
        });
    }
};

