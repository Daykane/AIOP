//TODO

(function(window, angular){
    'use strict';

    function accountDirective(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/account/account.html',
            scope: {},
            controller: accountController
        };
    }

    function accountController($scope){
        // Private variables

        // Private methods

        // Public variables
        $scope.account = accountService;
        $scope.authentication = authenticationService;

        // Public methods

        // Initialization
        accountService.activate();
    }
    accountController.$inject = ['$scope'];

    angular.module('zen.components.account', [
        'zen.services'
    ])
    .directive('zenAccount', accountDirective);

})(window, window.angular);
