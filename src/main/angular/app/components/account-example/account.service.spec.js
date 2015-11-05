describe('accountService', function(){
    'use strict';

    var $state,
        accountService,
        userStateService,
        authService;

    beforeEach(function(){
        module('signal.components.account');

        inject(function($injector){
            $state = $injector.get('$state');
            accountService = $injector.get('accountService');
            userStateService = $injector.get('userStateService');
            authService = $injector.get('authService');

            sinon.stub(userStateService, 'getUserData').returns('myUser');
            sinon.stub($state, 'go');
        });
    });

    afterEach(function(){
        userStateService.getUserData.restore();
        $state.go.restore();
    });

    it('on initialisation should setup the current user', function(){
        accountService.activate();
        expect(accountService.user).to.equal('myUser');
    });

    it('on reset should clean the current user data', function(){
        accountService.user = 'myUser';
        accountService.realUser = 'myRealUser';

        accountService.reset();

        assert.isNull(accountService.user);
        assert.isNull(accountService.realUser);
    });

    it('should be able to setup a user as impersonated', function(){
        accountService.user = 'myRealUser';

        accountService.userImpersonated();

        expect(accountService.user).to.equal('myUser');
        expect(accountService.realUser).to.equal('myRealUser');
    });

    it('should be able to remove the impersonation of a user', function(){
        accountService.user = 'myFalseUser';
        accountService.realUser = 'myRealUser';

        accountService.removeImpersonation();

        expect(accountService.user).to.equal('myUser');
        expect(accountService.realUser).to.equal(null);
        assert.isTrue($state.go.calledWith('root.admin.users'));
    });

    it('should logout the current user ', function(){
        sinon.spy(authService, 'clearToken');

        accountService.logOut();

        assert.isTrue(authService.clearToken.called);
        assert.isTrue($state.go.calledWith('login'));
    });
});
