(function(window, angular){
    'use strict';

    function loginConfig($stateProvider){
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginController as loginView'
        });
    }

    function loginController(Users, $state){
        // Private variables
        var self = this;
        // Private methods
        function loginSuccess(){
            $state.go('root.insight');
        }

        function loginFailure(error){
            if (error.status === 401){
                self.status = 'invalidCredentials';
            } else {
                self.status = 'error';
            }
        }

        function login(){
            if (self.credentials.email && self.credentials.password){
                Users.setCurrent(self.credentials.email, self.credentials.password, self.rememberMe).then(loginSuccess, loginFailure);
            } else {
                self.status = 'invalidCredentials';
            }
        }

        function init(){
            Users.getCurrent().then(loginSuccess, function(){
                self.isLogout = true;
                self.credentials = {
                    email: '',
                    password: ''
                };
            });
        }

        // Public variables
        self.credentials = null;
        self.rememberMe = true;
        self.status = 'ok';
        self.isLogout = false;

        // Public methods
        self.login = login;

        init();
    }

    angular.module('signal.views.login', [
            'ui.router',
            'signal.domain.users'
        ])
        .config(loginConfig)
        .controller('loginController', loginController);
})(window, window.angular);
