(function(window, angular){
    'use strict';
    
    function loginConfig($stateProvider){
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginController as loginView'
        });
    }
    loginConfig.$inject = ['$stateProvider'];

    function loginController(UsersService){
        // Private variables
        var self = this;

        // Private methods
        function loginSuccess(){
            //$state.go('root.home');
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
		
		function loginGoogle(googleUser){
            // Useful data for your client-side scripts:
            var profile = googleUser.getBasicProfile();
            console.log("ID: " + profile.getId()); // Don't send this directly to your server!
            console.log("Name: " + profile.getName());
            console.log("Image URL: " + profile.getImageUrl());
            console.log("Email: " + profile.getEmail());

            // The ID token you need to pass to your backend:
            var id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);
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

        // Initialization
        init();
    }
    loginController.$inject = [];

    angular.module('zen.components.login', [
        'zen.services'
    ])
    .config(loginConfig)
    .controller('loginController', loginController);
})(window, window.angular);
