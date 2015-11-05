(function(window, angular){
    'use strict';

    function accountService($state, userStateService, authService){
        // Private variables

        // Private methods
        function activate(){
            this.user = userStateService.getUserData();
        }

        function reset(){
            this.user = null;
            this.realUser = null;
        }

        function userImpersonated(){
            this.realUser = this.user;
            this.user = userStateService.getUserData();
        }

        function removeImpersonation(){
            userStateService.depersonate();

            this.realUser = null;
            this.user = userStateService.getUserData();

            $state.go('root.admin.users');
        }

        function logOut(){
            authService.clearToken();
            $state.go('login');
        }

        return {
            user: null,
            realUser: null,
            activate: activate,
            reset: reset,
            logOut: logOut,
            userImpersonated: userImpersonated,
            removeImpersonation: removeImpersonation
        };
    }

    angular.module('signal.components.account').factory('accountService', accountService);
})(window, window.angular);
