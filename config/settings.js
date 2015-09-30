/**
 * Created by roman on 9/28/15.
 */
module.exports.settings = {

    basic: {

        /**
         * Site name
         */
        siteName: 'TravelBike-sails',

        /**
         * Site description
         */
        description: 'Some description for TravelBike',
    },

    /**
     * OpenGraph settings.
     */
    openGraph: {

        /**
         * If you want to enable/disable protocol support,
         * set param 'enable' to true/false.
         */
        enable: false,

        /**
         * Description URL: https://dev.twitter.com/cards/getting-started
         */
        twitter: {
            card: '',
            site: '',
            title: '',
            description: '',
            creator: '',
            image: ''
        },

        /**
         * Description Url: http://ogp.me/
         */
        facebook: {
            title: '',
            type: '',
            url: '',
            image: '',
            description: '',
            site_name: ''
        }
    }
};