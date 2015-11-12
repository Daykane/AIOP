(function(window, angular, _){
    'use strict';

    function users(){
        // Init

        // Private variables

        // Private methods
       function getId(email, password){
            return 1;
       }
        // Public API
        return {
            getId: getId
        };
    }

    angular.module('zen.api.users', [
            'zen.services'
        ]).factory('Users', users);
})(window, window.angular, window._);
