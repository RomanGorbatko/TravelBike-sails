/**
 * Created by roman on 9/4/15.
 */
var UserServices = {
    accountLabel: 'U',
    picture: '/images/arrow-icon.png',

    getBasicData: function(user) {
        var _this = this;

        if (user.firstname && user.lastname) {
            _this.accountLabel = user.firstname[0];
            _this.accountLabel += user.lastname[0];
        } else {
            if (user.name && user.name.length >= 2)
                _this.accountLabel = user.name.substring(0, 2).toUpperCase();
        }

        user.accountLabel = _this.accountLabel;
        user.picture = (user.picture ? user.picture : _this.picture);

        return user;
    }
};

module.exports = UserServices;