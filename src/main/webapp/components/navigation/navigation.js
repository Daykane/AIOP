(function(window, angular){
    'use strict';
    function navigation(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/navigation/navigation.html',
            scope: {},
            controller: navigationController
        };
    }

    function navigationController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Init
    }

    angular.module('zen.components.navigation', [
            'ui.router',
            'zen.services'
        ]).directive('zenNavigation', navigation);
})(window, window.angular);
