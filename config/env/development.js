/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    grunt: {
        _hookTimeout: 60000
    },

    application_auth: {

        local: {
            enable: true
        },

        twitter: {
            enable: false,
            clientID: 'nhvEwkhZeWtv5Uba1i5yNtylO',
            clientSecret: 'l0HeCdxRymyBK2bfUAgnBAY8g49K66p6IvCC7cNsMqamcHSMC8',
            callbackURL: 'http://localhost:1337/auth/twitter/callback'
        },

        // Get your keys from https://developers.facebook.com/apps/
        facebook: {
            enable: true,
            clientID: '1481045002192353',
            clientSecret: '87966fc3bfc78ff8289eb9026de6fee2',
            callbackURL: 'http://localhost:1337/auth/facebook/callback',
            scope: [ 'email', 'public_profile', 'user_photos'],
            profileFields: ['id', 'displayName', 'photos', 'emails', 'birthday']
        }
    },

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    connections: {
        prodMongodbServer: {
            adapter: 'sails-mongo',
            host: 'localhost',
            port: 27017,
            //user: '',
            //password: '',
            database: 'sails'
        }
    },

    session: {
        adapter: 'mongo',
        host: 'localhost',
        port: 27017,
        db: 'sails',
        collection: 'sessions'
    }

    // models: {
    //   connection: 'someMongodbServer'
    // }
};