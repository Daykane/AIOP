describe('coreConfig', function(){
    'use strict';

    var RestangularProvider, NewApiUrl;

    beforeEach(function(){
        module('restangular', function(_RestangularProvider_){
            RestangularProvider = _RestangularProvider_;
            sinon.spy(RestangularProvider, 'setBaseUrl');
        });

        module('signal.core');

        inject(function(_NewApiUrl_){
            NewApiUrl = _NewApiUrl_;
        });
    });

    it('should setup the default url for the api', function(){
        assert(RestangularProvider.setBaseUrl.calledWith(NewApiUrl), 'should setup the default url for the api');
    });
});

describe('signalConfig', function(){
    'use strict';

    var $httpProvider, $urlRouterProvider;

    beforeEach(function(){
        module('ui.router', function(_$urlRouterProvider_){
            $urlRouterProvider = _$urlRouterProvider_;
            sinon.spy($urlRouterProvider, 'otherwise');
        });

        module(function(_$httpProvider_){
            $httpProvider = _$httpProvider_;
        });

        module('signal');

        inject(function(){

        });
    });

    it('should setup the authentication interceptor to allow auth data in every request', function(){
        expect($httpProvider.interceptors).to.include('authInterceptor');
    });

    it('should setup the default url to the root url', function(){
        assert($urlRouterProvider.otherwise.calledWith('/'), 'should setup the default url to the root url');
    });
});
