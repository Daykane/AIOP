describe('homeController', function(){
    'use strict';

    var $scope,
        $state,
        userStateService,
        explorerStateService,
        storyListService,
        homeService;

    beforeEach(function(){

        module('signal.views.home');

        inject(function($injector){
            var $rootScope = $injector.get('$rootScope'),
                $controller = $injector.get('$controller');

            $state = $injector.get('$state');
            userStateService = $injector.get('userStateService');
            explorerStateService = $injector.get('explorerStateService');
            storyListService = $injector.get('storyListService');
            homeService = $injector.get('homeViewService');

            $scope = $rootScope.$new();

            function createController(){
                return $controller('homeController', {
                    '$scope': $scope
                });
            }

            sinon.stub($state, 'go');
            sinon.stub(explorerStateService, 'activate');
            sinon.stub(explorerStateService, 'reset');
            sinon.stub(userStateService, 'getUserFeeds').returns('user feeds');

            createController();
        });
    });

    afterEach(function(){
        explorerStateService.activate.restore();
        explorerStateService.reset.restore();
        userStateService.getUserFeeds.restore();
        $state.go.restore();
    });

    it('should expose homeService to the scope', function(){
        expect($scope.home).to.equal(homeService);
    });

    it('should activate explorerStateService and set it to read only', function(){
        expect(explorerStateService.activate.calledWith('user feeds', [])).to.equal(true);
    });

    it('should set explorerStateService to read only', function(){
        expect(explorerStateService.readOnly).to.equal(true);
    });

    it('should reset the explorerStateService when destroyed', function(){
        $scope.$broadcast('$destroy');

        expect(explorerStateService.reset.called).to.equal(true);
    });
});
