/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt-nodejs');

var gravatar = require('gravatar');

module.exports = {

    adapter: 'mongo',

    attributes: {
        provider: 'ARRAY',
        uid: 'OBJECT',

        name: 'STRING',
        email: 'STRING',
        firstname: 'STRING',
        lastname: 'STRING',
        picture: 'STRING'
    },

    // Generating a hash
    generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    // Checking if password is valid
    validPassword: function (user, password) {
        try {
            return bcrypt.compareSync(password, user.password);
        }
        catch (exception) {
            return false;
        }
    },

    processUserAvatar: function(email, cl) {
        return cl(gravatar.url(email, {s: '200', r: 'pg', d: '404'}));
    }
};
