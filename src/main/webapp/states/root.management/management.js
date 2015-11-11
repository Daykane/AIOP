(function(window, angular){
    'use strict';

    function managementConfig($stateProvider){
        $stateProvider.state('root.management', {
            url: '/',
            templateUrl: 'views/root.management/management.html',
            controller: 'managementController as managementState'
        });
    }
    managementConfig.$inject = ['$stateProvider'];

    function managementRun (){
    }

    function managementController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Init
    }

    angular.module('zen.states.management', [
        'zen.states.root',
        'zen.services'
    ])
    .config(managementConfig)
    .run(managementRun)
    .controller('managementController', managementController);

})(window, window.angular);
