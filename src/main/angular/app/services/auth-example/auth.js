(function(window, angular){
    'use strict';

    /**
     * @description The role of this service is to manage authentication data
     */
    function authServ($window, ipCookie){
        return {
            setToken: function(email, password, rememberMe){
                var token = email + ':' + password;
                if (rememberMe){
                    ipCookie('auth', $window.btoa(token), {expires: 28});
                } else {
                    ipCookie('auth', $window.btoa(token));
                }
            },
            getToken: function(){
                return ipCookie('auth');
            },
            getCredentials: function(){
                var credentials = null,
                    token = null;
                if(ipCookie('auth')){
                    token = $window.atob(ipCookie('auth'));
                    credentials = {
                        email: token.split(':')[0],
                        password: token.split(':')[1]
                    };
                }
                return credentials;
            },
            clearToken: function(){
                document.execCommand('ClearAuthenticationCache');
                ipCookie.remove('auth');
            }
        };
    }

    /**
     * @description The role of this service is to intercept all $http request and add authentication data to it,
     * if a request return an invalid credentials error we redirect to the login.
     * We use the $injector service because there is a dependency cycle if we use $state
     */
    function authInterceptor($injector, $q, authService){
        return {
            request: function(config){
                config.headers = config.headers || {};
                config.headers.Authorization = 'Basic ' + authService.getToken();
                return config;
            },
            responseError: function(response){
                if (response.status === 401){ // Redirect to login page if invalid credentials
                    if (!$injector.get('$state').is('login')){ // If you are not on the login page
                        $injector.get('$state').go('login', {from: $injector.get('$state').$current});
                    }
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }

    angular.module('signal.services')
        .factory('authService', authServ)
        .factory('authInterceptor', authInterceptor);
})(window, window.angular);
