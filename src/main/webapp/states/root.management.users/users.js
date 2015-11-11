(function(window, angular){
    'use strict';

    function usersConfig($stateProvider){
        $stateProvider.state('root.management.users', {
            url: '/',
            templateUrl: 'views/root.management.users/users.html',
            controller: 'usersController as usersState'
        });
    }
    usersConfig.$inject = ['$stateProvider'];

    function usersRun (){
    }

    function usersController(){
        // Private variables

        // Private methods

        // Public variables

        // Public methods

        // Init
    }

    angular.module('zen.states.users', [
        'zen.states.root',
        'zen.services'
    ])
    .config(usersConfig)
    .run(usersRun)
    .controller('usersController', usersController);

})(window, window.angular);
