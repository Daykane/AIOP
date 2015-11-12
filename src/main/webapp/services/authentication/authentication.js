(function(window, angular){
    'use strict';

    /**
     * @description The role of this service is to manage authentication data
     */
    function authenticationService($window, ipCookie, Users, sha1){

        function encrypt(msg){
            return hash(msg);
        }

        function isAdminMock(){
                return true;
        }

        return {
            setToken: function(email, password, rememberMe){
                var encryptedPassword = encrypt(password);
                var userid = users.getId(email, encryptedPassword);
                var signature = encrypt(userid + ":" + encryptedPassword);
                var token = userid + ':' + signature;
                if (rememberMe){
                    ipCookie('auth', $window.btoa(token), {expires: 28});
                } else {
                    ipCookie('auth', $window.btoa(token));
                }
            },
            getToken: function(){
                return ipCookie('auth');
            },
            getId: function(){
                var id = null,
                    token = null;
                if(ipCookie('auth')){
                    token = $window.atob(ipCookie('auth'));
                    id = token.split(':')[0];
                }
                return id;
            },
            getSignature: function(){
                var signature = null,
                    token = null;
                if(ipCookie('auth')){
                    token = $window.atob(ipCookie('auth'));
                    signature = token.split(':')[1];
                }
                return signature;
            },
            clearToken: function(){
                document.execCommand('ClearAuthenticationCache');
                ipCookie.remove('auth');
            },
            isAdmin : function(){
                return isAdminMock();
            },
            isConnected : function(){
                return isAdminMock();
            },
            isNotConnected : function(){
                return isAdminMock();
            }

        };
    }
    authenticationService.$inject = ['$window', 'ipCookie', 'Users', 'sha1']

    angular.module('zen.services')
        .factory('authenticationService', authenticationService);

})(window, window.angular);
