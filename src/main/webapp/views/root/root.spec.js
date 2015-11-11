describe('rootConfig', function(){
    'use strict';

    var $state, Users, Entities;

    beforeEach(function(){

        module('signal.views.root');

        inject(function($injector){
            $state = $injector.get('$state');
            Users = $injector.get('Users');
            Entities = $injector.get('Entities');

            sinon.stub(Users, 'getCurrent').returns('currentUser');
            sinon.stub(Entities, 'loadIndustries').returns('industries');
        });
    });

    afterEach(function(){
        Users.getCurrent.restore();
        Entities.loadIndustries.restore();
    });

    it('should be abstract', function(){
        assert($state.get('root').abstract, 'should be an abstract state');
    });

    it('should resolve the current user on state start', function(){
        expect($state.get('root').resolve.user(Users)).to.equal('currentUser');
    });

    it('should resolve the industries on state start', function(){
        expect($state.get('root').resolve.industries(Entities)).to.equal('industries');
    });
});

describe('rootController', function(){
    'use strict';

    var $scope, $cacheFactory, analyticsService, userCache, entitiesCache, Entities;

    beforeEach(function(){

        module('signal');

        module(function($provide){
            $provide.value('user', {
                'id': 'id',
                'first-name': 'firstName',
                'last-name': 'lastName',
                company: 'companyName'
            });
        });

        inject(function($injector){
            var $controller = $injector.get('$controller'),
                $rootScope = $injector.get('$rootScope');

            analyticsService = $injector.get('analyticsService');
            $cacheFactory = $injector.get('$cacheFactory');
            Entities = $injector.get('Entities');
            $scope = $rootScope.$new();
            sinon.stub(analyticsService, 'trackEvent');
            sinon.stub(analyticsService, 'boot');

            function createController(){
                return $controller('rootController', {
                    '$scope': $scope
                });
            }

            createController();

            userCache = $cacheFactory.get('users');
            sinon.stub(userCache, 'removeAll');
            entitiesCache = $cacheFactory.get('entities');
            sinon.stub(entitiesCache, 'removeAll');
        });
    });

    it('should empty the cache for all $http requests', function(){
        $scope.$broadcast('$destroy');
        assert(userCache.removeAll.called, 'should remove all users cache');
        assert(entitiesCache.removeAll.called, 'should remove all entities cache');
    });

    it('should initialise analyticsService with the user data', function(){
        assert.isTrue(analyticsService.boot.calledWith({
            'user_id': 'id',
            'id': 'id',
            'name': 'firstName lastName',
            'first-name': 'firstName',
            'last-name': 'lastName',
            'company': {
                'id': 'companyName',
                'name': 'companyName'
            }

        }));
    });
});
