(function(window, angular){
    'use strict';

    function homeConfig($stateProvider){
        $stateProvider.state('root.home', {
            url: '/',
            templateUrl: 'states/root.home/home.html',
            controller: 'homeController as homeState'
        });
    }
    homeConfig.$inject = ['$stateProvider'];

    function homeRun (){
    }

    function homeController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Initialization
    }

    angular.module('zen.states.home', [
        'zen.states.root',
        'zen.services'
    ])
    .config(homeConfig)
    .run(homeRun)
    .controller('homeController', homeController);

})(window, window.angular);
