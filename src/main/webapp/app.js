(function(window, angular){
    'use strict';
    
    function zenConfig($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    }
    zenConfig.$inject=["$urlRouterProvider"];

    function zenRun($state){
        $state.go('root.store');
    }

    zenRun.$inject=['$state'];

    angular.module('zen.helpers', [
        'sha1'
    ]);

    angular.module('zen.services', [
        'zen.helpers',
    ]);

    angular.module('zen', [
        'ui.router',
        'zen.states.root',
        'zen.states.home',
        'zen.states.store',
        'zen.states.myActivities',
        'zen.states.products',
        'zen.states.users',
        'zen.states.activities',
        'zen.states.rooms',
        'zen.states.accessories',
    ])
    .config(zenConfig)
    .run(zenRun);

})(window, window.angular);
