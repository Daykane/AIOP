//TODO

(function(window, angular){
    'use strict';

    function accountService(authenticationService){
        // Private variables

        // Private methods
        function activate(){}

        function reset(){}

        function logout(){
            authenticationService.reset();
            $state.go('login');
        }

        function login(){
            $state.go('login');
        }

        return {
            activate: activate,
            reset: reset,
            logout: logout,
            login: login
        };
    }
    accountService.$inject = ['authenticationService'];

    angular.module('zen.components.account')
    .factory('accountService', accountService);
    
})(window, window.angular);
