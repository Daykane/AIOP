(function(window, angular){
    'use strict';

    function homeConfig($stateProvider){
        $stateProvider.state('root.home', {
            url: '/',
            templateUrl: 'views/root.home/home.html',
            controller: 'homeController as homeView'
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

        // Init
    }

    angular.module('zen.views.home', [
        'zen.views.root',
        'zen.services'
    ])
    .config(homeConfig)
    .run(homeRun)
    .controller('homeController', homeController);
        
})(window, window.angular);
