describe('Users', function(){
    'use strict';

    var $rootScope,
        $q,
        $cacheFactory,
        Es,
        sha1,
        NewApiUrl,
        authService,
        $httpBackend,
        Users;

    beforeEach(function(){
        module('signal.domain.users');

        inject(function($injector){
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $cacheFactory = $injector.get('$cacheFactory');
            $httpBackend = $injector.get('$httpBackend');
            Es = $injector.get('Es');
            sha1 = $injector.get('sha1');
            NewApiUrl = $injector.get('NewApiUrl');
            authService = $injector.get('authService');
            Users = $injector.get('Users');

            sinon.spy(authService, 'setToken');
        });
    });

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

        authService.setToken.restore();
        $cacheFactory.get('users').removeAll();
    });

    it('should be able to get a list of all users', function(){
        $httpBackend.expectGET(NewApiUrl + '/users?from=5&size=10').respond(200, 'users');

        Users.search('', 10, 5).then(function(users){
            expect(users).to.equal('users');
        });

        $httpBackend.flush();
        $rootScope.$apply();
    });

    it('should be able to search through users by keywords', function(){
        $httpBackend.expectPOST(NewApiUrl + '/users/search?from=5&size=10', {
            query: 'test'
        }).respond(200, 'users');

        Users.search('test', 10, 5).then(function(users){
            expect(users).to.equal('users');
        });

        $httpBackend.flush();
        $rootScope.$apply();
    });

    it('should be able to save a user that already exist', function(){
        var testUser = {id: 'id', 'first-name': 'test'},
            userResponse;

        $httpBackend.expectPUT(NewApiUrl + '/users/id', testUser).respond(200, 'Resource updated');

        Users.saveUser(testUser).then(function(response){
            userResponse = response;
        });

        $httpBackend.flush();
        $rootScope.$apply();

        expect(userResponse).to.equal('Resource updated');
    });

    it('should be able to create a user', function(){
        var testUser = {'first-name': 'test'},
            userResponse;

        $httpBackend.expectPOST(NewApiUrl + '/users', testUser).respond(201, 'resource created');

        Users.saveUser(testUser).then(function(response){
            userResponse = response;
        });

        $httpBackend.flush();
        $rootScope.$apply();
        expect(userResponse).to.equal('resource created');
    });

    it('should set the current user if credentials given', function(){
        var user;

        $httpBackend.expectGET(NewApiUrl + '/whoami').respond(200, 'user');

        Users.setCurrent('email', 'password', 'rememberMe').then(function(response){
            user = response;
        });

        $httpBackend.flush();
        $rootScope.$apply();

        expect(authService.setToken.calledWith('email', sha1.hash('password'), 'rememberMe')).to.equal(true);
        expect(user).to.equal('user');
        expect($cacheFactory.get('users').get('current')).to.equal('user');

    });

    it('should not set the current user if authentication failed', function(){
        var error;

        try{
            Users.setCurrent();
        } catch(e){
            error = e;
        }

        expect(error).to.equal('Empty credentials');
        expect(authService.setToken.called).to.equal(false);
    });

    it('should get the current user if it is cached', function(){
        var user;
        $cacheFactory.get('users').put('current', 'myUser');
        Users.getCurrent().then(function(response){
            user = response;
        });
        $rootScope.$apply();
        expect(user).to.equal('myUser');
    });

    it('should get the current user if not cached', function(){
        var user;

        $httpBackend.expectGET(NewApiUrl + '/whoami').respond(200, 'user');

        Users.getCurrent().then(function(response){
            user = response;
        });

        $httpBackend.flush();
        $rootScope.$apply();

        expect(user).to.equal('user');
        expect($cacheFactory.get('users').get('current')).to.equal('user');
    });

    it('should be able to update the current user feeds', function(){
        var testUser = {id: 'id', name: 'test', feeds: ['myFeeds']},
            userResponse;
        $cacheFactory.get('users').put('current', testUser);

        sinon.stub(Es, 'update').returns($q.when('user'));

        Users.saveCurrentUserFeeds().then(function(response){
            userResponse = response;
        });
        $rootScope.$apply();

        assert.isTrue(Es.update.calledWith({
            index: 'users',
            type: 'user',
            id: 'id',
            body: {doc: {feeds: ['myFeeds']}}
        }));
        expect(userResponse).to.equal('user');

        Es.update.restore();
    });

    it('should be able to update the current user folders', function(){
        var testUser = {id: 'id', name: 'test', folders: ['myFolder1']},
            userResponse;
        $cacheFactory.get('users').put('current', testUser);

        sinon.stub(Es, 'update').returns($q.when('user'));

        Users.saveCurrentUserFolders().then(function(response){
            userResponse = response;
        });
        $rootScope.$apply();

        assert.isTrue(Es.update.calledWith({
            index: 'users',
            type: 'user',
            id: 'id',
            body: {doc: {folders: ['myFolder1']}}
        }));
        expect(userResponse).to.equal('user');

        Es.update.restore();
    });

    it('should be able to update the current user\'s clip stories', function(){
        var testUser = {id: 'id', name: 'test', 'clipped-stories': ['someStoryID']},
            userResponse;
        $cacheFactory.get('users').put('current', testUser);

        sinon.stub(Es, 'update').returns($q.when('user'));

        Users.saveCurrentUserClippings().then(function(response){
            userResponse = response;
        });
        $rootScope.$apply();

        assert.isTrue(Es.update.calledWith({
            index: 'users',
            type: 'user',
            id: 'id',
            body: {doc: {'clipped-stories': ['someStoryID']}}
        }));
        expect(userResponse).to.equal('user');

        Es.update.restore();
    });

    it('should be able to delete a user', function(){
        var testUser = {name: 'test', feeds: []};

        Users.deleteUser(testUser).then(null, function(response){
            expect(response).to.equal('Feature not available');
        });
        $rootScope.$apply();
    });

    it('should say if a user has a specific role', function(){
        expect(Users.hasRole({roles: ['admin']}, 'test')).to.equal(false);
        expect(Users.hasRole({roles: ['admin']}, 'admin')).to.equal(true);
    });

    it('should be able to switch the current user cached', function(){
        $cacheFactory.get('users').put('current', 'myUser');
        Users.switchUser('myOtherUser');
        expect($cacheFactory.get('users').get('current')).to.equal('myOtherUser');
    });

    it('should be able to get the cached current user', function(){
        $cacheFactory.get('users').put('current', 'myUser');

        expect(Users.getCachedCurrentUser()).to.equal('myUser');
    });
});
