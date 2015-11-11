//TODO

(function(window, angular, _){
    'use strict';

    function navigationService(){
        // Private variables

        // Private functions
        function activate(){}

        function reset(){}

        // Public
        return {
            activate: activate,
            reset: reset,
        };
    }

    angular.module('zen.components.navigation')
    .factory('navigationService', navigationService);
    
})(window, window.angular, window._);
