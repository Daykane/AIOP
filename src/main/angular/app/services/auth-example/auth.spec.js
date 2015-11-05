describe('authService', function(){
    'use strict';

    var authService, ipCookie, $window;

    beforeEach(function(){
        module('signal.services');
        module(function($provide) {
            $provide.provider('ipCookie', function() {
                this.$get = function() {
                    return sinon.stub().returns($window.btoa('email:password'));
                };
            });
        });

        inject(function($injector){
            $window = $injector.get('$window');
            authService = $injector.get('authService');
            ipCookie = $injector.get('ipCookie');
            ipCookie.remove = sinon.spy();
        });
    });

    it('should save authentication data', function(){
        authService.setToken('email', 'password');
        assert(ipCookie.calledWith('auth', $window.btoa('email:password')), 'should save auth cookie');
    });

    it('should save authentication data with one month expiry date because remember me is checked', function(){
        authService.setToken('email', 'password', true);
        assert(ipCookie.calledWith('auth', $window.btoa('email:password'), { expires: 28 }), 'should save auth cookie with expiry date');
    });

    it('should retrieve authentication token from cookie', function(){
        var token = authService.getToken();
        assert(ipCookie.calledWith('auth'), 'should get auth cookie');
        expect(token).to.equal($window.btoa('email:password'));
    });

    it('should retrieve credentials from cookie', function(){
        var credentials = authService.getCredentials();
        assert(ipCookie.calledWith('auth'), 'should get auth cookie');
        expect(credentials).to.eql({email: 'email', password: 'password'});
    });

    it('should clear all authentication data', function(){
        authService.clearToken();
        assert(ipCookie.remove.calledWith('auth'), 'should delete auth cookie');
    });
});

describe('authInterceptor', function(){
    'use strict';

    var authInterceptor,
        $state,
        $q,
        authService;

    authService = {
        token: 'email:password',
        getToken: function(){
            return this.token;
        }
    };

    beforeEach(function(){
        module('signal.services');

        module(function($provide) {
            $provide.value('authService', authService);
        });

        inject(function(_authInterceptor_, _$state_, _$q_){
            authInterceptor = _authInterceptor_;
            $state = _$state_;
            $q = _$q_;
            $state.$current = 'currentState';
            sinon.stub($state, 'is').returns(false);
            sinon.stub($state, 'go');
            sinon.stub($q, 'reject').returns('response rejected');
        });
    });

    afterEach(function () {
        $state.is.restore();
        $state.go.restore();
        $q.reject.restore();
    });

    it('should add the authentication data to the query header', function(){
        var config = {};
        authInterceptor.request(config);
        expect(config.headers.Authorization).to.equal('Basic ' + authService.getToken());
    });

    it('should redirect to login page if 401 response is received and we are not on login page', function(){
        var response = {status: 401, config: {url: ''}},
            responseError = authInterceptor.responseError(response);

        assert($state.is.calledWith('login'), 'should check if we are on login page');
        assert($state.go.calledWith('login', {from: 'currentState'}), 'should redirect to login page');
        assert($q.reject.calledWith(response), 'should reject request');
        expect(responseError).to.equal('response rejected');
    });

    it('should pass through the response if 401 response and we are on the login page', function(){
        var response = {status: 401, config: {url: ''}},
            responseError;

        $state.is.returns(true);
        responseError = authInterceptor.responseError(response);

        assert($state.is.calledWith('login'), 'should check if we are on login page');
        assert($state.go.callCount === 0, 'should not go to login page');
        expect(responseError).to.equal('response rejected');
    });

    it('should pass through the response if error received', function(){
        var response = {status: 404, config: {url: ''}},
            responseError = authInterceptor.responseError(response);

        assert($state.go.callCount === 0, 'should not go to login page');
        assert($q.reject.calledWith(response), 'should reject request');
        expect(responseError).to.equal('response rejected');
    });
});
