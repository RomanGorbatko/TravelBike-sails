/**
 * Created by roman on 9/4/15.
 */
var UserServices = {
    accountLabel: '',
    picture: '/images/arrow-icon.png',

    getBasicData: function(user) {
        var _this = this;

        //console.log(user);
        if (user.firstname && user.lastname) {
            _this.accountLabel = user.firstname + ' ' + user.lastname;
        } else {
            _this.accountLabel = user.firstname;
        }

        user.accountLabel = _this.accountLabel;
        user.picture = (user.picture ? user.picture : _this.picture);

        return user;
    },
    isAuth: function(user) {
        console.log('isAuth');
    }
};

module.exports = UserServices;