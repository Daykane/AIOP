(function(window, angular){
    'use strict';

    function accessoriesConfig($stateProvider){
        $stateProvider.state('root.management.accessories', {
            url: '/',
            templateUrl: 'states/root.accessories/accessories.html',
            controller: 'accessoriesController as accessoriesState'
        });
    }
    accessoriesConfig.$inject = ['$stateProvider'];

    function accessoriesRun (){
    }

    function accessoriesController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Init
    }

    angular.module('zen.states.accessories', [
        'zen.states.root',
        'zen.services'
    ])
    .config(accessoriesConfig)
    .run(accessoriesRun)
    .controller('accessoriesController', accessoriesController);

})(window, window.angular);
