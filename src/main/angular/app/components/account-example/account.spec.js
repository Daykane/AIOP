describe('sgAccount', function(){
    'use strict';

    var scope, elm, $scope, $rootScope, accountService;

    beforeEach(function(){
        module('signal.components.account', 'templates');

        inject(function($injector){
            var $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');

            accountService = $injector.get('accountService');

            scope = $rootScope.$new();

            elm = angular.element('<sg-account></sg-account>');

            sinon.stub(accountService, 'activate');
            sinon.stub(accountService, 'reset');
            sinon.stub(accountService, 'userImpersonated');

            $compile(elm)(scope);
            scope.$apply();
            $scope = elm.isolateScope();
        });
    });

    afterEach(function(){
        accountService.activate.restore();
        accountService.reset.restore();
        accountService.userImpersonated.restore();
    });

    it('should link account service to the scope', function(){
        assert.isTrue($scope.account === accountService);
    });

    it('should activate itself when setup', function(){
        assert.isTrue(accountService.activate.called);
    });

    it('should impersonate a user on user impersonated event', function(){
        $scope.$broadcast('impersonate_user');

        assert.isTrue(accountService.userImpersonated.called);
    });

    it('should reset the service when destroyed', function(){
        $scope.$broadcast('$destroy');

        assert.isTrue(accountService.reset.called);
    });

});
