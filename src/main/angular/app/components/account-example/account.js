(function(window, angular){
    'use strict';

    function account(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/account/account.html',
            scope: {},
            controller: accountController
        };
    }

    function accountController($scope, accountService){
        // Private variables

        // Private methods

        // Public variables
        $scope.account = accountService;

        // Public methods

        // Init
        accountService.activate();

        $scope.$on('impersonate_user', function(){
            accountService.userImpersonated();
        });

        $scope.$on('$destroy', function(){
            accountService.reset();
        });
    }

    angular.module('signal.components.account', [
            'signal.services'
        ]).directive('sgAccount', account);
})(window, window.angular);
