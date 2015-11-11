describe('sgNavigation', function(){
    'use strict';

    var scope, elm, $rootScope, $scope, navigationService;

    beforeEach(function(){
       module('signal.components.navigation', 'templates');

       inject(function($injector){
            var $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            navigationService = $injector.get('navigationService');

            scope = $rootScope.$new();

            elm = angular.element('<sg-navigation></sg-navigation>');

            sinon.stub(navigationService, 'activate');
            sinon.stub(navigationService, 'reset');

            $compile(elm)(scope);
            scope.$apply();
            $scope = elm.isolateScope();
       });
    });

    afterEach(function(){
        navigationService.activate.restore();
        navigationService.reset.restore();
    });

    it('should link the navigation service to $scope', function(){
        assert($scope.navigation === navigationService);
    });

    it('should activate navigationService on initialisation', function(){
        assert.isTrue(navigationService.activate.called);
    });

    it('should activate navigationService when user is impersonated', function(){
        $rootScope.$broadcast('impersonate_user');

        assert.isTrue(navigationService.activate.callCount === 2);
    });

    it('should activate navigationService when user is depersonated', function(){
        $rootScope.$broadcast('depersonate_user');

        assert.isTrue(navigationService.activate.callCount === 2);
    });

    it('should reset navigationService when destroyed', function(){
        $rootScope.$broadcast('$destroy');

        assert.isTrue(navigationService.reset.called);
    });
});
