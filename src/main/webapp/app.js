(function(window, angular){
    'use strict';
    
    function zenConfig($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    }
    zenConfig.$inject=["$urlRouterProvider"];

    function zenRun($state){
        $state.go('root.home');
    }
    zenRun.$inject=['$state'];

    angular.module('zen.helpers', []);

    angular.module('zen.services', [
        'zen.helpers',
    ]);
    
    angular.module('zen', [
        'ui.router',
        'zen.views.root',
        'zen.views.home'
    ])
    .config(zenConfig)
    .run(zenRun);

})(window, window.angular);
