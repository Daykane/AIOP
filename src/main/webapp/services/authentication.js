(function(window, angular){
    'use strict';

    /**
     * @description The role of this service is to manage authentication data
     */
    function authenticationService($window, ipCookie){

        function encryptPassword(password){

            return sha1
        }

        encryptSignature

        return {
            setId: function(id){
                var id = 
            }

            setSignature: function(email, password, rememberMe){
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

    angular.module('zen.services')
        .factory('authenticationService', authenticationService)
		
})(window, window.angular);
